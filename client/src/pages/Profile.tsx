import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link } from "wouter";
import { 
  Edit, 
  Share, 
  Flame, 
  Code, 
  Calendar,
  CheckCircle,
  TrendingUp,
  Clock,
  Target
} from "lucide-react";
import Badge from "@/components/Badge";
import StreakIcon from "@/components/StreakIcon";
import EasyX10Icon from "@/components/EasyX10Icon";
import { useAuth } from "@/contexts/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="px-4 py-6 lg:px-8 lg:py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">Please sign in to view your profile</h2>
        </div>
      </div>
    );
  }

  const stats = {
    problemsSolved: 47,
    totalProblems: 2000,
    easyProblems: 25,
    mediumProblems: 18,
    hardProblems: 4,
    acceptanceRate: 78.5,
    averageTime: "50 min",
    longestStreak: 12,
    currentStreak: user.streak,
    totalSubmissions: 89,
    correctSubmissions: 47
  };

  const recentActivity = [
    { problem: "Two Sum", difficulty: "Easy", status: "Solved", time: "2 hours ago" },
    { problem: "Valid Parentheses", difficulty: "Easy", status: "Solved", time: "1 day ago" },
    { problem: "Merge Two Sorted Lists", difficulty: "Easy", status: "Attempted", time: "2 days ago" },
    { problem: "Add Two Numbers", difficulty: "Medium", status: "Solved", time: "3 days ago" },
  ];

  const badges = [
    { 
      id: "1",
      name: "5-day Streak", 
      title: "5-day Streak",
      color: "red-500", 
      unlocked: true,
      icon: <Flame className="h-4 w-4" />
    },
    { 
      id: "2",
      name: "Easy x10", 
      title: "Easy x10",
      color: "green-500", 
      unlocked: true,
      icon: <CheckCircle className="h-4 w-4" />
    },
    { 
      id: "3",
      name: "Array Master", 
      title: "Array Master",
      color: "blue-500", 
      unlocked: true,
      icon: <Code className="h-4 w-4" />
    },
    { 
      id: "4",
      name: "Early Bird", 
      title: "Early Bird",
      color: "purple-500", 
      unlocked: false,
      icon: <Calendar className="h-4 w-4" />
    },
    { 
      id: "5",
      name: "Speed Demon", 
      title: "Speed Demon",
      color: "red-500", 
      unlocked: false,
      icon: <TrendingUp className="h-4 w-4" />
    },
    { 
      id: "6",
      name: "Consistency King", 
      title: "Consistency King",
      color: "indigo-500", 
      unlocked: false,
      icon: <Target className="h-4 w-4" />
    },
  ];

  const avatarProgress = {
    level: 1,
    currentXP: 10,
    nextLevelXP: 100,
    accessories: [
      { name: "Coding Glasses", unlocked: true, icon: "👓" },
      { name: "Dev Hat", unlocked: true, icon: "🎩" },
      { name: "Lucky Scarf", unlocked: false, icon: "🧣" },
      { name: "Power Gloves", unlocked: false, icon: "🧤" },
      { name: "Wizard Cape", unlocked: false, icon: "🦸" },
      { name: "Crown of Code", unlocked: false, icon: "👑" }
    ]
  };

  return (
    <div className="px-4 py-6 lg:px-8 lg:py-8">
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="relative">
            <img 
              src={user.avatar} 
              alt="User avatar" 
              className="w-32 h-32 md:w-30 md:h-30 rounded-full border-4 border-primary-100 object-contain bg-white object-center" 
            />
            <div className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-success-500 border-4 border-red-400 flex items-center justify-center">
              <span className="text-red-400 text-xs font-bold">{user.level}</span>
            </div>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">{user.username}</h1>
            <p className="text-neutral-600 mb-4">Level {user.level} Coder • {user.streak} day streak 🔥</p>
            
            <div className="flex flex-wrap gap-2 mb-4 justify-center md:justify-start">
              {badges.filter(badge => badge.unlocked).map((badge, index) => (
                <Badge key={index} className={badge.color}>
                  {badge.name}
                </Badge>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <Button>
                <Edit className="mr-2 h-4 w-4" /> Edit Profile
              </Button>
              
              <Button variant="outline">
                <Share className="mr-2 h-4 w-4" /> Share Profile
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Avatar Progress */}
        <Card className="bg-white rounded-xl shadow-sm">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Avatar Progress</h3>
            
            <div className="text-center mb-6">
              <div className="relative inline-block">
                <img 
                  src={user.avatar} 
                  alt="User avatar" 
                  className="w-24 h-24 rounded-full border-4 border-primary-100 object-contain bg-white object-center mx-auto" 
                />
                <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-primary-500 border-4 border-red-400 flex items-center justify-center">
                  <span className="text-red-400 text-xs font-bold">{avatarProgress.level}</span>
                </div>
              </div>
              
              <div className="mt-4">
                <h4 className="font-semibold text-neutral-900">Level {avatarProgress.level}</h4>
                <p className="text-sm text-neutral-600 mb-3">
                  {avatarProgress.currentXP}/{avatarProgress.nextLevelXP} XP to Level {avatarProgress.level + 1}
                </p>
                <Progress 
                  value={(avatarProgress.currentXP / avatarProgress.nextLevelXP) * 100} 
                  className="h-3"
                />
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-neutral-900 mb-3">Accessories</h4>
              <div className="grid grid-cols-2 gap-2">
                {avatarProgress.accessories.map((accessory, index) => (
                  <div 
                    key={index}
                    className={`p-3 rounded-lg border text-center ${
                      accessory.unlocked 
                        ? 'border-green-200 bg-green-50' 
                        : 'border-neutral-200 bg-neutral-50 opacity-60'
                    }`}
                  >
                    <div className="text-lg mb-1">{accessory.icon}</div>
                    <div className="text-xs font-medium text-neutral-700">{accessory.name}</div>
                    <div className={`text-xs mt-1 ${
                      accessory.unlocked ? 'text-green-600' : 'text-neutral-500'
                    }`}>
                      {accessory.unlocked ? 'Unlocked' : 'Locked'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Summary */}
        <Card className="bg-white rounded-xl shadow-sm">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Coding Stats</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between mb-1">
                <span className="text-sm text-neutral-600">Problems Solved</span>
                <span className="text-sm font-medium">{stats.problemsSolved}/{stats.totalProblems}</span>
              </div>
              <Progress value={(stats.problemsSolved / stats.totalProblems) * 100} className="h-2" />
              
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600">{stats.easyProblems}</div>
                  <div className="text-xs text-neutral-500">Easy</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-yellow-600">{stats.mediumProblems}</div>
                  <div className="text-xs text-neutral-500">Medium</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-red-600">{stats.hardProblems}</div>
                  <div className="text-xs text-neutral-500">Hard</div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-neutral-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-neutral-600 flex items-center">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Acceptance Rate
                  </span>
                  <span className="text-sm font-medium">{stats.acceptanceRate}%</span>
                </div>
                
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-neutral-600 flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    Avg. Time
                  </span>
                  <span className="text-sm font-medium">{stats.averageTime}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-neutral-600 flex items-center">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    Longest Streak
                  </span>
                  <span className="text-sm font-medium">{stats.longestStreak} days</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="bg-white rounded-xl shadow-sm">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Achievements</h3>
            
            <div className="grid grid-cols-2 gap-3">
              {badges.map((badge) => (
                <Badge key={badge.id} badge={badge} size="md" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Activity - moved below the 3-column grid */}
      <Card className="bg-white rounded-xl shadow-sm mt-8">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">Recent Activity</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex flex-col p-3 rounded-lg bg-neutral-50">
                <div className="font-medium text-sm mb-2">{activity.problem}</div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${
                      activity.difficulty === 'Easy' ? 'border-green-200 text-green-700' :
                      activity.difficulty === 'Medium' ? 'border-yellow-200 text-yellow-700' :
                      'border-red-200 text-red-700'
                    }`}
                  >
                    {activity.difficulty}
                  </Badge>
                  <span className={`text-xs ${
                    activity.status === 'Solved' ? 'text-green-600' : 'text-yellow-600'
                  }`}>
                    {activity.status}
                  </span>
                </div>
                <div className="text-xs text-neutral-500 mt-auto">{activity.time}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
