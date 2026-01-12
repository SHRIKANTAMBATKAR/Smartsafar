import { motion } from "framer-motion";
import { ArrowRight, Smartphone, CreditCard, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const steps = [
  {
    step: "01",
    icon: Smartphone,
    title: "Search Your Route",
    description: "Enter your starting point and destination. Our smart system finds the best bus options for you.",
  },
  {
    step: "02",
    icon: CreditCard,
    title: "Book Your Ticket",
    description: "Select your preferred bus and time. Complete secure payment with multiple options available.",
  },
  {
    step: "03",
    icon: CheckCircle,
    title: "Travel with Ease",
    description: "Get your digital ticket instantly. Track your bus in real-time and enjoy a hassle-free journey.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">How It Works</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">
              Book Your Ride in
              <br />
              <span className="text-gradient">Three Simple Steps</span>
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md">
              Our streamlined process makes booking city bus tickets faster than ever. 
              No more waiting in queues or dealing with cash.
            </p>

            <div className="space-y-6">
              {steps.map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="flex gap-4 items-start"
                >
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold shadow-md">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link to="/book" className="inline-block mt-8">
              <Button variant="hero" size="lg">
                Book Your First Ride
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-3xl" />
              
              {/* Main card */}
              <div className="relative glass rounded-3xl p-8 border border-border/50 shadow-lg">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent mx-auto flex items-center justify-center mb-4">
                    <Smartphone className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold">Digital Ticket</h3>
                  <p className="text-sm text-muted-foreground">Ready to board</p>
                </div>

                <div className="space-y-4 p-4 bg-background/50 rounded-xl">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Route</span>
                    <span className="font-semibold">Bus 42A</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">From</span>
                    <span className="font-medium">Central Station</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">To</span>
                    <span className="font-medium">City Mall</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Fare</span>
                    <span className="font-bold text-primary">$2.50</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-success/10 rounded-xl flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <span className="text-sm font-medium text-success">Valid for today's travel</span>
                </div>

                {/* QR Code placeholder */}
                <div className="mt-6 flex justify-center">
                  <div className="w-24 h-24 bg-foreground rounded-lg flex items-center justify-center">
                    <div className="w-20 h-20 bg-background rounded grid grid-cols-4 grid-rows-4 gap-0.5 p-1">
                      {[...Array(16)].map((_, i) => (
                        <div key={i} className={`${Math.random() > 0.5 ? 'bg-foreground' : 'bg-transparent'} rounded-sm`} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
