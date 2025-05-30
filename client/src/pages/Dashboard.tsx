import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import GoalProgress from "@/components/GoalProgress";
import UserAvatar from "@/components/UserAvatar";
import Badge from "@/components/Badge";
import GoalsModal from "@/modals/GoalsModal";
import { Calendar, Flag, Code, CheckCircle, TrendingUp, Medal, Flame } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import fox3Avatar from "/src/avatars/fox3.png";
import wolf1Avatar from "/src/avatars/wolf1.png";
import wolf3Avatar from "/src/avatars/wolf3.png";

export default function Dashboard() {
  const { user, updateUserGoals } = useAuth();
  const [isGoalsModalOpen, setIsGoalsModalOpen] = useState(false);
  
  // Use goals directly from user context, with fallback
  const userGoals = user?.goals || { solveCount: 3, daysPerWeek: 5 };
  
  const goals = [
    {
      id: "1",
      title: "Daily Problems",
      current: 2,
      target: userGoals.solveCount,
      completed: 2,
      type: "daily" as const
    },
    {
      id: "2",
      title: "Weekly Practice Days",
      current: 4,
      target: userGoals.daysPerWeek,
      completed: 4,
      type: "weekly" as const
    }
  ];
  
  const badges = [
    {
      id: "1",
      name: "5-day Streak",
      title: "5-day Streak",
      icon: <Flame className="h-5 w-5" />,
      color: "yellow-500",
      unlocked: true,
    },
    {
      id: "2",
      name: "Easy x10", 
      title: "Easy x10",
      icon: <CheckCircle className="h-5 w-5" />,
      color: "green-500",
      unlocked: true,
    },
    {
      id: "3",
      name: "Array Master",
      title: "Array Master", 
      icon: <Code className="h-5 w-5" />,
      color: "blue-500",
      unlocked: true,
    }
  ];

  const recommendedProblems = [
    {
      id: 1,
      title: "Two Sum",
      difficulty: "Easy",
      tags: ["Array", "Hash Table"],
      acceptance: "49.1%",
      description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target."
    },
    {
      id: 2,
      title: "Add Two Numbers",
      difficulty: "Medium",
      tags: ["Linked List", "Math"],
      acceptance: "38.4%",
      description: "You are given two non-empty linked lists representing two non-negative integers."
    },
    {
      id: 3,
      title: "Longest Substring Without Repeating Characters",
      difficulty: "Medium",
      tags: ["Hash Table", "String", "Sliding Window"],
      acceptance: "33.8%",
      description: "Given a string s, find the length of the longest substring without repeating characters."
    }
  ];

  const friendActivity = [
    {
      id: 1,
      name: "Alice",
      avatar: fox3Avatar,
      action: "solved",
      problem: "Binary Tree Inorder Traversal",
      difficulty: "Easy",
      time: "2 hours ago"
    },
    {
      id: 2,
      name: "Bob",
      avatar: wolf1Avatar,
      action: "attempted",
      problem: "Merge k Sorted Lists",
      difficulty: "Hard",
      time: "4 hours ago"
    },
    {
      id: 3,
      name: "Carol",
      avatar: wolf3Avatar,
      action: "solved",
      problem: "Valid Parentheses",
      difficulty: "Easy",
      time: "6 hours ago"
    }
  ];

  const handleGoalsUpdate = (newGoals: { solveCount: number; daysPerWeek: number }) => {
    updateUserGoals(newGoals);
  };

  if (!user) {
    return (
      <div className="px-4 py-6 lg:px-8 lg:py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">Welcome to DuoLeet!</h2>
          <p className="text-neutral-600 mb-4">Please sign in to start your coding journey.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 lg:px-8 lg:py-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">
          Welcome, {user.username}! 👋
        </h1>
        <p className="text-neutral-600">Ready to tackle some coding challenges today?</p>
      </div>

      {/* Daily Challenge */}
      <Card className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 mb-8">
        <CardContent className="p-0">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary-100 rounded-lg">
                <Calendar className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-900">Today's Challenge</h3>
                <p className="text-sm text-neutral-600">Complete your daily coding goal</p>
              </div>
            </div>
            <Link href="/problem/1">
              <Button className="bg-primary-600 hover:bg-primary-700">
                Start Challenge
              </Button>
            </Link>
          </div>
          
          <Link href="/problem/1">
            <div className="bg-neutral-50 rounded-lg p-4 hover:bg-neutral-100 transition-colors cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-neutral-900">Two Sum</h4>
                <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">Easy</span>
              </div>
              <p className="text-sm text-neutral-600 mb-3">
                Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
              </p>
              <div className="flex items-center space-x-4 text-xs text-neutral-500">
                <span>🎯 Array, Hash Table</span>
                <span>⏱️ ~15 min</span>
                <span>✅ 49.1% acceptance</span>
              </div>
            </div>
          </Link>
        </CardContent>
      </Card>

      {/* Stats & Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <GoalProgress 
          goals={goals} 
          onEdit={() => setIsGoalsModalOpen(true)}
          weeklyGoalSummary={userGoals}
        />
        <UserAvatar 
          name={user?.username || "Guest"}
          level={user?.level || 1}
          xp={10}
          xpRequired={100}
          streak={user?.streak || 0}
          avatarUrl={user?.avatar || "/src/avatars/fox2.png"}
        />
      </div>

      {/* Recommended Problems and Recent Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Recommended Problems */}
        <Card className="bg-white rounded-xl shadow-sm">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Recommended for You</h3>
            
            <div className="space-y-4">
              {recommendedProblems.map((problem) => (
                <Link key={problem.id} href={`/problem/${problem.id}`}>
                  <div className="border border-neutral-200 rounded-lg p-4 hover:border-primary-200 hover:bg-neutral-50 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-neutral-900">{problem.title}</h4>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        problem.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                        problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {problem.difficulty}
                      </span>
                    </div>
                    
                    <p className="text-sm text-neutral-600 mb-3">{problem.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {problem.tags.map((tag) => (
                          <span key={tag} className="px-2 py-1 text-xs bg-neutral-100 text-neutral-600 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="text-xs text-neutral-500">{problem.acceptance}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Achievements */}
        <Card className="bg-white rounded-xl shadow-sm">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Recent Achievements</h3>
            
            <div className="flex justify-center gap-4 mb-4">
              <Badge badge={badges[0]} size="sm" />
              <Badge badge={badges[1]} size="sm" />
            </div>

            <div className="mb-4 p-3 bg-primary-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-primary-900">Your Current Points</span>
                <span className="text-lg font-bold text-primary-600">124</span>
              </div>
            </div>

            {/* Points & Badges Guide */}
            <div className="mt-6 p-4 bg-neutral-50 rounded-lg">
              <h4 className="text-sm font-semibold text-neutral-900 mb-3">How to Earn Points & Badges</h4>
              <div className="space-y-2 text-xs text-neutral-600">
                <div className="flex justify-between">
                  <span>Daily check-in</span>
                  <span className="font-medium text-primary-600">+5 pts</span>
                </div>
                <div className="flex justify-between">
                  <span>Solve Easy problem</span>
                  <span className="font-medium text-green-600">+15 pts</span>
                </div>
                <div className="flex justify-between">
                  <span>Solve Medium problem</span>
                  <span className="font-medium text-yellow-600">+25 pts</span>
                </div>
                <div className="flex justify-between">
                  <span>Solve Hard problem</span>
                  <span className="font-medium text-red-600">+40 pts</span>
                </div>
                <div className="flex justify-between">
                  <span>Discuss with friends</span>
                  <span className="font-medium text-blue-600">+10 pts</span>
                </div>
                <div className="flex justify-between">
                  <span>Help others (comments)</span>
                  <span className="font-medium text-purple-600">+8 pts</span>
                </div>
                <div className="flex justify-between">
                  <span>Weekly goal completion</span>
                  <span className="font-medium text-orange-600">+50 pts</span>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-neutral-200">
                <p className="text-xs text-neutral-500">
                  🏆 Earn badges by reaching milestones: 5-day streaks, solving 10+ problems of each difficulty, and more!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Friend Activity */}
      <Card className="bg-white rounded-xl shadow-sm">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">Friend Activity</h3>
          
          <div className="space-y-4">
            {friendActivity.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3">
                <img 
                  src={activity.avatar.startsWith('/') || activity.avatar.includes('blob:') ? activity.avatar : `https://images.unsplash.com/photo-${activity.avatar}?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&h=40`}
                  alt={activity.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-medium">{activity.name}</span>
                    <span className="text-neutral-600"> {activity.action} </span>
                    <span className="font-medium">{activity.problem}</span>
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`px-2 py-0.5 text-xs rounded ${
                      activity.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                      activity.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {activity.difficulty}
                    </span>
                    <span className="text-xs text-neutral-500">{activity.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Goals Modal */}
      <GoalsModal
        isOpen={isGoalsModalOpen}
        onClose={() => setIsGoalsModalOpen(false)}
        onSave={handleGoalsUpdate}
        currentGoals={userGoals}
      />
    </div>
  );
}
