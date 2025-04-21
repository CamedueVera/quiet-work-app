
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

const Statistics = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12 px-6 container mx-auto max-w-6xl">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Your Focus Statistics</h1>
            <p className="text-muted-foreground mt-2">
              Track your productivity and focus sessions over time
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-medium">
                  Total Focus Time
                </CardTitle>
                <Calendar size={16} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">0h 0m</div>
                <CardDescription>This week</CardDescription>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-medium">
                  Sessions Completed
                </CardTitle>
                <Calendar size={16} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">0</div>
                <CardDescription>This week</CardDescription>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-medium">
                  Daily Average
                </CardTitle>
                <Calendar size={16} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">0h 0m</div>
                <CardDescription>Per day this week</CardDescription>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="daily" className="mt-8">
            <TabsList>
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
            
            <TabsContent value="daily" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Daily Focus Time</CardTitle>
                  <CardDescription>
                    Your focus sessions for today
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                    Connect to Supabase to track your daily focus statistics
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="weekly" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Focus Time</CardTitle>
                  <CardDescription>
                    Your focus sessions for the current week
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                    Connect to Supabase to track your weekly focus statistics
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="monthly" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Focus Time</CardTitle>
                  <CardDescription>
                    Your focus sessions for the current month
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                    Connect to Supabase to track your monthly focus statistics
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Statistics;
