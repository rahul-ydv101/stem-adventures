import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  TrendingUp, 
  Calendar,
  Target,
  Award,
  BookOpen,
  Clock,
  Zap
} from "lucide-react";

const ProgressPage = () => {
  const weeklyData = [
    { day: "Mon", hours: 1.5, xp: 300 },
    { day: "Tue", hours: 2.0, xp: 450 },
    { day: "Wed", hours: 1.2, xp: 250 },
    { day: "Thu", hours: 2.5, xp: 600 },
    { day: "Fri", hours: 1.8, xp: 380 },
    { day: "Sat", hours: 0.5, xp: 100 },
    { day: "Sun", hours: 2.2, xp: 520 }
  ];

  const subjects = [
    { name: "Mathematics", progress: 75, xp: 2500, lessons: 18, color: "primary" },
    { name: "Physics", progress: 60, xp: 1800, lessons: 12, color: "secondary" },
    { name: "Chemistry", progress: 45, xp: 1200, lessons: 8, color: "accent" },
    { name: "Biology", progress: 30, xp: 800, lessons: 5, color: "achievement" }
  ];

  const achievements = [
    { title: "First Steps", description: "Complete your first lesson", earned: true, date: "2024-01-15" },
    { title: "Math Wizard", description: "Complete 10 math lessons", earned: true, date: "2024-01-20" },
    { title: "Streak Master", description: "Study for 7 days in a row", earned: true, date: "2024-01-25" },
    { title: "Speed Demon", description: "Complete a lesson in under 10 minutes", earned: false, date: null },
    { title: "Perfect Score", description: "Get 100% on 5 quizzes", earned: false, date: null }
  ];

  return (
    <div className="min-h-screen bg-gradient-learning">
      <Header 
        studentName="Alex Rivera"
        totalXP={15750}
        streak={7}
        level={12}
      />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          
          <h1 className="text-4xl font-bold text-foreground mb-2">Your Progress</h1>
          <p className="text-xl text-muted-foreground">Track your learning journey and achievements</p>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-card border-0">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-3">
                <BookOpen className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="text-3xl font-bold text-primary mb-2">43</div>
              <p className="text-muted-foreground">Lessons Completed</p>
            </CardContent>
          </Card>
          <Card className="shadow-card border-0">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-secondary-foreground" />
              </div>
              <div className="text-3xl font-bold text-secondary mb-2">28h</div>
              <p className="text-muted-foreground">Total Study Time</p>
            </CardContent>
          </Card>
          <Card className="shadow-card border-0">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-achievement rounded-full flex items-center justify-center mx-auto mb-3">
                <Zap className="w-6 h-6 text-achievement-foreground" />
              </div>
              <div className="text-3xl font-bold text-accent mb-2">15,750</div>
              <p className="text-muted-foreground">Total XP</p>
            </CardContent>
          </Card>
          <Card className="shadow-card border-0">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl font-bold text-achievement mb-2">28</div>
              <p className="text-muted-foreground">Achievements</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Weekly Activity */}
          <Card className="shadow-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Weekly Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklyData.map((day, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-12 text-sm font-medium text-foreground">{day.day}</span>
                      <div className="flex-1 min-w-0">
                        <Progress value={(day.hours / 3) * 100} className="h-2" />
                      </div>
                    </div>
                    <div className="text-right text-sm">
                      <div className="font-medium text-foreground">{day.hours}h</div>
                      <div className="text-muted-foreground">+{day.xp} XP</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Subject Progress */}
          <Card className="shadow-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-secondary" />
                Subject Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {subjects.map((subject, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-foreground">{subject.name}</span>
                    <span className="text-sm text-muted-foreground">{subject.progress}%</span>
                  </div>
                  <Progress value={subject.progress} className="h-2 mb-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{subject.lessons} lessons</span>
                    <span>{subject.xp.toLocaleString()} XP</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Recent Achievements */}
        <Card className="shadow-card border-0 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-achievement" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map((achievement, index) => (
                <div 
                  key={index} 
                  className={`p-4 rounded-lg border-2 transition-all ${
                    achievement.earned 
                      ? 'border-achievement bg-achievement/10' 
                      : 'border-muted bg-muted/10'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-full ${
                      achievement.earned 
                        ? 'bg-achievement text-achievement-foreground' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      <Award className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-semibold ${
                        achievement.earned ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {achievement.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {achievement.description}
                      </p>
                      {achievement.earned && (
                        <Badge variant="secondary" className="bg-achievement text-achievement-foreground text-xs">
                          Earned {achievement.date}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Goals */}
        <Card className="shadow-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Current Goals
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-foreground">Complete 5 Math lessons this week</span>
                <span className="text-muted-foreground">4/5</span>
              </div>
              <Progress value={80} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-foreground">Maintain 7-day learning streak</span>
                <span className="text-muted-foreground">7/7</span>
              </div>
              <Progress value={100} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-foreground">Earn 2,000 XP this month</span>
                <span className="text-muted-foreground">1,750/2,000</span>
              </div>
              <Progress value={87.5} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ProgressPage;