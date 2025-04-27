
import React, { useState } from 'react';
import { Calendar, Clock, Video } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { appointments, consultations, hasABHAId } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

const AppointmentsPanel: React.FC = () => {
  const [expandedConsultation, setExpandedConsultation] = useState<string | null>(null);
  
  const formatDate = (date: Date) => {
    return format(date, 'MMMM d, yyyy');
  };
  
  const handleJoinCall = (appointmentId: string) => {
    console.log(`Joining video call for appointment ${appointmentId}`);
    // This would typically open a video call window or redirect to a telehealth platform
  };

  const handleDownloadPDF = (consultationId: string) => {
    console.log(`Downloading PDF for consultation ${consultationId}`);
    // This would typically trigger a PDF download
  };

  return (
    <Card className="col-span-1 animate-fade-in">
      <CardHeader>
        <CardTitle>Medical Appointments</CardTitle>
      </CardHeader>
      <CardContent>
        {!hasABHAId && (
          <div className="mb-6 p-4 border border-medical-warning/20 bg-medical-warning/10 rounded-lg animate-bounce-in">
            <h4 className="flex items-center font-medium text-medical-darkPurple">
              <Badge variant="outline" className="mr-2 bg-medical-warning text-white">Important</Badge>
              Missing ABHA ID
            </h4>
            <p className="mt-2 text-sm">Link your Ayushman Bharat Health Account for seamless healthcare services.</p>
            <Button className="mt-3 w-full bg-medical-warning hover:bg-medical-warning/90">
              Get your ABHA ID now ➔
            </Button>
          </div>
        )}
        
        <div>
          <h3 className="text-lg font-medium mb-3">Upcoming Appointments</h3>
          {appointments.length > 0 ? (
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="flex flex-col p-3 border rounded-lg hover:shadow-sm transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{appointment.doctorName}</h4>
                      <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                    </div>
                    {appointment.isVideoCall && (
                      <Badge variant="outline" className="bg-medical-teal/10 text-medical-teal border-medical-teal/20">
                        Video Consult
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-2 text-sm">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{formatDate(appointment.date)}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{appointment.time}</span>
                    </div>
                  </div>
                  {appointment.isVideoCall && (
                    <Button 
                      onClick={() => handleJoinCall(appointment.id)}
                      className="mt-3 bg-medical-purple hover:bg-medical-purple/90 text-white"
                      size="sm"
                    >
                      <Video className="mr-2 h-4 w-4" />
                      Join Video Call
                    </Button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center p-4 text-muted-foreground">No upcoming appointments</p>
          )}
          
          <h3 className="text-lg font-medium mt-6 mb-3">Past Consultations</h3>
          {consultations.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {consultations.map((consultation) => (
                <AccordionItem key={consultation.id} value={consultation.id} className="border rounded-lg mb-2 overflow-hidden">
                  <AccordionTrigger className="px-3 py-2 hover:no-underline">
                    <div className="flex flex-col items-start text-left">
                      <span className="font-medium">{consultation.doctorName}</span>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(consultation.date)} - {consultation.specialty}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-3 pb-3">
                    <div>
                      <h5 className="font-medium mb-1">Notes</h5>
                      <p className="text-sm mb-3">{consultation.notes}</p>
                      
                      <h5 className="font-medium mb-1">Prescriptions</h5>
                      <ul className="list-disc list-inside text-sm mb-3">
                        {consultation.prescriptions.map((prescription, index) => (
                          <li key={index}>{prescription}</li>
                        ))}
                      </ul>
                      
                      {consultation.hasPDF && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleDownloadPDF(consultation.id)}
                        >
                          Download PDF
                        </Button>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <p className="text-center p-4 text-muted-foreground">No past consultations</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AppointmentsPanel;
