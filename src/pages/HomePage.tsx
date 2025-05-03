
import React, { useEffect } from 'react';
import { useYoutube } from '@/contexts/YoutubeContext';
import CategoryPills from '@/components/home/CategoryPills';
import VideoCard from '@/components/home/VideoCard';

// Sample video data
const videoData = [
  {
    id: '1',
    title: 'Building a YouTube Clone with React and Tailwind',
    channel: {
      name: 'DevTech',
      id: 'devtech',
      avatar: 'https://i.pravatar.cc/150?img=12',
    },
    thumbnail: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    views: '500K views',
    timestamp: '3 weeks ago',
    duration: '15:24',
  },
  {
    id: '2',
    title: 'Learn Tailwind CSS in 20 Minutes | Quick Start Guide for Beginners',
    channel: {
      name: 'WebDevSimplified',
      id: 'webdevsimplified',
      avatar: 'https://i.pravatar.cc/150?img=27',
    },
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80',
    views: '1.2M views',
    timestamp: '1 year ago',
    duration: '20:17',
  },
  {
    id: '3',
    title: 'How to Use React Router - Complete Tutorial for Beginners',
    channel: {
      name: 'React Tutorials',
      id: 'reacttutorials',
      avatar: 'https://i.pravatar.cc/150?img=33',
    },
    thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    views: '832K views',
    timestamp: '5 months ago',
    duration: '42:31',
  },
  {
    id: '4',
    title: 'Top 10 UI/UX Design Trends for 2023',
    channel: {
      name: 'UX Masters',
      id: 'uxmasters',
      avatar: 'https://i.pravatar.cc/150?img=47',
    },
    thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    views: '345K views',
    timestamp: '2 months ago',
    duration: '18:02',
  },
  {
    id: '5',
    title: 'The Future of JavaScript - What\'s Coming in 2024',
    channel: {
      name: 'JS Mastery',
      id: 'jsmastery',
      avatar: 'https://i.pravatar.cc/150?img=54',
    },
    thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80',
    views: '672K views',
    timestamp: '3 months ago',
    duration: '24:45',
  },
  {
    id: '6',
    title: 'Build a Full Stack E-Commerce App with NextJS and Stripe',
    channel: {
      name: 'Full Stack Masters',
      id: 'fullstackmasters',
      avatar: 'https://i.pravatar.cc/150?img=62',
    },
    thumbnail: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    views: '248K views',
    timestamp: '4 weeks ago',
    duration: '1:12:38',
  },
  {
    id: '7',
    title: 'React State Management Showdown: Redux vs Context vs Zustand',
    channel: {
      name: 'React Masters',
      id: 'reactmasters',
      avatar: 'https://i.pravatar.cc/150?img=69',
    },
    thumbnail: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    views: '421K views',
    timestamp: '7 months ago',
    duration: '28:19',
  },
  {
    id: '8',
    title: 'Ultimate VS Code Setup for Web Developers',
    channel: {
      name: 'Code Efficiency',
      id: 'codeefficiency',
      avatar: 'https://i.pravatar.cc/150?img=75',
    },
    thumbnail: 'https://images.unsplash.com/photo-1579403124614-197f69d8187b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80',
    views: '989K views',
    timestamp: '1 year ago',
    duration: '16:52',
  },
  {
    id: '9',
    title: 'TypeScript Crash Course - Learn the Basics in 30 Minutes',
    channel: {
      name: 'TS Pro',
      id: 'tspro',
      avatar: 'https://i.pravatar.cc/150?img=11',
    },
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    views: '712K views',
    timestamp: '8 months ago',
    duration: '31:08',
  },
  {
    id: '10',
    title: 'Responsive Design Made Easy with CSS Grid and Flexbox',
    channel: {
      name: 'CSS Wizards',
      id: 'csswizards',
      avatar: 'https://i.pravatar.cc/150?img=23',
    },
    thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=755&q=80',
    views: '548K views',
    timestamp: '5 months ago',
    duration: '22:47',
  },
  {
    id: '11',
    title: 'Advanced React Hooks: useReducer, useMemo, and useCallback Explained',
    channel: {
      name: 'React Pro Tips',
      id: 'reactprotips',
      avatar: 'https://i.pravatar.cc/150?img=39',
    },
    thumbnail: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    views: '375K views',
    timestamp: '3 months ago',
    duration: '34:21',
  },
  {
    id: '12',
    title: 'Building a RESTful API with Node.js and Express',
    channel: {
      name: 'Backend Basics',
      id: 'backendbasics',
      avatar: 'https://i.pravatar.cc/150?img=42',
    },
    thumbnail: 'https://images.unsplash.com/photo-1518773553398-650c184e0bb3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    views: '492K views',
    timestamp: '6 months ago',
    duration: '46:13',
  },
];

const HomePage: React.FC = () => {
  const { setCurrentPage } = useYoutube();

  useEffect(() => {
    setCurrentPage('home');
  }, [setCurrentPage]);

  return (
    <div className="pb-6">
      <CategoryPills />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 py-4">
        {videoData.map(video => (
          <VideoCard key={video.id} {...video} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
