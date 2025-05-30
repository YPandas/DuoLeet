import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CheckCircle,
  XCircle,
  Play,
  Copy,
  Maximize,
  Loader,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TestCase {
  input: string;
  output: string;
  status: "pending" | "running" | "passed" | "failed";
  actualOutput?: string;
  error?: string;
}

interface CodeEditorProps {
  problemId: number;
  initialCode: string;
  testCases: TestCase[];
  language: "javascript" | "python" | "java" | "cpp";
  onLanguageChange: (lang: string) => void;
}

export default function CodeEditor({
  problemId,
  initialCode,
  testCases: initialTestCases,
  language,
  onLanguageChange,
}: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [currentLanguage, setCurrentLanguage] = useState(language);
  const [testCases, setTestCases] = useState<TestCase[]>(
    initialTestCases
  );
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // new: ref to the editor container
  const editorContainerRef = useRef<HTMLDivElement>(null);

  // new: toggle full-screen on the editor container
  const handleFullscreen = () => {
    if (!editorContainerRef.current) return;
    if (!document.fullscreenElement) {
      editorContainerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  // keep code in sync if language or initialCode changes
  useEffect(() => {
    setCode(initialCode);
  }, [initialCode, language]);

  // when language selector changes
  const handleLanguageChange = (newLang: string) => {
    setCurrentLanguage(newLang as any);
    onLanguageChange(newLang);
  };

  // run without submitting
  const runCode = async () => {
    setIsRunning(true);
    try {
      const resp = await fetch(`/api/run/${problemId}`, {
        method: "POST",
        body: JSON.stringify({ code, language: currentLanguage }),
        headers: { "Content-Type": "application/json" },
      });
      const result = await resp.json();
      const updated = testCases.map((tc, i) => ({
        ...tc,
        status: result.results[i].passed
          ? "passed"
          : "failed",
        actualOutput: result.results[i].actualOutput,
        error: result.results[i].error,
      }));
      setTestCases(updated);
    } catch {
      setTestCases(
        testCases.map((tc) => ({
          ...tc,
          status: "failed",
          error: "Execution error",
        }))
      );
    } finally {
      setIsRunning(false);
    }
  };

  // run & submit
  const submitCode = async () => {
    setIsSubmitting(true);
    setTestCases(testCases.map((tc) => ({ ...tc, status: "running" })));
    try {
      const resp = await fetch(`/api/submit/${problemId}`, {
        method: "POST",
        body: JSON.stringify({ code, language: currentLanguage }),
        headers: { "Content-Type": "application/json" },
      });
      const result = await resp.json();
      alert(result.allPassed ? `🎉 ${result.message}` : `❌ ${result.message}`);
      setTestCases(
        result.results.map((r: any, i: number) => ({
          ...testCases[i],
          status: r.passed ? "passed" : "failed",
          actualOutput: r.actualOutput,
          error: r.error,
        }))
      );
    } catch {
      alert("Failed to submit code.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // reset to starter code
  const resetCode = () => setCode(initialCode);

  return (
    <Card className="flex-1 flex flex-col">
      <div className="flex items-center p-4 border-b border-neutral-200">
        <Select
          value={currentLanguage}
          onValueChange={handleLanguageChange}
        >
          <SelectTrigger className="w-32 mr-2">
            <SelectValue>
              {currentLanguage === "javascript" && "JavaScript"}
              {currentLanguage === "python" && "Python3"}
              {currentLanguage === "java" && "Java"}
              {currentLanguage === "cpp" && "C++"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="javascript">
              JavaScript
            </SelectItem>
            <SelectItem value="python">Python3</SelectItem>
            <SelectItem value="java">Java</SelectItem>
            <SelectItem value="cpp">C++</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex items-center">
          <Button
            variant="outline"
            size="sm"
            className="text-sm mr-2"
            onClick={resetCode}
          >
            <svg
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.581m15.387 0A8.001 8.001 0 0112 4..."
              />
            </svg>
            Reset
          </Button>
          <Button variant="outline" size="sm" className="text-sm">
            <Copy className="h-4 w-4 mr-1" />
            Copy
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleFullscreen}
            className="text-sm"
          >
            <Maximize className="h-4 w-4 mr-1" />
            Fullscreen
          </Button>
        </div>
      </div>

      {/* Editor Area */}
      <div
        ref={editorContainerRef}
        className="flex-1 bg-neutral-900 overflow-y-auto code-editor text-white text-sm font-mono"
      >
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-full bg-transparent font-mono text-sm p-4 resize-none outline-none border-none"
          placeholder="Start coding..."
          spellCheck={false}
        />
      </div>

      {/* Test Cases & Actions */}
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
              <Play className="h-4 w-4 mr-2" />
            )}
            Submit Code
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {testCases.map((tc, i) => (
            <div
              key={i}
              className={cn(
                "border rounded-lg p-3 text-sm",
                tc.status === "passed" && "border-green-200 bg-green-50",
                tc.status === "failed" && "border-red-200 bg-red-50",
                tc.status === "running" && "border-blue-200 bg-blue-50",
                tc.status === "pending" && "border-gray-200 bg-gray-50"
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">
                  Test Case {i + 1}
                </span>
                <div className="flex items-center">
                  {tc.status === "passed" && (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  )}
                  {tc.status === "failed" && (
                    <XCircle className="h-4 w-4 text-red-600" />
                  )}
                  {tc.status === "running" && (
                    <Loader className="h-4 w-4 animate-spin" />
                  )}
                </div>
              </div>
              <div className="space-y-1">
                <div>
                  <strong>Input:</strong> {tc.input}
                </div>
                <div>
                  <strong>Expected:</strong> {tc.output}
                </div>
                {tc.actualOutput && (
                  <div>
                    <strong>Actual:</strong> {tc.actualOutput}
                  </div>
                )}
                {tc.error && (
                  <div className="text-red-600">
                    <strong>Error:</strong> {tc.error}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
