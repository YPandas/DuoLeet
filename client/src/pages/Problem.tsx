import { useState } from "react";
import { useParams } from "wouter";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import CodeEditor from "@/components/CodeEditor";
import { Check, Clock, User, Tag, Bookmark, Share } from "lucide-react";
import { problemsData } from "@/data/problems";

export default function Problem() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("description");
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  
  // Get problem data by ID, fallback to problem 1 if not found
  const problemData = problemsData[id || "1"] || problemsData["1"];
  
  const problem = {
    id: problemData.id,
    title: problemData.title,
    difficulty: problemData.difficulty,
    topics: problemData.topics,
    acceptance: problemData.acceptance,
    averageTime: "15 min",
    solvedCount: "2.4M",
    description: problemData.description,
    examples: problemData.examples,
    constraints: problemData.constraints,
  };
  
  const initialCode = problemData.starterCode[selectedLanguage as keyof typeof problemData.starterCode];
  
  const testCases = problemData.testCases.map(testCase => ({
    input: testCase.input,
    output: testCase.output,
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
                
              </div>
            </TabsContent>
            
            <TabsContent value="solution" className="mt-4">
              <div className="prose prose-sm max-w-none">
                <h3 className="text-lg font-semibold mb-2">Solution</h3>
                <p>Solutions will be available after you submit your code.</p>
                
                <div className="bg-blue-50 p-4 rounded-md mt-4">
                  <p className="text-sm text-blue-800">
                    Complete this problem to unlock the official solution and community approaches.
                  </p>
                </div>
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
            language={selectedLanguage}
            onLanguageChange={(newLanguage) => {
              setSelectedLanguage(newLanguage);
            }}
          />
        </div>
      </div>
    </div>
  );
}
