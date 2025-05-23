import { pgTable, text, serial, integer, boolean, timestamp, primaryKey, uniqueIndex } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  fullName: text("full_name"),
  avatarId: text("avatar_id").default("fox1"),
  level: integer("level").default(1),
  xp: integer("xp").default(0),
  streak: integer("streak").default(0),
  lastActiveDate: timestamp("last_active_date").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Problems
export const problems = pgTable("problems", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  difficulty: text("difficulty").notNull(), // "Easy", "Medium", "Hard"
  acceptance: integer("acceptance"), // Percentage of successful submissions
  solution: text("solution"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Problem Tags (categories)
export const problemTags = pgTable("problem_tags", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
});

// Map problems to tags (many-to-many)
export const problemToTag = pgTable("problem_to_tag", {
  problemId: integer("problem_id").notNull().references(() => problems.id),
  tagId: integer("tag_id").notNull().references(() => problemTags.id),
}, (t) => ({
  pk: primaryKey(t.problemId, t.tagId),
}));

// User Problem attempts
export const userProblems = pgTable("user_problems", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  problemId: integer("problem_id").notNull().references(() => problems.id),
  status: text("status").notNull(), // "Solved", "Attempted", "Unsolved"
  code: text("code"), // User's solution code
  language: text("language"), // Programming language used
  submittedAt: timestamp("submitted_at").defaultNow(),
});

// User Goals
export const userGoals = pgTable("user_goals", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  title: text("title").notNull(),
  type: text("type").notNull(), // "daily", "weekly", etc.
  target: integer("target").notNull(), // Number to achieve
  current: integer("current").default(0), // Current progress
  completed: boolean("completed").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Badges
export const badges = pgTable("badges", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  color: text("color").notNull(),
  requirement: text("requirement").notNull(),
});

// User Badges
export const userBadges = pgTable("user_badges", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  badgeId: integer("badge_id").notNull().references(() => badges.id),
  earnedAt: timestamp("earned_at").defaultNow(),
});

// User Avatar Accessories
export const avatarAccessories = pgTable("avatar_accessories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  type: text("type").notNull(), // "hat", "glasses", etc.
  requirement: text("requirement").notNull(),
});

// User unlocked accessories
export const userAccessories = pgTable("user_accessories", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  accessoryId: integer("accessory_id").notNull().references(() => avatarAccessories.id),
  equipped: boolean("equipped").default(false),
  unlockedAt: timestamp("unlocked_at").defaultNow(),
});

// Friendships
export const friendships = pgTable("friendships", {
  id: serial("id").primaryKey(),
  requesterId: integer("requester_id").notNull().references(() => users.id),
  addresseeId: integer("addressee_id").notNull().references(() => users.id),
  status: text("status").notNull(), // "pending", "accepted", "rejected"
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (t) => ({
  // Ensure users can't send multiple friend requests
  uniqueFriendshipIdx: uniqueIndex("unique_friendship_idx").on(t.requesterId, t.addresseeId),
}));

// User activity feed
export const activityFeed = pgTable("activity_feed", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  type: text("type").notNull(), // "solved_problem", "earned_badge", "achieved_streak", etc.
  content: text("content").notNull(),
  metadata: text("metadata"), // Additional JSON data about the activity
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  level: true,
  xp: true,
  streak: true,
  lastActiveDate: true,
  createdAt: true
});

export const insertProblemSchema = createInsertSchema(problems).omit({
  id: true,
  acceptance: true,
  createdAt: true
});

export const insertProblemTagSchema = createInsertSchema(problemTags).omit({
  id: true
});

export const insertUserProblemSchema = createInsertSchema(userProblems).omit({
  id: true,
  submittedAt: true
});

export const insertUserGoalSchema = createInsertSchema(userGoals).omit({
  id: true,
  current: true,
  completed: true,
  createdAt: true,
  updatedAt: true
});

export const insertBadgeSchema = createInsertSchema(badges).omit({
  id: true
});

export const insertUserBadgeSchema = createInsertSchema(userBadges).omit({
  id: true,
  earnedAt: true
});

export const insertFriendshipSchema = createInsertSchema(friendships).omit({
  id: true,
  status: true,
  createdAt: true,
  updatedAt: true
});

export const insertActivityFeedSchema = createInsertSchema(activityFeed).omit({
  id: true,
  createdAt: true
});

// Inferred types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertProblem = z.infer<typeof insertProblemSchema>;
export type Problem = typeof problems.$inferSelect;

export type InsertProblemTag = z.infer<typeof insertProblemTagSchema>;
export type ProblemTag = typeof problemTags.$inferSelect;

export type InsertUserProblem = z.infer<typeof insertUserProblemSchema>;
export type UserProblem = typeof userProblems.$inferSelect;

export type InsertUserGoal = z.infer<typeof insertUserGoalSchema>;
export type UserGoal = typeof userGoals.$inferSelect;

export type InsertBadge = z.infer<typeof insertBadgeSchema>;
export type Badge = typeof badges.$inferSelect;

export type InsertUserBadge = z.infer<typeof insertUserBadgeSchema>;
export type UserBadge = typeof userBadges.$inferSelect;

export type InsertFriendship = z.infer<typeof insertFriendshipSchema>;
export type Friendship = typeof friendships.$inferSelect;

export type InsertActivityFeed = z.infer<typeof insertActivityFeedSchema>;
export type ActivityFeed = typeof activityFeed.$inferSelect;
