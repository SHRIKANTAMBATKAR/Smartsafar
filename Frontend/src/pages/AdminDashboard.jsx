import { motion } from "framer-motion";
import { useState } from "react";
import {
  Bus, Users, Ticket, DollarSign, TrendingUp, MapPin,
  Plus, Edit, Trash2, Search, Filter, ChevronDown,
  LayoutDashboard, Route, Calendar, Settings, LogOut
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AnalyticsCard } from "@/components/dashboard/AnalyticsCard";
import { RoleBadge } from "@/components/dashboard/RoleBadge";

// Mock data
const stats = [
  { icon: Bus, label: "Total Buses", value: "248", change: "+12", positive: true },
  { icon: Users, label: "Daily Riders", value: "52,847", change: "+8.2%", positive: true },
  { icon: Ticket, label: "Tickets Sold", value: "12,456", change: "+15%", positive: true },
  { icon: DollarSign, label: "Revenue", value: "$84,520", change: "+22%", positive: true },
];

const mockBuses = [
  { id: 1, number: "42A", name: "Central Express", status: "active", driver: "John Smith", capacity: 50, route: "Central - Mall" },
  { id: 2, number: "15B", name: "Airport Shuttle", status: "active", driver: "Mike Johnson", capacity: 45, route: "Central - Airport" },
  { id: 3, number: "7C", name: "University Line", status: "maintenance", driver: "Sarah Wilson", capacity: 55, route: "Downtown - University" },
  { id: 4, number: "88", name: "Beach Route", status: "active", driver: "Tom Brown", capacity: 48, route: "Central - Beach" },
  { id: 5, number: "22D", name: "Hospital Express", status: "inactive", driver: "Lisa Davis", capacity: 42, route: "North - Hospital" },
];

const sidebarLinks = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Bus, label: "Buses", active: false },
  { icon: Route, label: "Routes", active: false },
  { icon: MapPin, label: "Stops", active: false },
  { icon: Calendar, label: "Schedules", active: false },
  { icon: Ticket, label: "Tickets", active: false },
  { icon: Users, label: "Users", active: false },
  { icon: TrendingUp, label: "Analytics", active: false },
  { icon: Settings, label: "Settings", active: false },
];

const AdminDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBuses = mockBuses.filter(
    (bus) =>
      bus.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bus.number.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background flex">
      <motion.aside
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.4 }}
        className="w-64 bg-card border-r border-border flex flex-col"
      >
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Bus className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">
              City<span className="text-primary">Bus</span>
            </span>
          </Link>
        </div>

        <nav className="flex-1 px-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-2">
            Management
          </p>
          <ul className="space-y-1">
            {sidebarLinks.map((link) => (
              <li key={link.label}>
                <button
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${link.active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                >
                  <link.icon className="w-5 h-5" />
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-semibold">
              A
            </div>
            <div>
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-muted-foreground">admin@citybus.com</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="w-full gap-2">
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <RoleBadge role="Admin" />
              </div>
              <p className="text-sm text-muted-foreground">Welcome back, Admin</p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Calendar className="w-4 h-4 mr-2" />
                Today
              </Button>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Bus
              </Button>
            </div>
          </div>
        </header>

        <main className="p-8">
          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {stats.map((stat, index) => (
              <AnalyticsCard
                key={stat.label}
                title={stat.label}
                value={stat.value}
                icon={stat.icon}
                change={stat.change}
                trend="up"
              />
            ))}
          </motion.div>

          {/* Buses Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-card rounded-xl border border-border"
          >
            <div className="p-6 border-b border-border">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold">Bus Fleet</h2>
                  <p className="text-sm text-muted-foreground">Manage your bus fleet</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search buses..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 w-64"
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bus Number</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Route</TableHead>
                  <TableHead>Driver</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBuses.map((bus) => (
                  <TableRow key={bus.id}>
                    <TableCell className="font-semibold">{bus.number}</TableCell>
                    <TableCell>{bus.name}</TableCell>
                    <TableCell className="text-muted-foreground">{bus.route}</TableCell>
                    <TableCell>{bus.driver}</TableCell>
                    <TableCell>{bus.capacity} seats</TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={
                          bus.status === "active"
                            ? "bg-success/10 text-success"
                            : bus.status === "maintenance"
                              ? "bg-warning/10 text-warning"
                              : "bg-muted text-muted-foreground"
                        }
                      >
                        {bus.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon-sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon-sm" className="text-destructive hover:text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="p-4 border-t border-border flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {filteredBuses.length} of {mockBuses.length} buses
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>Previous</Button>
                <Button variant="outline" size="sm">Next</Button>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
