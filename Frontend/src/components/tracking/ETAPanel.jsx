import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, MapPin, Bus, ArrowRight, CheckCircle2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { busRoutes, calculateETAs } from './BusTrackingMap';



const ETAPanel = ({ selectedBus, onClose }) => {
  if (!selectedBus) return null;

  const routeData = busRoutes[selectedBus.route];
  const etas = calculateETAs(selectedBus);

  // Find next stop
  const nextStop = etas.find(e => !e.passed);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        className="bg-card rounded-2xl border border-border overflow-hidden shadow-xl"
      >
        {/* Header */}
        <div
          className="p-4 text-white relative overflow-hidden"
          style={{ backgroundColor: routeData?.color || '#0ea5e9' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Bus className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Bus {selectedBus.route}</h3>
                <p className="text-sm opacity-90">
                  {selectedBus.direction === 1 ? 'Outbound' : 'Returning'} • {selectedBus.id}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-white/20"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Next Stop Highlight */}
        {nextStop && (
          <div className="p-4 bg-primary/5 border-b border-border">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <ArrowRight className="w-4 h-4" />
              <span>Next Stop</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-bold text-lg">{nextStop.stop}</span>
              <Badge
                className="text-base px-3 py-1"
                style={{ backgroundColor: routeData?.color, color: 'white' }}
              >
                <Clock className="w-4 h-4 mr-1" />
                {nextStop.eta} min
              </Badge>
            </div>
          </div>
        )}

        {/* All Stops with ETAs */}
        <div className="p-4 max-h-[400px] overflow-y-auto">
          <h4 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            All Stops ETA
          </h4>

          <div className="space-y-1">
            {etas.map((eta, index) => {
              const isFirst = index === 0;
              const isLast = index === etas.length - 1;
              const isNext = !eta.passed && etas.slice(0, index).every(e => e.passed);

              return (
                <motion.div
                  key={eta.stop}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${isNext ? 'bg-primary/10 border border-primary/30' : ''
                    } ${eta.passed ? 'opacity-50' : ''}`}
                >
                  {/* Timeline indicator */}
                  <div className="flex flex-col items-center w-6">
                    <div
                      className={`w-3 h-3 rounded-full border-2 ${eta.passed
                        ? 'bg-muted border-muted-foreground'
                        : isNext
                          ? 'border-primary bg-primary'
                          : isFirst
                            ? 'bg-success border-success'
                            : isLast
                              ? 'bg-destructive border-destructive'
                              : 'bg-card border-primary'
                        }`}
                    />
                    {!isLast && (
                      <div className={`w-0.5 h-6 ${eta.passed ? 'bg-muted' : 'bg-border'}`} />
                    )}
                  </div>

                  {/* Stop info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`font-medium truncate ${isNext ? 'text-primary' : ''}`}>
                        {eta.stop}
                      </span>
                      {eta.passed && (
                        <CheckCircle2 className="w-4 h-4 text-muted-foreground shrink-0" />
                      )}
                    </div>
                    {(isFirst || isLast) && (
                      <span className="text-xs text-muted-foreground">
                        {isFirst ? 'Starting Point' : 'Destination'}
                      </span>
                    )}
                  </div>

                  {/* ETA */}
                  <div className="text-right shrink-0">
                    {eta.passed ? (
                      <span className="text-sm text-muted-foreground">Passed</span>
                    ) : (
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-muted-foreground" />
                        <span className={`font-semibold ${isNext ? 'text-primary' : ''}`}>
                          {eta.eta} min
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-secondary/30 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {etas.filter(e => e.passed).length} of {etas.length} stops completed
            </span>
            <div className="flex items-center gap-1 text-success">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="font-medium">Live</span>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ETAPanel;
