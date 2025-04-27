
import React, { useState } from 'react';
import { Heart, Droplet, Thermometer } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { VitalData } from '@/data/mockData';

interface VitalCardProps {
  vital: VitalData;
}

const VitalCard: React.FC<VitalCardProps> = ({ vital }) => {
  const [isHovering, setIsHovering] = useState(false);
  
  // Format timestamp
  const timeAgo = () => {
    const now = new Date();
    const diffMs = now.getTime() - vital.timestamp.getTime();
    const diffMins = Math.round(diffMs / 60000);
    return `${diffMins} mins ago`;
  };

  // Get the icon based on vital type
  const getIcon = () => {
    switch(vital.icon) {
      case 'heart':
        return <Heart className={cn("h-6 w-6", isHovering ? "animate-pulse" : "")} />;
      case 'droplet':
        return <Droplet className={cn("h-6 w-6", isHovering ? "animate-pulse" : "")} />;
      case 'thermometer':
        return <Thermometer className={cn("h-6 w-6", isHovering ? "animate-pulse" : "")} />;
      default:
        return <Heart className={cn("h-6 w-6", isHovering ? "animate-pulse" : "")} />;
    }
  };

  // Check if the value is outside normal range
  const isOutsideNormalRange = () => {
    if (typeof vital.value === 'string') {
      const systolic = parseInt(vital.value.split('/')[0]);
      return systolic < vital.ranges.normal[0] || systolic > vital.ranges.normal[1];
    }
    return vital.value < vital.ranges.normal[0] || vital.value > vital.ranges.normal[1];
  };

  // Get status color
  const getStatusColor = () => {
    switch (vital.status) {
      case 'normal':
        return 'text-medical-teal';
      case 'warning':
        return 'text-medical-warning';
      case 'critical':
        return 'text-medical-alert';
      default:
        return 'text-medical-teal';
    }
  };

  // Draw sparkline
  const drawSparkline = () => {
    const height = 20;
    const width = 100;
    const padding = 2;
    const availableWidth = width - (padding * 2);
    const availableHeight = height - (padding * 2);
    
    const values = vital.sparkline;
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;
    
    const points = values.map((value, i) => {
      const x = padding + (i * (availableWidth / (values.length - 1)));
      const normalizedValue = (value - min) / range;
      const y = height - padding - (normalizedValue * availableHeight);
      return `${x},${y}`;
    }).join(' ');
    
    return (
      <svg width={width} height={height} className="mt-2">
        <polyline
          points={points}
          fill="none"
          stroke={getStatusColor()}
          strokeWidth="1.5"
        />
      </svg>
    );
  };

  return (
    <TooltipProvider>
      <Card 
        className={cn(
          "card-tilt transition-all duration-300 hover:shadow-md",
          isOutsideNormalRange() && "ring-2 ring-medical-alert ring-opacity-50"
        )}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-muted-foreground">{vital.name}</h3>
            <div className={cn("text-medical-teal", getStatusColor())}>
              {getIcon()}
            </div>
          </div>
          
          <div className="flex items-end gap-1">
            <span className="text-2xl font-bold">{vital.value}</span>
            <span className="text-sm text-muted-foreground mb-1">{vital.unit}</span>
          </div>
          
          <div className="mt-1">
            {drawSparkline()}
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <p className="text-xs text-muted-foreground mt-1">Updated {timeAgo()}</p>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Last checked: {timeAgo()}</p>
                <p className="text-xs mt-1">
                  Normal range: {vital.ranges.normal[0]} - {vital.ranges.normal[1]} {vital.unit}
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};

export default VitalCard;
