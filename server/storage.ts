import { 
  users, 
  problems, 
  problemTags, 
  problemToTag, 
  userProblems, 
  userGoals, 
  badges,
  userBadges,
  avatarAccessories,
  userAccessories,
  friendships,
  activityFeed,
  type User, 
  type InsertUser,
  type Problem,
  type InsertProblem,
  type ProblemTag,
  type InsertProblemTag,
  type UserProblem,
  type InsertUserProblem,
  type UserGoal,
  type InsertUserGoal,
  type Badge,
  type InsertBadge,
  type UserBadge,
  type InsertUserBadge,
  type Friendship,
  type InsertFriendship,
  type ActivityFeed,
  type InsertActivityFeed
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, data: Partial<User>): Promise<User | undefined>;
  
  // Problem operations
  getProblem(id: number): Promise<Problem | undefined>;
  getProblems(filters?: {
    difficulty?: string;
    tag?: string;
    search?: string;
  }): Promise<Problem[]>;
  createProblem(problem: InsertProblem): Promise<Problem>;
  
  // Problem Tag operations
  getProblemTag(id: number): Promise<ProblemTag | undefined>;
  getProblemTags(): Promise<ProblemTag[]>;
  createProblemTag(tag: InsertProblemTag): Promise<ProblemTag>;
  addTagToProblem(problemId: number, tagId: number): Promise<void>;
  
  // User Problem operations
  getUserProblem(userId: number, problemId: number): Promise<UserProblem | undefined>;
  getUserProblems(userId: number): Promise<UserProblem[]>;
  createUserProblem(userProblem: InsertUserProblem): Promise<UserProblem>;
  updateUserProblem(id: number, data: Partial<UserProblem>): Promise<UserProblem | undefined>;
  
  // User Goal operations
  getUserGoal(id: number): Promise<UserGoal | undefined>;
  getUserGoals(userId: number): Promise<UserGoal[]>;
  createUserGoal(userGoal: InsertUserGoal): Promise<UserGoal>;
  updateUserGoal(id: number, data: Partial<UserGoal>): Promise<UserGoal | undefined>;
  
  // Badge operations
  getBadge(id: number): Promise<Badge | undefined>;
  getBadges(): Promise<Badge[]>;
  createBadge(badge: InsertBadge): Promise<Badge>;
  
  // User Badge operations
  getUserBadges(userId: number): Promise<UserBadge[]>;
  createUserBadge(userBadge: InsertUserBadge): Promise<UserBadge>;
  
  // Friendship operations
  getFriendship(id: number): Promise<Friendship | undefined>;
  getFriendships(userId: number): Promise<Friendship[]>;
  getFriendshipRequests(userId: number): Promise<Friendship[]>;
  createFriendship(friendship: InsertFriendship): Promise<Friendship>;
  updateFriendship(id: number, status: string): Promise<Friendship | undefined>;
  
  // Activity Feed operations
  getActivityFeed(userId: number, limit?: number): Promise<ActivityFeed[]>;
  createActivityFeed(activity: InsertActivityFeed): Promise<ActivityFeed>;
  
  // Streak & Gamification operations
  updateUserStreak(userId: number): Promise<number>;
  getLeaderboard(type: "global" | "friends", userId?: number): Promise<User[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const { db } = await import('./db');
    const { users } = await import('@shared/schema');
    const { eq } = await import('drizzle-orm');
    
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const { db } = await import('./db');
    const { users } = await import('@shared/schema');
    const { eq } = await import('drizzle-orm');
    
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const { db } = await import('./db');
    const { users } = await import('@shared/schema');
    const { eq } = await import('drizzle-orm');
    
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const { db } = await import('./db');
    const { users } = await import('@shared/schema');
    
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async updateUser(id: number, data: Partial<User>): Promise<User | undefined> {
    const { db } = await import('./db');
    const { users } = await import('@shared/schema');
    const { eq } = await import('drizzle-orm');
    
    const [user] = await db
      .update(users)
      .set(data)
      .where(eq(users.id, id))
      .returning();
    return user || undefined;
  }

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private problems: Map<number, Problem>;
  private problemTags: Map<number, ProblemTag>;
  private problemToTags: Map<string, { problemId: number; tagId: number }>;
  private userProblems: Map<number, UserProblem>;
  private userGoals: Map<number, UserGoal>;
  private badges: Map<number, Badge>;
  private userBadges: Map<number, UserBadge>;
  private avatarAccessories: Map<number, any>;
  private userAccessories: Map<number, any>;
  private friendships: Map<number, Friendship>;
  private activityFeed: Map<number, ActivityFeed>;
  
  private currentUserId: number;
  private currentProblemId: number;
  private currentProblemTagId: number;
  private currentUserProblemId: number;
  private currentUserGoalId: number;
  private currentBadgeId: number;
  private currentUserBadgeId: number;
  private currentFriendshipId: number;
  private currentActivityFeedId: number;

  constructor() {
    this.users = new Map();
    this.problems = new Map();
    this.problemTags = new Map();
    this.problemToTags = new Map();
    this.userProblems = new Map();
    this.userGoals = new Map();
    this.badges = new Map();
    this.userBadges = new Map();
    this.avatarAccessories = new Map();
    this.userAccessories = new Map();
    this.friendships = new Map();
    this.activityFeed = new Map();
    
    this.currentUserId = 1;
    this.currentProblemId = 1;
    this.currentProblemTagId = 1;
    this.currentUserProblemId = 1;
    this.currentUserGoalId = 1;
    this.currentBadgeId = 1;
    this.currentUserBadgeId = 1;
    this.currentFriendshipId = 1;
    this.currentActivityFeedId = 1;
    
    this.initializeData();
  }
  
  private initializeData(): void {
    // Create some initial problem tags
    const tags = ["Array", "String", "Hash Table", "Linked List", "Stack", "Tree", "Dynamic Programming", "Sorting", "Binary Search"];
    tags.forEach(tag => this.createProblemTag({ name: tag }));
    
    // Create some initial problems
    this.createProblem({
      title: "Two Sum",
      description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
      difficulty: "Easy",
      solution: "Use a hash map to store seen values and their indices."
    });
    this.addTagToProblem(1, 1); // Array
    this.addTagToProblem(1, 3); // Hash Table
    
    this.createProblem({
      title: "Valid Parentheses",
      description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
      difficulty: "Easy",
      solution: "Use a stack to keep track of opening brackets."
    });
    this.addTagToProblem(2, 2); // String
    this.addTagToProblem(2, 5); // Stack
    
    this.createProblem({
      title: "Longest Substring Without Repeating Characters",
      description: "Given a string s, find the length of the longest substring without repeating characters.",
      difficulty: "Medium",
      solution: "Use sliding window with a hash set to track characters."
    });
    this.addTagToProblem(3, 2); // String
    this.addTagToProblem(3, 3); // Hash Table
    
    // Create badges
    this.createBadge({
      name: "5-day Streak",
      description: "Maintain a 5-day streak of solving problems",
      icon: "Calendar",
      color: "warning",
      requirement: "streak:5"
    });
    
    this.createBadge({
      name: "Easy x10",
      description: "Solve 10 easy problems",
      icon: "CheckCircle",
      color: "success",
      requirement: "problems:easy:10"
    });
    
    this.createBadge({
      name: "Array Master",
      description: "Solve 5 array problems",
      icon: "Code",
      color: "primary",
      requirement: "tag:Array:5"
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username.toLowerCase() === username.toLowerCase()
    );
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const now = new Date();
    const user: User = { 
      id, 
      ...insertUser, 
      level: 1,
      xp: 0,
      streak: 0,
      lastActiveDate: now,
      createdAt: now
    };
    this.users.set(id, user);
    return user;
  }
  
  async updateUser(id: number, data: Partial<User>): Promise<User | undefined> {
    const user = await this.getUser(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...data };
    this.users.set(id, updatedUser);
    return updatedUser;
  }
  
  // Problem operations
  async getProblem(id: number): Promise<Problem | undefined> {
    return this.problems.get(id);
  }
  
  async getProblems(filters?: { difficulty?: string; tag?: string; search?: string }): Promise<Problem[]> {
    let problems = Array.from(this.problems.values());
    
    if (filters) {
      if (filters.difficulty) {
        problems = problems.filter(p => p.difficulty.toLowerCase() === filters.difficulty?.toLowerCase());
      }
      
      if (filters.tag) {
        const tagId = Array.from(this.problemTags.values()).find(
          t => t.name.toLowerCase() === filters.tag?.toLowerCase()
        )?.id;
        
        if (tagId) {
          const problemIdsWithTag = Array.from(this.problemToTags.values())
            .filter(pt => pt.tagId === tagId)
            .map(pt => pt.problemId);
          
          problems = problems.filter(p => problemIdsWithTag.includes(p.id));
        }
      }
      
      if (filters.search) {
        problems = problems.filter(p => 
          p.title.toLowerCase().includes(filters.search?.toLowerCase() || "") ||
          p.description.toLowerCase().includes(filters.search?.toLowerCase() || "")
        );
      }
    }
    
    return problems;
  }
  
  async createProblem(insertProblem: InsertProblem): Promise<Problem> {
    const id = this.currentProblemId++;
    const now = new Date();
    const problem: Problem = {
      id,
      ...insertProblem,
      acceptance: 0,
      createdAt: now
    };
    this.problems.set(id, problem);
    return problem;
  }
  
  // Problem Tag operations
  async getProblemTag(id: number): Promise<ProblemTag | undefined> {
    return this.problemTags.get(id);
  }
  
  async getProblemTags(): Promise<ProblemTag[]> {
    return Array.from(this.problemTags.values());
  }
  
  async createProblemTag(tag: InsertProblemTag): Promise<ProblemTag> {
    const id = this.currentProblemTagId++;
    const problemTag: ProblemTag = { id, ...tag };
    this.problemTags.set(id, problemTag);
    return problemTag;
  }
  
  async addTagToProblem(problemId: number, tagId: number): Promise<void> {
    const problem = await this.getProblem(problemId);
    const tag = await this.getProblemTag(tagId);
    
    if (!problem || !tag) {
      throw new Error("Problem or tag not found");
    }
    
    const key = `${problemId}-${tagId}`;
    this.problemToTags.set(key, { problemId, tagId });
  }
  
  // User Problem operations
  async getUserProblem(userId: number, problemId: number): Promise<UserProblem | undefined> {
    return Array.from(this.userProblems.values()).find(
      up => up.userId === userId && up.problemId === problemId
    );
  }
  
  async getUserProblems(userId: number): Promise<UserProblem[]> {
    return Array.from(this.userProblems.values()).filter(
      up => up.userId === userId
    );
  }
  
  async createUserProblem(insertUserProblem: InsertUserProblem): Promise<UserProblem> {
    const id = this.currentUserProblemId++;
    const now = new Date();
    const userProblem: UserProblem = {
      id,
      ...insertUserProblem,
      submittedAt: now
    };
    this.userProblems.set(id, userProblem);
    return userProblem;
  }
  
  async updateUserProblem(id: number, data: Partial<UserProblem>): Promise<UserProblem | undefined> {
    const userProblem = this.userProblems.get(id);
    if (!userProblem) return undefined;
    
    const updatedUserProblem = { ...userProblem, ...data };
    this.userProblems.set(id, updatedUserProblem);
    return updatedUserProblem;
  }
  
  // User Goal operations
  async getUserGoal(id: number): Promise<UserGoal | undefined> {
    return this.userGoals.get(id);
  }
  
  async getUserGoals(userId: number): Promise<UserGoal[]> {
    return Array.from(this.userGoals.values()).filter(
      ug => ug.userId === userId
    );
  }
  
  async createUserGoal(insertUserGoal: InsertUserGoal): Promise<UserGoal> {
    const id = this.currentUserGoalId++;
    const now = new Date();
    const userGoal: UserGoal = {
      id,
      ...insertUserGoal,
      current: 0,
      completed: false,
      createdAt: now,
      updatedAt: now
    };
    this.userGoals.set(id, userGoal);
    return userGoal;
  }
  
  async updateUserGoal(id: number, data: Partial<UserGoal>): Promise<UserGoal | undefined> {
    const userGoal = this.userGoals.get(id);
    if (!userGoal) return undefined;
    
    const updatedUserGoal = { 
      ...userGoal, 
      ...data,
      updatedAt: new Date()
    };
    this.userGoals.set(id, updatedUserGoal);
    return updatedUserGoal;
  }
  
  // Badge operations
  async getBadge(id: number): Promise<Badge | undefined> {
    return this.badges.get(id);
  }
  
  async getBadges(): Promise<Badge[]> {
    return Array.from(this.badges.values());
  }
  
  async createBadge(insertBadge: InsertBadge): Promise<Badge> {
    const id = this.currentBadgeId++;
    const badge: Badge = { id, ...insertBadge };
    this.badges.set(id, badge);
    return badge;
  }
  
  // User Badge operations
  async getUserBadges(userId: number): Promise<UserBadge[]> {
    return Array.from(this.userBadges.values()).filter(
      ub => ub.userId === userId
    );
  }
  
  async createUserBadge(insertUserBadge: InsertUserBadge): Promise<UserBadge> {
    const id = this.currentUserBadgeId++;
    const now = new Date();
    const userBadge: UserBadge = {
      id,
      ...insertUserBadge,
      earnedAt: now
    };
    this.userBadges.set(id, userBadge);
    return userBadge;
  }
  
  // Friendship operations
  async getFriendship(id: number): Promise<Friendship | undefined> {
    return this.friendships.get(id);
  }
  
  async getFriendships(userId: number): Promise<Friendship[]> {
    return Array.from(this.friendships.values()).filter(
      f => (f.requesterId === userId || f.addresseeId === userId) && f.status === "accepted"
    );
  }
  
  async getFriendshipRequests(userId: number): Promise<Friendship[]> {
    return Array.from(this.friendships.values()).filter(
      f => f.addresseeId === userId && f.status === "pending"
    );
  }
  
  async createFriendship(insertFriendship: InsertFriendship): Promise<Friendship> {
    // Check if friendship already exists
    const existingFriendship = Array.from(this.friendships.values()).find(
      f => (f.requesterId === insertFriendship.requesterId && f.addresseeId === insertFriendship.addresseeId) ||
           (f.requesterId === insertFriendship.addresseeId && f.addresseeId === insertFriendship.requesterId)
    );
    
    if (existingFriendship) {
      throw new Error("Friendship already exists");
    }
    
    const id = this.currentFriendshipId++;
    const now = new Date();
    const friendship: Friendship = {
      id,
      ...insertFriendship,
      status: "pending",
      createdAt: now,
      updatedAt: now
    };
    this.friendships.set(id, friendship);
    return friendship;
  }
  
  async updateFriendship(id: number, status: string): Promise<Friendship | undefined> {
    const friendship = this.friendships.get(id);
    if (!friendship) return undefined;
    
    const updatedFriendship = { 
      ...friendship, 
      status,
      updatedAt: new Date()
    };
    this.friendships.set(id, updatedFriendship);
    return updatedFriendship;
  }
  
  // Activity Feed operations
  async getActivityFeed(userId: number, limit: number = 10): Promise<ActivityFeed[]> {
    // Get user's activities and friends' activities
    const userFriendships = await this.getFriendships(userId);
    const friendIds = userFriendships.map(f => 
      f.requesterId === userId ? f.addresseeId : f.requesterId
    );
    
    const activities = Array.from(this.activityFeed.values())
      .filter(a => a.userId === userId || friendIds.includes(a.userId))
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
    
    return activities;
  }
  
  async createActivityFeed(insertActivityFeed: InsertActivityFeed): Promise<ActivityFeed> {
    const id = this.currentActivityFeedId++;
    const now = new Date();
    const activity: ActivityFeed = {
      id,
      ...insertActivityFeed,
      createdAt: now
    };
    this.activityFeed.set(id, activity);
    return activity;
  }
  
  // Streak & Gamification operations
  async updateUserStreak(userId: number): Promise<number> {
    const user = await this.getUser(userId);
    if (!user) throw new Error("User not found");
    
    const lastActive = new Date(user.lastActiveDate);
    const today = new Date();
    
    // Set hours, minutes, seconds to 0 for date comparison
    lastActive.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    
    // Calculate the difference in days
    const diffTime = Math.abs(today.getTime() - lastActive.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    let newStreak = user.streak;
    
    if (diffDays === 0) {
      // User already active today, streak remains the same
    } else if (diffDays === 1) {
      // User was active yesterday, increment streak
      newStreak += 1;
    } else {
      // User missed days, reset streak
      newStreak = 1;
    }
    
    // Update user
    await this.updateUser(userId, { 
      streak: newStreak,
      lastActiveDate: new Date()
    });
    
    // Check if user earned a streak badge
    if (newStreak === 5) {
      const fiveDayBadge = Array.from(this.badges.values()).find(
        b => b.name === "5-day Streak"
      );
      
      if (fiveDayBadge) {
        const existingBadge = Array.from(this.userBadges.values()).find(
          ub => ub.userId === userId && ub.badgeId === fiveDayBadge.id
        );
        
        if (!existingBadge) {
          // Award the badge
          await this.createUserBadge({
            userId,
            badgeId: fiveDayBadge.id
          });
          
          // Create activity
          await this.createActivityFeed({
            userId,
            type: "earned_badge",
            content: "Badge earned: 5-day Streak",
            metadata: JSON.stringify({ badgeId: fiveDayBadge.id })
          });
        }
      }
    }
    
    return newStreak;
  }
  
  async getLeaderboard(type: "global" | "friends", userId?: number): Promise<User[]> {
    let users = Array.from(this.users.values());
    
    if (type === "friends" && userId) {
      const friendships = await this.getFriendships(userId);
      const friendIds = friendships.map(f => 
        f.requesterId === userId ? f.addresseeId : f.requesterId
      );
      
      // Include the user themselves and their friends
      users = users.filter(u => u.id === userId || friendIds.includes(u.id));
    }
    
    // Sort by problems solved (we'd need to count these), then by streak, then by xp
    return users.sort((a, b) => {
      // This is a simplified version. In a real app, we'd count solved problems
      if (a.streak !== b.streak) return b.streak - a.streak;
      return b.xp - a.xp;
    });
  }
}

export const storage = new MemStorage();
