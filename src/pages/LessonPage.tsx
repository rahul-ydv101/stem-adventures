import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  ArrowRight,
  CheckCircle,
  BookOpen,
  Play,
  Trophy
} from "lucide-react";

const LessonPage = () => {
  const { subject, lessonId } = useParams();
  
  const lessonContent = {
    "1": {
      title: "Basic Algebra",
      subject: "Mathematics",
      progress: 0,
      sections: [
        {
          title: "Introduction to Variables",
          content: "Variables are symbols that represent unknown values. In algebra, we commonly use letters like x, y, and z.",
          completed: false
        },
        {
          title: "Simple Equations",
          content: "An equation shows that two expressions are equal. For example: x + 3 = 7",
          completed: false
        },
        {
          title: "Solving for x",
          content: "To solve x + 3 = 7, we subtract 3 from both sides: x = 7 - 3 = 4",
          completed: false
        }
      ]
    }
  };

  const currentLesson = lessonContent[lessonId as keyof typeof lessonContent] || lessonContent["1"];

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
          <Link to={`/subject/${subject}`}>
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to {currentLesson.subject}
            </Button>
          </Link>
          
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">{currentLesson.title}</h1>
              <Badge variant="secondary" className="text-sm">
                <BookOpen className="w-3 h-3 mr-1" />
                {currentLesson.subject}
              </Badge>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{currentLesson.progress}%</div>
              <div className="text-sm text-muted-foreground">Complete</div>
            </div>
          </div>

          <Progress value={currentLesson.progress} className="h-3 mb-8" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {currentLesson.sections.map((section, index) => (
                <Card key={index} className="shadow-card border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${
                        section.completed ? 'bg-achievement text-achievement-foreground' : 'bg-primary text-primary-foreground'
                      }`}>
                        {section.completed ? <CheckCircle className="w-5 h-5" /> : <BookOpen className="w-5 h-5" />}
                      </div>
                      <span>{section.title}</span>
                      {section.completed && (
                        <Badge variant="secondary" className="bg-achievement text-achievement-foreground">
                          <Trophy className="w-3 h-3 mr-1" />
                          Completed
                        </Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg text-foreground leading-relaxed mb-6">
                      {section.content}
                    </p>
                    
                    {/* Interactive Example */}
                    <div className="bg-muted/30 p-6 rounded-lg mb-6">
                      <h4 className="font-semibold text-foreground mb-3">Try it yourself:</h4>
                      <div className="bg-card p-4 rounded border-2 border-dashed border-muted">
                        <p className="text-center text-muted-foreground text-lg">
                          Solve: x + 5 = 12
                        </p>
                        <div className="flex justify-center mt-4">
                          <Button variant="game">
                            <Play className="w-4 h-4 mr-2" />
                            Start Interactive Exercise
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <Button 
                        variant={section.completed ? "secondary" : "game"}
                        size="lg"
                        className="px-8"
                      >
                        {section.completed ? "Mark as Complete" : "Complete Section"}
                        <CheckCircle className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-between mt-8">
              <Button variant="secondary" size="lg">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous Lesson
              </Button>
              <Button variant="game" size="lg">
                Next Lesson
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="shadow-card border-0">
              <CardHeader>
                <CardTitle>Lesson Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sections</span>
                  <span className="font-semibold">0/{currentLesson.sections.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Time Spent</span>
                  <span className="font-semibold">0m</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">XP to Earn</span>
                  <span className="font-semibold text-accent">+125</span>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card border-0">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to={`/game/${subject}`} className="block">
                  <Button variant="learning" className="w-full">
                    <Play className="w-4 h-4 mr-2" />
                    Practice Game
                  </Button>
                </Link>
                <Button variant="achievement" className="w-full">
                  <Trophy className="w-4 h-4 mr-2" />
                  View Achievements
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LessonPage;