"use client";

import { MusicNavigation } from "@/components/music-navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from "recharts";
import {
  TrendingUp,
  Music,
  DollarSign,
  Users,
  Play,
  Calendar,
  Globe,
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

export const dynamic = 'force-dynamic';

// Mock data matching the specifications
const statsData = [
  {
    title: "Total Releases",
    value: "24",
    change: "+3 this month",
    trend: "up" as const,
    icon: Music,
    color: "bg-accent"
  },
  {
    title: "Monthly Earnings",
    value: "$2,847.52",
    change: "+12.5% vs last month",
    trend: "up" as const,
    icon: DollarSign,
    color: "bg-accent"
  },
  {
    title: "Total Streams",
    value: "1.2M",
    change: "+8.3% this week",
    trend: "up" as const,
    icon: Play,
    color: "bg-accent"
  },
  {
    title: "Active Listeners",
    value: "45.2K",
    change: "-2.1% vs last month",
    trend: "down" as const,
    icon: Users,
    color: "bg-accent"
  }
];

const recentReleases = [
  {
    id: 1,
    title: "Summer Nights EP",
    artist: "Jane Smith",
    status: "Published",
    releaseDate: "2024-03-15",
    platforms: ["Spotify", "Apple Music", "YouTube Music"],
    coverArt: "/album-covers/summer-nights.jpg",
    streams: "125.4K",
    earnings: "$847.23"
  },
  {
    id: 2,
    title: "Midnight Drive (Single)",
    artist: "Jane Smith",
    status: "Pending Review",
    releaseDate: "2024-03-28",
    platforms: ["Spotify", "Apple Music", "Amazon Music"],
    coverArt: "/album-covers/midnight-drive.jpg",
    streams: "0",
    earnings: "$0.00"
  },
  {
    id: 3,
    title: "Acoustic Sessions Vol. 1",
    artist: "Jane Smith",
    status: "Draft",
    releaseDate: "2024-04-10",
    platforms: [],
    coverArt: "/album-covers/acoustic-sessions.jpg",
    streams: "0",
    earnings: "$0.00"
  }
];

const platformData = [
  { name: 'Spotify', value: 45, color: '#1DB954' },
  { name: 'Apple Music', value: 28, color: '#FA243C' },
  { name: 'YouTube Music', value: 15, color: '#FF0000' },
  { name: 'Amazon Music', value: 8, color: '#FF9900' },
  { name: 'Others', value: 4, color: '#8B5CF6' }
];

const earningsData = [
  { month: 'Jan', amount: 1200 },
  { month: 'Feb', amount: 1800 },
  { month: 'Mar', amount: 2847 },
  { month: 'Apr', amount: 2200 },
  { month: 'May', amount: 2600 },
  { month: 'Jun', amount: 3100 }
];

const streamData = [
  { day: 'Mon', streams: 2400 },
  { day: 'Tue', streams: 3200 },
  { day: 'Wed', streams: 2800 },
  { day: 'Thu', streams: 3600 },
  { day: 'Fri', streams: 4200 },
  { day: 'Sat', streams: 3800 },
  { day: 'Sun', streams: 3400 }
];

function StatCard({ stat }: { stat: typeof statsData[0] }) {
  const Icon = stat.icon;
  const isPositive = stat.trend === "up";

  return (
    <Card className="music-card">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
              <Icon className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </div>
          <div className="text-right">
            <div className={`flex items-center space-x-1 text-sm ${
              isPositive ? 'text-green-600' : 'text-red-600'
            }`}>
              {isPositive ? (
                <ArrowUpRight className="h-4 w-4" />
              ) : (
                <ArrowDownRight className="h-4 w-4" />
              )}
              <span>{stat.change}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ReleaseCard({ release }: { release: typeof recentReleases[0] }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published': return 'status-published';
      case 'Pending Review': return 'status-pending';
      case 'Draft': return 'status-draft';
      default: return 'status-draft';
    }
  };

  return (
    <Card className="music-card">
      <CardContent className="p-4">
        <div className="flex items-start space-x-4">
          <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
            <Music className="h-8 w-8 text-muted-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold text-foreground truncate">{release.title}</h3>
                <p className="text-sm text-muted-foreground">{release.artist}</p>
              </div>
              <Button variant="ghost" size="icon" className="flex-shrink-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center space-x-2 mb-3">
              <Badge className={`text-xs ${getStatusColor(release.status)}`}>
                {release.status}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {new Date(release.releaseDate).toLocaleDateString()}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Streams</p>
                <p className="font-medium">{release.streams}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Earnings</p>
                <p className="font-medium">{release.earnings}</p>
              </div>
            </div>

            {release.platforms.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1">
                {release.platforms.slice(0, 3).map((platform) => (
                  <Badge key={platform} variant="outline" className="text-xs">
                    {platform}
                  </Badge>
                ))}
                {release.platforms.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{release.platforms.length - 3} more
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  return (
    <MusicNavigation>
      <div className="p-6 space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, Jane! Here's your music distribution overview.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Last 30 days</span>
            </Button>
            <Button className="flex items-center space-x-2">
              <Music className="h-4 w-4" />
              <span>New Release</span>
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
            <StatCard key={index} stat={stat} />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Revenue Chart */}
          <Card className="lg:col-span-2 music-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Revenue Overview</span>
              </CardTitle>
              <CardDescription>Monthly earnings from all platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={earningsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, 'Earnings']} />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="hsl(var(--accent))"
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--accent))', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Platform Distribution */}
          <Card className="music-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="h-5 w-5" />
                <span>Platform Distribution</span>
              </CardTitle>
              <CardDescription>Stream distribution by platform</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={platformData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {platformData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Share']} />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {platformData.map((platform, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: platform.color }}
                      />
                      <span>{platform.name}</span>
                    </div>
                    <span className="font-medium">{platform.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Releases and Weekly Streams */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Recent Releases */}
          <Card className="music-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Music className="h-5 w-5" />
                  <span>Recent Releases</span>
                </div>
                <Button variant="ghost" size="sm">View All</Button>
              </CardTitle>
              <CardDescription>Your latest music releases and their performance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentReleases.map((release) => (
                <ReleaseCard key={release.id} release={release} />
              ))}
            </CardContent>
          </Card>

          {/* Weekly Streams */}
          <Card className="music-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Play className="h-5 w-5" />
                <span>Weekly Streams</span>
              </CardTitle>
              <CardDescription>Stream activity over the past week</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={streamData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value}`, 'Streams']} />
                  <Bar
                    dataKey="streams"
                    fill="hsl(var(--accent))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </MusicNavigation>
  );
}