import React, { useEffect, useRef, useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AlertCircle, Key } from 'lucide-react';

// Mock bus route coordinates (simplified paths around a city center)
export const busRoutes = {
  '42A': {
    color: '#0ea5e9',
    path: [
      [77.5946, 12.9716], // Central Station
      [77.5996, 12.9756],
      [77.6046, 12.9796],
      [77.6096, 12.9836], // Hospital Junction
      [77.6146, 12.9876],
      [77.6196, 12.9916],
      [77.6246, 12.9956], // Tech Park
      [77.6296, 12.9996],
      [77.6346, 13.0036], // City Mall
    ],
    stops: ['Central Station', 'Park Avenue', 'Main Street', 'Hospital Junction', 'Market Square', 'Tech Park', 'University Gate', 'Sports Complex', 'City Mall'],
  },
  '15B': {
    color: '#14b8a6',
    path: [
      [77.5946, 12.9716], // Central Station
      [77.5846, 12.9766],
      [77.5746, 12.9816],
      [77.5646, 12.9866],
      [77.5546, 12.9916],
      [77.5446, 12.9966],
      [77.5346, 13.0016], // Airport
    ],
    stops: ['Central Station', 'Business District', 'Convention Center', 'Hotel Zone', 'Cargo Area', 'Terminal 1', 'Airport Terminal'],
  },
  '7C': {
    color: '#22c55e',
    path: [
      [77.5800, 12.9600], // Downtown Hub
      [77.5850, 12.9650],
      [77.5900, 12.9700],
      [77.5950, 12.9750],
      [77.6000, 12.9800],
      [77.6050, 12.9850],
      [77.6100, 12.9900], // State University
    ],
    stops: ['Downtown Hub', 'Library', 'Museum', 'Art Gallery', 'Science Center', 'Research Park', 'State University'],
  },
  '88': {
    color: '#f59e0b',
    path: [
      [77.5946, 12.9716], // Central Station
      [77.6046, 12.9616],
      [77.6146, 12.9516],
      [77.6246, 12.9416],
      [77.6346, 12.9316],
      [77.6446, 12.9216], // Sunset Beach
    ],
    stops: ['Central Station', 'Riverside', 'Marina Bay', 'Lighthouse Point', 'Beach Promenade', 'Sunset Beach'],
  },
};

// Bus positions - simulated real-time data


const initialBuses = [
  { id: 'bus-42a-1', route: '42A', position: [77.5946, 12.9716], progress: 0, direction: 1, speed: 0.015 },
  { id: 'bus-42a-2', route: '42A', position: [77.6196, 12.9916], progress: 0.6, direction: -1, speed: 0.012 },
  { id: 'bus-15b-1', route: '15B', position: [77.5646, 12.9866], progress: 0.5, direction: 1, speed: 0.018 },
  { id: 'bus-7c-1', route: '7C', position: [77.5900, 12.9700], progress: 0.3, direction: 1, speed: 0.014 },
  { id: 'bus-88-1', route: '88', position: [77.6146, 12.9516], progress: 0.4, direction: -1, speed: 0.016 },
];

// ETA calculation helper - returns minutes to each stop
export const calculateETAs = (bus) => {
  const routeData = busRoutes[bus.route];
  if (!routeData) return [];

  const totalStops = routeData.stops.length;
  const avgMinutesPerSegment = 3; // Average 3 minutes between stops

  return routeData.stops.map((stop, index) => {
    const stopProgress = index / (totalStops - 1);

    if (bus.direction === 1) {
      // Outbound
      if (stopProgress <= bus.progress) {
        return { stop, eta: 0, passed: true };
      }
      const progressDiff = stopProgress - bus.progress;
      const eta = Math.round(progressDiff * (totalStops - 1) * avgMinutesPerSegment);
      return { stop, eta, passed: false };
    } else {
      // Returning (reverse direction)
      if (stopProgress >= bus.progress) {
        return { stop, eta: 0, passed: true };
      }
      const progressDiff = bus.progress - stopProgress;
      const eta = Math.round(progressDiff * (totalStops - 1) * avgMinutesPerSegment);
      return { stop, eta, passed: false };
    }
  });
};



const BusTrackingMap = ({ selectedRoute, onBusSelect, onBusesUpdate }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markersRef = useRef({});
  const animationRef = useRef(null);

  const [mapboxToken, setMapboxToken] = useState(() => {
    return localStorage.getItem('mapbox_token') || '';
  });
  const [tokenInput, setTokenInput] = useState('');
  const [isTokenSet, setIsTokenSet] = useState(() => !!localStorage.getItem('mapbox_token'));
  const [buses, setBuses] = useState(initialBuses);

  const handleSetToken = () => {
    if (tokenInput.trim()) {
      localStorage.setItem('mapbox_token', tokenInput.trim());
      setMapboxToken(tokenInput.trim());
      setIsTokenSet(true);
    }
  };

  // Interpolate position along route
  const interpolatePosition = useCallback((route, progress) => {
    const routeData = busRoutes[route];
    if (!routeData) return [77.5946, 12.9716];

    const path = routeData.path;
    const totalSegments = path.length - 1;
    const currentSegment = Math.min(Math.floor(progress * totalSegments), totalSegments - 1);
    const segmentProgress = (progress * totalSegments) - currentSegment;

    const start = path[currentSegment];
    const end = path[currentSegment + 1] || path[currentSegment];

    return [
      start[0] + (end[0] - start[0]) * segmentProgress,
      start[1] + (end[1] - start[1]) * segmentProgress,
    ];
  }, []);

  // Animate buses
  useEffect(() => {
    if (!isTokenSet) return;

    const animate = () => {
      setBuses(prevBuses => {
        const newBuses = prevBuses.map(bus => {
          let newProgress = bus.progress + (bus.speed * bus.direction * 0.016); // Slower animation
          let newDirection = bus.direction;

          if (newProgress >= 1) {
            newProgress = 1;
            newDirection = -1;
          } else if (newProgress <= 0) {
            newProgress = 0;
            newDirection = 1;
          }

          const newPosition = interpolatePosition(bus.route, newProgress);

          return {
            ...bus,
            progress: newProgress,
            direction: newDirection,
            position: newPosition,
          };
        });

        return newBuses;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isTokenSet, interpolatePosition]);

  // Notify parent of bus updates
  useEffect(() => {
    onBusesUpdate?.(buses);
  }, [buses, onBusesUpdate]);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || !isTokenSet || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;

    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [77.5946, 12.9716],
        zoom: 12,
        pitch: 45,
      });

      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
        }),
        'top-right'
      );

      map.current.on('load', () => {
        // Add route lines
        Object.entries(busRoutes).forEach(([routeId, routeData]) => {
          const shouldShow = !selectedRoute || selectedRoute === routeId;

          map.current?.addSource(`route-${routeId}`, {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'LineString',
                coordinates: routeData.path,
              },
            },
          });

          map.current?.addLayer({
            id: `route-${routeId}`,
            type: 'line',
            source: `route-${routeId}`,
            layout: {
              'line-join': 'round',
              'line-cap': 'round',
              visibility: shouldShow ? 'visible' : 'none',
            },
            paint: {
              'line-color': routeData.color,
              'line-width': 4,
              'line-opacity': 0.7,
            },
          });

          // Add stop markers
          routeData.path.forEach((coord, index) => {
            const el = document.createElement('div');
            el.className = 'stop-marker';
            el.style.width = '12px';
            el.style.height = '12px';
            el.style.borderRadius = '50%';
            el.style.backgroundColor = index === 0 ? '#22c55e' : index === routeData.path.length - 1 ? '#ef4444' : '#ffffff';
            el.style.border = `2px solid ${routeData.color}`;
            el.style.display = shouldShow ? 'block' : 'none';
            el.dataset.route = routeId;

            new mapboxgl.Marker(el)
              .setLngLat(coord)
              .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(
                `<div class="p-2"><strong>${routeData.stops[index]}</strong><br/><span class="text-sm">Route ${routeId}</span></div>`
              ))
              .addTo(map.current);
          });
        });
      });
    } catch (error) {
      console.error('Error initializing map:', error);
      setIsTokenSet(false);
      localStorage.removeItem('mapbox_token');
    }

    return () => {
      map.current?.remove();
    };
  }, [isTokenSet, mapboxToken, selectedRoute]);

  // Update bus markers
  useEffect(() => {
    if (!map.current || !isTokenSet) return;

    buses.forEach(bus => {
      const shouldShow = !selectedRoute || selectedRoute === bus.route;
      const routeData = busRoutes[bus.route];

      if (markersRef.current[bus.id]) {
        // Update existing marker
        markersRef.current[bus.id].setLngLat(bus.position);
        const el = markersRef.current[bus.id].getElement();
        el.style.display = shouldShow ? 'flex' : 'none';
      } else {
        // Create new marker
        const el = document.createElement('div');
        el.className = 'bus-marker';
        el.innerHTML = `
          <div style="
            width: 40px;
            height: 40px;
            background: ${routeData?.color || '#0ea5e9'};
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            cursor: pointer;
            transition: transform 0.2s;
            border: 3px solid white;
          ">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M8 6v6"></path>
              <path d="M15 6v6"></path>
              <path d="M2 12h19.6"></path>
              <path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3"></path>
              <circle cx="7" cy="18" r="2"></circle>
              <path d="M9 18h5"></path>
              <circle cx="16" cy="18" r="2"></circle>
            </svg>
          </div>
          <div style="
            position: absolute;
            top: -8px;
            right: -8px;
            background: white;
            color: ${routeData?.color || '#0ea5e9'};
            font-size: 10px;
            font-weight: bold;
            padding: 2px 6px;
            border-radius: 10px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          ">${bus.route}</div>
        `;
        el.style.display = shouldShow ? 'flex' : 'none';

        el.addEventListener('mouseenter', () => {
          el.querySelector('div').style.transform = 'scale(1.1)';
        });
        el.addEventListener('mouseleave', () => {
          el.querySelector('div').style.transform = 'scale(1)';
        });
        el.addEventListener('click', () => {
          onBusSelect?.(bus.id, bus);
        });

        const marker = new mapboxgl.Marker(el)
          .setLngLat(bus.position)
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setHTML(`
              <div class="p-3">
                <div style="font-weight: bold; font-size: 14px;">Bus ${bus.route}</div>
                <div style="color: #666; font-size: 12px;">ID: ${bus.id}</div>
                <div style="margin-top: 8px; padding: 4px 8px; background: ${routeData?.color}; color: white; border-radius: 4px; font-size: 12px; text-align: center;">
                  ${bus.direction === 1 ? 'Outbound' : 'Returning'}
                </div>
              </div>
            `)
          )
          .addTo(map.current);

        markersRef.current[bus.id] = marker;
      }
    });
  }, [buses, isTokenSet, selectedRoute, onBusSelect]);

  if (!isTokenSet) {
    return (
      <div className="w-full h-full min-h-[400px] bg-card rounded-2xl border border-border flex items-center justify-center">
        <div className="max-w-md w-full p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
            <Key className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-2">Mapbox API Token Required</h3>
          <p className="text-muted-foreground mb-6 text-sm">
            To view the live bus tracking map, please enter your Mapbox public token.
            You can get one for free at{' '}
            <a
              href="https://mapbox.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              mapbox.com
            </a>
          </p>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Enter your Mapbox public token"
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleSetToken}>
              Set Token
            </Button>
          </div>
          <div className="mt-4 p-3 bg-warning/10 rounded-lg flex items-start gap-2 text-left">
            <AlertCircle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground">
              Your token will be stored locally in your browser. For production use,
              connect to Lovable Cloud to securely store API keys.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[500px]">
      <div ref={mapContainer} className="absolute inset-0 rounded-2xl overflow-hidden" />

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur-sm rounded-xl border border-border p-4 shadow-lg">
        <h4 className="font-semibold text-sm mb-3">Active Routes</h4>
        <div className="space-y-2">
          {Object.entries(busRoutes).map(([routeId, routeData]) => {
            const busCount = buses.filter(b => b.route === routeId).length;
            const isActive = !selectedRoute || selectedRoute === routeId;
            return (
              <div
                key={routeId}
                className={`flex items-center gap-2 text-sm ${!isActive ? 'opacity-40' : ''}`}
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: routeData.color }}
                />
                <span className="font-medium">{routeId}</span>
                <span className="text-muted-foreground">({busCount} bus{busCount !== 1 ? 'es' : ''})</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live indicator */}
      <div className="absolute top-4 left-4 bg-card/95 backdrop-blur-sm rounded-full border border-border px-4 py-2 shadow-lg flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
        <span className="text-sm font-medium">Live Tracking</span>
      </div>
    </div>
  );
};

export default BusTrackingMap;
