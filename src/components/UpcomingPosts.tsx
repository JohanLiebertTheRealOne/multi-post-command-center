
import { Clock, Instagram, Facebook, Youtube, Music, MoreVertical } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const UpcomingPosts = () => {
  const upcomingPosts = [
    {
      id: 1,
      title: "Nouveau produit été 2025",
      platforms: ["instagram", "facebook"],
      scheduledTime: "Aujourd'hui 14:30",
      status: "scheduled",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=60&h=60&fit=crop&crop=center",
    },
    {
      id: 2,
      title: "Tutoriel makeup naturel",
      platforms: ["youtube", "tiktok"],
      scheduledTime: "Demain 10:00",
      status: "scheduled",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=60&h=60&fit=crop&crop=center",
    },
    {
      id: 3,
      title: "Behind the scenes",
      platforms: ["instagram"],
      scheduledTime: "15 Mai 16:00",
      status: "draft",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=60&h=60&fit=crop&crop=center",
    },
    {
      id: 4,
      title: "Carousel tips marketing",
      platforms: ["facebook", "instagram"],
      scheduledTime: "18 Mai 09:00",
      status: "scheduled",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=60&h=60&fit=crop&crop=center",
    },
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
      instagram: "text-pink-500",
      facebook: "text-blue-600",
      youtube: "text-red-500",
      tiktok: "text-gray-800",
    };
    return colors[platform as keyof typeof colors] || "text-gray-500";
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      scheduled: { label: "Programmé", color: "bg-blue-100 text-blue-700" },
      draft: { label: "Brouillon", color: "bg-gray-100 text-gray-700" },
      publishing: { label: "Publication...", color: "bg-yellow-100 text-yellow-700" },
    };
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.draft;
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center text-xl">
          <Clock className="mr-2 h-5 w-5 text-green-600" />
          Posts à Venir
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {upcomingPosts.map((post) => {
          const statusConfig = getStatusBadge(post.status);
          
          return (
            <div
              key={post.id}
              className="flex items-center space-x-4 p-4 rounded-lg border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all duration-200"
            >
              {/* Post Image */}
              <img
                src={post.image}
                alt={post.title}
                className="w-12 h-12 rounded-lg object-cover"
              />

              {/* Post Details */}
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 truncate">{post.title}</h4>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-sm text-gray-500">{post.scheduledTime}</span>
                  <Badge className={statusConfig.color}>{statusConfig.label}</Badge>
                </div>
                
                {/* Platforms */}
                <div className="flex items-center space-x-1 mt-2">
                  {post.platforms.map((platform, index) => {
                    const Icon = getPlatformIcon(platform);
                    return (
                      <div
                        key={index}
                        className="p-1 rounded bg-gray-50 hover:bg-gray-100 transition-colors"
                      >
                        <Icon className={`h-4 w-4 ${getPlatformColor(platform)}`} />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Actions Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Modifier</DropdownMenuItem>
                  <DropdownMenuItem>Dupliquer</DropdownMenuItem>
                  <DropdownMenuItem>Reprogrammer</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">Supprimer</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          );
        })}

        {/* View All Button */}
        <Button variant="outline" className="w-full mt-4 border-dashed">
          Voir tous les posts programmés
        </Button>
      </CardContent>
    </Card>
  );
};

export default UpcomingPosts;
