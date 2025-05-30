import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, XCircle, Play, Code, Copy, Maximize, Loader } from "lucide-react";
import { cn } from "@/lib/utils";

interface TestCase {
  input: string;
  output: string;
  status: 'pending' | 'running' | 'passed' | 'failed';
}

interface CodeEditorProps {
  problemId: string;
  initialCode: string;
  testCases: TestCase[];
  language?: string;
  onLanguageChange?: (language: string) => void;
}

export default function CodeEditor({ problemId, initialCode, testCases: initialTestCases, language = "javascript", onLanguageChange }: CodeEditorProps) {
  const [currentLanguage, setCurrentLanguage] = useState(language);
  const [code, setCode] = useState(initialCode);
  const [testCases, setTestCases] = useState<TestCase[]>(initialTestCases);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update code when language or initialCode changes
  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  useEffect(() => {
    setCurrentLanguage(language);
  }, [language]);

  const handleLanguageChange = (newLanguage: string) => {
    setCurrentLanguage(newLanguage);
    if (onLanguageChange) {
      onLanguageChange(newLanguage);
    }
  };

  const resetCode = () => {
    setCode(initialCode);
  };

  const runCode = () => {
    setIsRunning(true);
    
    // Update test cases to simulate running
    const updatedTestCases = testCases.map(testCase => ({
      ...testCase,
      status: 'running' as const
    }));
    setTestCases(updatedTestCases);
    
    // Simulate running code with delays for each test case
    testCases.forEach((_, index) => {
      setTimeout(() => {
        setTestCases(prevTestCases => {
          const newTestCases = [...prevTestCases];
          // Randomly pass or fail for demo
          newTestCases[index].status = Math.random() > 0.3 ? 'passed' : 'failed';
          return newTestCases;
        });
        
        // If this is the last test case, set running to false
        if (index === testCases.length - 1) {
          setIsRunning(false);
        }
      }, 1000 + (index * 500));
    });
  };
  
  const submitCode = () => {
    setIsSubmitting(true);
    
    // Update test cases to simulate running
    const updatedTestCases = testCases.map(testCase => ({
      ...testCase,
      status: 'running' as const
    }));
    setTestCases(updatedTestCases);
    
    // Simulate submitting with delays
    testCases.forEach((_, index) => {
      setTimeout(() => {
        setTestCases(prevTestCases => {
          const newTestCases = [...prevTestCases];
          // For submission, we'll make them all pass
          newTestCases[index].status = 'passed';
          return newTestCases;
        });
        
        // If this is the last test case, set submitting to false
        if (index === testCases.length - 1) {
          setIsSubmitting(false);
        }
      }, 1000 + (index * 500));
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Options Bar */}
      <div className="bg-white p-3 border-b border-neutral-200 flex justify-between">
        <div className="flex items-center">
          <Select value={currentLanguage} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-32 mr-2">
              <SelectValue>
                {currentLanguage === 'javascript' && 'JavaScript'}
                {currentLanguage === 'python' && 'Python3'}
                {currentLanguage === 'java' && 'Java'}
                {currentLanguage === 'cpp' && 'C++'}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="javascript">JavaScript</SelectItem>
              <SelectItem value="python">Python3</SelectItem>
              <SelectItem value="java">Java</SelectItem>
              <SelectItem value="cpp">C++</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="sm" className="text-sm" onClick={resetCode}>
            <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reset
          </Button>
        </div>
        
        <div>
          <Button variant="outline" size="sm" className="mr-2">
            <Copy className="h-4 w-4 mr-1" />
            Copy
          </Button>
          <Button variant="outline" size="sm">
            <Maximize className="h-4 w-4 mr-1" />
            Fullscreen
          </Button>
        </div>
      </div>
      
      {/* Editor Area */}
      <div className="flex-1 bg-neutral-900 overflow-y-auto code-editor text-white text-sm font-mono">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-full bg-transparent text-white font-mono text-sm p-4 resize-none outline-none border-none"
          placeholder="Start coding..."
          spellCheck={false}
        />
      </div>
      
      {/* Test Cases and Submit */}
      <div className="bg-white p-4 border-t border-neutral-200">
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <Button 
            className="flex-1" 
            onClick={runCode} 
            disabled={isRunning || isSubmitting}
          >
            {isRunning ? (
              <Loader className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Play className="h-4 w-4 mr-2" />
            )}
            Run Code
          </Button>
          <Button 
            className="flex-1 bg-green-600 hover:bg-green-700 text-white" 
            onClick={submitCode} 
            disabled={isRunning || isSubmitting}
          >
            {isSubmitting ? (
              <Loader className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <CheckCircle className="h-4 w-4 mr-2" />
            )}
            Submit
          </Button>
        </div>
        
        <Card className="bg-neutral-100 p-4">
          <h3 className="font-medium mb-2">Test Cases</h3>
          <div className="space-y-2">
            {testCases.map((testCase, index) => (
              <div key={index} className="flex items-center">
                <input 
                  type="radio"
                  id={`test-${index}`}
                  name="test_case"
                  className="mr-2"
                  defaultChecked={index === 0}
                />
                <label 
                  htmlFor={`test-${index}`} 
                  className="text-sm flex-1"
                >
                  {testCase.input}
                </label>
                <div className="ml-auto flex items-center">
                  {testCase.status === 'pending' && (
                    <Code className="h-4 w-4 text-neutral-500" />
                  )}
                  {testCase.status === 'running' && (
                    <Loader className="h-4 w-4 text-primary-500 animate-spin" />
                  )}
                  {testCase.status === 'passed' && (
                    <CheckCircle className="h-4 w-4 text-success" />
                  )}
                  {testCase.status === 'failed' && (
                    <XCircle className="h-4 w-4 text-error" />
                  )}
                  <span className={cn(
                    "ml-2 text-xs",
                    testCase.status === 'passed' && "text-success",
                    testCase.status === 'failed' && "text-error",
                    testCase.status === 'running' && "text-primary-500",
                  )}>
                    {testCase.status === 'running' ? 'Running...' : 
                     testCase.status === 'passed' ? 'Passed' : 
                     testCase.status === 'failed' ? 'Failed' : ''}
                  </span>
                </div>
              </div>
            ))}
            <div className="flex items-center">
              <input 
                type="radio"
                id="custom"
                name="test_case"
                className="mr-2"
              />
              <label htmlFor="custom" className="text-sm">
                Custom input
              </label>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
