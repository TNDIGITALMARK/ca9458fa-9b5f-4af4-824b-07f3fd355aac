"use client";

import * as React from "react";
import { MusicNavigation } from "@/components/music-navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AreaChart,
  Area,
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
  DollarSign,
  TrendingUp,
  Calendar,
  Download,
  Filter,
  Search,
  Globe,
  Music,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  Play,
  Eye,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";

// Mock data for royalty tracking
const earningsOverview = {
  totalEarnings: 15247.83,
  thisMonth: 2847.52,
  lastMonth: 2331.76,
  pendingPayment: 1247.32,
  paidOut: 14000.51,
  nextPayoutDate: "2024-04-15"
};

const monthlyEarnings = [
  { month: "Oct", streaming: 1200, performance: 300, mechanical: 150, sync: 0 },
  { month: "Nov", streaming: 1450, performance: 320, mechanical: 180, sync: 250 },
  { month: "Dec", streaming: 1800, performance: 280, mechanical: 200, sync: 0 },
  { month: "Jan", streaming: 2100, performance: 350, mechanical: 220, sync: 500 },
  { month: "Feb", streaming: 1950, performance: 290, mechanical: 190, sync: 0 },
  { month: "Mar", streaming: 2400, performance: 380, mechanical: 250, sync: 780 }
];

const platformBreakdown = [
  { platform: "Spotify", earnings: 8247.32, streams: 523400, rate: 0.0032, color: "#1DB954" },
  { platform: "Apple Music", earnings: 3842.17, streams: 198200, rate: 0.0042, color: "#FA243C" },
  { platform: "YouTube Music", earnings: 1654.28, streams: 285600, rate: 0.0018, color: "#FF0000" },
  { platform: "Amazon Music", earnings: 987.45, streams: 87300, rate: 0.0038, color: "#FF9900" },
  { platform: "Tidal", earnings: 356.82, streams: 12400, rate: 0.0121, color: "#00FFFF" },
  { platform: "Others", earnings: 159.79, streams: 34200, rate: 0.0025, color: "#8B5CF6" }
];

const recentTransactions = [
  {
    id: 1,
    date: "2024-03-15",
    description: "Monthly Royalty Payment - March 2024",
    amount: 2847.52,
    status: "completed",
    platform: "All Platforms",
    type: "payout",
    transactionId: "TXN-2024-03-15-001"
  },
  {
    id: 2,
    date: "2024-02-15",
    description: "Monthly Royalty Payment - February 2024",
    amount: 2331.76,
    status: "completed",
    platform: "All Platforms",
    type: "payout",
    transactionId: "TXN-2024-02-15-001"
  },
  {
    id: 3,
    date: "2024-01-20",
    description: "Sync License - TV Commercial",
    amount: 1500.00,
    status: "completed",
    platform: "Sync Licensing",
    type: "sync",
    transactionId: "SYNC-2024-01-20-003"
  },
  {
    id: 4,
    date: "2024-01-15",
    description: "Monthly Royalty Payment - January 2024",
    amount: 2156.88,
    status: "completed",
    platform: "All Platforms",
    type: "payout",
    transactionId: "TXN-2024-01-15-001"
  },
  {
    id: 5,
    date: "2024-01-01",
    description: "Performance Royalties - Q4 2023",
    amount: 890.45,
    status: "processing",
    platform: "Performance Rights",
    type: "performance",
    transactionId: "PRO-2024-01-01-012"
  }
];

const releaseEarnings = [
  {
    title: "Summer Nights EP",
    totalEarnings: 8945.73,
    streams: 523400,
    topPlatform: "Spotify",
    releaseDate: "2024-01-15",
    monthlyTrend: [
      { month: "Jan", amount: 1200 },
      { month: "Feb", amount: 1800 },
      { month: "Mar", amount: 2400 },
      { month: "Apr", amount: 1950 },
      { month: "May", amount: 1595.73 }
    ]
  },
  {
    title: "Midnight Drive (Single)",
    totalEarnings: 4782.19,
    streams: 289100,
    topPlatform: "Apple Music",
    releaseDate: "2023-11-10",
    monthlyTrend: [
      { month: "Jan", amount: 950 },
      { month: "Feb", amount: 1200 },
      { month: "Mar", amount: 1400 },
      { month: "Apr", amount: 1232.19 }
    ]
  },
  {
    title: "Acoustic Sessions Vol. 1",
    totalEarnings: 1519.91,
    streams: 94500,
    topPlatform: "YouTube Music",
    releaseDate: "2023-08-22",
    monthlyTrend: [
      { month: "Jan", amount: 280 },
      { month: "Feb", amount: 350 },
      { month: "Mar", amount: 420 },
      { month: "Apr", amount: 469.91 }
    ]
  }
];

function EarningsOverview() {
  const monthOverMonthChange = ((earningsOverview.thisMonth - earningsOverview.lastMonth) / earningsOverview.lastMonth) * 100;
  const isPositive = monthOverMonthChange > 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="music-card">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Earnings</p>
              <p className="text-2xl font-bold">${earningsOverview.totalEarnings.toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="music-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">This Month</p>
                <p className="text-2xl font-bold">${earningsOverview.thisMonth.toLocaleString()}</p>
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
                <span>{Math.abs(monthOverMonthChange).toFixed(1)}%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="music-card">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
              <Clock className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Pending</p>
              <p className="text-2xl font-bold">${earningsOverview.pendingPayment.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Next payout: {new Date(earningsOverview.nextPayoutDate).toLocaleDateString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="music-card">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Paid Out</p>
              <p className="text-2xl font-bold">${earningsOverview.paidOut.toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function PlatformBreakdown() {
  const totalEarnings = platformBreakdown.reduce((sum, p) => sum + p.earnings, 0);

  return (
    <Card className="music-card">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Globe className="h-5 w-5" />
          <span>Platform Breakdown</span>
        </CardTitle>
        <CardDescription>Earnings by streaming platform</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            {platformBreakdown.map((platform, index) => {
              const percentage = (platform.earnings / totalEarnings) * 100;
              return (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: platform.color }}
                    />
                    <div>
                      <p className="font-medium">{platform.platform}</p>
                      <p className="text-sm text-muted-foreground">
                        {platform.streams.toLocaleString()} streams • ${platform.rate.toFixed(4)} per stream
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${platform.earnings.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">{percentage.toFixed(1)}%</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={platformBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="earnings"
                >
                  {platformBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Earnings']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ReleaseEarningsCard({ release }: { release: typeof releaseEarnings[0] }) {
  return (
    <Card className="music-card">
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold">{release.title}</h3>
              <p className="text-sm text-muted-foreground">
                Released {new Date(release.releaseDate).toLocaleDateString()}
              </p>
              <div className="flex items-center space-x-4 mt-2 text-sm">
                <div className="flex items-center space-x-1">
                  <DollarSign className="h-3 w-3" />
                  <span>${release.totalEarnings.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Play className="h-3 w-3" />
                  <span>{release.streams.toLocaleString()}</span>
                </div>
              </div>
            </div>
            <Badge variant="outline" className="text-xs">
              Top: {release.topPlatform}
            </Badge>
          </div>

          <div>
            <ResponsiveContainer width="100%" height={100}>
              <AreaChart data={release.monthlyTrend}>
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="hsl(var(--accent))"
                  fill="hsl(var(--accent))"
                  fillOpacity={0.2}
                />
                <XAxis dataKey="month" hide />
                <YAxis hide />
                <Tooltip formatter={(value) => [`$${value}`, 'Earnings']} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function RoyaltiesPage() {
  const [selectedPeriod, setSelectedPeriod] = React.useState("6months");
  const [searchTerm, setSearchTerm] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");

  const filteredTransactions = recentTransactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.transactionId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || transaction.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="status-published text-xs">Completed</Badge>;
      case 'processing':
        return <Badge className="status-pending text-xs">Processing</Badge>;
      case 'failed':
        return <Badge className="status-draft text-xs">Failed</Badge>;
      default:
        return <Badge variant="outline" className="text-xs">{status}</Badge>;
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'payout': return <CreditCard className="h-4 w-4" />;
      case 'sync': return <Music className="h-4 w-4" />;
      case 'performance': return <Play className="h-4 w-4" />;
      default: return <DollarSign className="h-4 w-4" />;
    }
  };

  return (
    <MusicNavigation>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Royalty Tracking</h1>
            <p className="text-muted-foreground">
              Track your music earnings and payment history
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="3months">Last 3 months</SelectItem>
                <SelectItem value="6months">Last 6 months</SelectItem>
                <SelectItem value="1year">Last year</SelectItem>
                <SelectItem value="all">All time</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </Button>
          </div>
        </div>

        {/* Overview Cards */}
        <EarningsOverview />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Revenue Trend Chart */}
          <Card className="lg:col-span-2 music-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Revenue Breakdown</span>
              </CardTitle>
              <CardDescription>Monthly earnings by revenue source</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={monthlyEarnings}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="streaming"
                    stackId="1"
                    stroke="#1DB954"
                    fill="#1DB954"
                    fillOpacity={0.8}
                  />
                  <Area
                    type="monotone"
                    dataKey="performance"
                    stackId="1"
                    stroke="#FF6B35"
                    fill="#FF6B35"
                    fillOpacity={0.8}
                  />
                  <Area
                    type="monotone"
                    dataKey="mechanical"
                    stackId="1"
                    stroke="#4ECDC4"
                    fill="#4ECDC4"
                    fillOpacity={0.8}
                  />
                  <Area
                    type="monotone"
                    dataKey="sync"
                    stackId="1"
                    stroke="#9D4EDD"
                    fill="#9D4EDD"
                    fillOpacity={0.8}
                  />
                </AreaChart>
              </ResponsiveContainer>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-[#1DB954]"></div>
                  <span>Streaming</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-[#FF6B35]"></div>
                  <span>Performance</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-[#4ECDC4]"></div>
                  <span>Mechanical</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-[#9D4EDD]"></div>
                  <span>Sync</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Payout */}
          <Card className="music-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Next Payout</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">
                  ${earningsOverview.pendingPayment.toLocaleString()}
                </div>
                <p className="text-sm text-muted-foreground mt-1">Pending payment</p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Payout date:</span>
                  <span className="font-medium">
                    {new Date(earningsOverview.nextPayoutDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Payment method:</span>
                  <span className="font-medium">Bank Transfer</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Processing time:</span>
                  <span className="font-medium">2-3 business days</span>
                </div>
              </div>

              <Button className="w-full" variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                View Payment Details
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Platform Breakdown */}
        <PlatformBreakdown />

        {/* Detailed Views */}
        <Tabs defaultValue="transactions" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="transactions">Transaction History</TabsTrigger>
            <TabsTrigger value="releases">Release Earnings</TabsTrigger>
            <TabsTrigger value="statements">Statements</TabsTrigger>
          </TabsList>

          <TabsContent value="transactions">
            <Card className="music-card">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                  <div>
                    <CardTitle>Transaction History</CardTitle>
                    <CardDescription>All your royalty payments and earnings</CardDescription>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search transactions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="failed">Failed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Platform</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>
                          {new Date(transaction.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getTransactionIcon(transaction.type)}
                            <div>
                              <p className="font-medium">{transaction.description}</p>
                              <p className="text-xs text-muted-foreground">
                                {transaction.transactionId}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{transaction.platform}</TableCell>
                        <TableCell className="font-medium">
                          ${transaction.amount.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(transaction.status)}
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <FileText className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="releases">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">Release Earnings</h3>
                  <p className="text-muted-foreground">Performance breakdown by release</p>
                </div>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {releaseEarnings.map((release, index) => (
                  <ReleaseEarningsCard key={index} release={release} />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="statements">
            <Card className="music-card">
              <CardHeader>
                <CardTitle>Monthly Statements</CardTitle>
                <CardDescription>Download detailed royalty statements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["March 2024", "February 2024", "January 2024", "December 2023"].map((month) => (
                    <div key={month} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Royalty Statement - {month}</p>
                          <p className="text-sm text-muted-foreground">
                            Generated on {new Date().toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MusicNavigation>
  );
}