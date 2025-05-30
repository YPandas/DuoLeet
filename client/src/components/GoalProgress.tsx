import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Edit, Target, Calendar } from "lucide-react";

interface Goal {
  id: string;
  title: string;
  current: number;
  target: number;
  completed: number;
  type: "daily" | "weekly";
}

interface GoalProgressProps {
  goals: Goal[];
  onEdit: () => void;
  weeklyGoalSummary: {
    solveCount: number;
    daysPerWeek: number;
  };
}

export default function GoalProgress({ goals, onEdit, weeklyGoalSummary }: GoalProgressProps) {
  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 100) return "bg-green-500";
    if (percentage >= 75) return "bg-yellow-500";
    return "bg-primary-500";
  };

  return (
    <Card className="bg-white rounded-xl shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-neutral-900">My Goals</h3>
          <Button variant="outline" size="sm" onClick={onEdit}>
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
        </div>
        
        <div className="space-y-4">
          {goals.map((goal) => {
            const percentage = getProgressPercentage(goal.current, goal.target);
            return (
              <div key={goal.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {goal.type === "daily" ? (
                      <Target className="h-4 w-4 text-primary-500" />
                    ) : (
                      <Calendar className="h-4 w-4 text-primary-500" />
                    )}
                    <span className="text-sm font-medium">{goal.title}</span>
                  </div>
                  <span className="text-sm text-neutral-600">
                    {goal.current}/{goal.target}
                  </span>
                </div>
                <Progress 
                  value={percentage} 
                  className="h-2"
                />
                <div className="text-xs text-neutral-500">
                  {percentage >= 100 ? "Goal completed! 🎉" : `${Math.round(percentage)}% complete`}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 pt-4 border-t border-neutral-200">
          <h4 className="text-sm font-medium text-neutral-900 mb-2">Weekly Goal Summary</h4>
          <div className="text-sm text-neutral-600 space-y-1">
            <p>• Solve <span className="font-medium text-neutral-900">{weeklyGoalSummary.solveCount * weeklyGoalSummary.daysPerWeek}</span> problems per week</p>
            <p>• Practice <span className="font-medium text-neutral-900">{weeklyGoalSummary.daysPerWeek}</span> days per week</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
