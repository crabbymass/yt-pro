
import React, { useEffect } from 'react';
import { useYoutube } from '@/contexts/YoutubeContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import VideoCard from '@/components/home/VideoCard';
import { 
  ThumbsUp, ThumbsDown, Share, Download, Save, MoreHorizontal,
  ChevronDown, ChevronUp, Flag
} from 'lucide-react';

// Sample recommended videos
const recommendedVideos = [
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
];

// Sample comments
const comments = [
  {
    id: '1',
    user: {
      name: 'Jane Cooper',
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
    text: 'This video was super helpful! I finally understand how to structure my React components properly. Looking forward to more content like this!',
    likes: 243,
    timestamp: '2 days ago',
    replies: 5,
  },
  {
    id: '2',
    user: {
      name: 'Robert Fox',
      avatar: 'https://i.pravatar.cc/150?img=8',
    },
    text: 'I've been struggling with this concept for weeks and your explanation finally made it click. Thank you so much!',
    likes: 118,
    timestamp: '1 week ago',
    replies: 2,
  },
  {
    id: '3',
    user: {
      name: 'Esther Howard',
      avatar: 'https://i.pravatar.cc/150?img=13',
    },
    text: 'Quick question - does this approach work with Next.js as well? I'm building a project with it and would love to apply these techniques.',
    likes: 53,
    timestamp: '3 days ago',
    replies: 7,
  },
];

const WatchPage: React.FC = () => {
  const { setCurrentPage } = useYoutube();
  const [showFullDescription, setShowFullDescription] = React.useState(false);

  useEffect(() => {
    setCurrentPage('watch');
  }, [setCurrentPage]);

  return (
    <div className="flex flex-col lg:flex-row px-4 py-6 gap-6">
      {/* Main Content */}
      <div className="flex-1">
        {/* Video Player */}
        <div className="aspect-video bg-black rounded-lg mb-4 w-full">
          <div className="w-full h-full flex items-center justify-center text-white">
            <div className="text-center">
              <p className="text-xl">Video Player</p>
              <p className="text-sm text-gray-400">Placeholder for YouTube video player</p>
            </div>
          </div>
        </div>

        {/* Video Info */}
        <div>
          <h1 className="text-xl font-semibold mb-2">
            Building a YouTube Clone with React and Tailwind
          </h1>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-2 border-b border-gray-200">
            {/* Channel Info */}
            <div className="flex items-center gap-3">
              <img
                src="https://i.pravatar.cc/150?img=12"
                alt="DevTech"
                className="h-10 w-10 rounded-full"
              />
              <div>
                <h3 className="font-medium">DevTech</h3>
                <p className="text-sm text-youtube-darkgray">500K subscribers</p>
              </div>
              <Button 
                className="ml-2 bg-black hover:bg-zinc-800 text-white rounded-full"
              >
                Subscribe
              </Button>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex rounded-full bg-gray-100">
                <Button variant="ghost" className="rounded-l-full gap-1 px-4 hover:bg-gray-200">
                  <ThumbsUp className="h-5 w-5" />
                  <span>15K</span>
                </Button>
                <Button variant="ghost" className="rounded-r-full gap-1 pl-2 pr-4 hover:bg-gray-200">
                  <ThumbsDown className="h-5 w-5" />
                </Button>
              </div>
              
              <Button variant="ghost" className="rounded-full bg-gray-100 hover:bg-gray-200 gap-2">
                <Share className="h-5 w-5" />
                <span>Share</span>
              </Button>
              
              <Button variant="ghost" className="rounded-full bg-gray-100 hover:bg-gray-200 gap-2">
                <Download className="h-5 w-5" />
                <span>Download</span>
              </Button>
              
              <Button variant="ghost" size="icon" className="rounded-full bg-gray-100 hover:bg-gray-200">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {/* Description */}
          <div 
            className={`mt-4 bg-gray-100 rounded-xl p-3 ${showFullDescription ? '' : 'cursor-pointer'}`}
            onClick={() => !showFullDescription && setShowFullDescription(true)}
          >
            <div className="flex items-center gap-2 text-sm font-medium">
              <span>500K views</span>
              <span>•</span>
              <span>3 weeks ago</span>
            </div>
            
            <div className={`mt-2 text-sm ${showFullDescription ? '' : 'line-clamp-2'}`}>
              <p className="mb-2">In this comprehensive tutorial, we're building a YouTube clone from scratch using React and Tailwind CSS. Learn how to create responsive layouts, implement a sidebar navigation, design video cards, and more.</p>
              <p className="mb-2">This tutorial covers:</p>
              <ul className="list-disc list-inside space-y-1 mb-2">
                <li>Setting up a React project with Tailwind CSS</li>
                <li>Creating responsive layouts that match YouTube's design</li>
                <li>Building a collapsible sidebar navigation</li>
                <li>Implementing video cards and grid layouts</li>
                <li>Creating a watch page with video player and comments</li>
                <li>Adding a channel page with creator messaging</li>
              </ul>
              <p className="mb-2">🔗 Resources mentioned in this video:</p>
              <p>- GitHub Repository: <a href="#" className="text-blue-600">https://github.com/devtech/youtube-clone</a></p>
              <p>- Tailwind CSS: <a href="#" className="text-blue-600">https://tailwindcss.com</a></p>
              <p>- React Documentation: <a href="#" className="text-blue-600">https://react.dev</a></p>
            </div>
            
            {!showFullDescription ? (
              <div className="mt-1 text-sm font-medium">Show more</div>
            ) : (
              <Button 
                variant="ghost" 
                className="mt-2 h-8 text-sm font-medium" 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowFullDescription(false);
                }}
              >
                Show less <ChevronUp className="h-4 w-4 ml-1" />
              </Button>
            )}
          </div>
          
          {/* Comments */}
          <div className="mt-6">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="font-medium">Comments</h3>
              <span className="text-youtube-darkgray">238</span>
            </div>
            
            {/* Add Comment */}
            <div className="flex gap-3 mb-6">
              <img 
                src="https://i.pravatar.cc/150?img=1"
                alt="Your Avatar"
                className="h-10 w-10 rounded-full" 
              />
              <div className="flex-1">
                <Textarea 
                  placeholder="Add a comment..." 
                  className="min-h-0 h-10 focus:h-20 transition-all border-b border-t-0 border-x-0 rounded-none px-0 focus-visible:ring-0 resize-none"
                />
                <div className="flex justify-end mt-2 gap-2 hidden">
                  <Button variant="ghost">Cancel</Button>
                  <Button className="bg-youtube-red hover:bg-red-700 text-white">Comment</Button>
                </div>
              </div>
            </div>
            
            {/* Comments List */}
            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <img 
                    src={comment.user.avatar}
                    alt={comment.user.name}
                    className="h-10 w-10 rounded-full" 
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{comment.user.name}</span>
                      <span className="text-xs text-youtube-darkgray">{comment.timestamp}</span>
                    </div>
                    <p className="text-sm mt-1">{comment.text}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full">
                          <ThumbsUp className="h-4 w-4" />
                        </Button>
                        <span className="text-xs text-youtube-darkgray">{comment.likes}</span>
                      </div>
                      <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full">
                        <ThumbsDown className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" className="h-7 px-2 text-xs font-medium">
                        Reply
                      </Button>
                    </div>
                    
                    {comment.replies > 0 && (
                      <Button variant="ghost" className="mt-2 h-7 text-xs font-medium text-blue-600">
                        <ChevronDown className="h-4 w-4 mr-1" />
                        {comment.replies} replies
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Recommended Videos */}
      <div className="w-full lg:w-80 space-y-3">
        {recommendedVideos.map((video) => (
          <VideoCard 
            key={video.id} 
            {...video} 
            orientation="horizontal" 
          />
        ))}
      </div>
    </div>
  );
};

export default WatchPage;
