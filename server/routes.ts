import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertUserSchema, 
  insertUserGoalSchema, 
  insertUserProblemSchema,
  insertFriendshipSchema,
  insertActivityFeedSchema
} from "@shared/schema";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);

  // ********** User routes **********
  
  // Get current user (authenticated user)
  app.get("/api/user", async (req: Request, res: Response) => {
    // For demo purposes, we'll use a hardcoded user ID
    // In a real app, this would come from the session
    const userId = 1;
    
    try {
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Don't return the password
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  // Register new user
  app.post("/api/user/register", async (req: Request, res: Response) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if username or email already exists
      const existingUserByUsername = await storage.getUserByUsername(userData.username);
      if (existingUserByUsername) {
        return res.status(400).json({ message: "Username already exists" });
      }
      
      const existingUserByEmail = await storage.getUserByEmail(userData.email);
      if (existingUserByEmail) {
        return res.status(400).json({ message: "Email already exists" });
      }
      
      const newUser = await storage.createUser(userData);
      
      // Don't return the password
      const { password, ...userWithoutPassword } = newUser;
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      res.status(500).json({ message: "Server error" });
    }
  });
  
  // Login
  app.post("/api/user/login", async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }
      
      const user = await storage.getUserByUsername(username);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
      
      // In a real app, update the session
      
      // Update the user's streak
      await storage.updateUserStreak(user.id);
      
      // Don't return the password
      const { password: _, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  // Update user
  app.patch("/api/user/:id", async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.id);
      const userData = req.body;
      
      // In a real app, check authorization
      
      const updatedUser = await storage.updateUser(userId, userData);
      
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Don't return the password
      const { password, ...userWithoutPassword } = updatedUser;
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  // ********** Problem routes **********
  
  // Get all problems (with optional filters)
  app.get("/api/problems", async (req: Request, res: Response) => {
    try {
      const { difficulty, tag, search } = req.query;
      
      const problems = await storage.getProblems({
        difficulty: difficulty as string,
        tag: tag as string,
        search: search as string
      });
      
      res.json(problems);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  // Get a single problem
  app.get("/api/problems/:id", async (req: Request, res: Response) => {
    try {
      const problemId = parseInt(req.params.id);
      const problem = await storage.getProblem(problemId);
      
      if (!problem) {
        return res.status(404).json({ message: "Problem not found" });
      }
      
      res.json(problem);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  // ********** Problem Tag routes **********
  
  // Get all problem tags
  app.get("/api/problem-tags", async (req: Request, res: Response) => {
    try {
      const tags = await storage.getProblemTags();
      res.json(tags);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  // ********** User Problem routes **********
  
  // Get user's problems (solved/attempted)
  app.get("/api/user/:userId/problems", async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.userId);
      const userProblems = await storage.getUserProblems(userId);
      res.json(userProblems);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  // Submit a solution to a problem
  app.post("/api/user-problems", async (req: Request, res: Response) => {
    try {
      const userProblemData = insertUserProblemSchema.parse(req.body);
      
      // Check if user has already submitted this problem
      const existingUserProblem = await storage.getUserProblem(
        userProblemData.userId,
        userProblemData.problemId
      );
      
      let userProblem;
      
      if (existingUserProblem) {
        // Update existing submission
        userProblem = await storage.updateUserProblem(existingUserProblem.id, userProblemData);
      } else {
        // Create new submission
        userProblem = await storage.createUserProblem(userProblemData);
      }
      
      // If problem is solved, create activity
      if (userProblemData.status === "Solved") {
        const problem = await storage.getProblem(userProblemData.problemId);
        
        if (problem) {
          await storage.createActivityFeed({
            userId: userProblemData.userId,
            type: "solved_problem",
            content: `You solved ${problem.title}`,
            metadata: JSON.stringify({ problemId: problem.id, difficulty: problem.difficulty })
          });
          
          // Update user streak
          await storage.updateUserStreak(userProblemData.userId);
          
          // Check if this counts toward any goals
          const userGoals = await storage.getUserGoals(userProblemData.userId);
          
          for (const goal of userGoals) {
            if (
              goal.type === "daily" && 
              !goal.completed && 
              goal.title.includes("Problems")
            ) {
              // Increment goal progress
              const newCurrent = goal.current + 1;
              const completed = newCurrent >= goal.target;
              
              await storage.updateUserGoal(goal.id, {
                current: newCurrent,
                completed
              });
              
              if (completed) {
                // Create activity for completed goal
                await storage.createActivityFeed({
                  userId: userProblemData.userId,
                  type: "goal_completed",
                  content: `Daily goal completed: ${goal.title}`,
                  metadata: JSON.stringify({ goalId: goal.id })
                });
              }
            }
          }
        }
      }
      
      res.status(201).json(userProblem);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      res.status(500).json({ message: "Server error" });
    }
  });
  
  // ********** User Goal routes **********
  
  // Get user's goals
  app.get("/api/user/:userId/goals", async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.userId);
      const userGoals = await storage.getUserGoals(userId);
      res.json(userGoals);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  // Create a new goal
  app.post("/api/user-goals", async (req: Request, res: Response) => {
    try {
      const userGoalData = insertUserGoalSchema.parse(req.body);
      const newGoal = await storage.createUserGoal(userGoalData);
      res.status(201).json(newGoal);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      res.status(500).json({ message: "Server error" });
    }
  });
  
  // Update a goal
  app.patch("/api/user-goals/:id", async (req: Request, res: Response) => {
    try {
      const goalId = parseInt(req.params.id);
      const goalData = req.body;
      
      const updatedGoal = await storage.updateUserGoal(goalId, goalData);
      
      if (!updatedGoal) {
        return res.status(404).json({ message: "Goal not found" });
      }
      
      res.json(updatedGoal);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  // ********** Badge routes **********
  
  // Get all badges
  app.get("/api/badges", async (req: Request, res: Response) => {
    try {
      const badges = await storage.getBadges();
      res.json(badges);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  // Get user's badges
  app.get("/api/user/:userId/badges", async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.userId);
      const userBadges = await storage.getUserBadges(userId);
      
      // Get the full badge info
      const badges = [];
      for (const userBadge of userBadges) {
        const badge = await storage.getBadge(userBadge.badgeId);
        if (badge) {
          badges.push({
            ...badge,
            earnedAt: userBadge.earnedAt
          });
        }
      }
      
      res.json(badges);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  // ********** Friendship routes **********
  
  // Get user's friends
  app.get("/api/user/:userId/friends", async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.userId);
      const friendships = await storage.getFriendships(userId);
      
      // Get the full user info for each friend
      const friends = [];
      for (const friendship of friendships) {
        const friendId = friendship.requesterId === userId 
          ? friendship.addresseeId
          : friendship.requesterId;
        
        const friend = await storage.getUser(friendId);
        if (friend) {
          // Don't return the password
          const { password, ...friendWithoutPassword } = friend;
          friends.push(friendWithoutPassword);
        }
      }
      
      res.json(friends);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  // Get user's friend requests
  app.get("/api/user/:userId/friend-requests", async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.userId);
      const friendRequests = await storage.getFriendshipRequests(userId);
      
      // Get the full user info for each requester
      const requests = [];
      for (const request of friendRequests) {
        const requester = await storage.getUser(request.requesterId);
        if (requester) {
          // Don't return the password
          const { password, ...requesterWithoutPassword } = requester;
          requests.push({
            id: request.id,
            user: requesterWithoutPassword,
            createdAt: request.createdAt
          });
        }
      }
      
      res.json(requests);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  // Send friend request
  app.post("/api/friendships", async (req: Request, res: Response) => {
    try {
      const friendshipData = insertFriendshipSchema.parse(req.body);
      
      // Check that users exist
      const requester = await storage.getUser(friendshipData.requesterId);
      const addressee = await storage.getUser(friendshipData.addresseeId);
      
      if (!requester || !addressee) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Create the friendship
      const friendship = await storage.createFriendship(friendshipData);
      res.status(201).json(friendship);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      
      if (error instanceof Error && error.message === "Friendship already exists") {
        return res.status(400).json({ message: error.message });
      }
      
      res.status(500).json({ message: "Server error" });
    }
  });
  
  // Respond to friend request
  app.patch("/api/friendships/:id", async (req: Request, res: Response) => {
    try {
      const friendshipId = parseInt(req.params.id);
      const { status } = req.body;
      
      if (status !== "accepted" && status !== "rejected") {
        return res.status(400).json({ message: "Status must be 'accepted' or 'rejected'" });
      }
      
      const updatedFriendship = await storage.updateFriendship(friendshipId, status);
      
      if (!updatedFriendship) {
        return res.status(404).json({ message: "Friendship not found" });
      }
      
      res.json(updatedFriendship);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  // ********** Activity Feed routes **********
  
  // Get user's activity feed
  app.get("/api/user/:userId/activity", async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.userId);
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      
      const activities = await storage.getActivityFeed(userId, limit);
      
      // Add user info to each activity
      const activitiesWithUser = await Promise.all(activities.map(async (activity) => {
        const user = await storage.getUser(activity.userId);
        return {
          ...activity,
          user: user ? {
            id: user.id,
            username: user.username,
            avatar: user.avatar
          } : undefined
        };
      }));
      
      res.json(activitiesWithUser);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  // ********** Leaderboard routes **********
  
  // Get global leaderboard
  app.get("/api/leaderboard/global", async (req: Request, res: Response) => {
    try {
      const leaderboard = await storage.getLeaderboard("global");
      
      // Remove passwords and format the data
      const formattedLeaderboard = leaderboard.map(user => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });
      
      res.json(formattedLeaderboard);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  // Get friends leaderboard
  app.get("/api/leaderboard/friends/:userId", async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.userId);
      const leaderboard = await storage.getLeaderboard("friends", userId);
      
      // Remove passwords and format the data
      const formattedLeaderboard = leaderboard.map(user => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });
      
      res.json(formattedLeaderboard);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  return httpServer;
}
