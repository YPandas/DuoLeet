import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link } from "wouter";
import { 
  Edit, 
  Share, 
  Flame, 
  Code, 
  Trophy, 
  Mail, 
  Github, 
  MessageSquare, 
  Calendar,
  CheckCircle,
  TrendingUp,
  Medal
} from "lucide-react";
import Badge from "@/components/Badge";
import StreakIcon from "@/components/StreakIcon";
import EasyX10Icon from "@/components/EasyX10Icon";

export default function Profile() {
  const user = {
    id: "1",
    username: "CodeMaster",
    name: "Alex Chen",
    joinDate: "April 2023",
    email: "alex.chen@example.com",
    github: "github.com/alexchen",
    discord: "alexc#1234",
    avatar: "/src/avatars/fox2.png",
    level: 3,
    streak: 7,
    problemsSolved: 42,
    badgesCount: 8,
    xp: 840,
    nextLevelXp: 1000
  };
  
  const difficultyStats = {
    easy: { count: 27, percentage: 60 },
    medium: { count: 14, percentage: 30 },
    hard: { count: 5, percentage: 10 }
  };
  
  const topicStats = [
    { name: "Arrays", solved: 18, total: 50, percentage: 36 },
    { name: "Strings", solved: 12, total: 45, percentage: 27 },
    { name: "Hash Table", solved: 8, total: 30, percentage: 27 }
  ];
  
  const badges = [
    {
      id: "1",
      title: "5-day Streak",
      icon: <StreakIcon className="h-5 w-5" />,
      color: "warning",
      unlocked: true,
    },
    {
      id: "2",
      title: "Easy x10",
      icon: <EasyX10Icon className="h-5 w-5" />,
      color: "success",
      unlocked: true,
    },
    {
      id: "3",
      title: "Array Master",
      icon: <Code className="h-5 w-5" />,
      color: "primary",
      unlocked: true,
    },
    {
      id: "4",
      title: "Early Bird",
      icon: <Calendar className="h-5 w-5" />,
      color: "secondary",
      unlocked: true,
    },
    {
      id: "5",
      title: "Helper",
      icon: <Medal className="h-5 w-5" />,
      color: "accent",
      unlocked: true,
    },
    {
      id: "6",
      title: "30-day Streak",
      icon: <Calendar className="h-5 w-5" />,
      color: "neutral-400",
      unlocked: false,
    }
  ];
  
  const activityHistory = [
    {
      id: "1",
      type: "solved",
      title: "You solved Two Sum",
      time: "Today at 10:45 AM",
      difficulty: "Easy",
      icon: <Code className="h-5 w-5" />,
      color: "primary"
    },
    {
      id: "2",
      type: "solved",
      title: "You solved Valid Parentheses",
      time: "Today at 9:15 AM",
      difficulty: "Easy",
      icon: <Code className="h-5 w-5" />,
      color: "primary"
    },
    {
      id: "3",
      type: "streak",
      title: "10-day streak achieved!",
      time: "Yesterday at 8:30 PM",
      xp: "+100 XP",
      icon: <TrendingUp className="h-5 w-5" />,
      color: "secondary"
    },
    {
      id: "4",
      type: "badge",
      title: "Badge earned: Array Master",
      time: "Yesterday at 6:20 PM",
      xp: "+50 XP",
      icon: <Medal className="h-5 w-5" />,
      color: "accent"
    },
    {
      id: "5",
      type: "goal",
      title: "Daily goal completed: Solve 3 problems",
      time: "Yesterday at 6:00 PM",
      xp: "+30 XP",
      icon: <CheckCircle className="h-5 w-5" />,
      color: "success"
    }
  ];

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
            <h2 className="text-2xl font-bold text-neutral-900">{user.username}</h2>
            <p className="text-neutral-500 mb-4">Joined {user.joinDate}</p>
            
            <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-4">
              <div className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full flex items-center">
                <Flame className="text-secondary-500 mr-2 streak-flame h-4 w-4" />
                <span>{user.streak} day streak</span>
              </div>
              
              <div className="px-3 py-1 bg-neutral-50 text-neutral-700 rounded-full flex items-center">
                <Code className="text-primary-500 mr-2 h-4 w-4" />
                <span>{user.problemsSolved} problems solved</span>
              </div>
              
              <div className="px-3 py-1 bg-neutral-50 text-neutral-700 rounded-full flex items-center">
                <Trophy className="text-secondary-500 mr-2 h-4 w-4" />
                <span>{user.badgesCount} badges</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
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
        {/* Stats Summary */}
        <Card className="bg-white rounded-xl shadow-sm">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Coding Stats</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between mb-1">
                <span className="text-sm text-neutral-600">Problems Solved</span>
                <span className="text-sm font-medium">{user.problemsSolved}/2000</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-neutral-500">Easy</span>
                    <span className="text-xs font-medium text-success">{difficultyStats.easy.count}</span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-1.5 mt-1">
                    <div className="bg-success h-1.5 rounded-full" style={{ width: `${difficultyStats.easy.percentage}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-neutral-500">Medium</span>
                    <span className="text-xs font-medium text-warning">{difficultyStats.medium.count}</span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-1.5 mt-1">
                    <div className="bg-warning h-1.5 rounded-full" style={{ width: `${difficultyStats.medium.percentage}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-neutral-500">Hard</span>
                    <span className="text-xs font-medium text-error">{difficultyStats.hard.count}</span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-1.5 mt-1">
                    <div className="bg-error h-1.5 rounded-full" style={{ width: `${difficultyStats.hard.percentage}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
            
            <hr className="my-4 border-neutral-200" />
            
            <div className="space-y-4">
              <h4 className="font-medium text-neutral-900">Topics Mastered</h4>
              
              <div className="space-y-2">
                {topicStats.map((topic, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-neutral-600">{topic.name}</span>
                      <span className="text-sm font-medium">{topic.solved}/{topic.total}</span>
                    </div>
                    <div className="w-full bg-neutral-200 rounded-full h-2 mt-1">
                      <div className="bg-primary h-2 rounded-full" style={{ width: `${topic.percentage}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Avatar Progression */}
        <Card className="bg-white rounded-xl shadow-sm">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Avatar Progress</h3>
            
            <div className="flex flex-col items-center">
              <img 
                src={user.avatar} 
                alt="User avatar" 
                className="w-40 h-40 rounded-lg object-contain mb-4" 
              />
              
              <div className="w-full bg-neutral-200 rounded-full h-2.5 mb-2">
                <div 
                  className="bg-primary h-2.5 rounded-full" 
                  style={{ width: `${(user.xp / user.nextLevelXp) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-neutral-500 mb-4">
                Level {user.level} ({user.xp}/{user.nextLevelXp} XP to Level {user.level + 1})
              </p>
              
              <div className="grid grid-cols-3 gap-4 w-full">
                <div className="bg-neutral-50 rounded-lg p-2 flex flex-col items-center border border-neutral-200">
                  <div className="w-12 h-12 flex items-center justify-center mb-2">
                    <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>
                  </div>
                  <span className="text-xs text-neutral-700 text-center">Coding Glasses</span>
                  <span className="text-xs text-success">Unlocked</span>
                </div>
                
                <div className="bg-neutral-50 rounded-lg p-2 flex flex-col items-center border border-neutral-200">
                  <div className="w-12 h-12 flex items-center justify-center mb-2">
                    <svg className="w-8 h-8 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                    </svg>
                  </div>
                  <span className="text-xs text-neutral-700 text-center">Dev Hat</span>
                  <span className="text-xs text-success">Unlocked</span>
                </div>
                
                <div className="bg-neutral-50 rounded-lg p-2 flex flex-col items-center border border-neutral-200 opacity-50">
                  <div className="w-12 h-12 flex items-center justify-center mb-2">
                    <svg className="w-8 h-8 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-xs text-neutral-700 text-center">Laptop</span>
                  <span className="text-xs text-neutral-500">Level 5</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Badges & Achievements */}
        <Card className="bg-white rounded-xl shadow-sm">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Badges & Achievements</h3>
            
            <div className="grid grid-cols-3 gap-4">
              {badges.map((badge) => (
                <Badge key={badge.id} badge={badge} />
              ))}
            </div>
            
            <Button variant="outline" className="mt-4 w-full">
              View All Badges
            </Button>
          </CardContent>
        </Card>
      </div>
      
      {/* Activity History */}
      <Card className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 mt-8">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Activity History</h3>
        
        <div className="space-y-4">
          {activityHistory.map((activity) => (
            <div 
              key={activity.id} 
              className={`flex items-start border-l-4 pl-4 py-2 border-${activity.color}`}
            >
              <div className={`bg-${activity.color}-50 p-2 rounded-lg mr-3`}>
                {activity.icon}
              </div>
              <div>
                <p className="font-medium">
                  {activity.type === "solved" ? (
                    <>
                      {activity.title.split("You solved ")[0]}
                      <span className="text-primary">
                        {activity.title.split("You solved ")[1]}
                      </span>
                    </>
                  ) : activity.title}
                </p>
                <p className="text-sm text-neutral-500">
                  {activity.time} • {activity.difficulty || activity.xp}
                </p>
              </div>
            </div>
          ))}
          
          <Button variant="outline" className="w-full">
            Load More Activity
          </Button>
        </div>
      </Card>
    </div>
  );
}
