
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { messages as initialMessages } from '@/data/mockData';
import { format } from 'date-fns';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

const MessagingChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [unreadCount, setUnreadCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Count unread messages
  useEffect(() => {
    const count = messages.filter(m => !m.read).length;
    setUnreadCount(count);
  }, [messages]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Mark messages as read when chat is opened
  useEffect(() => {
    if (isOpen && unreadCount > 0) {
      setMessages(prev => prev.map(m => ({ ...m, read: true })));
    }
  }, [isOpen, unreadCount]);

  // Quick reply options
  const quickReplies = [
    "Schedule follow-up",
    "Ask about medications",
    "Request lab results",
    "Report symptoms"
  ];

  const toggleChat = () => {
    setIsOpen(prev => !prev);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Add user message
      const userMessage: Message = {
        id: `msg-${Date.now()}`,
        sender: 'You',
        content: newMessage,
        timestamp: new Date(),
        read: true
      };
      setMessages(prev => [...prev, userMessage]);
      setNewMessage('');
      
      // Simulate doctor typing
      setIsTyping(true);
      
      // Simulate doctor's response after delay
      setTimeout(() => {
        setIsTyping(false);
        
        const doctorMessage: Message = {
          id: `msg-${Date.now() + 1}`,
          sender: 'Dr. Sarah Johnson',
          content: "Thanks for your message. I'll review your concerns and get back to you shortly.",
          timestamp: new Date(),
          read: true
        };
        
        setMessages(prev => [...prev, doctorMessage]);
      }, 2000);
    }
  };

  const handleQuickReply = (reply: string) => {
    setNewMessage(reply);
  };

  return (
    <>
      {/* Chat Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button
          onClick={toggleChat}
          className="h-14 w-14 rounded-full bg-medical-purple hover:bg-medical-purple/90 shadow-lg relative"
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <MessageSquare className="h-6 w-6" />
          )}
          
          {!isOpen && unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 min-w-[20px] flex items-center justify-center bg-medical-alert animate-pulse">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </div>
      
      {/* Chat Drawer */}
      <div
        className={cn(
          "fixed bottom-24 right-6 z-40 w-80 md:w-96 bg-background rounded-lg border shadow-lg transition-transform duration-300 ease-in-out max-h-[500px] flex flex-col",
          isOpen ? 'translate-y-0 animate-slide-in-right' : 'translate-y-full opacity-0'
        )}
      >
        {/* Chat Header */}
        <div className="p-4 border-b bg-medical-purple/10 rounded-t-lg">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Chat with Doctor</h3>
            <Button variant="ghost" size="icon" onClick={toggleChat}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Chat Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex items-start gap-2 animate-fade-in",
                  message.sender === 'You' ? 'flex-row-reverse' : ''
                )}
              >
                <Avatar className="h-8 w-8">
                  <AvatarFallback className={message.sender === 'You' ? 'bg-medical-purple' : 'bg-medical-teal'}>
                    {message.sender[0]}
                  </AvatarFallback>
                </Avatar>
                
                <div className="max-w-[80%]">
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-medium">
                      {message.sender}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {format(message.timestamp, 'h:mm a')}
                    </span>
                  </div>
                  
                  <div
                    className={cn(
                      "mt-1 p-3 rounded-lg text-sm",
                      message.sender === 'You'
                        ? 'bg-medical-purple text-white'
                        : 'bg-muted'
                    )}
                  >
                    {message.content}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex items-start gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-medical-teal">D</AvatarFallback>
                </Avatar>
                
                <div className="max-w-[80%]">
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-medium">
                      Dr. Sarah Johnson
                    </span>
                  </div>
                  
                  <div className="mt-1 p-3 rounded-lg text-sm bg-muted flex items-center">
                    <span className="inline-block w-2 h-2 bg-medical-teal rounded-full animate-pulse mr-1"></span>
                    <span className="inline-block w-2 h-2 bg-medical-teal rounded-full animate-pulse mr-1" style={{ animationDelay: '300ms' }}></span>
                    <span className="inline-block w-2 h-2 bg-medical-teal rounded-full animate-pulse" style={{ animationDelay: '600ms' }}></span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        
        {/* Quick Replies */}
        <div className="p-2 border-t">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {quickReplies.map((reply, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="whitespace-nowrap text-xs"
                onClick={() => handleQuickReply(reply)}
              >
                {reply}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Chat Input */}
        <div className="p-2 border-t">
          <div className="flex gap-2">
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage();
                }
              }}
            />
            <Button size="icon" onClick={handleSendMessage}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MessagingChat;
