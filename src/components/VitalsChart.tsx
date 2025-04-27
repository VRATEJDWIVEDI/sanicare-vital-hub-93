
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';
import { weekChartData, monthChartData, yearChartData } from '@/data/mockData';

const VitalsChart: React.FC = () => {
  const [activeTab, setActiveTab] = useState('7days');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(weekChartData);

  // Simulate loading state
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      switch (activeTab) {
        case '7days':
          setData(weekChartData);
          break;
        case '30days':
          setData(monthChartData);
          break;
        case '1year':
          setData(yearChartData);
          break;
        default:
          setData(weekChartData);
      }
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [activeTab]);

  // Hydration data for the gauge chart
  const hydrationData = [
    { name: 'Hydrated', value: data[data.length - 1]?.hydration || 70 },
    { name: 'Dehydrated', value: 100 - (data[data.length - 1]?.hydration || 70) }
  ];
  
  const COLORS = ['#4ECDC4', '#F5F5F5'];

  return (
    <Card className="col-span-1 md:col-span-2 animate-fade-in">
      <CardHeader>
        <CardTitle>Vitals Trend</CardTitle>
        <Tabs defaultValue="7days" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:w-[400px]">
            <TabsTrigger value="7days">7 Days</TabsTrigger>
            <TabsTrigger value="30days">30 Days</TabsTrigger>
            <TabsTrigger value="1year">1 Year</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 h-[300px]">
            {loading ? (
              <div className="w-full h-full flex items-center justify-center bg-muted/30 rounded-md animate-pulse">
                <p>Loading chart data...</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={data}
                  margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" stroke="#888" fontSize={12} />
                  <YAxis stroke="#888" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                      border: '1px solid #ccc',
                      borderRadius: '8px' 
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="heartRate" 
                    name="Heart Rate (bpm)" 
                    stroke="#6E59A5" 
                    strokeWidth={2} 
                    dot={{ r: 4 }} 
                    activeDot={{ r: 7 }}
                    animationDuration={1000}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="spO2" 
                    name="SpO₂ (%)" 
                    stroke="#4ECDC4" 
                    strokeWidth={2} 
                    dot={{ r: 4 }} 
                    activeDot={{ r: 7 }} 
                    animationDuration={1000}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="temperature" 
                    name="Temperature (°C)" 
                    stroke="#FF6B6B" 
                    strokeWidth={2} 
                    dot={{ r: 4 }} 
                    activeDot={{ r: 7 }} 
                    animationDuration={1000}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
          <div className="h-[300px]">
            <div className="flex flex-col h-full">
              <h3 className="text-base font-medium mb-2">Daily Hydration</h3>
              {loading ? (
                <div className="w-full h-full flex-1 flex items-center justify-center bg-muted/30 rounded-md animate-pulse">
                  <p>Loading hydration data...</p>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={hydrationData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      animationDuration={1000}
                    >
                      {hydrationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`${value}%`, 'Hydration Level']}
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                        border: '1px solid #ccc',
                        borderRadius: '8px' 
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              )}
              <div className="text-center mt-2">
                <span className="text-2xl font-bold text-medical-teal">
                  {data[data.length - 1]?.hydration || 70}%
                </span>
                <p className="text-sm text-muted-foreground">Hydration Level</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VitalsChart;
