import { motion } from "framer-motion";
import { MapPin, Bus, Clock, Navigation } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

// Mock routes data
const mockRoutes = [
  {
    id: 1,
    number: "42A",
    name: "Central Express",
    start: "Central Station",
    end: "City Mall",
    stops: ["Central Station", "Park Avenue", "Main Street", "Hospital Junction", "Market Square", "Tech Park", "University Gate", "Sports Complex", "Shopping Center", "City Mall"],
    frequency: "Every 15 min",
    color: "from-primary to-accent",
  },
  {
    id: 2,
    number: "15B",
    name: "Airport Shuttle",
    start: "Central Station",
    end: "Airport Terminal",
    stops: ["Central Station", "Business District", "Convention Center", "Hotel Zone", "Cargo Area", "Terminal 1", "Terminal 2", "Airport Terminal"],
    frequency: "Every 30 min",
    color: "from-accent to-success",
  },
  {
    id: 3,
    number: "7C",
    name: "University Line",
    start: "Downtown Hub",
    end: "State University",
    stops: ["Downtown Hub", "Library", "Museum", "Art Gallery", "Science Center", "Research Park", "Student Housing", "Campus Gate", "State University"],
    frequency: "Every 10 min",
    color: "from-success to-primary",
  },
  {
    id: 4,
    number: "88",
    name: "Beach Route",
    start: "Central Station",
    end: "Sunset Beach",
    stops: ["Central Station", "Riverside", "Marina Bay", "Lighthouse Point", "Beach Promenade", "Surfside", "Coral Cove", "Sunset Beach"],
    frequency: "Every 20 min",
    color: "from-warning to-accent",
  },
];

const RoutesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRoute, setSelectedRoute] = useState(null);

  const filteredRoutes = mockRoutes.filter(
    (route) =>
      route.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.stops.some((stop) => stop.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Bus Routes</h1>
            <p className="text-muted-foreground">Explore all available routes and stops</p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8"
          >
            <div className="relative max-w-md">
              <Navigation className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search routes, bus numbers, or stops..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12"
              />
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Routes List */}
            <div className="lg:col-span-1 space-y-4">
              {filteredRoutes.map((route, index) => (
                <motion.div
                  key={route.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  onClick={() => setSelectedRoute(route)}
                  className={`bg-card rounded-xl border p-4 cursor-pointer transition-all duration-300 ${selectedRoute?.id === route.id
                      ? "border-primary shadow-md"
                      : "border-border hover:border-primary/30"
                    }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${route.color} flex items-center justify-center`}>
                      <Bus className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold">{route.number}</span>
                        <Badge variant="secondary">{route.stops.length} stops</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{route.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-success" />
                    <span className="truncate">{route.start}</span>
                    <span className="text-muted-foreground">→</span>
                    <MapPin className="w-4 h-4 text-destructive" />
                    <span className="truncate">{route.end}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{route.frequency}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Route Details */}
            <div className="lg:col-span-2">
              {selectedRoute ? (
                <motion.div
                  key={selectedRoute.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-card rounded-2xl border border-border p-6"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${selectedRoute.color} flex items-center justify-center`}>
                        <Bus className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold">{selectedRoute.number}</h2>
                        <p className="text-muted-foreground">{selectedRoute.name}</p>
                      </div>
                    </div>
                    <Link to={`/search?bus=${selectedRoute.number}`}>
                      <Button>View Schedule</Button>
                    </Link>
                  </div>

                  <div className="mb-6 p-4 bg-secondary/50 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-success" />
                        <span className="font-medium">{selectedRoute.start}</span>
                      </div>
                      <span className="text-muted-foreground">{selectedRoute.frequency}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{selectedRoute.end}</span>
                        <div className="w-3 h-3 rounded-full bg-destructive" />
                      </div>
                    </div>
                  </div>

                  {/* Stops List */}
                  <h3 className="font-semibold mb-4">All Stops ({selectedRoute.stops.length})</h3>
                  <div className="relative">
                    {selectedRoute.stops.map((stop, index) => (
                      <div key={index} className="flex items-start gap-4 mb-4 last:mb-0">
                        <div className="flex flex-col items-center">
                          <div className={`w-4 h-4 rounded-full border-2 ${index === 0
                              ? "bg-success border-success"
                              : index === selectedRoute.stops.length - 1
                                ? "bg-destructive border-destructive"
                                : "bg-card border-primary"
                            }`} />
                          {index < selectedRoute.stops.length - 1 && (
                            <div className="w-0.5 h-8 bg-border" />
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <p className={`font-medium ${index === 0 || index === selectedRoute.stops.length - 1
                              ? "text-foreground"
                              : "text-muted-foreground"
                            }`}>
                            {stop}
                          </p>
                          {(index === 0 || index === selectedRoute.stops.length - 1) && (
                            <p className="text-sm text-muted-foreground">
                              {index === 0 ? "Starting Point" : "Destination"}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <div className="bg-card rounded-2xl border border-border p-12 text-center">
                  <Bus className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-muted-foreground mb-2">Select a Route</h3>
                  <p className="text-sm text-muted-foreground">
                    Click on a route card to view detailed information and stops
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RoutesPage;
