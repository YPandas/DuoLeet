import { useState } from "react";
import { useParams } from "wouter";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import CodeEditor from "@/components/CodeEditor";
import { Check, Clock, User, Tag, Bookmark, Share, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function Problem() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("description");
  
  // Mock problem data - in a real app, you'd fetch this by ID
  const problem = {
    id: id || "1",
    title: "Two Sum",
    difficulty: "Easy",
    topics: ["Array", "Hash Table"],
    acceptance: "48.2%",
    averageTime: "15 min",
    solvedCount: "2.4M",
    description: `
      Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

      You may assume that each input would have exactly one solution, and you may not use the same element twice.

      You can return the answer in any order.
    `,
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]"
      },
      {
        input: "nums = [3,3], target = 6",
        output: "[0,1]"
      }
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists."
    ],
    followUp: "Can you come up with an algorithm that is less than O(n²) time complexity?",
    solution: `
      The brute force approach is to check all possible pairs of numbers in the array. 
      This has O(n²) time complexity.

      A more efficient solution uses a hash map:
      1. Iterate through the array
      2. For each element, check if (target - current element) exists in the hash map
      3. If it does, return the current index and the stored index
      4. Otherwise, store the current element and its index in the hash map
      
      This solution has O(n) time complexity.
    `,
    hints: [
      "Try using a hash map to store values you've seen."
    ]
  };
  
  const initialCode = `def twoSum(nums, target):
    # Your solution here
    
    # Hint: Consider using a dictionary to store values you've seen
    # and their indices
    
    # For each number, check if (target - number) exists in the dictionary
    # If it does, return the current index and the stored index
    
    pass
`;
  
  const testCases = problem.examples.map(example => ({
    input: example.input,
    output: example.output,
    status: 'pending' as const
  }));

  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      // Fallback to problems page if no history
      window.location.href = '/problems';
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Problem Header */}
      <div className="bg-white border-b border-neutral-200 p-4">
        <div className="flex items-center mb-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleGoBack}
            className="mr-3"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center flex-1">
            <h1 className="text-xl font-semibold">{problem.title}</h1>
            <div className="flex mt-2 sm:mt-0">
              <Badge variant="outline" className={
                problem.difficulty === "Easy" ? "bg-green-100 text-success border-green-200" :
                problem.difficulty === "Medium" ? "bg-yellow-100 text-warning border-yellow-200" :
                "bg-red-100 text-error border-red-200"
              }>
                {problem.difficulty}
              </Badge>
              <Button variant="outline" size="sm" className="ml-2">
                <Bookmark className="h-4 w-4 mr-1" /> Save
              </Button>
              <Button variant="outline" size="sm" className="ml-2">
                <Share className="h-4 w-4 mr-1" /> Share
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 text-xs text-neutral-500">
          <span className="flex items-center">
            <Check className="h-3 w-3 text-success mr-1" /> {problem.acceptance} Acceptance
          </span>
          <span className="flex items-center">
            <Clock className="h-3 w-3 mr-1" /> Avg. Time: {problem.averageTime}
          </span>
          <span className="flex items-center">
            <User className="h-3 w-3 mr-1" /> Solved by {problem.solvedCount}
          </span>
          <span className="flex items-center">
            <Tag className="h-3 w-3 mr-1" /> {problem.topics.join(", ")}
          </span>
        </div>
      </div>

      {/* Problem Content and Code Editor */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Problem Statement */}
        <div className="w-full md:w-1/2 border-r border-neutral-200 overflow-y-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-3 rounded-none border-b">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="solution">Solution</TabsTrigger>
              <TabsTrigger value="submissions">Submissions</TabsTrigger>
            </TabsList>
            
            <div className="flex-1 overflow-y-auto">
              <TabsContent value="description" className="p-6 mt-0">
                <div className="prose prose-sm max-w-none">
                  <div className="whitespace-pre-line text-neutral-700 mb-6">
                    {problem.description}
                  </div>
                  
                  <div className="space-y-4">
                    {problem.examples.map((example, index) => (
                      <div key={index} className="bg-neutral-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Example {index + 1}:</h4>
                        <div className="space-y-1 text-sm font-mono">
                          <div><strong>Input:</strong> {example.input}</div>
                          <div><strong>Output:</strong> {example.output}</div>
                          {example.explanation && (
                            <div><strong>Explanation:</strong> {example.explanation}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="font-medium mb-2">Constraints:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-neutral-600">
                      {problem.constraints.map((constraint, index) => (
                        <li key={index}>{constraint}</li>
                      ))}
                    </ul>
                  </div>
                  
                  {problem.followUp && (
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">Follow-up:</h4>
                      <p className="text-sm text-blue-800">{problem.followUp}</p>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="solution" className="p-6 mt-0">
                <div className="prose prose-sm max-w-none">
                  <h3 className="text-lg font-semibold mb-4">Solution Approach</h3>
                  <div className="whitespace-pre-line text-neutral-700 mb-6">
                    {problem.solution}
                  </div>
                  
                  {problem.hints.length > 0 && (
                    <div className="mt-6">
                      <h4 className="font-medium mb-2">Hints:</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-neutral-600">
                        {problem.hints.map((hint, index) => (
                          <li key={index}>{hint}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="submissions" className="p-6 mt-0">
                <div className="text-center text-neutral-500">
                  <p>No submissions yet. Submit your solution to see your submission history.</p>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Code Editor */}
        <div className="w-full md:w-1/2 flex flex-col">
          <CodeEditor 
            initialCode={initialCode}
            testCases={testCases}
            onSubmit={(code) => {
              console.log("Submitted code:", code);
            }}
          />
        </div>
      </div>
    </div>
  );
}
