import { motion } from "framer-motion";
import { MapPin, Bus, Clock, Radio, Navigation2 } from "lucide-react";
import { useState, useCallback } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import BusTrackingMap, { busRoutes } from "@/components/tracking/BusTrackingMap";
import ETAPanel from "@/components/tracking/ETAPanel";

const routes = [
  { id: '42A', name: 'Central Express', color: 'bg-sky-500' },
  { id: '15B', name: 'Airport Shuttle', color: 'bg-teal-500' },
  { id: '7C', name: 'University Line', color: 'bg-green-500' },
  { id: '88', name: 'Beach Route', color: 'bg-amber-500' },
];

const TrackingPage = () => {
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [selectedBus, setSelectedBus] = useState(null);
  const [allBuses, setAllBuses] = useState([]);

  const handleBusSelect = useCallback((_busId, bus) => {
    setSelectedBus(bus);
  }, []);

  const handleBusesUpdate = useCallback((buses) => {
    setAllBuses(buses);
    if (selectedBus) {
      const updated = buses.find(b => b.id === selectedBus.id);
      if (updated) {
        setSelectedBus(updated);
      }
    }
  }, [selectedBus]);

  const handleCloseETA = () => {
    setSelectedBus(null);
  };

  // Get bus counts by route
  const getBusCount = (routeId) => allBuses.filter(b => b.route === routeId).length;

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
            className="mb-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Radio className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold">Live Bus Tracking</h1>
            </div>
            <p className="text-muted-foreground">
              Track buses in real-time on the map. Click on a bus to see ETAs for all stops.
            </p>
          </motion.div>

          {/* Route Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted-foreground mr-2">Filter by route:</span>
              <Button
                variant={selectedRoute === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedRoute(null)}
              >
                All Routes
              </Button>
              {routes.map((route) => (
                <Button
                  key={route.id}
                  variant={selectedRoute === route.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedRoute(route.id)}
                  className="gap-2"
                >
                  <div className={`w-2 h-2 rounded-full ${route.color}`} />
                  {route.id}
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Map and Sidebar */}
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Map */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`${selectedBus ? 'lg:col-span-2' : 'lg:col-span-3'} h-[600px] transition-all duration-300`}
            >
              <BusTrackingMap
                selectedRoute={selectedRoute}
                onBusSelect={handleBusSelect}
                onBusesUpdate={handleBusesUpdate}
              />
            </motion.div>

            {/* ETA Panel (shows when bus selected) */}
            {selectedBus && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="lg:col-span-1"
              >
                <ETAPanel
                  selectedBus={selectedBus}
                  onClose={handleCloseETA}
                />
              </motion.div>
            )}

            {/* Sidebar Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-4"
            >
              {/* Active Buses Card */}
              <div className="bg-card rounded-xl border border-border p-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Bus className="w-4 h-4" />
                  Active Buses
                </h3>
                <div className="space-y-3">
                  {routes.map((route) => {
                    const busCount = getBusCount(route.id);
                    const routeData = busRoutes[route.id];
                    const routeBuses = allBuses.filter(b => b.route === route.id);

                    return (
                      <div
                        key={route.id}
                        className={`p-3 rounded-lg border transition-all cursor-pointer ${selectedRoute === route.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/30'
                          }`}
                        onClick={() => setSelectedRoute(route.id === selectedRoute ? null : route.id)}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: routeData?.color }}
                            />
                            <span className="font-medium">{route.id}</span>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {busCount} bus{busCount !== 1 ? 'es' : ''}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{route.name}</p>

                        {/* Mini bus list */}
                        {routeBuses.length > 0 && (
                          <div className="mt-2 pt-2 border-t border-border/50 space-y-1">
                            {routeBuses.map(bus => (
                              <button
                                key={bus.id}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedBus(bus);
                                }}
                                className={`w-full text-left text-xs p-1.5 rounded flex items-center justify-between transition-colors ${selectedBus?.id === bus.id
                                  ? 'bg-primary/10 text-primary'
                                  : 'hover:bg-secondary'
                                  }`}
                              >
                                <span>{bus.id}</span>
                                <span className="text-muted-foreground">
                                  {bus.direction === 1 ? '→' : '←'}
                                </span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-card rounded-xl border border-border p-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Navigation2 className="w-4 h-4" />
                  Quick Stats
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total Active</span>
                    <span className="font-bold text-lg">{allBuses.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Routes Covered</span>
                    <span className="font-bold text-lg">{Object.keys(busRoutes).length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Avg. Frequency</span>
                    <span className="font-bold text-lg">15 min</span>
                  </div>
                </div>
              </div>

              {/* Help */}
              <div className="bg-primary/5 rounded-xl border border-primary/20 p-4">
                <h4 className="font-medium text-sm mb-2">How to use</h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li className="flex items-start gap-2">
                    <MapPin className="w-3 h-3 mt-0.5 text-primary" />
                    Click on bus icons to see real-time ETAs
                  </li>
                  <li className="flex items-start gap-2">
                    <Clock className="w-3 h-3 mt-0.5 text-primary" />
                    ETAs update automatically as buses move
                  </li>
                  <li className="flex items-start gap-2">
                    <Bus className="w-3 h-3 mt-0.5 text-primary" />
                    Green dots are start points, red are destinations
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TrackingPage;
