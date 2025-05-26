
import { useState } from "react";
import { Calendar, Plus, BarChart3, Library, Settings, Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import CalendarView from "@/components/CalendarView";
import QuickStats from "@/components/QuickStats";
import UpcomingPosts from "@/components/UpcomingPosts";

const Index = () => {
  const [activeView, setActiveView] = useState("calendar");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-violet-50">
      <div className="flex">
        <Sidebar activeView={activeView} setActiveView={setActiveView} />
        
        <div className="flex-1 lg:ml-64">
          <Header />
          
          <main className="p-6 space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-blue-600 to-violet-600 rounded-2xl p-8 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Bonjour Emma ! 👋</h1>
                  <p className="text-blue-100 text-lg">
                    Vous avez 12 posts programmés cette semaine
                  </p>
                </div>
                <Button 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-blue-50 font-semibold"
                >
                  <Plus className="mr-2 h-5 w-5" />
                  Nouveau Post
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <QuickStats />

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Calendar View */}
              <div className="lg:col-span-2">
                <Card className="border-0 shadow-lg">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center text-xl">
                        <Calendar className="mr-2 h-5 w-5 text-blue-600" />
                        Calendrier de Publications
                      </CardTitle>
                      <div className="flex gap-2">
                        <Badge variant="secondary">Aujourd'hui: 3</Badge>
                        <Badge variant="outline">Cette semaine: 12</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CalendarView />
                  </CardContent>
                </Card>
              </div>

              {/* Upcoming Posts */}
              <div>
                <UpcomingPosts />
              </div>
            </div>

            {/* Recent Activity */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="mr-2 h-5 w-5 text-violet-600" />
                  Activité Récente
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { action: "Post publié", platform: "Instagram", time: "Il y a 2h", status: "success" },
                    { action: "Post programmé", platform: "LinkedIn", time: "Il y a 4h", status: "scheduled" },
                    { action: "Échec publication", platform: "TikTok", time: "Il y a 6h", status: "error" },
                    { action: "Post publié", platform: "Facebook", time: "Hier", status: "success" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          item.status === 'success' ? 'bg-green-500' :
                          item.status === 'scheduled' ? 'bg-blue-500' : 'bg-red-500'
                        }`} />
                        <div>
                          <p className="font-medium text-gray-900">{item.action}</p>
                          <p className="text-sm text-gray-500">{item.platform}</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-400">{item.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Index;
