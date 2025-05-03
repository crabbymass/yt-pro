
import React from 'react';
import { Link } from 'react-router-dom';
import { useYoutube } from '@/contexts/YoutubeContext';
import { MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

export interface VideoProps {
  id: string;
  title: string;
  channel: {
    name: string;
    id: string;
    avatar: string;
  };
  thumbnail: string;
  views: string;
  timestamp: string;
  duration: string;
  isShort?: boolean;
  orientation?: 'vertical' | 'horizontal';
}

const VideoCard: React.FC<VideoProps> = ({
  id,
  title,
  channel,
  thumbnail,
  views,
  timestamp,
  duration,
  isShort = false,
  orientation = 'vertical',
}) => {
  const { setCurrentPage } = useYoutube();

  const handleVideoClick = () => {
    setCurrentPage('watch');
  };

  const handleChannelClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentPage('channel');
  };

  if (orientation === 'horizontal') {
    return (
      <Link
        to={`/watch`}
        className="flex w-full gap-2 mb-2 hover:bg-gray-100 rounded-lg p-1 transition-all duration-200 hover:shadow-sm hover-scale"
        onClick={handleVideoClick}
      >
        <div className="relative flex-shrink-0 w-40 h-20 overflow-hidden rounded-lg">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />
          <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
            {duration}
          </div>
        </div>
        <div className="flex-grow min-w-0">
          <h3 className="text-sm font-medium line-clamp-2 group-hover:text-red-700 transition-colors">{title}</h3>
          <Link
            to={`/channel`}
            className="text-xs text-youtube-darkgray hover:text-black animated-underline"
            onClick={handleChannelClick}
          >
            {channel.name}
          </Link>
          <div className="text-xs text-youtube-darkgray">
            {views} • {timestamp}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <div className="group/video animate-fadeIn hover-shadow rounded-lg overflow-hidden">
      <Link
        to={`/watch`}
        className="block w-full cursor-pointer"
        onClick={handleVideoClick}
      >
        <div className="relative mb-2 rounded-xl overflow-hidden">
          <img
            src={thumbnail}
            alt={title}
            className="w-full object-cover aspect-video transition-transform duration-500 group-hover/video:scale-105"
          />
          <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
            {duration}
          </div>
          <div className="absolute inset-0 bg-black opacity-0 group-hover/video:opacity-10 transition-opacity"></div>
        </div>
      </Link>
      <div className="flex gap-3 mt-2 p-2">
        <Link
          to={`/channel`}
          className="flex-shrink-0 transition-transform duration-200 hover:scale-110"
          onClick={handleChannelClick}
        >
          <HoverCard>
            <HoverCardTrigger>
              <img
                src={channel.avatar}
                alt={channel.name}
                className="w-9 h-9 rounded-full transition-all duration-300 hover:shadow-md"
              />
            </HoverCardTrigger>
            <HoverCardContent className="w-64">
              <div className="flex gap-3">
                <img
                  src={channel.avatar}
                  alt={channel.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h4 className="font-medium">{channel.name}</h4>
                  <p className="text-xs text-youtube-darkgray">500K subscribers</p>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </Link>
        <div className="flex-grow min-w-0">
          <Link
            to={`/watch`}
            className="block w-full cursor-pointer"
            onClick={handleVideoClick}
          >
            <h3 className="font-medium text-sm md:text-base line-clamp-2 mb-1 group-hover/video:text-red-700 transition-colors">{title}</h3>
          </Link>
          <Link
            to={`/channel`}
            className="block text-sm text-youtube-darkgray hover:text-red-700 transition-colors animated-underline"
            onClick={handleChannelClick}
          >
            {channel.name}
          </Link>
          <div className="text-sm text-youtube-darkgray">
            {views} • {timestamp}
          </div>
        </div>
        <div className="opacity-0 group-hover/video:opacity-100 transition-opacity">
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-gray-200">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
