import { useState } from "react";
import { useParams } from "wouter";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import CodeEditor from "@/components/CodeEditor";
import { Check, Clock, User, Tag, Bookmark, Share } from "lucide-react";

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

  return (
    <div className="h-full flex flex-col">
      {/* Problem Header */}
      <div className="bg-white border-b border-neutral-200 p-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
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
        <div className="flex flex-wrap gap-2 text-xs text-neutral-600">
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
        <div className="w-full md:w-5/12 lg:w-1/3 p-4 bg-white border-r border-neutral-200 overflow-y-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="description" className="flex-1">Description</TabsTrigger>
              <TabsTrigger value="solution" className="flex-1">Solution</TabsTrigger>
              <TabsTrigger value="discussion" className="flex-1">Discussion</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-4">
              <div className="prose prose-sm max-w-none">
                <p>{problem.description}</p>
                
                {problem.examples.map((example, index) => (
                  <div key={index}>
                    <h3 className="text-lg font-semibold mt-4 mb-2">Example {index + 1}:</h3>
                    <pre className="bg-neutral-100 p-3 rounded-md">
                      <code>
                        <strong>Input:</strong> {example.input}
                        <br />
                        <strong>Output:</strong> {example.output}
                        {example.explanation && (
                          <>
                            <br />
                            <strong>Explanation:</strong> {example.explanation}
                          </>
                        )}
                      </code>
                    </pre>
                  </div>
                ))}
                
                <h3 className="text-lg font-semibold mt-4 mb-2">Constraints:</h3>
                <ul className="list-disc pl-5">
                  {problem.constraints.map((constraint, index) => (
                    <li key={index}>
                      <code>{constraint}</code>
                    </li>
                  ))}
                </ul>
                
                {problem.followUp && (
                  <>
                    <h3 className="text-lg font-semibold mt-4 mb-2">Follow-up:</h3>
                    <p>{problem.followUp}</p>
                  </>
                )}
              </div>
              
              <div className="mt-6 pt-6 border-t border-neutral-200">
                <h3 className="text-lg font-semibold mb-3">Hints</h3>
                {problem.hints.map((hint, index) => (
                  <Card key={index} className="bg-blue-50 p-3 rounded-md mb-3">
                    <p className="text-sm text-neutral-800">{hint}</p>
                  </Card>
                ))}
                <Button variant="link" className="text-sm p-0">Show More Hints</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="solution" className="mt-4">
              <div className="prose prose-sm max-w-none">
                <h3 className="text-lg font-semibold mb-2">Solution Approach</h3>
                <p>{problem.solution}</p>
                
                <h3 className="text-lg font-semibold mt-4 mb-2">Python Code:</h3>
                <pre className="bg-neutral-100 p-3 rounded-md">
                  <code>
{`def twoSum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`}
                  </code>
                </pre>
                
                <h3 className="text-lg font-semibold mt-4 mb-2">Time Complexity:</h3>
                <p>O(n) where n is the length of the nums array.</p>
                
                <h3 className="text-lg font-semibold mt-4 mb-2">Space Complexity:</h3>
                <p>O(n) for storing the hash map.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="discussion" className="mt-4">
              <div className="flex flex-col space-y-4">
                <Card className="p-4">
                  <h3 className="font-medium flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    Community Discussions
                  </h3>
                  <p className="text-sm text-neutral-600 mt-2">
                    Join the discussion with other developers solving this problem.
                  </p>
                  <Button className="mt-4 w-full">View Discussions</Button>
                </Card>
                
                <div className="text-center text-sm text-neutral-500">
                  No discussions yet. Be the first to comment!
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Code Editor */}
        <div className="w-full md:w-7/12 lg:w-2/3 flex flex-col">
          <CodeEditor 
            problemId={problem.id}
            initialCode={initialCode}
            testCases={testCases}
          />
        </div>
      </div>
    </div>
  );
}
