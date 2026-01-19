import { motion } from "framer-motion";
import { MapPin, Bus, Clock, Navigation, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import api from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const colorClasses = [
  "from-primary to-accent",
  "from-accent to-success",
  "from-success to-primary",
  "from-warning to-accent",
  "from-primary to-warning",
  "from-success to-accent",
];

const RoutesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [routeStops, setRouteStops] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingStops, setIsLoadingStops] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadRoutes();
  }, []);

  useEffect(() => {
    if (selectedRoute?.routeId) {
      loadRouteStops(selectedRoute.routeId);
    }
  }, [selectedRoute]);

  const loadRoutes = async () => {
    try {
      setIsLoading(true);
      const response = await api.get("/routes");
      const routesData = response.data.map((route, index) => ({
        ...route,
        id: route.routeId,
        number: route.routeName || `Route ${route.routeId}`,
        name: route.routeName,
        start: route.source,
        end: route.destination,
        stops: [],
        frequency: route.frequencyMinutes ? `Every ${route.frequencyMinutes} min` : "N/A",
        color: colorClasses[index % colorClasses.length],
      }));
      setRoutes(routesData);
    } catch (error) {
      console.error("Failed to load routes:", error);
      toast({
        title: "Failed to load routes",
        description: "Unable to fetch route information",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadRouteStops = async (routeId) => {
    try {
      setIsLoadingStops(true);
      const response = await api.get(`/route-stops/${routeId}`);
      const stops = response.data
        .sort((a, b) => a.stopOrder - b.stopOrder)
        .map((stop) => stop.stopName);
      setRouteStops(stops);
      
      // Update selected route with stops
      setSelectedRoute((prev) => prev ? { ...prev, stops } : null);
    } catch (error) {
      console.error("Failed to load route stops:", error);
      toast({
        title: "Failed to load stops",
        description: "Unable to fetch route stops",
        variant: "destructive",
      });
    } finally {
      setIsLoadingStops(false);
    }
  };

  const filteredRoutes = routes.filter(
    (route) =>
      route.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.number?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (route.stops || []).some((stop) => stop.toLowerCase().includes(searchQuery.toLowerCase()))
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
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : filteredRoutes.length === 0 ? (
                <div className="text-center py-12">
                  <Bus className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-muted-foreground mb-2">No routes found</h3>
                </div>
              ) : (
                filteredRoutes.map((route, index) => (
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
                        <Badge variant="secondary">{route.totalStops || 0} stops</Badge>
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
                ))
              )}
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
                  <h3 className="font-semibold mb-4">
                    All Stops ({isLoadingStops ? "..." : (selectedRoute.stops?.length || 0)})
                  </h3>
                  {isLoadingStops ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="w-6 h-6 animate-spin text-primary" />
                    </div>
                  ) : (
                    <div className="relative">
                      {(selectedRoute.stops || []).length > 0 ? (
                        selectedRoute.stops.map((stop, index) => (
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
                        ))
                      ) : (
                        <p className="text-muted-foreground text-center py-8">No stops available</p>
                      )}
                    </div>
                  )}
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
