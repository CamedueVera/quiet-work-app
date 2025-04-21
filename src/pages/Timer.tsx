
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TimerComponent } from "@/components/TimerComponent";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const Timer = () => {
  const [task, setTask] = useState("");
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex flex-col items-center py-12 px-6">
        <div className="w-full max-w-4xl space-y-10">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">Focus Timer</h1>
            <p className="text-muted-foreground">
              Use the Pomodoro technique to boost your productivity
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
            <div className="w-full max-w-sm flex-shrink-0">
              <TimerComponent />
            </div>
            
            <div className="w-full max-w-sm space-y-6 border rounded-lg p-6 bg-card">
              <div className="space-y-2">
                <h3 className="font-medium">What are you working on?</h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="E.g., Project proposal"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                  />
                  <Button type="button">Save</Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Task History</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-muted-foreground italic">
                    Task history will appear here after you complete sessions.
                  </p>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Background Sound</h3>
                <Select disabled>
                  <SelectTrigger>
                    <SelectValue placeholder="Select sound" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="white-noise">White Noise</SelectItem>
                    <SelectItem value="rain">Rain</SelectItem>
                    <SelectItem value="cafe">Cafe Ambience</SelectItem>
                    <SelectItem value="forest">Forest</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  (Requires Spotify integration - coming soon)
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Timer;
