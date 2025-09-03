import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Play, 
  Trophy, 
  Clock, 
  BookOpen,
  CheckCircle,
  Lock
} from "lucide-react";

const SubjectDetail = () => {
  const { subject } = useParams();
  
  const subjectData = {
    mathematics: {
      title: "Mathematics",
      description: "Master the fundamentals of mathematics through interactive lessons and games",
      progress: 75,
      level: 8,
      lessons: [
        { id: 1, title: "Basic Algebra", duration: "15 min", completed: true, locked: false },
        { id: 2, title: "Linear Equations", duration: "20 min", completed: true, locked: false },
        { id: 3, title: "Quadratic Functions", duration: "25 min", completed: false, locked: false },
        { id: 4, title: "Logarithms", duration: "30 min", completed: false, locked: true },
      ]
    },
    physics: {
      title: "Physics",
      description: "Explore the laws of physics through experiments and simulations",
      progress: 60,
      level: 6,
      lessons: [
        { id: 1, title: "Motion & Forces", duration: "18 min", completed: true, locked: false },
        { id: 2, title: "Energy & Work", duration: "22 min", completed: false, locked: false },
        { id: 3, title: "Waves & Sound", duration: "25 min", completed: false, locked: true },
        { id: 4, title: "Electricity", duration: "28 min", completed: false, locked: true },
      ]
    },
    chemistry: {
      title: "Chemistry",
      description: "Discover chemical reactions and molecular structures",
      progress: 45,
      level: 4,
      lessons: [
        { id: 1, title: "Atomic Structure", duration: "20 min", completed: true, locked: false },
        { id: 2, title: "Chemical Bonds", duration: "25 min", completed: false, locked: false },
        { id: 3, title: "Reactions", duration: "30 min", completed: false, locked: true },
        { id: 4, title: "Organic Chemistry", duration: "35 min", completed: false, locked: true },
      ]
    },
    biology: {
      title: "Biology",
      description: "Study life sciences and biological processes",
      progress: 30,
      level: 3,
      lessons: [
        { id: 1, title: "Cell Structure", duration: "16 min", completed: true, locked: false },
        { id: 2, title: "Genetics", duration: "24 min", completed: false, locked: false },
        { id: 3, title: "Evolution", duration: "28 min", completed: false, locked: true },
        { id: 4, title: "Ecology", duration: "32 min", completed: false, locked: true },
      ]
    }
  };

  const currentSubject = subjectData[subject as keyof typeof subjectData] || subjectData.mathematics;

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
          
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">{currentSubject.title}</h1>
              <p className="text-xl text-muted-foreground">{currentSubject.description}</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">Level {currentSubject.level}</div>
              <div className="text-sm text-muted-foreground">{currentSubject.progress}% Complete</div>
            </div>
          </div>

          <div className="mb-8">
            <Progress value={currentSubject.progress} className="h-3" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-foreground mb-6">Lessons</h2>
            <div className="space-y-4">
              {currentSubject.lessons.map((lesson) => (
                <Card key={lesson.id} className="shadow-card border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-full ${
                          lesson.completed ? 'bg-achievement text-achievement-foreground' :
                          lesson.locked ? 'bg-muted text-muted-foreground' :
                          'bg-primary text-primary-foreground'
                        }`}>
                          {lesson.completed ? <CheckCircle className="w-6 h-6" /> :
                           lesson.locked ? <Lock className="w-6 h-6" /> :
                           <Play className="w-6 h-6" />}
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg text-foreground">{lesson.title}</h3>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            <span>{lesson.duration}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {lesson.completed && (
                          <Badge variant="secondary" className="bg-achievement text-achievement-foreground">
                            <Trophy className="w-3 h-3 mr-1" />
                            Completed
                          </Badge>
                        )}
                        <Link to={`/lesson/${subject}/${lesson.id}`}>
                          <Button 
                            variant={lesson.completed ? "secondary" : "game"}
                            disabled={lesson.locked}
                          >
                            {lesson.completed ? "Review" : lesson.locked ? "Locked" : "Start"}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <Card className="shadow-card border-0">
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Lessons Completed</span>
                  <span className="font-semibold">
                    {currentSubject.lessons.filter(l => l.completed).length}/{currentSubject.lessons.length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Time Invested</span>
                  <span className="font-semibold">2h 45m</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Achievements</span>
                  <span className="font-semibold text-achievement">12</span>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card border-0">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to={`/game/${subject}`} className="block">
                  <Button variant="game" className="w-full">
                    <Play className="w-4 h-4 mr-2" />
                    Practice Game
                  </Button>
                </Link>
                <Link to="/progress" className="block">
                  <Button variant="learning" className="w-full">
                    <BookOpen className="w-4 h-4 mr-2" />
                    View Progress
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SubjectDetail;