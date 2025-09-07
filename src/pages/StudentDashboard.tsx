import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { BookOpen, Trophy, Target, Play, LogOut, User } from "lucide-react";

interface Subject {
  id: string;
  name: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  icon: string;
}

const StudentDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [subjects] = useState<Subject[]>([
    {
      id: "mathematics",
      name: "Mathematics",
      progress: 75,
      totalLessons: 24,
      completedLessons: 18,
      icon: "📊"
    },
    {
      id: "physics", 
      name: "Physics",
      progress: 60,
      totalLessons: 20,
      completedLessons: 12,
      icon: "⚡"
    },
    {
      id: "chemistry",
      name: "Chemistry", 
      progress: 45,
      totalLessons: 18,
      completedLessons: 8,
      icon: "🧪"
    },
    {
      id: "biology",
      name: "Biology",
      progress: 80,
      totalLessons: 22,
      completedLessons: 18,
      icon: "🧬"
    }
  ]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate("/auth");
      return;
    }

    setUser(session.user);
    
    // Get profile data
    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", session.user.id)
      .single();

    if (profileData?.role !== "student") {
      navigate("/teacher-dashboard");
      return;
    }

    setProfile(profileData);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const startLesson = (subjectId: string) => {
    navigate(`/lesson/${subjectId}/1`);
  };

  const playGame = (subjectId: string) => {
    navigate(`/game/${subjectId}`);
  };

  if (!user || !profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10">
      {/* Header */}
      <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              ZenithLearn
            </h1>
            <p className="text-sm text-muted-foreground">Student Portal</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="font-medium">{profile.display_name}</span>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">
            Welcome back, {profile.display_name}! 👋
          </h2>
          <p className="text-muted-foreground">
            Continue your learning journey and explore new concepts
          </p>
          {profile.class_code && (
            <Badge variant="secondary" className="mt-2">
              Class: {profile.class_code}
            </Badge>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Progress</CardTitle>
              <Trophy className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">65%</div>
              <p className="text-xs text-muted-foreground">
                Average across all subjects
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Lessons Completed</CardTitle>
              <BookOpen className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">56</div>
              <p className="text-xs text-muted-foreground">
                Out of 84 total lessons
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Learning Streak</CardTitle>
              <Target className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7 days</div>
              <p className="text-xs text-muted-foreground">
                Keep it up!
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {subjects.map((subject) => (
            <Card key={subject.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{subject.icon}</span>
                    <div>
                      <CardTitle className="text-lg">{subject.name}</CardTitle>
                      <CardDescription>
                        {subject.completedLessons} of {subject.totalLessons} lessons completed
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant="secondary">{subject.progress}%</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Progress value={subject.progress} className="w-full" />
                
                <div className="flex gap-2">
                  <Button 
                    onClick={() => startLesson(subject.id)}
                    className="flex-1"
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    Continue Learning
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => playGame(subject.id)}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Practice
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;