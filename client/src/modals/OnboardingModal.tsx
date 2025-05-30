import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Check } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export default function OnboardingModal({ isOpen, onClose, onComplete }: OnboardingModalProps) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("/src/avatars/fox1.png");
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
    { id: "/src/avatars/fox1.png", name: "Fox", imageUrl: "/src/avatars/fox1.png" },
    { id: "/src/avatars/giraffe1.png", name: "Giraffe", imageUrl: "/src/avatars/giraffe1.png" },
    { id: "/src/avatars/wolf1.png", name: "Wolf", imageUrl: "/src/avatars/wolf1.png" }
  ];
  
  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };
  
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  const handleComplete = async () => {
    try {
      await signup({
        username,
        avatar: selectedAvatar,
        email,
        password,
        goals: {
          solveCount,
          daysPerWeek
        }
      });
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

  const getStepTitle = () => {
    switch (step) {
      case 1: return "Create Your Account";
      case 2: return "Choose Your Companion";
      case 3: return "Set Your Goals";
      default: return "Welcome to DuoLeet";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-center">{getStepTitle()}</DialogTitle>
          <div className="flex justify-center mt-2">
            <div className="flex space-x-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    i <= step ? 'bg-primary' : 'bg-neutral-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </DialogHeader>
        
        <div className="mt-4">
          {/* Step 1: Account Creation */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="signup-email">Email</Label>
                <Input 
                  id="signup-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                />
              </div>
              
              <div>
                <Label htmlFor="signup-password">Password</Label>
                <Input 
                  id="signup-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
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
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Choose Your Avatar</h2>
              <p className="text-sm text-neutral-600">
                Choose your coding companion! Your avatar will evolve as you reach your goals.
              </p>
              
              <div className="grid grid-cols-3 gap-4">
                {avatars.map((avatar) => (
                  <div
                    key={avatar.id}
                    onClick={() => setSelectedAvatar(avatar.id)}
                    className={`relative rounded-lg overflow-hidden cursor-pointer transition-all duration-200 transform hover:scale-105 border-2 ${
                      selectedAvatar === avatar.id ? 'border-primary scale-105' : 'border-transparent'
                    }`}
                  >
                    <img 
                      src={avatar.imageUrl} 
                      alt={`${avatar.name} avatar`} 
                      className="w-full h-auto rounded-lg object-contain bg-white"
                    />
                    <div className="absolute bottom-0 w-full bg-neutral-800 bg-opacity-70 text-white text-xs py-1 text-center">
                      {avatar.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
        </div>
        
        <div className="flex justify-between mt-6">
          <Button 
            variant="outline" 
            onClick={handleBack}
            disabled={step === 1}
          >
            Back
          </Button>
          
          {step < 3 ? (
            <Button 
              onClick={handleNext}
              disabled={step === 1 && (!email || !password || !username)}
            >
              Next
            </Button>
          ) : (
            <Button onClick={handleComplete}>
              Complete Setup
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
