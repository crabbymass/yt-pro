
import React, { useEffect, useState } from 'react';
import { useYoutube } from '@/contexts/YoutubeContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'contact';
  timestamp: string;
}

interface ChatContact {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  messages: Message[];
}

const mockContacts: ChatContact[] = [
  {
    id: '1',
    name: 'Jane Cooper',
    avatar: 'https://i.pravatar.cc/150?img=5',
    lastMessage: 'Thanks for the feedback on my latest video!',
    timestamp: '10:32 AM',
    unread: 2,
    messages: [
      {
        id: 'm1',
        text: 'Hey! I watched your latest React tutorial',
        sender: 'contact',
        timestamp: '10:30 AM'
      },
      {
        id: 'm2',
        text: 'It was super helpful, thanks!',
        sender: 'contact',
        timestamp: '10:31 AM'
      },
      {
        id: 'm3',
        text: 'Thanks for the feedback on my latest video!',
        sender: 'user',
        timestamp: '10:32 AM'
      }
    ]
  },
  {
    id: '2',
    name: 'Robert Fox',
    avatar: 'https://i.pravatar.cc/150?img=8',
    lastMessage: 'Would you be interested in a collaboration?',
    timestamp: 'Yesterday',
    unread: 0,
    messages: [
      {
        id: 'm1',
        text: 'Hi there! I love your content',
        sender: 'contact',
        timestamp: 'Yesterday'
      },
      {
        id: 'm2',
        text: 'Would you be interested in a collaboration?',
        sender: 'contact',
        timestamp: 'Yesterday'
      }
    ]
  },
  {
    id: '3',
    name: 'Esther Howard',
    avatar: 'https://i.pravatar.cc/150?img=13',
    lastMessage: 'The editing technique you taught me worked perfectly!',
    timestamp: '2 days ago',
    unread: 0,
    messages: [
      {
        id: 'm1',
        text: 'Thanks for the editing tips!',
        sender: 'contact',
        timestamp: '2 days ago'
      },
      {
        id: 'm2',
        text: 'I'll try them out',
        sender: 'user',
        timestamp: '2 days ago'
      },
      {
        id: 'm3',
        text: 'The editing technique you taught me worked perfectly!',
        sender: 'contact',
        timestamp: '2 days ago'
      }
    ]
  },
  {
    id: '4',
    name: 'Cameron Williamson',
    avatar: 'https://i.pravatar.cc/150?img=15',
    lastMessage: 'Great meeting you at the creator summit!',
    timestamp: '1 week ago',
    unread: 0,
    messages: [
      {
        id: 'm1',
        text: 'Great meeting you at the creator summit!',
        sender: 'contact',
        timestamp: '1 week ago'
      }
    ]
  },
  {
    id: '5',
    name: 'Brooklyn Simmons',
    avatar: 'https://i.pravatar.cc/150?img=20',
    lastMessage: 'Can you review my new thumbnail design?',
    timestamp: '2 weeks ago',
    unread: 0,
    messages: [
      {
        id: 'm1',
        text: 'Hey, I made a new thumbnail design',
        sender: 'contact',
        timestamp: '2 weeks ago'
      },
      {
        id: 'm2',
        text: 'Can you review my new thumbnail design?',
        sender: 'contact',
        timestamp: '2 weeks ago'
      }
    ]
  }
];

const MessagesPage: React.FC = () => {
  const { setCurrentPage } = useYoutube();
  const [contacts, setContacts] = useState<ChatContact[]>(mockContacts);
  const [selectedContact, setSelectedContact] = useState<ChatContact | null>(null);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    setCurrentPage('messages');
  }, [setCurrentPage]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedContact) return;

    const updatedContacts = contacts.map(contact => {
      if (contact.id === selectedContact.id) {
        const newMessageObj: Message = {
          id: `m${contact.messages.length + 1}`,
          text: newMessage,
          sender: 'user',
          timestamp: 'Just now'
        };
        return {
          ...contact,
          lastMessage: newMessage,
          timestamp: 'Just now',
          messages: [...contact.messages, newMessageObj]
        };
      }
      return contact;
    });

    setContacts(updatedContacts);
    setSelectedContact(updatedContacts.find(c => c.id === selectedContact.id) || null);
    setNewMessage('');
  };

  const handleContactClick = (contact: ChatContact) => {
    // Mark as read
    const updatedContacts = contacts.map(c => {
      if (c.id === contact.id) {
        return { ...c, unread: 0 };
      }
      return c;
    });
    setContacts(updatedContacts);
    setSelectedContact(contact);
  };

  return (
    <div className="flex h-[calc(100vh-56px)] pt-14 animate-fade-in">
      <div className="w-full lg:w-[350px] border-r border-gray-200 h-full">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Messages</h2>
        </div>
        <div className="overflow-y-auto h-[calc(100%-56px)]">
          {contacts.map((contact) => (
            <div 
              key={contact.id}
              className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-100 transition-colors ${
                selectedContact?.id === contact.id ? 'bg-gray-100' : ''
              }`}
              onClick={() => handleContactClick(contact)}
            >
              <Avatar className="h-10 w-10">
                <AvatarImage src={contact.avatar} alt={contact.name} />
                <AvatarFallback className="bg-red-500 text-white">
                  {contact.name.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-sm truncate">{contact.name}</h3>
                  <span className="text-xs text-gray-500">{contact.timestamp}</span>
                </div>
                <p className="text-sm text-gray-500 truncate">{contact.lastMessage}</p>
              </div>
              {contact.unread > 0 && (
                <div className="ml-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                  {contact.unread}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 hidden lg:flex flex-col bg-gray-50 h-full relative">
        {selectedContact ? (
          <>
            <div className="p-4 border-b border-gray-200 bg-white">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={selectedContact.avatar} alt={selectedContact.name} />
                  <AvatarFallback className="bg-red-500 text-white">
                    {selectedContact.name.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{selectedContact.name}</h3>
                  <p className="text-xs text-gray-500">Online</p>
                </div>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {selectedContact.messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[70%] p-3 rounded-lg ${
                      message.sender === 'user' 
                        ? 'bg-red-500 text-white rounded-br-none' 
                        : 'bg-white text-gray-800 rounded-bl-none shadow-sm'
                    } animate-pop`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <span className={`text-xs mt-1 block ${
                      message.sender === 'user' ? 'text-red-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex gap-2">
                <Input 
                  placeholder="Type a message..." 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button 
                  onClick={handleSendMessage} 
                  className="bg-red-500 hover:bg-red-600"
                >
                  <Send className="h-5 w-5" />
                  <span className="sr-only">Send</span>
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <h3 className="text-xl font-medium text-gray-700">Select a conversation</h3>
              <p className="text-gray-500 mt-1">Choose from your existing messages</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;
