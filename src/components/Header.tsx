import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Bell, Settings, Globe, Zap } from "lucide-react";

interface HeaderProps {
  studentName: string;
  totalXP: number;
  streak: number;
  level: number;
}

export const Header = ({ studentName, totalXP, streak, level }: HeaderProps) => {
  return (
    <header className="bg-gradient-learning border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              STEM Learn
            </div>
            <Badge variant="secondary" className="gap-1">
              <Globe className="w-3 h-3" />
              English
            </Badge>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{totalXP.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Total XP</div>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-1 text-accent text-xl font-bold">
                  <Zap className="w-5 h-5 fill-current" />
                  {streak}
                </div>
                <div className="text-xs text-muted-foreground">Day Streak</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">Lv.{level}</div>
                <div className="text-xs text-muted-foreground">Level</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                  {studentName.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};