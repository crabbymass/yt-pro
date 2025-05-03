
import React, { createContext, useContext, useState } from 'react';

interface YoutubeContextType {
  isSidebarExpanded: boolean;
  toggleSidebar: () => void;
  isCreatorDmOpen: boolean;
  openCreatorDm: () => void;
  closeCreatorDm: () => void;
  currentPage: 'home' | 'watch' | 'channel';
  setCurrentPage: (page: 'home' | 'watch' | 'channel') => void;
  currentChannelTab: string;
  setCurrentChannelTab: (tab: string) => void;
}

const YoutubeContext = createContext<YoutubeContextType | undefined>(undefined);

export const YoutubeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isCreatorDmOpen, setIsCreatorDmOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'watch' | 'channel'>('home');
  const [currentChannelTab, setCurrentChannelTab] = useState('Home');

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  const openCreatorDm = () => {
    setIsCreatorDmOpen(true);
  };

  const closeCreatorDm = () => {
    setIsCreatorDmOpen(false);
  };

  return (
    <YoutubeContext.Provider
      value={{
        isSidebarExpanded,
        toggleSidebar,
        isCreatorDmOpen,
        openCreatorDm,
        closeCreatorDm,
        currentPage,
        setCurrentPage,
        currentChannelTab,
        setCurrentChannelTab,
      }}
    >
      {children}
    </YoutubeContext.Provider>
  );
};

export const useYoutube = (): YoutubeContextType => {
  const context = useContext(YoutubeContext);
  if (!context) {
    throw new Error('useYoutube must be used within a YoutubeProvider');
  }
  return context;
};
