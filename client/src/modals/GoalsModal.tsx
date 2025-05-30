import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface GoalsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (goals: { solveCount: number; daysPerWeek: number }) => void;
  currentGoals: { solveCount: number; daysPerWeek: number };
}

export default function GoalsModal({ isOpen, onClose, onSave, currentGoals }: GoalsModalProps) {
  const [solveCount, setSolveCount] = useState(currentGoals.solveCount);
  const [daysPerWeek, setDaysPerWeek] = useState(currentGoals.daysPerWeek);

  const handleSave = () => {
    onSave({ solveCount, daysPerWeek });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Set Your Goals</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-3">
            <Label className="text-sm font-medium">
              How many problems do you want to solve per day?
            </Label>
            <div className="px-3">
              <Slider
                value={[solveCount]}
                onValueChange={(value) => setSolveCount(value[0])}
                max={10}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-neutral-500 mt-1">
                <span>1</span>
                <span className="font-medium text-primary-600">{solveCount} problems/day</span>
                <span>10</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium">
              How many days per week do you want to practice?
            </Label>
            <div className="px-3">
              <Slider
                value={[daysPerWeek]}
                onValueChange={(value) => setDaysPerWeek(value[0])}
                max={7}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-neutral-500 mt-1">
                <span>1</span>
                <span className="font-medium text-primary-600">{daysPerWeek} days/week</span>
                <span>7</span>
              </div>
            </div>
          </div>

          <div className="bg-neutral-50 rounded-lg p-4">
            <h4 className="font-medium text-sm mb-2">Weekly Goal Summary</h4>
            <div className="text-sm text-neutral-600">
              <p>• Solve <span className="font-medium text-neutral-900">{solveCount * daysPerWeek}</span> problems per week</p>
              <p>• Practice <span className="font-medium text-neutral-900">{daysPerWeek}</span> days per week</p>
              <p>• Average <span className="font-medium text-neutral-900">{solveCount}</span> problems per practice day</p>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button onClick={handleSave} className="flex-1">
            Save Goals
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 