import React, { useEffect, useState } from 'react';
import { useYoutube } from '@/contexts/YoutubeContext';
import { Button } from '@/components/ui/button';
import VideoCard from '@/components/home/VideoCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BellIcon, MessageSquare, ThumbsUp, ThumbsDown } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

// Sample channel videos
const channelVideos = [
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
      name: 'DevTech',
      id: 'devtech',
      avatar: 'https://i.pravatar.cc/150?img=12',
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
      name: 'DevTech',
      id: 'devtech',
      avatar: 'https://i.pravatar.cc/150?img=12',
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
      name: 'DevTech',
      id: 'devtech',
      avatar: 'https://i.pravatar.cc/150?img=12',
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
      name: 'DevTech',
      id: 'devtech',
      avatar: 'https://i.pravatar.cc/150?img=12',
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
      name: 'DevTech',
      id: 'devtech',
      avatar: 'https://i.pravatar.cc/150?img=12',
    },
    thumbnail: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    views: '248K views',
    timestamp: '4 weeks ago',
    duration: '1:12:38',
  },
];

// Sample community posts
const communityPosts = [
  {
    id: 1,
    content: "Just uploaded a new tutorial on React State Management! Check it out and let me know what you think. This is part of our ongoing series on mastering React fundamentals.",
    likes: 1.2,
    comments: 87,
    timestamp: '2 days ago',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: 2,
    content: "What topic should I cover in my next video? Drop your suggestions in the comments below!",
    likes: 3.4,
    comments: 342,
    timestamp: '1 week ago',
  },
  {
    id: 3,
    content: "Big announcement coming next week! I've been working on something special for all of you. Can you guess what it is? Here's a hint: it's going to revolutionize how you learn web development. Stay tuned!",
    likes: 5.7,
    comments: 214,
    timestamp: '3 days ago',
  },
];

const AboutContent: React.FC = () => (
  <div className="space-y-6 max-w-3xl">
    <div>
      <h3 className="font-medium mb-2">Description</h3>
      <p className="text-sm">
        Welcome to DevTech! We create tutorials and educational content focused on web development, 
        with an emphasis on React, JavaScript, and modern frontend technologies. Whether you're a 
        beginner or an experienced developer, our goal is to help you level up your skills with 
        practical, project-based learning.
      </p>
    </div>
    
    <div>
      <h3 className="font-medium mb-2">Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 text-sm">
        <div>
          <span className="text-youtube-darkgray">Location:</span> United States
        </div>
        <div>
          <span className="text-youtube-darkgray">Joined:</span> Jan 15, 2018
        </div>
        <div className="md:col-span-2">
          <span className="text-youtube-darkgray">Total views:</span> 24,892,075
        </div>
      </div>
    </div>
    
    <div>
      <h3 className="font-medium mb-2">Links</h3>
      <div className="flex flex-wrap gap-3 text-sm">
        <a href="#" className="text-blue-600">
          <svg viewBox="0 0 24 24" className="h-5 w-5 inline-block align-text-bottom mr-1">
            <g>
              <path d="M18.36 5.64c-1.95-1.96-5.11-1.96-7.07 0L9.88 7.05 8.46 5.64l1.42-1.42c2.73-2.73 7.16-2.73 9.9 0 2.73 2.74 2.73 7.17 0 9.9l-7.07 7.07c-1.37 1.37-3.17 2.05-4.96 2.05s-3.6-.68-4.95-2.05c-2.73-2.73-2.73-7.16 0-9.9l1.42-1.42 1.41 1.42-1.41 1.42c-1.96 1.96-1.96 5.12 0 7.07 1.95 1.96 5.11 1.96 7.07 0l7.07-7.07c1.95-1.96 1.95-5.12 0-7.07z" fill="currentColor"></path>
            </g>
          </svg>
          Website
        </a>
        <a href="#" className="text-blue-600">
          <svg viewBox="0 0 24 24" className="h-5 w-5 inline-block align-text-bottom mr-1">
            <g>
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-.4 4.25l-7.07 4.42c-.32.2-.74.2-1.06 0L4.4 8.25c-.25-.16-.4-.43-.4-.72 0-.67.73-1.07 1.3-.72L12 11l6.7-4.19c.57-.35 1.3.05 1.3.72 0 .29-.15.56-.4.72z" fill="currentColor"></path>
            </g>
          </svg>
          Email
        </a>
        <a href="#" className="text-blue-600">
          <svg viewBox="0 0 24 24" className="h-5 w-5 inline-block align-text-bottom mr-1">
            <g>
              <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" fill="currentColor"></path>
            </g>
          </svg>
          Twitter
        </a>
        <a href="#" className="text-blue-600">
          <svg viewBox="0 0 24 24" className="h-5 w-5 inline-block align-text-bottom mr-1">
            <g>
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm-1-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm5 7h-2v-3c0-.55-.45-1-1-1s-1 .45-1 1v3h-2v-6h2v1.1c.52-.63 1.2-1.1 2-1.1 1.66 0 3 1.34 3 3v3z" fill="currentColor"></path>
            </g>
          </svg>
          LinkedIn
        </a>
        <a href="#" className="text-blue-600">
          <svg viewBox="0 0 24 24" className="h-5 w-5 inline-block align-text-bottom mr-1">
            <g>
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"></path>
            </g>
          </svg>
          Discord
        </a>
      </div>
    </div>
  </div>
);

const ChannelPage: React.FC = () => {
  const { setCurrentPage, openCreatorDm, currentChannelTab, setCurrentChannelTab } = useYoutube();
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    setCurrentPage('channel');
  }, [setCurrentPage]);

  return (
    <div className="pb-8 animate-fade-in">
      {/* Channel Banner */}
      <div className="h-32 sm:h-40 lg:h-56 bg-gradient-to-r from-blue-400 to-red-500 w-full mb-4 overflow-hidden relative group">
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
      </div>

      {/* Channel Info */}
      <div className="px-4 lg:px-8 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Channel Avatar */}
          <div className="relative group">
            <img
              src="https://i.pravatar.cc/150?img=12"
              alt="DevTech"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full transition-transform duration-200 group-hover:scale-105 border-2 border-transparent group-hover:border-red-400"
            />
            <div className="absolute inset-0 bg-red-500 rounded-full opacity-0 group-hover:opacity-25 transition-opacity"></div>
          </div>
          
          {/* Channel Details */}
          <div className="flex-1 transition-all duration-300 hover:translate-x-1">
            <h1 className="text-xl sm:text-2xl font-bold group">
              <span className="bg-clip-text bg-gradient-to-r from-red-600 to-blue-500 group-hover:text-transparent transition-all duration-300">DevTech</span>
            </h1>
            <div className="text-sm text-youtube-darkgray">
              <span>@devtech</span>
              <span className="mx-1">•</span>
              <span>500K subscribers</span>
              <span className="mx-1">•</span>
              <span>230 videos</span>
            </div>
            <div className="text-sm text-youtube-darkgray mt-1 flex items-center">
              <span className="line-clamp-1 mr-1">
                Web development tutorials focused on React, JavaScript, and modern frontend technologies.
              </span>
              <button className="text-youtube-darkgray hover:text-black transition-colors">more</button>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-2 self-start sm:self-center mt-2 sm:mt-0">
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button 
                  onClick={() => openCreatorDm()}
                  variant="ghost"
                  className="bg-gray-100 hover:bg-gray-200 flex items-center gap-2 rounded-full h-9 transition-transform hover:scale-105"
                >
                  <MessageSquare className="h-5 w-5" />
                  <span>Message</span>
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-64">
                <div className="text-sm">
                  <p>Send a direct message to DevTech</p>
                </div>
              </HoverCardContent>
            </HoverCard>
            
            <Button 
              onClick={() => setIsSubscribed(!isSubscribed)}
              className={`rounded-full h-9 flex items-center gap-2 transition-all duration-200 ${
                isSubscribed 
                  ? 'bg-gray-100 hover:bg-gray-200 text-black' 
                  : 'bg-black hover:bg-zinc-800 text-white'
              } hover:scale-105`}
            >
              {isSubscribed ? 'Subscribed' : 'Subscribe'}
            </Button>
            
            {isSubscribed && (
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-9 w-9 bg-gray-100 hover:bg-gray-200 transition-transform hover:scale-105"
              >
                <BellIcon className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Channel Navigation Tabs */}
      <ScrollArea className="w-full border-b border-gray-200">
        <div className="px-4 lg:px-8 min-w-max">
          <Tabs defaultValue="Home" value={currentChannelTab} onValueChange={setCurrentChannelTab}>
            <TabsList className="bg-transparent h-10 justify-start p-0 gap-2 mb-0">
              {['Home', 'Videos', 'Shorts', 'Live', 'Playlists', 'Community', 'Store', 'Channels', 'About'].map((tab) => (
                <TabsTrigger 
                  key={tab} 
                  value={tab}
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:rounded-none px-4 h-full transition-all hover:bg-gray-100 hover:text-red-600 active:scale-95"
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>
            
            <div className="mt-6">
              <TabsContent value="Home" className="m-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {channelVideos.slice(0, 4).map(video => (
                    <VideoCard key={video.id} {...video} />
                  ))}
                </div>
                
                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4">Popular Uploads</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {channelVideos.slice(0, 4).map(video => (
                      <VideoCard key={video.id} {...video} />
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="Videos" className="m-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {channelVideos.map(video => (
                    <VideoCard key={video.id} {...video} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="Shorts" className="m-0">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {channelVideos.slice(0, 6).map(video => (
                    <div key={video.id} className="relative aspect-[9/16]">
                      <img 
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <div className="absolute bottom-2 left-2 text-white text-sm font-medium">
                        <div className="line-clamp-2">{video.title}</div>
                        <div className="text-xs">{video.views}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="Community" className="m-0">
                <div className="space-y-6 max-w-3xl">
                  {communityPosts.map(post => (
                    <div key={post.id} className="bg-white rounded-lg border border-gray-200 p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <img 
                          src="https://i.pravatar.cc/150?img=12" 
                          alt="DevTech" 
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <div className="font-medium">DevTech</div>
                          <div className="text-xs text-youtube-darkgray">{post.timestamp}</div>
                        </div>
                      </div>
                      
                      <p className="text-sm mb-3">{post.content}</p>
                      
                      {post.image && (
                        <img 
                          src={post.image} 
                          alt="Post attachment" 
                          className="rounded-lg max-h-96 w-full object-cover mb-3"
                        />
                      )}
                      
                      <div className="flex items-center text-sm text-youtube-darkgray mt-4">
                        <Button variant="ghost" size="sm" className="gap-1">
                          <ThumbsUp className="h-4 w-4" />
                          <span>{post.likes}K</span>
                        </Button>
                        
                        <Button variant="ghost" size="sm">
                          <ThumbsDown className="h-4 w-4" />
                        </Button>
                        
                        <span className="mx-2">•</span>
                        
                        <span>{post.comments} comments</span>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="About" className="m-0">
                <AboutContent />
              </TabsContent>
              
              <TabsContent value="Live" className="m-0">
                <div className="text-center py-16">
                  <p className="text-lg text-youtube-darkgray">No live streams available</p>
                </div>
              </TabsContent>
              
              <TabsContent value="Playlists" className="m-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {Array(4).fill(0).map((_, i) => (
                    <div key={i} className="relative rounded-lg overflow-hidden">
                      <div className="aspect-video bg-gray-200 relative">
                        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-0.5">
                          {Array(4).fill(0).map((_, j) => (
                            <img 
                              key={j}
                              src={channelVideos[j % channelVideos.length].thumbnail}
                              alt="Playlist thumbnail"
                              className="w-full h-full object-cover"
                            />
                          ))}
                        </div>
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                          <div className="text-white text-center">
                            <div className="text-2xl font-bold">{4 + i}</div>
                            <div className="text-sm">videos</div>
                          </div>
                        </div>
                      </div>
                      <div className="p-2">
                        <h3 className="font-medium line-clamp-2">
                          {i === 0 ? "React Basics" : i === 1 ? "Advanced JavaScript" : i === 2 ? "CSS Masterclass" : "Web Development Tips"}
                        </h3>
                        <p className="text-sm text-youtube-darkgray">Updated 2 weeks ago</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="Channels" className="m-0">
                <div className="text-center py-16">
                  <p className="text-lg text-youtube-darkgray">This channel hasn't featured any other channels</p>
                </div>
              </TabsContent>
              
              <TabsContent value="Store" className="m-0">
                <div className="text-center py-16">
                  <p className="text-lg text-youtube-darkgray">This channel doesn't have any products yet</p>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </ScrollArea>
    </div>
  );
};

export default ChannelPage;
