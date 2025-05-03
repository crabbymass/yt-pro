import React from 'react';
import { Button } from '@/components/ui/button';
import { useYoutube } from '@/contexts/YoutubeContext';
import { Link } from 'react-router-dom';
import { 
  Home, Film, Bookmark, Clock, ThumbsUp, History, PlaySquare, 
  Flame, ShoppingBag, Music, Trophy, Lightbulb, Youtube, Library,
  MessageCircle, MessageSquare
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  active?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, to, active = false }) => {
  const { isSidebarExpanded } = useYoutube();
  
  if (!isSidebarExpanded) {
    return (
      <Link to={to} className="w-full">
        <Button 
          variant="ghost" 
          className={`w-full h-16 flex flex-col items-center justify-center rounded-none hover:bg-gray-100 ${active ? 'bg-gray-100' : ''}`}
        >
          <div className="text-lg">
            {icon}
          </div>
          <span className="text-[10px] mt-1">{label}</span>
        </Button>
      </Link>
    );
  }

  return (
    <Link to={to} className="w-full">
      <Button 
        variant="ghost" 
        className={`w-full justify-start rounded-lg hover:bg-gray-100 ${active ? 'bg-gray-100' : ''}`}
      >
        <span className="mr-4">{icon}</span>
        <span className="text-sm font-normal">{label}</span>
      </Button>
    </Link>
  );
};

const Sidebar: React.FC = () => {
  const { isSidebarExpanded, currentPage } = useYoutube();

  return (
    <aside 
      className={`fixed left-0 top-14 bottom-0 z-10 bg-white transition-all duration-200 ${
        isSidebarExpanded ? 'w-60' : 'w-20'
      }`}
    >
      <ScrollArea className="h-full">
        <div className={`p-2 ${isSidebarExpanded ? 'px-3' : 'px-1'}`}>
          <nav className="space-y-1">
            <SidebarItem 
              icon={<Home size={20} />} 
              label="Home" 
              to="/" 
              active={currentPage === 'home'}
            />
            <SidebarItem 
              icon={<Film size={20} />} 
              label="Shorts" 
              to="/shorts" 
            />
            <SidebarItem 
              icon={<Youtube size={20} />} 
              label="Subscriptions" 
              to="/subscriptions" 
            />
            <SidebarItem 
              icon={<MessageSquare size={20} />} 
              label="Messages" 
              to="/messages"
              active={currentPage === 'messages'}
            />

            {isSidebarExpanded && (
              <div className="mt-2 pt-3 border-t border-gray-200">
                <h3 className="font-semibold px-3 py-1 text-base">You</h3>
              </div>
            )}

            <SidebarItem 
              icon={<ProfileAvatar />} 
              label="Your Channel" 
              to="/channel" 
              active={currentPage === 'channel'}
            />
            <SidebarItem 
              icon={<History size={20} />} 
              label="History" 
              to="/history" 
            />
            <SidebarItem 
              icon={<PlaySquare size={20} />} 
              label="Your Videos" 
              to="/your-videos" 
            />
            <SidebarItem 
              icon={<Clock size={20} />} 
              label="Watch Later" 
              to="/watch-later" 
            />
            <SidebarItem 
              icon={<ThumbsUp size={20} />} 
              label="Liked Videos" 
              to="/liked-videos" 
            />

            {isSidebarExpanded && (
              <div className="mt-2 pt-3 border-t border-gray-200">
                <h3 className="font-semibold px-3 py-1 text-base">Subscriptions</h3>
              </div>
            )}

            {isSidebarExpanded && (
              <>
                <SubscriptionChannel name="Channel 1" img="https://i.pravatar.cc/150?img=1" />
                <SubscriptionChannel name="Channel 2" img="https://i.pravatar.cc/150?img=2" />
                <SubscriptionChannel name="Channel 3" img="https://i.pravatar.cc/150?img=3" />
                <SubscriptionChannel name="Channel 4" img="https://i.pravatar.cc/150?img=4" />
                <SubscriptionChannel name="Channel 5" img="https://i.pravatar.cc/150?img=5" />
              </>
            )}

            {isSidebarExpanded && (
              <div className="mt-2 pt-3 border-t border-gray-200">
                <h3 className="font-semibold px-3 py-1 text-base">Explore</h3>
              </div>
            )}

            <SidebarItem 
              icon={<Flame size={20} />} 
              label="Trending" 
              to="/trending" 
            />
            <SidebarItem 
              icon={<ShoppingBag size={20} />} 
              label="Shopping" 
              to="/shopping" 
            />
            <SidebarItem 
              icon={<Music size={20} />} 
              label="Music" 
              to="/music" 
            />
            <SidebarItem 
              icon={<Trophy size={20} />} 
              label="Sports" 
              to="/sports" 
            />
            <SidebarItem 
              icon={<Lightbulb size={20} />} 
              label="Learning" 
              to="/learning" 
            />
          </nav>

          {isSidebarExpanded && (
            <div className="mt-6 pb-4 text-xs text-gray-500 px-3 space-y-4">
              <div className="space-x-2">
                <a href="#" className="hover:underline">About</a>
                <a href="#" className="hover:underline">Press</a>
                <a href="#" className="hover:underline">Copyright</a>
              </div>
              <div className="space-x-2">
                <a href="#" className="hover:underline">Contact</a>
                <a href="#" className="hover:underline">Creators</a>
                <a href="#" className="hover:underline">Advertise</a>
              </div>
              <div className="space-x-2">
                <a href="#" className="hover:underline">Terms</a>
                <a href="#" className="hover:underline">Privacy</a>
                <a href="#" className="hover:underline">Policy & Safety</a>
              </div>
              <p className="text-gray-400">© 2023 YouTube Replica</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </aside>
  );
};

// Custom Subscription Channel Component
const SubscriptionChannel: React.FC<{ name: string; img: string }> = ({ name, img }) => {
  return (
    <Link to={`/channel`} className="w-full">
      <Button variant="ghost" className="w-full justify-start rounded-lg hover:bg-gray-100">
        <img
          src={img}
          alt={name}
          className="h-6 w-6 rounded-full mr-4 object-cover"
        />
        <span className="text-sm font-normal">{name}</span>
      </Button>
    </Link>
  );
};

const ProfileAvatar = () => (
  <Avatar className="h-5 w-5">
    <AvatarImage src="https://i.pravatar.cc/150?img=30" alt="Profile" />
    <AvatarFallback className="bg-red-500 text-white text-xs">U</AvatarFallback>
  </Avatar>
);

export default Sidebar;
