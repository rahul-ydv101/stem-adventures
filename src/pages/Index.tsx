import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { SubjectCard } from "@/components/SubjectCard";
import { AchievementBanner } from "@/components/AchievementBanner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Calculator, 
  Atom, 
  Zap, 
  Beaker, 
  Microscope,
  Target,
  TrendingUp,
  Users,
  PlayCircle
} from "lucide-react";
import heroImage from "@/assets/hero-stem-learning.jpg";

const Index = () => {
  const subjects = [
    {
      title: "Mathematics",
      icon: <Calculator className="w-6 h-6" />,
      progress: 75,
      level: 8,
      achievements: 12,
      totalLessons: 24,
      completedLessons: 18,
      color: "primary" as const
    },
    {
      title: "Physics",
      icon: <Zap className="w-6 h-6" />,
      progress: 60,
      level: 6,
      achievements: 8,
      totalLessons: 20,
      completedLessons: 12,
      color: "secondary" as const
    },
    {
      title: "Chemistry",
      icon: <Beaker className="w-6 h-6" />,
      progress: 45,
      level: 4,
      achievements: 5,
      totalLessons: 18,
      completedLessons: 8,
      color: "accent" as const
    },
    {
      title: "Biology",
      icon: <Microscope className="w-6 h-6" />,
      progress: 30,
      level: 3,
      achievements: 3,
      totalLessons: 16,
      completedLessons: 5,
      color: "primary" as const
    }
  ];

  const weeklyGoals = [
    { label: "Complete 5 Math lessons", progress: 80, current: 4, target: 5 },
    { label: "Study Physics for 3 hours", progress: 66, current: 2, target: 3 },
    { label: "Take 2 Chemistry quizzes", progress: 50, current: 1, target: 2 }
  ];

  return (
    <div className="min-h-screen bg-gradient-learning">
      <Header 
        studentName="Alex Rivera"
        totalXP={15750}
        streak={7}
        level={12}
      />

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-2xl">
          <div className="absolute inset-0">
            <img 
              src={heroImage} 
              alt="STEM Learning Platform" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/80" />
          </div>
          <div className="relative p-8 md:p-12 text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Welcome Back, Alex!
            </h1>
            <p className="text-xl md:text-2xl mb-6 text-white/90">
              Ready to explore the amazing world of STEM? Let's continue your learning journey!
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="game" size="lg" className="text-lg px-8">
                <PlayCircle className="w-5 h-5 mr-2" />
                Continue Learning
              </Button>
              <Link to="/progress">
                <Button variant="secondary" size="lg" className="text-lg px-8">
                  <Target className="w-5 h-5 mr-2" />
                  View Goals
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Achievement Banner */}
        <AchievementBanner />

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-card border-0">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">75%</div>
              <p className="text-muted-foreground">Overall Progress</p>
            </CardContent>
          </Card>
          <Card className="shadow-card border-0">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-secondary mb-2">28</div>
              <p className="text-muted-foreground">Achievements</p>
            </CardContent>
          </Card>
          <Card className="shadow-card border-0">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-accent mb-2">12h</div>
              <p className="text-muted-foreground">This Week</p>
            </CardContent>
          </Card>
        </div>

        {/* Subjects Grid */}
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-6">Your Subjects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {subjects.map((subject) => (
              <SubjectCard key={subject.title} {...subject} />
            ))}
          </div>
        </div>

        {/* Weekly Goals */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="shadow-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Weekly Goals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {weeklyGoals.map((goal, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground">{goal.label}</span>
                    <span className="text-muted-foreground">{goal.current}/{goal.target}</span>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-secondary" />
                Learning Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-6xl font-bold text-accent mb-2">7</div>
                <p className="text-muted-foreground mb-4">Days in a row!</p>
                <p className="text-sm text-foreground">
                  You're on fire! Keep going to reach your 14-day milestone.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/game/mathematics">
            <Button variant="learning" size="lg">
              <Atom className="w-5 h-5 mr-2" />
              Practice Mode
            </Button>
          </Link>
          <Button variant="game" size="lg">
            <Users className="w-5 h-5 mr-2" />
            Study with Friends
          </Button>
          <Link to="/progress">
            <Button variant="achievement" size="lg">
              <TrendingUp className="w-5 h-5 mr-2" />
              View Analytics
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Index;