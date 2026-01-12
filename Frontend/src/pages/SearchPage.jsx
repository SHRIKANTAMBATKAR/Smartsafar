import { motion } from "framer-motion";
import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { MapPin, Clock, ArrowRight, Bus, Filter, ChevronDown, Star } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

// Mock bus data
const mockBuses = [
  {
    id: 1,
    number: "42A",
    name: "Central Express",
    from: "Central Station",
    to: "City Mall",
    departureTime: "10:30 AM",
    arrivalTime: "11:15 AM",
    duration: "45 min",
    fare: 2.50,
    stops: 12,
    status: "On Time",
    rating: 4.8,
    available: true,
  },
  {
    id: 2,
    number: "15B",
    name: "Airport Shuttle",
    from: "Central Station",
    to: "Airport Terminal",
    departureTime: "10:45 AM",
    arrivalTime: "11:45 AM",
    duration: "60 min",
    fare: 5.00,
    stops: 8,
    status: "On Time",
    rating: 4.9,
    available: true,
  },
  {
    id: 3,
    number: "7C",
    name: "University Line",
    from: "Downtown Hub",
    to: "State University",
    departureTime: "11:00 AM",
    arrivalTime: "11:35 AM",
    duration: "35 min",
    fare: 1.75,
    stops: 15,
    status: "5 min delay",
    rating: 4.5,
    available: true,
  },
  {
    id: 4,
    number: "88",
    name: "Beach Route",
    from: "Central Station",
    to: "Sunset Beach",
    departureTime: "11:15 AM",
    arrivalTime: "12:30 PM",
    duration: "75 min",
    fare: 4.00,
    stops: 20,
    status: "On Time",
    rating: 4.7,
    available: true,
  },
  {
    id: 5,
    number: "22D",
    name: "Hospital Express",
    from: "North Terminal",
    to: "City Hospital",
    departureTime: "11:30 AM",
    arrivalTime: "12:00 PM",
    duration: "30 min",
    fare: 2.00,
    stops: 6,
    status: "On Time",
    rating: 4.6,
    available: false,
  },
];

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [from, setFrom] = useState(searchParams.get("from") || "");
  const [to, setTo] = useState(searchParams.get("to") || "");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Search Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Find Your Bus</h1>
            <p className="text-muted-foreground">Search available buses for your route</p>
          </motion.div>

          {/* Search Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass rounded-2xl p-4 md:p-6 shadow-md border border-border/50 mb-8"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-success" />
                <Input
                  placeholder="From"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="pl-12 h-12 bg-background"
                />
              </div>
              <div className="flex-1 relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-destructive" />
                <Input
                  placeholder="To"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="pl-12 h-12 bg-background"
                />
              </div>
              <Button size="lg" className="h-12">
                Search Buses
              </Button>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="w-4 h-4" />
                Filters
              </Button>
              <Button variant="secondary" size="sm" className="gap-1">
                Time <ChevronDown className="w-3 h-3" />
              </Button>
              <Button variant="secondary" size="sm" className="gap-1">
                Price <ChevronDown className="w-3 h-3" />
              </Button>
              <Button variant="secondary" size="sm" className="gap-1">
                Bus Type <ChevronDown className="w-3 h-3" />
              </Button>
            </div>
          </motion.div>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{mockBuses.length}</span> available buses
            </p>
            <Button variant="ghost" size="sm" className="gap-2">
              Sort by: Departure Time <ChevronDown className="w-4 h-4" />
            </Button>
          </div>

          {/* Bus Results */}
          <div className="space-y-4">
            {mockBuses.map((bus, index) => (
              <motion.div
                key={bus.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`bg-card rounded-xl border border-border p-4 md:p-6 hover:border-primary/30 hover:shadow-md transition-all duration-300 ${!bus.available ? 'opacity-60' : ''}`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  {/* Bus Info */}
                  <div className="flex items-center gap-4 flex-shrink-0">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <Bus className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-lg">{bus.number}</span>
                        <Badge variant={bus.status === "On Time" ? "default" : "secondary"} className={bus.status === "On Time" ? "bg-success/10 text-success border-success/20" : "bg-warning/10 text-warning border-warning/20"}>
                          {bus.status}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground text-sm">{bus.name}</p>
                    </div>
                  </div>

                  {/* Route Details */}
                  <div className="flex-1 grid grid-cols-3 gap-4 py-4 lg:py-0">
                    <div className="text-center lg:text-left">
                      <p className="text-xl font-bold">{bus.departureTime}</p>
                      <p className="text-sm text-muted-foreground truncate">{bus.from}</p>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <div className="w-2 h-2 rounded-full bg-success" />
                        <div className="h-px w-16 bg-border" />
                        <Clock className="w-4 h-4" />
                        <div className="h-px w-16 bg-border" />
                        <div className="w-2 h-2 rounded-full bg-destructive" />
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{bus.duration} • {bus.stops} stops</p>
                    </div>
                    <div className="text-center lg:text-right">
                      <p className="text-xl font-bold">{bus.arrivalTime}</p>
                      <p className="text-sm text-muted-foreground truncate">{bus.to}</p>
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="flex items-center gap-4 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-border lg:pl-6">
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">${bus.fare.toFixed(2)}</p>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Star className="w-3 h-3 fill-warning text-warning" />
                        <span>{bus.rating}</span>
                      </div>
                    </div>
                    <Link to={`/book?bus=${bus.id}`}>
                      <Button disabled={!bus.available} className="gap-2">
                        {bus.available ? "Book Now" : "Sold Out"}
                        {bus.available && <ArrowRight className="w-4 h-4" />}
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SearchPage;
