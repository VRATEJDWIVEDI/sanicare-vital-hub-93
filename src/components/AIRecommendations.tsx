
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Bell, X } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { aiRecommendations } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const AIRecommendations: React.FC = () => {
  const [recommendations, setRecommendations] = useState(aiRecommendations);
  const [currentRecommendation, setCurrentRecommendation] = useState(0);
  const [showAlert, setShowAlert] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Rotate recommendations every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRecommendation((prev) => (prev + 1) % recommendations.length);
    }, 10000);
    
    return () => clearInterval(interval);
  }, [recommendations.length]);

  const handleDismissAlert = () => {
    setShowAlert(false);
  };

  return (
    <div className="space-y-4">
      {/* Alert Banner */}
      {showAlert && (
        <Alert variant="destructive" className="animate-fade-in transition-all duration-500 bg-medical-alert/10 text-medical-alert border border-medical-alert/20">
          <div className="flex justify-between items-start">
            <div className="flex">
              <Bell className="h-4 w-4 mr-2 mt-0.5" />
              <div>
                <AlertTitle>Attention Required</AlertTitle>
                <AlertDescription>
                  Your heart rate spiked above normal range at 9:15 AM today. Consider consulting with Dr. Johnson.
                </AlertDescription>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className={cn("p-1", isHovered ? "animate-shake" : "")}
              onClick={handleDismissAlert}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Dismiss</span>
            </Button>
          </div>
        </Alert>
      )}

      {/* AI Recommendations Card */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <Lightbulb className="h-5 w-5 mr-2 text-medical-teal" />
            AI Health Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-br from-medical-teal/5 to-medical-purple/5 rounded-lg border">
              <div className="flex items-start gap-3">
                <div className="bg-medical-teal/20 p-2 rounded-full">
                  <Lightbulb className="h-5 w-5 text-medical-teal" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium mb-1">Today's Recommendation</h4>
                  <p>{recommendations[currentRecommendation]}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 border rounded-lg bg-medical-purple/5 text-center">
                <h5 className="text-xs text-muted-foreground mb-1">Sleep Quality</h5>
                <div className="text-lg font-medium">Good</div>
                <div className="text-xs mt-1 text-muted-foreground">7.5 hrs avg</div>
              </div>
              <div className="p-3 border rounded-lg bg-medical-teal/5 text-center">
                <h5 className="text-xs text-muted-foreground mb-1">Steps Today</h5>
                <div className="text-lg font-medium">6,243</div>
                <div className="text-xs mt-1 text-muted-foreground">Goal: 8,000</div>
              </div>
            </div>

            <Button className="w-full bg-medical-purple hover:bg-medical-purple/90">
              View Full Health Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIRecommendations;
