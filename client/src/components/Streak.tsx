import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Flame, CheckCircle } from "lucide-react";

interface StreakDayProps {
  isCompleted: boolean;
  dayLabel: string;
}

function StreakDay({ isCompleted, dayLabel }: StreakDayProps) {
  return (
    <div className="flex flex-col items-center">
      <div 
        className={`w-2.5 h-2.5 rounded-full ${
          isCompleted ? "bg-success" : "bg-neutral-300"
        }`}
      ></div>
      <span className="text-xs mt-1 text-neutral-500">{dayLabel}</span>
    </div>
  );
}

interface StreakProps {
  currentStreak: number;
  lastTwoWeeks: boolean[];
}

export default function Streak({ currentStreak, lastTwoWeeks }: StreakProps) {
  const dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S', 'M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <Card className="bg-white">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-lg">Current Streak</h2>
          <span className="text-primary font-bold text-xl">{currentStreak} days</span>
        </div>
        
        <div className="flex space-x-1 mb-4">
          {lastTwoWeeks.map((completed, index) => (
            <StreakDay 
              key={index}
              isCompleted={completed}
              dayLabel={dayLabels[index]}
            />
          ))}
        </div>
        
        <Alert className="bg-green-50 border border-green-100">
          <CheckCircle className="h-4 w-4 text-success" />
          <AlertDescription className="text-success text-sm">
            You're on track to reach your weekly goal!
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}
