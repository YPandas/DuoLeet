// client/src/pages/Friends.tsx

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  UserPlus,
  Mail,
  Check,
  X,
  User,
  MessageSquare,
  Award,
  Code,
  Search,
  TrendingUp,
} from "lucide-react";
import fox1Avatar from "/src/avatars/fox1.png";
import fox2Avatar from "/src/avatars/fox2.png";
import fox3Avatar from "/src/avatars/fox3.png";
import wolf1Avatar from "/src/avatars/wolf1.png";
import wolf2Avatar from "/src/avatars/wolf2.png";
import wolf3Avatar from "/src/avatars/wolf3.png";
import giraffe1Avatar from "/src/avatars/giraffe1.png";
import giraffe2Avatar from "/src/avatars/giraffe2.png";
import giraffe3Avatar from "/src/avatars/giraffe3.png";

// -------------- Types --------------

interface UserType {
  id: number;
  username: string;
  avatar: string;
  level: number;
  streak: number;
  stats: {
    problems: number;
    badges: number;
  };
}

interface Friend {
  id: number;
  username: string;
  avatar: string;
  level: number;
  streak: number;
  stats: {
    problems: number;
    badges: number;
  };
}

interface FriendRequest {
  id: number;
  user: UserType;
  createdAt: string;
}

// -------------- Component --------------

export default function Friends() {
  // --- Mock data for existing friends ---
  const mockFriends: Friend[] = [
    {
      id: 1,
      username: "CodeTiger",
      avatar: fox1Avatar,
      level: 10,
      streak: 30,
      stats: {
        problems: 210,
        badges: 25,
      },
    },
    {
      id: 2,
      username: "RapidRabbit",
      avatar: wolf1Avatar,
      level: 6,
      streak: 14,
      stats: {
        problems: 125,
        badges: 15,
      },
    },
    {
      id: 3,
      username: "GiraffeGuru",
      avatar: giraffe1Avatar,
      level: 8,
      streak: 18,
      stats: {
        problems: 180,
        badges: 20,
      },
    },
  ];

  // --- Mock data for friend requests ---
  const mockFriendRequests: FriendRequest[] = [
    {
      id: 1,
      user: {
        id: 4,
        username: "BinaryPanda",
        avatar: fox3Avatar,
        level: 5,
        streak: 7,
        stats: {
          problems: 89,
          badges: 10,
        },
      },
      createdAt: "2023-10-01T12:00:00Z",
    },
    {
      id: 2,
      user: {
        id: 5,
        username: "RapidRabbit",
        avatar: wolf1Avatar,
        level: 6,
        streak: 14,
        stats: {
          problems: 125,
          badges: 15,
        },
      },
      createdAt: "2023-09-09T09:15:00Z",
    },
  ];

  // ---------------------------------------------------------------
  // ↳ **REPLACED** the useQuery stub for fetching incoming requests
  // ---------------------------------------------------------------

  // Previously, we had:
  // const { data: friendRequests } = useQuery({
  //   queryKey: ["/api/user/1/friend-requests"],
  //   queryFn: () => Promise.resolve(mockFriendRequests),
  //   enabled: false, // disabled for demo
  // });

  // Instead, we keep friend-requests in local state so that "Decline" can filter them out instantly:
  const [friendRequestsState, setFriendRequestsState] = useState<FriendRequest[]>(
    mockFriendRequests
  );

  // We still stub out “friends” via useQuery in case that section is used elsewhere:
  const { data: friends } = useQuery({
    queryKey: ["/api/user/1/friends"],
    queryFn: () => Promise.resolve(mockFriends),
    enabled: false, // disabled for demo
  });

  // Filterable list of existing friends:
  const [friendSearch, setFriendSearch] = useState("");
  const filteredFriends = (friends || mockFriends).filter((friend) =>
    !friendSearch || friend.username.toLowerCase().includes(friendSearch.toLowerCase())
  );

  // Form state for “Add Friend by username”:
  const [username, setUsername] = useState("");

  // Form state for “Invite by Email”:
  const [email, setEmail] = useState("");

  // Add state for forum visibility
  const [showForum, setShowForum] = useState(false);

  // -----------------
  // Handlers
  // -----------------

  const handleAddFriend = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Adding friend:", username);
    setUsername("");
  };

  const handleInviteFriend = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Inviting friend:", email);
    setEmail("");
  };

  // When “Accept” is clicked, remove that request from state
  const handleAcceptRequest = (requestId: number) => {
    console.log("Accepting request:", requestId);
    setFriendRequestsState((prev) =>
      prev.filter((r) => r.id !== requestId)
    );
    // (Optionally: You could also push the newly accepted user into your friends list here.)
  };

  // When “Decline” is clicked, remove that request from state
  const handleDeclineRequest = (requestId: number) => {
    console.log("Declining request:", requestId);
    setFriendRequestsState((prev) =>
      prev.filter((r) => r.id !== requestId)
    );
  };

  // Add handler for forum toggle
  const handleToggleForum = () => {
    setShowForum(!showForum);
  };

  return (
    <div className="px-4 py-6 lg:px-8 lg:py-8">
      {/* ===============================
           Search & Invite
         =============================== */}
      <Card className="bg-white rounded-xl shadow-sm border border-neutral-200 mb-8">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">Add Friends</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="friend-username"
                className="block text-sm font-medium text-neutral-700 mb-1"
              >
                Find by Username
              </label>
              <form onSubmit={handleAddFriend} className="flex">
                <Input
                  id="friend-username"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="rounded-r-none"
                />
                <Button type="submit" className="rounded-l-none">
                  Add
                </Button>
              </form>
            </div>

            <div>
              <label
                htmlFor="friend-email"
                className="block text-sm font-medium text-neutral-700 mb-1"
              >
                Invite by Email
              </label>
              <form onSubmit={handleInviteFriend} className="flex">
                <Input
                  id="friend-email"
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-r-none"
                />
                <Button type="submit" className="rounded-l-none">
                  Invite
                </Button>
              </form>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ===============================
           Friend Requests
         =============================== */}
      {friendRequestsState.length > 0 && (
        <Card className="bg-white rounded-xl shadow-sm border border-neutral-200 mb-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">
              Friend Requests ({friendRequestsState.length})
            </h3>

            <div className="space-y-4">
              {friendRequestsState.map((request) => (
                <div
                  key={request.id}
                  className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg"
                >
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                      <img
                        src={request.user.avatar}
                        alt={`${request.user.username} avatar`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-neutral-900">
                        {request.user.username}
                      </div>
                      <div className="text-xs text-neutral-500">
                        Level {request.user.level} •{" "}
                        {request.user.stats?.problems || 0} problems solved
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      onClick={() => handleAcceptRequest(request.id)}
                    >
                      <Check className="h-4 w-4 mr-1" /> Accept
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeclineRequest(request.id)}
                    >
                      <X className="h-4 w-4 mr-1" /> Decline
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* ===============================
           My Friends List
         =============================== */}
      <Card className="bg-white rounded-xl shadow-sm border border-neutral-200">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-neutral-900">
              My Friends
            </h3>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <Input
                placeholder="Search friends"
                value={friendSearch}
                onChange={(e) => setFriendSearch(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFriends.map((friend) => (
              <div
                key={friend.id}
                className="border border-neutral-200 rounded-lg p-4 flex flex-col"
              >
                <div className="flex items-center mb-3">
                  <div className="h-12 w-12 overflow-hidden rounded-full mr-3">
                    <img
                      src={friend.avatar}
                      alt={`${friend.username} avatar`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-neutral-900">
                      {friend.username}
                    </div>
                    <div className="text-xs text-neutral-500">
                      Level {friend.level} • {friend.stats?.problems || 0} problems
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-neutral-500 mb-3">
                  <div>
                    <Code className="inline-block h-3 w-3 mr-1" />{" "}
                    {friend.stats?.problems || 0} problems
                  </div>
                  <div>
                    <Award className="inline-block h-3 w-3 mr-1" />{" "}
                    {friend.stats?.badges || 0} badges
                  </div>
                </div>

                <div className="mt-auto pt-2 border-t border-neutral-100 flex justify-between">
                  <Button variant="outline" size="sm" className="text-xs">
                    <User className="h-3 w-3 mr-1" /> Profile
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs">
                    <MessageSquare className="h-3 w-3 mr-1" /> Message
                  </Button>
                </div>
              </div>
            ))}

            {/* Empty state if no friends */}
            {filteredFriends.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center p-8 text-center">
                <UserPlus className="h-12 w-12 text-neutral-300 mb-2" />
                <h4 className="text-lg font-medium text-neutral-700 mb-1">
                  No Friends Found
                </h4>
                <p className="text-sm text-neutral-500 mb-4">
                  {friendSearch
                    ? `No friends match "${friendSearch}"`
                    : "Add some friends to see them here"}
                </p>
              </div>
            )}
          </div>

          {/* View More Button */}
          <div className="mt-6 text-center">
            <Button variant="outline" onClick={handleToggleForum}>
              {showForum ? "Hide Forum Posts" : "View All Forum Posts"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Forum Section - Only show when showForum is true */}
      {showForum && (
        <Card className="bg-white rounded-xl shadow-sm border border-neutral-200 mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Friend Forum</h3>
            
            <div className="space-y-6">
              {/* Forum Post */}
              <div className="border border-neutral-200 rounded-lg p-4">
                {/* Original Question */}
                <div className="flex items-start space-x-3 mb-4">
                  <div className="h-10 w-10 overflow-hidden">
                    <img
                      src={fox1Avatar}
                      alt="JavaTurtle avatar"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-sm font-medium text-neutral-900">JavaTurtle</span>
                      <span className="text-xs text-neutral-500">2 hours ago</span>
                    </div>
                    <h4 className="text-sm font-semibold text-neutral-900 mb-2">
                      Need help with Two Sum optimization
                    </h4>
                    <p className="text-sm text-neutral-700 mb-3">
                      I solved Two Sum using nested loops but it's O(n²). I heard there's an O(n) solution using hash maps. 
                      Can someone explain the approach? I'm struggling to understand how to track the indices.
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-neutral-500">
                      <button className="flex items-center space-x-1 hover:text-primary-600">
                        <TrendingUp className="h-3 w-3" />
                        <span>2 upvotes</span>
                      </button>
                      <button className="flex items-center space-x-1 hover:text-primary-600">
                        <MessageSquare className="h-3 w-3" />
                        <span>3 replies</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Reply */}
                <div className="ml-8 border-l-2 border-neutral-100 pl-4">
                  <div className="flex items-start space-x-3">
                    <div className="h-8 w-8 overflow-hidden">
                      <img
                        src={wolf2Avatar}
                        alt="PyOwl avatar"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm font-medium text-neutral-900">PyOwl</span>
                        <span className="text-xs text-neutral-500">1 hour ago</span>
                      </div>
                      <p className="text-sm text-neutral-700 mb-3">
                        Great question! The key insight is to use a dictionary to store values you've already seen. 
                        As you iterate through the array, for each number, check if (target - current_number) exists in your dictionary. 
                        If it does, you found your pair! If not, add the current number and its index to the dictionary.
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-neutral-500">
                        <button className="flex items-center space-x-1 hover:text-primary-600">
                          <TrendingUp className="h-3 w-3" />
                          <span>1 upvote</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-primary-600">
                          <MessageSquare className="h-3 w-3" />
                          <span>Reply</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Reply to Reply */}
                <div className="ml-16 border-l-2 border-neutral-100 pl-4 mt-4">
                  <div className="flex items-start space-x-3">
                    <div className="h-8 w-8 overflow-hidden">
                      <img
                        src={fox1Avatar}
                        alt="JavaTurtle avatar"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm font-medium text-neutral-900">JavaTurtle</span>
                        <span className="text-xs text-neutral-500">30 minutes ago</span>
                      </div>
                      <p className="text-sm text-neutral-700 mb-3">
                        That makes so much sense! Thank you @PyOwl 🙏 I just implemented it and got it working. 
                        The time complexity improvement is amazing!
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-neutral-500">
                        <button className="flex items-center space-x-1 hover:text-primary-600">
                          <TrendingUp className="h-3 w-3" />
                          <span>3 upvotes</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Another Forum Post */}
              <div className="border border-neutral-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="h-10 w-10 overflow-hidden">
                    <img
                      src={giraffe1Avatar}
                      alt="JavaScriptCat avatar"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-sm font-medium text-neutral-900">JavaScriptCat</span>
                      <span className="text-xs text-neutral-500">4 hours ago</span>
                    </div>
                    <h4 className="text-sm font-semibold text-neutral-900 mb-2">
                      Daily coding streak tips?
                    </h4>
                    <p className="text-sm text-neutral-700 mb-3">
                      I keep breaking my coding streak after 3-4 days. Any tips on maintaining consistency? 
                      What time of day do you all prefer to solve problems?
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-neutral-500">
                      <button className="flex items-center space-x-1 hover:text-primary-600">
                        <TrendingUp className="h-3 w-3" />
                        <span>2 upvotes</span>
                      </button>
                      <button className="flex items-center space-x-1 hover:text-primary-600">
                        <MessageSquare className="h-3 w-3" />
                        <span>1 reply</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
