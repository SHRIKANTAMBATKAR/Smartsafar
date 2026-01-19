import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { MapPin, Clock, ArrowRight, Bus, Filter, ChevronDown, Star, Loader2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import api from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [from, setFrom] = useState(searchParams.get("from") || "");
  const [to, setTo] = useState(searchParams.get("to") || "");
  const [buses, setBuses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!from.trim() || !to.trim()) {
      toast({
        title: "Please enter both locations",
        description: "From and To fields are required",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setHasSearched(true);
    try {
      const response = await api.get("/buses/search", {
        params: { from, to }
      });
      
      // Map backend response to frontend format
      const mappedBuses = response.data.map((bus) => ({
        id: bus.busId,
        number: bus.busNumber,
        name: bus.routeName || bus.busNumber,
        from: from,
        to: to,
        fare: bus.fare || 0,
        rating: bus.rating || 4.5,
        available: true,
        status: "On Time",
        busId: bus.busId,
        routeName: bus.routeName,
      }));
      
      setBuses(mappedBuses);
      
      if (mappedBuses.length === 0) {
        toast({
          title: "No buses found",
          description: "Try searching with different locations",
        });
      }
    } catch (error) {
      console.error("Search error:", error);
      toast({
        title: "Search failed",
        description: error.response?.data?.message || "Unable to search buses. Please try again.",
        variant: "destructive",
      });
      setBuses([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Load buses if from and to are in URL params
  useEffect(() => {
    const fromParam = searchParams.get("from");
    const toParam = searchParams.get("to");
    if (fromParam && toParam) {
      setFrom(fromParam);
      setTo(toParam);
    }
  }, [searchParams]);

  // Trigger search when from/to are set from URL params
  useEffect(() => {
    if (from && to && searchParams.get("from") && searchParams.get("to") && !hasSearched) {
      handleSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [from, to]);

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
              <Button size="lg" className="h-12" onClick={handleSearch} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Searching...
                  </>
                ) : (
                  "Search Buses"
                )}
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
          {hasSearched && (
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{buses.length}</span> available buses
              </p>
              <Button variant="ghost" size="sm" className="gap-2">
                Sort by: Departure Time <ChevronDown className="w-4 h-4" />
              </Button>
            </div>
          )}

          {/* Bus Results */}
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : buses.length === 0 && hasSearched ? (
            <div className="text-center py-12">
              <Bus className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-muted-foreground mb-2">No buses found</h3>
              <p className="text-sm text-muted-foreground">
                Try searching with different locations
              </p>
            </div>
          ) : (
            buses.length > 0 && (
              <div className="space-y-4">
                {buses.map((bus, index) => (
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
                      <p className="text-xl font-bold">--:--</p>
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
                      <p className="text-sm text-muted-foreground mt-1">{bus.routeName || "Route"}</p>
                    </div>
                    <div className="text-center lg:text-right">
                      <p className="text-xl font-bold">--:--</p>
                      <p className="text-sm text-muted-foreground truncate">{bus.to}</p>
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="flex items-center gap-4 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-border lg:pl-6">
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">₹{bus.fare.toFixed(2)}</p>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Star className="w-3 h-3 fill-warning text-warning" />
                        <span>{bus.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    <Link to={`/book?busId=${bus.busId}&from=${encodeURIComponent(bus.from)}&to=${encodeURIComponent(bus.to)}&routeName=${encodeURIComponent(bus.routeName || '')}`}>
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
            )
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SearchPage;
