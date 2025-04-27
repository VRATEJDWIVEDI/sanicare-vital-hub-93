
import React, { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import Header from './Header';
import Sidebar from './Sidebar';
import VitalCard from './VitalCard';
import VitalsChart from './VitalsChart';
import AppointmentsPanel from './AppointmentsPanel';
import AIRecommendations from './AIRecommendations';
import MessagingChat from './MessagingChat';
import LoadingOverlay from './LoadingOverlay';
import { vitalsData } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

const Dashboard: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const isMobile = useIsMobile();
  const { toast } = useToast();

  // simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      
      toast({
        title: "Dashboard Ready",
        description: "Welcome to SaniCare Vital Hub! Your health data is now synced.",
      });
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [toast]);

  // toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  // toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    document.documentElement.classList.toggle('dark', newDarkMode);
  };

  return (
    <div className={`relative min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <LoadingOverlay isLoading={loading} />
      
      <div className="flex flex-col min-h-screen relative">
        <Header 
          toggleSidebar={toggleSidebar} 
          isDarkMode={isDarkMode} 
          toggleDarkMode={toggleDarkMode}
        />
        
        <div className="flex flex-1">
          <Sidebar 
            isOpen={isSidebarOpen} 
            isDesktop={!isMobile}
          />
          
          <main className={`flex-1 transition-all duration-300 p-4 md:p-6 ${!isMobile ? 'ml-64' : ''}`}>
            <div className="container max-w-screen-xl mx-auto">
              <section id="vitals" className="mb-8">
                <h2 className="text-2xl font-bold mb-4 animate-flip-in">Your Vitals</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {vitalsData.map((vital) => (
                    <VitalCard key={vital.id} vital={vital} />
                  ))}
                </div>
              </section>
              
              <section id="charts" className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Health Trends</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <VitalsChart />
                  <AIRecommendations />
                </div>
              </section>
              
              <section id="appointments" className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Care Management</h2>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                  <AppointmentsPanel />
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
      
      <MessagingChat />
    </div>
  );
};

export default Dashboard;
