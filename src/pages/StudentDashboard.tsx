import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  BookOpen, 
  Trophy, 
  Target, 
  Clock, 
  Users, 
  Play, 
  Star,
  Coins,
  TrendingUp,
  Calendar,
  Bell,
  Settings,
  LogOut
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface Profile {
  display_name: string;
  total_knowledge_coins: number;
  learning_streak: number;
  grade_level?: string;
  class_code?: string;
}

interface UserProgress {
  subject: string;
  completion_percentage: number;
  score: number;
  time_spent: number;
}

const StudentDashboard = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [progress, setProgress] = useState<UserProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (profileError) throw profileError;
      setProfile(profileData);

      // Fetch progress
      const { data: progressData, error: progressError } = await supabase
        .from("user_progress")
        .select("*")
        .eq("user_id", user.id);

      if (progressError) throw progressError;
      setProgress(progressData || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const subjects = [
    { name: "Mathematics", icon: "📊", color: "from-blue-500 to-blue-600" },
    { name: "Physics", icon: "⚛️", color: "from-purple-500 to-purple-600" },
    { name: "Chemistry", icon: "🧪", color: "from-green-500 to-green-600" },
    { name: "Biology", icon: "🧬", color: "from-orange-500 to-orange-600" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Header */}
      <header className="bg-card border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-primary">ZenithLearn</h1>
              <Badge variant="secondary">Student</Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm">
                <Coins className="h-4 w-4 text-yellow-500" />
                <span className="font-medium">{profile?.total_knowledge_coins || 0}</span>
              </div>
              
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                <LogOut className="h-4 w-4" />
              </Button>
              
              <Avatar className="h-8 w-8">
                <AvatarFallback>
                  {profile?.display_name?.charAt(0) || "S"}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">
            Welcome back, {profile?.display_name}! 👋
          </h2>
          <p className="text-muted-foreground">
            Ready to continue your STEM learning journey?
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                      <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Lessons</p>
                      <p className="text-2xl font-bold">
                        {progress.reduce((acc, p) => acc + Math.floor(p.completion_percentage / 25), 0)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                      <Trophy className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Streak</p>
                      <p className="text-2xl font-bold">{profile?.learning_streak || 0}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                      <Star className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Avg Score</p>
                      <p className="text-2xl font-bold">
                        {progress.length > 0 
                          ? Math.round(progress.reduce((acc, p) => acc + p.score, 0) / progress.length)
                          : 0
                        }%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Subjects */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5" />
                  <span>Your Subjects</span>
                </CardTitle>
                <CardDescription>Continue learning where you left off</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {subjects.map((subject) => {
                    const subjectProgress = progress.find(p => p.subject === subject.name);
                    return (
                      <Card key={subject.name} className="hover:shadow-lg transition-shadow cursor-pointer">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <div className={`p-2 bg-gradient-to-r ${subject.color} rounded-lg text-white text-xl`}>
                                {subject.icon}
                              </div>
                              <div>
                                <h3 className="font-semibold">{subject.name}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {subjectProgress?.completion_percentage || 0}% Complete
                                </p>
                              </div>
                            </div>
                            <Button size="sm" variant="outline">
                              <Play className="h-4 w-4 mr-1" />
                              Continue
                            </Button>
                          </div>
                          <Progress value={subjectProgress?.completion_percentage || 0} className="w-full" />
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>Recent Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {progress.slice(0, 3).map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <BookOpen className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{item.subject} Lesson</p>
                          <p className="text-sm text-muted-foreground">
                            Score: {item.score}%
                          </p>
                        </div>
                      </div>
                      <Badge variant="secondary">{item.completion_percentage}%</Badge>
                    </div>
                  ))}
                  {progress.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">
                      No recent activity. Start learning to see your progress here!
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Today's Goals */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5" />
                  <span>Today's Goals</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Complete 2 lessons</span>
                  <Badge variant="outline">1/2</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Earn 50 coins</span>
                  <Badge variant="outline">25/50</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Practice quiz</span>
                  <Badge variant="secondary">✓</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Play className="h-4 w-4 mr-2" />
                  Take Practice Quiz
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Users className="h-4 w-4 mr-2" />
                  Study Groups
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Study Time
                </Button>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5" />
                  <span>Recent Achievements</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-2 bg-muted/50 rounded-lg">
                    <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                      <Star className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">First Lesson</p>
                      <p className="text-xs text-muted-foreground">Completed your first lesson</p>
                    </div>
                  </div>
                  
                  <div className="text-center py-4">
                    <p className="text-sm text-muted-foreground">
                      Keep learning to unlock more achievements!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;