
import React from 'react';
import { Link } from 'react-router-dom';
import { useYoutube } from '@/contexts/YoutubeContext';
import { MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
        className="flex w-full gap-2 mb-2 hover:bg-gray-100 rounded-lg p-1 transition-colors"
        onClick={handleVideoClick}
      >
        <div className="relative flex-shrink-0 w-40 h-20">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
            {duration}
          </div>
        </div>
        <div className="flex-grow min-w-0">
          <h3 className="text-sm font-medium line-clamp-2">{title}</h3>
          <Link
            to={`/channel`}
            className="text-xs text-youtube-darkgray hover:text-black"
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
    <div className="group/video">
      <Link
        to={`/watch`}
        className="block w-full cursor-pointer"
        onClick={handleVideoClick}
      >
        <div className="relative mb-2 rounded-xl overflow-hidden">
          <img
            src={thumbnail}
            alt={title}
            className="w-full object-cover aspect-video"
          />
          <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
            {duration}
          </div>
        </div>
      </Link>
      <div className="flex gap-3 mt-2">
        <Link
          to={`/channel`}
          className="flex-shrink-0"
          onClick={handleChannelClick}
        >
          <img
            src={channel.avatar}
            alt={channel.name}
            className="w-9 h-9 rounded-full"
          />
        </Link>
        <div className="flex-grow min-w-0">
          <Link
            to={`/watch`}
            className="block w-full cursor-pointer"
            onClick={handleVideoClick}
          >
            <h3 className="font-medium text-sm md:text-base line-clamp-2 mb-1">{title}</h3>
          </Link>
          <Link
            to={`/channel`}
            className="block text-sm text-youtube-darkgray hover:text-black"
            onClick={handleChannelClick}
          >
            {channel.name}
          </Link>
          <div className="text-sm text-youtube-darkgray">
            {views} • {timestamp}
          </div>
        </div>
        <div className="invisible group-hover/video:visible">
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
