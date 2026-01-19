import { motion } from "framer-motion";
import { Search, Ticket, MapPin, Shield, Zap, Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Search,
    title: "Smart Search",
    description: "Find buses by route, number, or stop name. Get instant results with real-time availability.",
    color: "from-primary to-primary/70",
  },
  {
    icon: Ticket,
    title: "Digital Ticketing",
    description: "Book tickets instantly with automatic fare calculation. Go paperless with digital passes.",
    color: "from-accent to-accent/70",
  },
  {
    icon: MapPin,
    title: "Route Navigation",
    description: "Interactive maps showing all stops. Navigate with confidence to your destination.",
    color: "from-success to-success/70",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description: "Protected accounts with role-based access. Your data and transactions are always safe.",
    color: "from-warning to-warning/70",
  },
  {
    icon: Star,
    title: "Rewards Program",
    description: "Earn points for every ride. Get discounts and exclusive offers for frequent travelers.",
    color: "from-primary to-accent",
  },
  {
    icon: Zap,
    title: "Real-Time Updates",
    description: "Live bus tracking and arrival predictions. Stay informed about delays and diversions.",
    color: "from-destructive to-destructive/70",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Features</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
            Everything You Need for
            <br />
            <span className="text-gradient">Smart City Travel</span>
          </h2>
          <p className="text-muted-foreground">
            Our platform combines powerful features to make your daily commute seamless and enjoyable.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-card rounded-2xl p-6 border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link to="/search">
            <Button variant="hero" size="lg">
              Start Exploring
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
