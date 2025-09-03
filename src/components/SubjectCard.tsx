import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Trophy, Star, BookOpen } from "lucide-react";

interface SubjectCardProps {
  title: string;
  icon: React.ReactNode;
  progress: number;
  level: number;
  achievements: number;
  totalLessons: number;
  completedLessons: number;
  color: "primary" | "secondary" | "accent";
}

export const SubjectCard = ({ 
  title, 
  icon, 
  progress, 
  level, 
  achievements, 
  totalLessons, 
  completedLessons,
  color 
}: SubjectCardProps) => {
  const getGradient = () => {
    switch (color) {
      case "primary": return "bg-gradient-primary";
      case "secondary": return "bg-gradient-secondary";
      case "accent": return "bg-gradient-achievement";
      default: return "bg-gradient-primary";
    }
  };

  return (
    <Card className="group hover:shadow-game transition-all duration-300 hover:-translate-y-2 border-0 shadow-card overflow-hidden">
      <div className={`h-2 ${getGradient()}`} />
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-xl ${getGradient()} text-white shadow-lg`}>
              {icon}
            </div>
            <div>
              <h3 className="font-bold text-lg text-foreground">{title}</h3>
              <p className="text-muted-foreground text-sm">Level {level}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-achievement">
            <Trophy className="w-4 h-4" />
            <span className="font-semibold">{achievements}</span>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1 text-muted-foreground">
              <BookOpen className="w-4 h-4" />
              <span>{completedLessons}/{totalLessons} lessons</span>
            </div>
            <div className="flex items-center gap-1 text-achievement">
              <Star className="w-4 h-4 fill-current" />
              <span className="font-medium">XP: {level * 250}</span>
            </div>
          </div>

          <Button 
            className="w-full mt-4" 
            variant={color === "primary" ? "game" : color === "secondary" ? "learning" : "achievement"}
          >
            Continue Learning
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};