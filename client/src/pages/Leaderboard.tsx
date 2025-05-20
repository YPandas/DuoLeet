import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Crown, Medal, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface LeaderboardUser {
  id: number;
  username: string;
  avatar: string;
  level: number;
  streak: number;
  problemsSolved?: number;
  points?: number;
}

interface LeaderboardProps {
  type: "global" | "friends";
  users: LeaderboardUser[];
}

const PodiumUser = ({ 
  position, 
  user 
}: { 
  position: number; 
  user: LeaderboardUser 
}) => {
  const iconMap = {
    1: <Crown className="absolute -top-3 -right-3 w-10 h-10 text-yellow-500" />,
    2: <Medal className="absolute -top-2 -right-2 w-8 h-8 text-neutral-400" />,
    3: <Medal className="absolute -top-2 -right-2 w-8 h-8 text-amber-600" />
  };

  const heightMap = {
    1: "h-36",
    2: "h-28",
    3: "h-24"
  };

  const colorMap = {
    1: "bg-yellow-400",
    2: "bg-neutral-200",
    3: "bg-amber-200"
  };

  const sizeMap = {
    1: "w-20 h-20",
    2: "w-16 h-16",
    3: "w-16 h-16"
  };

  const marginMap = {
    1: "mx-4",
    2: "mx-4",
    3: "mx-4"
  };

  return (
    <div className={`flex flex-col items-center ${marginMap[position as keyof typeof marginMap]}`}>
      <div className="relative">
        <img 
          src={`https://images.unsplash.com/photo-${user.avatar}?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150`}
          alt={`${position} place avatar`} 
          className={`${sizeMap[position as keyof typeof sizeMap]} rounded-full object-cover border-4 border-primary-100 mb-2`} 
        />
        {iconMap[position as keyof typeof iconMap]}
        <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center font-bold text-lg">
          {position}
        </div>
      </div>
      <div className="mt-4 mb-2 text-center">
        <h3 className="font-medium">{user.username}</h3>
        <p className="text-sm text-neutral-600">{user.problemsSolved || (position * 100)} points</p>
        <p className="text-xs text-neutral-500">{user.streak}-day streak 🔥</p>
      </div>
      <div className={`${heightMap[position as keyof typeof heightMap]} w-20 ${colorMap[position as keyof typeof colorMap]} rounded-t-lg flex items-end justify-center`}>
        <span className={`${position === 1 ? 'text-white' : 'text-neutral-800'} font-bold mb-2`}>{position === 1 ? '1st' : position === 2 ? '2nd' : '3rd'}</span>
      </div>
    </div>
  );
};

const LeaderboardTable = ({ users }: { users: LeaderboardUser[] }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-neutral-200">
            <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">Rank</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">User</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">Problems Solved</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">Streak</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">Points</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">Badges</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            // Only show users after the top 3
            if (index < 3) return null;
            
            const rank = index + 1;
            
            return (
              <tr 
                key={user.id} 
                className={cn(
                  "border-b border-neutral-200 hover:bg-neutral-50",
                  rank === 4 && "bg-yellow-50",
                  rank === 5 && "bg-orange-50"
                )}
              >
                <td className="px-6 py-4 text-sm font-medium">{rank}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-neutral-300 overflow-hidden mr-3">
                      <img 
                        src={`https://images.unsplash.com/photo-${user.avatar}?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100`} 
                        alt="User avatar" 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <span className="font-medium">{user.username}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm">{user.problemsSolved || rank * 5 - 10}</td>
                <td className="px-6 py-4 text-sm">{user.streak} days 🔥</td>
                <td className="px-6 py-4 font-medium">{user.points || rank * 100 - 200}</td>
                <td className="px-6 py-4">
                  <div className="flex space-x-1">
                    <span className="w-6 h-6 rounded-full bg-success flex items-center justify-center text-white text-xs" title="Array Master">A</span>
                    <span className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white text-xs" title="5-day Streak">5</span>
                    {rank <= 5 && (
                      <span className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-white text-xs" title="Early Bird">E</span>
                    )}
                    {rank <= 4 && (
                      <span className="w-6 h-6 rounded-full bg-neutral-400 flex items-center justify-center text-white text-xs" title="More badges">+2</span>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const LeaderboardSection = ({ type, users }: LeaderboardProps) => {
  // Get top 3 users for podium
  const topUsers = users.slice(0, 3);

  // Create placeholder users if needed
  while (topUsers.length < 3) {
    topUsers.push({
      id: -topUsers.length,
      username: "No User",
      avatar: "placeholder",
      level: 1,
      streak: 0
    });
  }

  return (
    <Card className="bg-white rounded-xl shadow-sm">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold text-center mb-8">
          {type === "global" ? "Weekly Top Performers" : "Friends Leaderboard"}
        </h2>
        
        {/* Top 3 Podium */}
        <div className="flex flex-col md:flex-row justify-center items-end text-center gap-4 mb-8">
          {/* 2nd Place */}
          <div className="order-2 md:order-1">
            <PodiumUser position={2} user={topUsers[1]} />
          </div>
          
          {/* 1st Place */}
          <div className="order-1 md:order-2">
            <PodiumUser position={1} user={topUsers[0]} />
          </div>
          
          {/* 3rd Place */}
          <div className="order-3">
            <PodiumUser position={3} user={topUsers[2]} />
          </div>
        </div>
        
        {/* Button to switch views */}
        <div className="flex justify-center">
          <Button variant="link" className="text-primary hover:underline text-sm px-4 py-2 flex items-center">
            <TrendingUp className="h-4 w-4 mr-2" /> View All-Time Leaderboard
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default function Leaderboard() {
  const [leaderboardType, setLeaderboardType] = useState<"global" | "friends">("global");
  const [timeframe, setTimeframe] = useState("week");
  const [sortBy, setSortBy] = useState("problems");
  
  // Mock data for the leaderboard
  const mockUsers: LeaderboardUser[] = [
    {
      id: 1,
      username: "ByteMaster",
      avatar: "1500479694472-551d1fb6258d",
      level: 10,
      streak: 12,
      problemsSolved: 312,
      points: 1580
    },
    {
      id: 2,
      username: "CodeOwl",
      avatar: "1618005182384-a83a8bd57fbe",
      level: 8,
      streak: 9,
      problemsSolved: 295,
      points: 1240
    },
    {
      id: 3,
      username: "TurtleCoder",
      avatar: "1518467166778-b88f373ffec7",
      level: 7,
      streak: 5,
      problemsSolved: 278,
      points: 980
    },
    {
      id: 4,
      username: "SwiftCoder",
      avatar: "1530126483408-aa533e55bdb2",
      level: 8,
      streak: 21,
      problemsSolved: 245,
      points: 5840
    },
    {
      id: 5,
      username: "PandaCoder",
      avatar: "1541364983171-a8ba01e95cfc",
      level: 7,
      streak: 12,
      problemsSolved: 231,
      points: 4920
    },
    {
      id: 6,
      username: "JavaMaster",
      avatar: "1554151228-14d9def656e4",
      level: 6,
      streak: 7,
      problemsSolved: 210,
      points: 4200
    },
    {
      id: 7,
      username: "PythonNinja",
      avatar: "1506277886164-e25aa3f4ef7f",
      level: 5,
      streak: 3,
      problemsSolved: 180,
      points: 3600
    },
    {
      id: 42,
      username: "CodeMaster",
      avatar: "1500479694472-551d1fb6258d",
      level: 3,
      streak: 7,
      problemsSolved: 42,
      points: 1240
    }
  ];
  
  // In a real app, this would fetch from the API
  const { data: leaderboardData } = useQuery({
    queryKey: [`/api/leaderboard/${leaderboardType}`],
    queryFn: () => Promise.resolve(mockUsers),
    enabled: false // Disable actual API call for demo
  });
  
  // Use mock data
  const users = leaderboardData || mockUsers;

  // Extract current user for highlighting (user with id 42)
  const currentUser = users.find(user => user.id === 42);

  return (
    <div className="px-4 py-6 lg:px-8 lg:py-8">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold">Leaderboard</h1>
        <div className="flex space-x-2">
          <Button 
            variant={leaderboardType === "friends" ? "default" : "outline"}
            onClick={() => setLeaderboardType("friends")}
          >
            Friends
          </Button>
          <Button 
            variant={leaderboardType === "global" ? "default" : "outline"}
            onClick={() => setLeaderboardType("global")}
          >
            Global
          </Button>
        </div>
      </div>

      {/* Top 3 Podium */}
      <LeaderboardSection type={leaderboardType} users={users} />

      {/* Leaderboard Table */}
      <Card className="bg-white rounded-xl shadow-sm mt-8">
        <div className="flex flex-col sm:flex-row justify-between items-center p-4 border-b border-neutral-200">
          <h2 className="text-lg font-semibold mb-2 sm:mb-0">Leaderboard Rankings</h2>
          
          <div className="flex gap-2">
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="This Week" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="alltime">All Time</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="By Problems Solved" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="problems">By Problems Solved</SelectItem>
                <SelectItem value="streak">By Streak</SelectItem>
                <SelectItem value="points">By Points</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <LeaderboardTable users={users} />
        
        {/* Add the current user directly to the table footer */}
        {currentUser && (
          <div className="p-4 border-t border-neutral-200 bg-primary-50">
            <div className="flex items-center">
              <span className="w-10 text-sm font-medium text-primary-700 px-6 py-4">42</span>
              <div className="flex items-center px-6 py-4">
                <div className="w-8 h-8 rounded-full bg-neutral-300 overflow-hidden mr-3">
                  <img 
                    src={`https://images.unsplash.com/photo-${currentUser.avatar}?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100`}
                    alt="User avatar" 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <span className="font-medium text-primary-700">{currentUser.username} <span className="text-primary-500">(You)</span></span>
              </div>
              <span className="px-6 py-4 text-sm text-primary-700">{currentUser.problemsSolved}</span>
              <span className="px-6 py-4 text-sm text-primary-700">{currentUser.streak} days 🔥</span>
              <span className="px-6 py-4 text-sm font-medium text-primary-700">{currentUser.points}</span>
              <div className="px-6 py-4">
                <div className="flex space-x-1">
                  <span className="w-6 h-6 rounded-full bg-success flex items-center justify-center text-white text-xs" title="Array Beginner">A</span>
                  <span className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white text-xs" title="5-day Streak">5</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex justify-between items-center px-6 py-4">
          <span className="text-sm text-neutral-600">
            Showing {leaderboardType === "global" ? "8" : "4"} of {leaderboardType === "global" ? "250" : "10"} users
          </span>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
