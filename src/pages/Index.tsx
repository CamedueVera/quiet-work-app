
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FeatureCard } from "@/components/FeatureCard";
import { Calendar, Clock, ChartLine, Play } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-6 text-center">
          <div className="container mx-auto max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Focus Better, Achieve More
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              QuietWork helps freelancers boost productivity with focused work sessions, 
              ambient music, and detailed performance insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" className="bg-focus-blue hover:bg-focus-blue/90 px-8">
                  Get Started
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="px-8">
                  Log In
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section id="features" className="py-20 px-6 bg-muted/30">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Designed for Deep Focus</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our app is built specifically for freelancers who need to maintain 
                focus in distracting environments.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard 
                title="Pomodoro Timer"
                description="Use proven time-blocking techniques to maximize your productivity and prevent burnout."
                icon={<Clock className="h-6 w-6 text-focus-blue" />}
              />
              <FeatureCard 
                title="Session Tracking"
                description="Keep a record of your work sessions to understand your productivity patterns."
                icon={<Calendar className="h-6 w-6 text-focus-blue" />}
              />
              <FeatureCard 
                title="Performance Insights"
                description="View detailed statistics to identify your most productive times and improve your work habits."
                icon={<ChartLine className="h-6 w-6 text-focus-blue" />}
              />
            </div>
            
            <div className="mt-16 text-center">
              <Link to="/timer">
                <Button size="lg" className="bg-focus-blue hover:bg-focus-blue/90">
                  <Play className="mr-2" size={18} />
                  Try the Timer
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-20 px-6">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                QuietWork is designed to be simple and effective, helping you focus with minimal effort.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="order-2 md:order-1">
                <div className="space-y-6">
                  <div className="flex gap-4 items-start">
                    <div className="bg-focus-blue text-white rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">1</div>
                    <div>
                      <h3 className="text-xl font-medium mb-2">Set Your Timer</h3>
                      <p className="text-muted-foreground">
                        Choose between the classic Pomodoro (25/5) or customize your own work/break intervals.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 items-start">
                    <div className="bg-focus-blue text-white rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">2</div>
                    <div>
                      <h3 className="text-xl font-medium mb-2">Focus Deeply</h3>
                      <p className="text-muted-foreground">
                        Work distraction-free during your focus session with optional ambient music.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 items-start">
                    <div className="bg-focus-blue text-white rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">3</div>
                    <div>
                      <h3 className="text-xl font-medium mb-2">Take Breaks</h3>
                      <p className="text-muted-foreground">
                        When the timer rings, take a short break to rest your mind before the next session.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 items-start">
                    <div className="bg-focus-blue text-white rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">4</div>
                    <div>
                      <h3 className="text-xl font-medium mb-2">Track Progress</h3>
                      <p className="text-muted-foreground">
                        Review your focus stats to understand your productivity trends and improve over time.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="order-1 md:order-2 flex justify-center">
                <div className="bg-muted/50 border rounded-lg p-8 w-full max-w-md aspect-square flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-focus-blue mb-4">25:00</div>
                    <p className="text-xl font-medium">Focus Session</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 px-6 bg-focus-blue/10">
          <div className="container mx-auto text-center max-w-3xl">
            <h2 className="text-3xl font-bold mb-6">Ready to Boost Your Productivity?</h2>
            <p className="text-lg mb-10">
              Join thousands of freelancers who have improved their focus and gotten more done.
            </p>
            <Link to="/signup">
              <Button size="lg" className="bg-focus-blue hover:bg-focus-blue/90 px-8">
                Get Started for Free
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
