
import React, { useState } from 'react';
import { useYoutube } from '@/contexts/YoutubeContext';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X, Send } from 'lucide-react';

const CreatorDmModal: React.FC = () => {
  const { isCreatorDmOpen, closeCreatorDm } = useYoutube();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{text: string; from: 'user' | 'creator'}[]>([
    { text: "Hi there! Thanks for reaching out. How can I help you?", from: 'creator' }
  ]);

  const handleSend = () => {
    if (message.trim()) {
      setMessages(prev => [...prev, { text: message, from: 'user' }]);
      setMessage('');
      
      // Simulate creator response after a short delay
      setTimeout(() => {
        setMessages(prev => [
          ...prev, 
          { text: "Thanks for your message! I'll get back to you soon.", from: 'creator' }
        ]);
      }, 1500);
    }
  };

  return (
    <Dialog open={isCreatorDmOpen} onOpenChange={(open) => !open && closeCreatorDm()}>
      <DialogContent className="sm:max-w-md h-[500px] flex flex-col p-0">
        <DialogHeader className="border-b px-4 py-2 flex-shrink-0">
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img 
                src="https://i.pravatar.cc/150?img=12" 
                alt="Channel Name"
                className="h-8 w-8 rounded-full" 
              />
              <span>Channel Name</span>
            </div>
            <DialogClose className="h-6 w-6 rounded-full hover:bg-gray-100">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-grow overflow-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div 
              key={i}
              className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] rounded-lg p-3 ${
                  msg.from === 'user' 
                    ? 'bg-youtube-red text-white rounded-br-none' 
                    : 'bg-gray-200 text-black rounded-bl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t p-4 flex gap-2">
          <Input
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-grow"
          />
          <Button onClick={handleSend} className="bg-youtube-red hover:bg-red-700">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreatorDmModal;
