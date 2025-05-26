
import { useState } from "react";
import { ChevronLeft, ChevronRight, Instagram, Facebook, Youtube, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const daysOfWeek = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
  const monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  const posts = [
    { id: 1, day: 15, platform: 'instagram', time: '10:00', title: 'Story produit' },
    { id: 2, day: 15, platform: 'facebook', time: '14:00', title: 'Post engagement' },
    { id: 3, day: 18, platform: 'youtube', time: '16:00', title: 'Vidéo tuto' },
    { id: 4, day: 20, platform: 'tiktok', time: '12:00', title: 'Trend dance' },
    { id: 5, day: 22, platform: 'instagram', time: '09:00', title: 'Carousel tips' },
  ];

  const getPlatformIcon = (platform: string) => {
    const icons = {
      instagram: Instagram,
      facebook: Facebook,
      youtube: Youtube,
      tiktok: Music,
    };
    return icons[platform as keyof typeof icons] || Instagram;
  };

  const getPlatformColor = (platform: string) => {
    const colors = {
      instagram: 'bg-pink-500',
      facebook: 'bg-blue-600',
      youtube: 'bg-red-500',
      tiktok: 'bg-gray-800',
    };
    return colors[platform as keyof typeof colors] || 'bg-gray-500';
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return firstDay === 0 ? 6 : firstDay - 1; // Convert Sunday (0) to be last day (6)
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const today = new Date().getDate();

  return (
    <div className="space-y-4">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <div className="flex space-x-1">
          <Button variant="ghost" size="sm" onClick={() => navigateMonth('prev')}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => navigateMonth('next')}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Days of week header */}
        {daysOfWeek.map(day => (
          <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}

        {/* Empty cells for days before month starts */}
        {Array.from({ length: firstDay }).map((_, index) => (
          <div key={`empty-${index}`} className="p-2 h-24"></div>
        ))}

        {/* Calendar days */}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          const dayPosts = posts.filter(post => post.day === day);
          const isToday = day === today && currentDate.getMonth() === new Date().getMonth();

          return (
            <div
              key={day}
              className={cn(
                "p-2 h-24 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer",
                isToday && "bg-blue-50 border-blue-200"
              )}
            >
              <div className={cn(
                "text-sm font-medium mb-1",
                isToday ? "text-blue-600" : "text-gray-900"
              )}>
                {day}
              </div>
              <div className="space-y-1">
                {dayPosts.slice(0, 2).map(post => {
                  const Icon = getPlatformIcon(post.platform);
                  return (
                    <div
                      key={post.id}
                      className="flex items-center space-x-1 text-xs p-1 rounded bg-white shadow-sm border"
                    >
                      <div className={cn("w-2 h-2 rounded-full", getPlatformColor(post.platform))} />
                      <span className="truncate text-gray-700">{post.time}</span>
                    </div>
                  );
                })}
                {dayPosts.length > 2 && (
                  <div className="text-xs text-gray-500 font-medium">
                    +{dayPosts.length - 2} autres
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center space-x-6 text-sm">
        {[
          { platform: 'instagram', label: 'Instagram', color: 'bg-pink-500' },
          { platform: 'facebook', label: 'Facebook', color: 'bg-blue-600' },
          { platform: 'youtube', label: 'YouTube', color: 'bg-red-500' },
          { platform: 'tiktok', label: 'TikTok', color: 'bg-gray-800' },
        ].map(item => (
          <div key={item.platform} className="flex items-center space-x-2">
            <div className={cn("w-3 h-3 rounded-full", item.color)} />
            <span className="text-gray-600">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarView;
