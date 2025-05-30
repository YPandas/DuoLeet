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
      name: "Alice Chen",
      avatar: fox3Avatar,
      action: "solved",
      problem: "Binary Tree Inorder Traversal",
      difficulty: "Easy",
      time: "2 hours ago"
    },
    {
      id: 2,
      name: "Bob Wilson",
      avatar: wolf1Avatar,
      action: "attempted",
      problem: "Merge k Sorted Lists",
      difficulty: "Hard",
      time: "4 hours ago"
    },
    {
      id: 3,
      name: "Carol Davis",
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
            <h3 className="text-lg font-semibold text-neutral-900">Daily Challenge</h3>
            <span className="px-3 py-1 text-xs bg-secondary-100 text-secondary-700 rounded-full">Medium</span>
          </div>
          
          <h4 className="text-xl font-bold mb-2">Longest Substring Without Repeating Characters</h4>
          <p className="text-neutral-600 mb-4">Given a string s, find the length of the longest substring without repeating characters.</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-2 py-1 text-xs bg-primary-100 text-primary-700 rounded-full">Strings</span>
            <span className="px-2 py-1 text-xs bg-primary-100 text-primary-700 rounded-full">Hash Table</span>
            <span className="px-2 py-1 text-xs bg-primary-100 text-primary-700 rounded-full">Sliding Window</span>
          </div>
          
          <Button asChild>
            <Link href="/problem/3">
              Solve Challenge
            </Link>
          </Button>
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
      
      {/* Recommended Problems and Friend Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Recommended Problems */}
        <Card className="bg-white rounded-xl shadow-sm">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Recommended for You</h3>
            
            <div className="space-y-4">
              {recommendedProblems.map((problem) => (
                <div key={problem.id} className="border border-neutral-200 rounded-lg p-4 hover:border-primary-200 transition-colors">
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
              ))}
            </div>
          </CardContent>
        </Card>

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
      </div>

      {/* Recent Achievements */}
      <Card className="bg-white rounded-xl shadow-sm">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">Recent Achievements</h3>
          
          <div className="grid grid-cols-3 gap-4">
            {badges.map((badge) => (
              <Badge key={badge.id} badge={badge} size="sm" />
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

// Local component
function User(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
