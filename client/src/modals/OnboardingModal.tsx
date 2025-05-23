import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Check } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import AvatarCustomization from "@/components/AvatarCustomization";

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export default function OnboardingModal({ isOpen, onClose, onComplete }: OnboardingModalProps) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("fox");
  const [solveCount, setSolveCount] = useState(3);
  const [daysPerWeek, setDaysPerWeek] = useState(5);
  const [focusAreas, setFocusAreas] = useState({
    arrays: false,
    strings: false,
    dp: false,
    trees: false
  });
  
  const { signup } = useAuth();
  
  const avatars = [
    {
      id: "fox",
      name: "Baby Fox",
      imageUrl: "/src/avatars/fox1.png"
    },
    {
      id: "giraffe",
      name: "Baby Giraffe",
      imageUrl: "/src/avatars/giraffe1.png"
    },
    {
      id: "wolf",
      name: "Baby Wolf",
      imageUrl: "/src/avatars/wolf1.png"
    }
  ];
  
  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };
  
  const handleComplete = async () => {
    try {
      await signup(email, password, username || name);
      onComplete();
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };
  
  const updateFocusArea = (area: keyof typeof focusAreas) => {
    setFocusAreas({
      ...focusAreas,
      [area]: !focusAreas[area]
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <div>
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-lg font-medium leading-6 text-neutral-900">
              {step === 1 && "Create Your Account"}
              {step === 2 && "Choose Your Avatar"}
              {step === 3 && "Set Your Goals"}
            </h3>
          </div>
          
          {/* Progress steps */}
          <div className="w-full mb-6">
            <div className="flex justify-between items-center w-full">
              <div className="flex flex-col items-center">
                <div 
                  className={`w-8 h-8 flex items-center justify-center rounded-full ${
                    step >= 1 ? "bg-primary text-white" : "bg-neutral-200 text-neutral-500"
                  }`}
                >
                  {step > 1 ? <Check className="h-4 w-4" /> : "1"}
                </div>
                <span className="text-xs mt-1">Account</span>
              </div>
              <div className={`flex-1 h-1 mx-2 ${step > 1 ? "bg-primary" : "bg-neutral-200"}`}></div>
              <div className="flex flex-col items-center">
                <div 
                  className={`w-8 h-8 flex items-center justify-center rounded-full ${
                    step >= 2 ? "bg-primary text-white" : "bg-neutral-200 text-neutral-500"
                  }`}
                >
                  {step > 2 ? <Check className="h-4 w-4" /> : "2"}
                </div>
                <span className="text-xs mt-1">Avatar</span>
              </div>
              <div className={`flex-1 h-1 mx-2 ${step > 2 ? "bg-primary" : "bg-neutral-200"}`}></div>
              <div className="flex flex-col items-center">
                <div 
                  className={`w-8 h-8 flex items-center justify-center rounded-full ${
                    step >= 3 ? "bg-primary text-white" : "bg-neutral-200 text-neutral-500"
                  }`}
                >
                  3
                </div>
                <span className="text-xs mt-1">Goals</span>
              </div>
            </div>
          </div>
          
          {/* Step 1: Account Creation */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="onb-email">Email</Label>
                <Input 
                  id="onb-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="onb-password">Password</Label>
                <Input 
                  id="onb-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="username">Username</Label>
                <Input 
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="codingMaster123"
                />
              </div>
            </div>
          )}
          
          {/* Step 2: Avatar Selection */}
          {step === 2 && (
            <AvatarCustomization 
              avatars={avatars}
              selectedAvatar={selectedAvatar}
              onSelectAvatar={setSelectedAvatar}
            />
          )}
          
          {/* Step 3: Goal Setting */}
          {step === 3 && (
            <div className="space-y-4">
              <p className="text-sm text-neutral-600 mb-4">
                Set your coding practice goals to stay motivated and track your progress.
              </p>
              
              <div>
                <Label className="block text-sm font-medium">Problems to solve per day</Label>
                <div className="flex items-center mt-2">
                  <Button 
                    type="button"
                    variant="outline"
                    className="rounded-l-md"
                    onClick={() => setSolveCount(Math.max(1, solveCount - 1))}
                  >
                    -
                  </Button>
                  <div className="px-6 py-2 bg-white border-t border-b border-neutral-300 text-center text-lg">
                    {solveCount}
                  </div>
                  <Button 
                    type="button"
                    variant="outline"
                    className="rounded-r-md"
                    onClick={() => setSolveCount(Math.min(10, solveCount + 1))}
                  >
                    +
                  </Button>
                </div>
              </div>
              
              <div>
                <Label className="block text-sm font-medium">Days per week</Label>
                <div className="flex items-center mt-2">
                  <Button 
                    type="button"
                    variant="outline"
                    className="rounded-l-md"
                    onClick={() => setDaysPerWeek(Math.max(1, daysPerWeek - 1))}
                  >
                    -
                  </Button>
                  <div className="px-6 py-2 bg-white border-t border-b border-neutral-300 text-center text-lg">
                    {daysPerWeek}
                  </div>
                  <Button 
                    type="button"
                    variant="outline"
                    className="rounded-r-md"
                    onClick={() => setDaysPerWeek(Math.min(7, daysPerWeek + 1))}
                  >
                    +
                  </Button>
                </div>
              </div>
              
              <div className="mt-4">
                <Label className="block text-sm font-medium">Focus areas</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="arrays" 
                      checked={focusAreas.arrays}
                      onCheckedChange={() => updateFocusArea("arrays")}
                    />
                    <Label htmlFor="arrays" className="text-sm">Arrays</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="strings" 
                      checked={focusAreas.strings}
                      onCheckedChange={() => updateFocusArea("strings")}
                    />
                    <Label htmlFor="strings" className="text-sm">Strings</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="dp" 
                      checked={focusAreas.dp}
                      onCheckedChange={() => updateFocusArea("dp")}
                    />
                    <Label htmlFor="dp" className="text-sm">Dynamic Programming</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="trees" 
                      checked={focusAreas.trees}
                      onCheckedChange={() => updateFocusArea("trees")}
                    />
                    <Label htmlFor="trees" className="text-sm">Trees & Graphs</Label>
                  </div>
                </div>
              </div>
              
              <div className="bg-neutral-50 rounded-lg p-4 border border-neutral-200 mt-4">
                <h4 className="font-medium text-neutral-900 flex items-center">
                  <svg className="h-4 w-4 text-secondary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                  Weekly Goal Summary
                </h4>
                <p className="text-sm text-neutral-600 mt-2">
                  Solve <span className="font-semibold text-primary">{solveCount}</span> problems
                  <span className="font-semibold text-primary"> {daysPerWeek}</span> days per week
                  (<span className="font-semibold text-primary">{solveCount * daysPerWeek}</span> total problems)
                </p>
              </div>
            </div>
          )}
          
          {/* Navigation buttons */}
          <div className="flex justify-between mt-6">
            <Button 
              variant="outline"
              type="button"
              onClick={() => setStep(step - 1)}
              disabled={step === 1}
            >
              Back
            </Button>
            
            <Button 
              type="button"
              onClick={handleNext}
            >
              {step < 3 ? "Next" : "Get Started"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
