import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import Streak from "@/components/Streak";
import GoalProgress from "@/components/GoalProgress";
import UserAvatar from "@/components/UserAvatar";
import Badge from "@/components/Badge";
import { Calendar, Flag, Code, CheckCircle, TrendingUp, Medal } from "lucide-react";

export default function Dashboard() {
  const lastTwoWeeks = [
    true, true, true, true, true, true, true,
    true, true, true, true, true, false, false
  ];
  
  const goals = [
    {
      id: "1",
      title: "Daily Problems",
      current: 2,
      target: 3,
      completed: 0
    },
    {
      id: "2",
      title: "Weekly Medium Problems",
      current: 4,
      target: 5,
      completed: 4
    },
    {
      id: "3",
      title: "Weekly Hard Problems",
      current: 1,
      target: 2,
      completed: 0
    }
  ];
  
  const badges = [
    {
      id: "1",
      title: "5-day Streak",
      icon: <Calendar className="h-5 w-5" />,
      color: "warning",
      unlocked: true,
    },
    {
      id: "2",
      title: "Easy x10",
      icon: <CheckCircle className="h-5 w-5" />,
      color: "success",
      unlocked: true,
    },
    {
      id: "3",
      title: "Array Pro",
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
      title: "Locked",
      icon: <CheckCircle className="h-5 w-5" />,
      color: "neutral-400",
      unlocked: false,
    }
  ];

  return (
    <div className="px-4 py-6 lg:px-8 lg:py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">Welcome to DuoLeetcode!</h2>
        <p className="text-neutral-600">Your personal coding practice companion.</p>
      </div>
      
      {/* Get Started Guide */}
      <Card className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 mb-8">
        <CardContent className="p-0">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">Get Started</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center p-4 rounded-lg bg-neutral-50">
              <div className="w-12 h-12 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mb-3">
                <User className="h-5 w-5" />
              </div>
              <h4 className="font-medium text-neutral-900 mb-2">Create Account</h4>
              <p className="text-sm text-neutral-600">Sign up and choose your coding companion avatar.</p>
              <Button className="mt-4">
                Create Account
              </Button>
            </div>
            
            <div className="flex flex-col items-center text-center p-4 rounded-lg bg-neutral-50">
              <div className="w-12 h-12 rounded-full bg-secondary-100 text-secondary-600 flex items-center justify-center mb-3">
                <Flag className="h-5 w-5" />
              </div>
              <h4 className="font-medium text-neutral-900 mb-2">Set Goals</h4>
              <p className="text-sm text-neutral-600">Define your weekly coding practice goals to stay motivated.</p>
              <Button variant="secondary" className="mt-4">
                Set Goals
              </Button>
            </div>
            
            <div className="flex flex-col items-center text-center p-4 rounded-lg bg-neutral-50">
              <div className="w-12 h-12 rounded-full bg-success-100 text-success flex items-center justify-center mb-3">
                <Code className="h-5 w-5" />
              </div>
              <h4 className="font-medium text-neutral-900 mb-2">Solve Problems</h4>
              <p className="text-sm text-neutral-600">Start solving problems and track your progress.</p>
              <Button 
                variant="success" 
                asChild 
                className="mt-4 bg-success hover:bg-success/90"
              >
                <Link href="/problems">
                  Browse Problems
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <Streak currentStreak={12} lastTwoWeeks={lastTwoWeeks} />
        <GoalProgress goals={goals} onEdit={() => {}} />
        <UserAvatar 
          name="CodeMaster"
          level={3}
          xp={840}
          xpRequired={1000}
          streak={7}
          avatarUrl="/src/avatars/fox2.png"
          onCustomize={() => {}}
        />
      </div>
      
      {/* Recommended Problems and Friend Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recommended Problems */}
        <div className="lg:col-span-2">
          <Card className="bg-white rounded-xl shadow-sm border border-neutral-200">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-neutral-900">Recommended Problems</h3>
                <Button variant="link" className="text-primary">View More</Button>
              </div>
              
              <div className="space-y-3">
                <div className="border border-neutral-200 rounded-lg p-4 hover:border-primary hover:shadow-sm transition-all">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Two Sum</h4>
                    <span className="px-2 py-1 bg-green-100 text-success text-xs rounded-full">Easy</span>
                  </div>
                  <p className="text-sm text-neutral-600 mb-3">Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.</p>
                  <div className="flex items-center text-xs text-neutral-500">
                    <span className="flex items-center mr-3"><CheckCircle className="h-3 w-3 text-success mr-1" /> 85% Acceptance</span>
                    <span className="flex items-center"><Code className="h-3 w-3 mr-1" /> Arrays</span>
                  </div>
                </div>
                
                <div className="border border-neutral-200 rounded-lg p-4 hover:border-primary hover:shadow-sm transition-all">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Merge Two Sorted Lists</h4>
                    <span className="px-2 py-1 bg-green-100 text-success text-xs rounded-full">Easy</span>
                  </div>
                  <p className="text-sm text-neutral-600 mb-3">Merge two sorted linked lists and return it as a sorted list.</p>
                  <div className="flex items-center text-xs text-neutral-500">
                    <span className="flex items-center mr-3"><CheckCircle className="h-3 w-3 text-success mr-1" /> 79% Acceptance</span>
                    <span className="flex items-center"><Code className="h-3 w-3 mr-1" /> Linked List</span>
                  </div>
                </div>
                
                <div className="border border-neutral-200 rounded-lg p-4 hover:border-primary hover:shadow-sm transition-all">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Valid Parentheses</h4>
                    <span className="px-2 py-1 bg-green-100 text-success text-xs rounded-full">Easy</span>
                  </div>
                  <p className="text-sm text-neutral-600 mb-3">Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.</p>
                  <div className="flex items-center text-xs text-neutral-500">
                    <span className="flex items-center mr-3"><CheckCircle className="h-3 w-3 text-success mr-1" /> 80% Acceptance</span>
                    <span className="flex items-center"><Code className="h-3 w-3 mr-1" /> Stack</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Recent Achievements */}
        <div>
          <Card className="bg-white rounded-xl shadow-sm border border-neutral-200">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-neutral-900">Achievements</h3>
                <Button variant="link" className="text-primary">View All</Button>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                {badges.map((badge) => (
                  <Badge key={badge.id} badge={badge} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
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
