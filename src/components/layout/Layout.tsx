
import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { useYoutube } from '@/contexts/YoutubeContext';
import CreatorDmModal from '../modals/CreatorDmModal';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isSidebarExpanded } = useYoutube();

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-hidden">
      <Header />
      <div className="flex flex-1 relative">
        <Sidebar />
        <main 
          className={`flex-1 transition-all duration-300 pt-14 overflow-y-auto max-h-screen ${
            isSidebarExpanded ? 'ml-60' : 'ml-20'
          } bg-[#f9f9f9]`}
        >
          <div className="animate-fadeIn">
            {children}
          </div>
        </main>
      </div>
      <CreatorDmModal />
    </div>
  );
};

export default Layout;
