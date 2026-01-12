import { motion } from "framer-motion";
import { User, Ticket, Star, TrendingUp, Clock, MapPin, Gift, Settings, LogOut, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { RoleBadge } from "@/components/dashboard/RoleBadge";
import { AnalyticsCard } from "@/components/dashboard/AnalyticsCard";

// Mock user data
const userData = {
  name: "John Doe",
  email: "john.doe@email.com",
  memberSince: "January 2024",
  totalTrips: 47,
  points: 2350,
  pointsToNextReward: 650,
  level: "Gold",
};

// Mock recent trips
const recentTrips = [
  {
    id: 1,
    busNumber: "42A",
    from: "Central Station",
    to: "City Mall",
    date: "Dec 28, 2024",
    time: "10:30 AM",
    fare: 2.50,
    status: "completed",
  },
  {
    id: 2,
    busNumber: "15B",
    from: "Central Station",
    to: "Airport Terminal",
    date: "Dec 25, 2024",
    time: "02:15 PM",
    fare: 5.00,
    status: "completed",
  },
  {
    id: 3,
    busNumber: "7C",
    from: "Downtown Hub",
    to: "State University",
    date: "Dec 22, 2024",
    time: "08:00 AM",
    fare: 1.75,
    status: "completed",
  },
];

// Mock upcoming bookings
const upcomingBookings = [
  {
    id: 1,
    busNumber: "88",
    from: "Central Station",
    to: "Sunset Beach",
    date: "Jan 02, 2025",
    time: "09:00 AM",
    fare: 4.00,
  },
];

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome back, {userData.name.split(" ")[0]}!</h1>
            <p className="text-muted-foreground">Here's your travel overview</p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Stats Cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                {[
                  { icon: Ticket, label: "Total Trips", value: userData.totalTrips },
                  { icon: Star, label: "Points", value: userData.points.toLocaleString() },
                  { icon: TrendingUp, label: "Level", value: userData.level },
                  { icon: Gift, label: "Rewards", value: "3 Available" },
                ].map((stat, index) => (
                  <AnalyticsCard
                    key={stat.label}
                    title={stat.label}
                    value={stat.value}
                    icon={stat.icon}
                  />
                ))}
              </motion.div>

              {/* Upcoming Bookings */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-card rounded-xl border border-border p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Upcoming Bookings</h2>
                  <Link to="/book">
                    <Button variant="ghost" size="sm" className="gap-1">
                      Book New <ChevronRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>

                {upcomingBookings.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingBookings.map((booking) => (
                      <div key={booking.id} className="p-4 bg-primary/5 rounded-xl border border-primary/20">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                              <Ticket className="w-6 h-6 text-primary-foreground" />
                            </div>
                            <div>
                              <p className="font-semibold">Bus {booking.busNumber}</p>
                              <p className="text-sm text-muted-foreground">{booking.date} at {booking.time}</p>
                            </div>
                          </div>
                          <Badge className="bg-success/10 text-success border-success/20">Confirmed</Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4 text-success" />
                          <span>{booking.from}</span>
                          <span>→</span>
                          <MapPin className="w-4 h-4 text-destructive" />
                          <span>{booking.to}</span>
                          <span className="ml-auto font-semibold text-foreground">${booking.fare.toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Ticket className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                    <p className="text-muted-foreground">No upcoming bookings</p>
                    <Link to="/search">
                      <Button variant="link" className="mt-2">Book a trip now</Button>
                    </Link>
                  </div>
                )}
              </motion.div>

              {/* Recent Trips */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-card rounded-xl border border-border p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Recent Trips</h2>
                  <Button variant="ghost" size="sm" className="gap-1">
                    View All <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  {recentTrips.map((trip) => (
                    <div key={trip.id} className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                          <Ticket className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium">Bus {trip.busNumber}</p>
                          <p className="text-sm text-muted-foreground">{trip.from} → {trip.to}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${trip.fare.toFixed(2)}</p>
                        <p className="text-sm text-muted-foreground">{trip.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Profile Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-card rounded-xl border border-border p-6"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <User className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{userData.name}</h3>
                    <p className="text-sm text-muted-foreground">{userData.email}</p>
                    <div className="mt-2 flex gap-2">
                      <RoleBadge role="User" />
                      <Badge className="bg-warning/10 text-warning border-warning/20">
                        {userData.level} Member
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Settings className="w-4 h-4" />
                    Account Settings
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2 text-destructive hover:text-destructive">
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </Button>
                </div>
              </motion.div>

              {/* Points Progress */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-gradient-to-br from-primary to-accent rounded-xl p-6 text-primary-foreground"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Star className="w-6 h-6" />
                  <h3 className="font-semibold">Reward Points</h3>
                </div>
                <p className="text-4xl font-bold mb-2">{userData.points.toLocaleString()}</p>
                <p className="text-primary-foreground/70 text-sm mb-4">
                  {userData.pointsToNextReward} points to next reward
                </p>
                <Progress value={((3000 - userData.pointsToNextReward) / 3000) * 100} className="h-2 bg-primary-foreground/20" />
                <p className="text-xs text-primary-foreground/70 mt-2">
                  Earn 50 points for every trip!
                </p>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-card rounded-xl border border-border p-6"
              >
                <h3 className="font-semibold mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  <Link to="/search">
                    <Button variant="secondary" className="w-full h-auto py-4 flex-col gap-2">
                      <Ticket className="w-5 h-5" />
                      <span className="text-xs">Book Trip</span>
                    </Button>
                  </Link>
                  <Link to="/routes">
                    <Button variant="secondary" className="w-full h-auto py-4 flex-col gap-2">
                      <MapPin className="w-5 h-5" />
                      <span className="text-xs">View Routes</span>
                    </Button>
                  </Link>
                  <Button variant="secondary" className="w-full h-auto py-4 flex-col gap-2">
                    <Clock className="w-5 h-5" />
                    <span className="text-xs">History</span>
                  </Button>
                  <Button variant="secondary" className="w-full h-auto py-4 flex-col gap-2">
                    <Gift className="w-5 h-5" />
                    <span className="text-xs">Rewards</span>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DashboardPage;
