import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

interface Goal {
  id: string;
  title: string;
  current: number;
  target: number;
  completed: number;
}

interface GoalProgressProps {
  goals: Goal[];
  onEdit?: () => void;
}

export default function GoalProgress({ goals, onEdit }: GoalProgressProps) {
  return (
    <Card className="bg-white">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-lg">My Goals</h2>
          {onEdit && (
            <Button 
              variant="link" 
              onClick={onEdit}
              className="text-primary text-sm"
            >
              Edit
            </Button>
          )}
        </div>
        
        <div className="space-y-4">
          {goals.map((goal) => {
            const percentage = (goal.current / goal.target) * 100;
            const isCompleted = goal.current >= goal.target;
            
            return (
              <div key={goal.id}>
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm font-medium">{goal.title}</p>
                  <span className={`text-sm font-medium ${
                    isCompleted ? "text-success" : "text-neutral-600"
                  }`}>
                    {goal.current}/{goal.target}
                  </span>
                </div>
                <Progress 
                  value={percentage} 
                  className="h-2" 
                />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
