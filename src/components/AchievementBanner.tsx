import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, Target, Flame, BookOpen, X } from "lucide-react";
import { useState } from "react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  type: "daily" | "milestone" | "streak" | "learning";
  isNew?: boolean;
}

export const AchievementBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  const achievements: Achievement[] = [
    {
      id: "1",
      title: "Math Wizard",
      description: "Completed 10 algebra challenges",
      icon: <Trophy className="w-5 h-5" />,
      type: "milestone",
      isNew: true
    },
    {
      id: "2", 
      title: "Daily Learner",
      description: "Studied for 7 days straight",
      icon: <Flame className="w-5 h-5" />,
      type: "streak"
    },
    {
      id: "3",
      title: "Science Explorer",
      description: "Discovered 5 new concepts",
      icon: <BookOpen className="w-5 h-5" />,
      type: "learning"
    }
  ];

  if (!isVisible) return null;

  return (
    <Card className="bg-gradient-achievement text-achievement-foreground shadow-achievement border-0 overflow-hidden relative">
      <CardContent className="p-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-2 right-2 text-achievement-foreground hover:bg-achievement-foreground/20"
          onClick={() => setIsVisible(false)}
        >
          <X className="w-4 h-4" />
        </Button>

        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-achievement-foreground/20 rounded-lg">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-lg">New Achievements Unlocked!</h3>
            <p className="text-achievement-foreground/80 text-sm">
              You've earned {achievements.filter(a => a.isNew).length} new badge{achievements.filter(a => a.isNew).length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {achievements.map((achievement) => (
            <Badge 
              key={achievement.id}
              variant="secondary" 
              className="bg-achievement-foreground/20 text-achievement-foreground border-achievement-foreground/30 gap-2"
            >
              {achievement.icon}
              {achievement.title}
              {achievement.isNew && (
                <span className="bg-accent text-accent-foreground px-1 py-0.5 rounded text-xs">NEW</span>
              )}
            </Badge>
          ))}
        </div>

        <Button variant="secondary" className="bg-achievement-foreground text-achievement hover:bg-achievement-foreground/90">
          View All Achievements
        </Button>
      </CardContent>
    </Card>
  );
};