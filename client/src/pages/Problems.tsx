import { useState } from "react";
import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, Circle, XCircle, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Problem {
  id: string;
  number: number;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  topics: string[];
  acceptance: string;
  status: "Solved" | "Attempted" | "Unsolved";
}

export default function Problems() {
  const [searchQuery, setSearchQuery] = useState("");
  const [difficulty, setDifficulty] = useState("all");
  const [topic, setTopic] = useState("all");
  const [status, setStatus] = useState("all");
  
  // Mock problems data
  const problems: Problem[] = [
    {
      id: "1",
      number: 1,
      title: "Two Sum",
      difficulty: "Easy",
      topics: ["Array", "Hash Table"],
      acceptance: "48.2%",
      status: "Solved"
    },
    {
      id: "2",
      number: 2,
      title: "Add Two Numbers",
      difficulty: "Medium",
      topics: ["Linked List", "Math"],
      acceptance: "36.9%",
      status: "Unsolved"
    },
    {
      id: "3",
      number: 3,
      title: "Longest Substring Without Repeating Characters",
      difficulty: "Medium",
      topics: ["String", "Sliding Window", "Hash Table"],
      acceptance: "32.5%",
      status: "Attempted"
    },
    {
      id: "4",
      number: 4,
      title: "Median of Two Sorted Arrays",
      difficulty: "Hard",
      topics: ["Array", "Binary Search", "Divide and Conquer"],
      acceptance: "32.1%",
      status: "Unsolved"
    },
    {
      id: "5",
      number: 5,
      title: "Longest Palindromic Substring",
      difficulty: "Medium",
      topics: ["String", "Dynamic Programming"],
      acceptance: "31.4%",
      status: "Unsolved"
    }
  ];
  
  const filteredProblems = problems.filter(problem => {
    if (searchQuery && !problem.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (difficulty !== "all" && problem.difficulty.toLowerCase() !== difficulty) {
      return false;
    }
    if (topic !== "all" && !problem.topics.some(t => t.toLowerCase() === topic)) {
      return false;
    }
    if (status !== "all" && problem.status.toLowerCase() !== status) {
      return false;
    }
    return true;
  });
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-success";
      case "Medium":
        return "bg-yellow-100 text-warning";
      case "Hard":
        return "bg-red-100 text-error";
      default:
        return "bg-neutral-100 text-neutral-700";
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Solved":
        return <CheckCircle className="h-5 w-5 text-success" />;
      case "Attempted":
        return <Loader2 className="h-5 w-5 text-warning" />;
      case "Unsolved":
        return <Circle className="h-5 w-5 text-neutral-300" />;
      default:
        return null;
    }
  };

  return (
    <div className="px-4 py-6 lg:px-8 lg:py-8">
      <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-0">Problems</h1>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search problems..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>
          
          <div className="flex gap-2">
            <Select value={difficulty} onValueChange={setDifficulty}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Difficulty</SelectItem>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={topic} onValueChange={setTopic}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Topics" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Topics</SelectItem>
                <SelectItem value="array">Arrays</SelectItem>
                <SelectItem value="string">Strings</SelectItem>
                <SelectItem value="linked list">Linked Lists</SelectItem>
                <SelectItem value="dynamic programming">Dynamic Programming</SelectItem>
                <SelectItem value="binary search">Binary Search</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="solved">Solved</SelectItem>
                <SelectItem value="attempted">Attempted</SelectItem>
                <SelectItem value="unsolved">Unsolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      <Card className="bg-white rounded-xl shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-200">
                <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">#</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">Difficulty</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">Topics</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">Acceptance</th>
              </tr>
            </thead>
            <tbody>
              {filteredProblems.map((problem) => (
                <tr 
                  key={problem.id} 
                  className="border-b border-neutral-200 hover:bg-neutral-50 cursor-pointer"
                  onClick={() => null}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusIcon(problem.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">
                    {problem.number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link href={`/problem/${problem.id}`}>
                      <a className="text-primary hover:underline font-medium">
                        {problem.title}
                      </a>
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={cn(
                      "px-2 py-1 text-xs font-medium rounded-full",
                      getDifficultyColor(problem.difficulty)
                    )}>
                      {problem.difficulty}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {problem.topics.map((topic, index) => (
                        <span 
                          key={index}
                          className="px-2 py-0.5 text-xs bg-primary-50 text-primary-700 rounded-full"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                    {problem.acceptance}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-3 flex items-center justify-between border-t border-neutral-200">
          <Button variant="outline" size="sm" disabled>
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          <div className="flex items-center">
            <Button variant="outline" size="sm" className="w-8 h-8 p-0 rounded-full bg-primary text-white font-medium border-primary">
              1
            </Button>
            <Button variant="outline" size="sm" className="w-8 h-8 p-0 rounded-full mx-1">
              2
            </Button>
            <Button variant="outline" size="sm" className="w-8 h-8 p-0 rounded-full">
              3
            </Button>
            <span className="mx-2">...</span>
            <Button variant="outline" size="sm" className="w-8 h-8 p-0 rounded-full">
              10
            </Button>
          </div>
          <Button variant="outline" size="sm">
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
