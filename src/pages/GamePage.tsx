import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Trophy,
  Zap,
  Timer,
  Target,
  Star
} from "lucide-react";

const GamePage = () => {
  const { subject } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameStarted, setGameStarted] = useState(false);

  const questions = [
    {
      question: "What is 2x + 5 = 13?",
      options: ["x = 4", "x = 6", "x = 8", "x = 9"],
      correct: 0,
      explanation: "Subtract 5 from both sides: 2x = 8, then divide by 2: x = 4"
    },
    {
      question: "Solve for y: 3y - 7 = 14",
      options: ["y = 5", "y = 7", "y = 9", "y = 11"],
      correct: 1,
      explanation: "Add 7 to both sides: 3y = 21, then divide by 3: y = 7"
    },
    {
      question: "What is the value of x in: x/4 = 6?",
      options: ["x = 20", "x = 22", "x = 24", "x = 26"],
      correct: 2,
      explanation: "Multiply both sides by 4: x = 6 × 4 = 24"
    }
  ];

  const handleAnswer = (selectedIndex: number) => {
    if (selectedIndex === questions[currentQuestion].correct) {
      setScore(score + 100);
    }
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setGameStarted(false);
    }
  };

  const startGame = () => {
    setGameStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(30);
  };

  const resetGame = () => {
    setGameStarted(false);
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(30);
  };

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
              Back to {subject?.charAt(0).toUpperCase()}{subject?.slice(1)}
            </Button>
          </Link>
          
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Math Challenge Game</h1>
            <p className="text-xl text-muted-foreground">Test your algebra skills and earn XP!</p>
          </div>
        </div>

        {!gameStarted ? (
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-game border-0 text-center">
              <CardContent className="p-12">
                <div className="mb-8">
                  <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Play?</h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    Answer {questions.length} algebra questions as quickly as possible to earn XP and achievements!
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{questions.length}</div>
                    <div className="text-sm text-muted-foreground">Questions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">30s</div>
                    <div className="text-sm text-muted-foreground">Per Question</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-achievement">+300</div>
                    <div className="text-sm text-muted-foreground">Max XP</div>
                  </div>
                </div>

                <Button variant="game" size="lg" onClick={startGame} className="px-12">
                  <Zap className="w-5 h-5 mr-2" />
                  Start Game
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
              <Card className="shadow-card border-0">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary">{score}</div>
                  <div className="text-sm text-muted-foreground">Score</div>
                </CardContent>
              </Card>
              <Card className="shadow-card border-0">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-accent">{timeLeft}s</div>
                  <div className="text-sm text-muted-foreground">Time Left</div>
                </CardContent>
              </Card>
              <Card className="shadow-card border-0">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-foreground">
                    {currentQuestion + 1}/{questions.length}
                  </div>
                  <div className="text-sm text-muted-foreground">Question</div>
                </CardContent>
              </Card>
              <Card className="shadow-card border-0">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-achievement">Lv.8</div>
                  <div className="text-sm text-muted-foreground">Current</div>
                </CardContent>
              </Card>
            </div>

            <div className="mb-6">
              <Progress value={((currentQuestion) / questions.length) * 100} className="h-3" />
            </div>

            <Card className="shadow-game border-0">
              <CardHeader>
                <CardTitle className="text-center text-2xl">
                  {questions[currentQuestion].question}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {questions[currentQuestion].options.map((option, index) => (
                    <Button
                      key={index}
                      variant="learning"
                      size="lg"
                      className="p-6 text-lg h-auto justify-start"
                      onClick={() => handleAnswer(index)}
                    >
                      <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mr-4 text-sm font-bold">
                        {String.fromCharCode(65 + index)}
                      </span>
                      {option}
                    </Button>
                  ))}
                </div>

                <div className="text-center">
                  <Badge variant="secondary" className="text-sm">
                    <Timer className="w-3 h-3 mr-1" />
                    {timeLeft} seconds remaining
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {!gameStarted && currentQuestion === questions.length && (
          <div className="max-w-2xl mx-auto mt-8">
            <Card className="shadow-achievement border-0 text-center">
              <CardContent className="p-12">
                <div className="w-20 h-20 bg-gradient-achievement rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-10 h-10 text-achievement-foreground" />
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-4">Game Complete!</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  You scored {score} points and earned {score} XP!
                </p>
                
                <div className="flex items-center justify-center gap-2 mb-6">
                  {[1, 2, 3].map((star) => (
                    <Star 
                      key={star} 
                      className={`w-8 h-8 ${score >= star * 100 ? 'text-achievement fill-current' : 'text-muted'}`} 
                    />
                  ))}
                </div>

                <div className="space-y-3">
                  <Button variant="game" size="lg" onClick={resetGame} className="w-full">
                    <Zap className="w-5 h-5 mr-2" />
                    Play Again
                  </Button>
                  <Link to={`/subject/${subject}`} className="block">
                    <Button variant="secondary" size="lg" className="w-full">
                      Back to Lessons
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default GamePage;