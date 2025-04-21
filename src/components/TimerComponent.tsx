
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, Settings } from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function TimerComponent() {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [focusTime, setFocusTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            // Timer completed
            const audio = new Audio('/timer-complete.mp3');
            audio.play().catch(e => console.log('Audio play prevented:', e));
            
            setIsRunning(false);
            clearInterval(intervalRef.current!);
            
            // Toggle between focus and break
            setIsBreak(prevIsBreak => !prevIsBreak);
            
            // Set appropriate time based on new state
            return !isBreak ? breakTime * 60 : focusTime * 60;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, isBreak, focusTime, breakTime]);
  
  // Reset timer when switching between focus and break
  useEffect(() => {
    setTimeLeft(isBreak ? breakTime * 60 : focusTime * 60);
  }, [isBreak, focusTime, breakTime]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(isBreak ? breakTime * 60 : focusTime * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = 1 - timeLeft / (isBreak ? breakTime * 60 : focusTime * 60);

  const applyCustomSettings = (focusMinutes: number, breakMinutes: number) => {
    setFocusTime(focusMinutes);
    setBreakTime(breakMinutes);
    setTimeLeft(isBreak ? breakMinutes * 60 : focusMinutes * 60);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative w-64 h-64 rounded-full flex items-center justify-center">
        <svg className="absolute w-full h-full" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="5"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={isBreak ? '#0D9488' : '#3B82F6'}
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={Math.PI * 2 * 45}
            strokeDashoffset={Math.PI * 2 * 45 * (1 - progress)}
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div className="text-4xl font-bold">{formatTime(timeLeft)}</div>
      </div>
      
      <div className="text-xl font-medium">
        {isBreak ? 'Break Time' : 'Focus Time'}
      </div>
      
      <div className="flex gap-4">
        <Button
          onClick={toggleTimer}
          variant="default"
          size="lg"
          className={isBreak ? "bg-focus-teal hover:bg-focus-teal/90" : "bg-focus-blue hover:bg-focus-blue/90"}
        >
          {isRunning ? <Pause className="mr-2" size={18} /> : <Play className="mr-2" size={18} />}
          {isRunning ? 'Pause' : 'Start'}
        </Button>
        
        <Button
          onClick={resetTimer}
          variant="outline"
          size="lg"
        >
          Reset
        </Button>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <Settings size={20} />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Timer Settings</DialogTitle>
              <DialogDescription>
                Customize your focus and break durations.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="focusTime">Focus Time (minutes)</Label>
                <Input
                  id="focusTime"
                  type="number"
                  value={focusTime}
                  onChange={(e) => setFocusTime(Number(e.target.value))}
                  min="1"
                  max="60"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="breakTime">Break Time (minutes)</Label>
                <Input
                  id="breakTime"
                  type="number"
                  value={breakTime}
                  onChange={(e) => setBreakTime(Number(e.target.value))}
                  min="1"
                  max="30"
                />
              </div>
              <Button 
                className="w-full mt-4" 
                onClick={() => applyCustomSettings(focusTime, breakTime)}
              >
                Apply Settings
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mt-8 w-full max-w-md">
        <p className="text-sm text-muted-foreground mb-2">Session Tracker</p>
        <div className="flex gap-1">
          {Array.from({ length: 4 }, (_, i) => (
            <div 
              key={i} 
              className={`h-2 flex-1 rounded-full ${i < 2 ? 'bg-focus-blue' : 'bg-gray-200'}`}
            />
          ))}
        </div>
        <p className="text-sm text-muted-foreground mt-1">2/4 sessions completed</p>
      </div>
    </div>
  );
}
