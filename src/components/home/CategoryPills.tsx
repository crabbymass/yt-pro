
import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const categories = [
  "All",
  "Music",
  "Gaming",
  "News",
  "Live",
  "Comedy",
  "Recently uploaded",
  "Watched",
  "New to you",
  "Animation",
  "Movies",
  "Cooking",
  "Sports",
  "Tech",
  "Education",
  "Fashion",
  "Travel",
  "Podcasts"
];

const CategoryPills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const containerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const { scrollLeft, clientWidth } = containerRef.current;
      const scrollAmount = direction === 'left' ? -200 : 200;
      
      containerRef.current.scrollLeft = scrollLeft + scrollAmount;
      
      // Check if arrows should be displayed after scrolling
      setTimeout(() => {
        if (!containerRef.current) return;
        setShowLeftArrow(containerRef.current.scrollLeft > 0);
        setShowRightArrow(
          containerRef.current.scrollLeft + containerRef.current.clientWidth <
          containerRef.current.scrollWidth - 5
        );
      }, 100);
    }
  };

  return (
    <div className="relative">
      {/* Left Arrow */}
      {showLeftArrow && (
        <div className="absolute left-0 top-0 bottom-0 flex items-center bg-gradient-to-r from-[#f9f9f9] from-60% to-transparent w-16 z-10">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 rounded-full bg-white shadow-md hover:bg-gray-100"
            onClick={() => scroll('left')}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </div>
      )}
      
      {/* Categories */}
      <div 
        ref={containerRef}
        className="flex overflow-x-auto scrollbar-hide py-2 gap-3 px-4"
        onScroll={() => {
          if (!containerRef.current) return;
          setShowLeftArrow(containerRef.current.scrollLeft > 0);
          setShowRightArrow(
            containerRef.current.scrollLeft + containerRef.current.clientWidth <
            containerRef.current.scrollWidth - 5
          );
        }}
      >
        {categories.map(category => (
          <Button
            key={category}
            variant="outline"
            className={`rounded-lg border border-gray-300 py-1 px-3 whitespace-nowrap ${
              selectedCategory === category
                ? 'bg-black text-white hover:bg-black/90 border-black'
                : 'bg-gray-100 text-black hover:bg-gray-200 border-gray-300'
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>
      
      {/* Right Arrow */}
      {showRightArrow && (
        <div className="absolute right-0 top-0 bottom-0 flex items-center justify-end bg-gradient-to-l from-[#f9f9f9] from-60% to-transparent w-16 z-10">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 rounded-full bg-white shadow-md hover:bg-gray-100"
            onClick={() => scroll('right')}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default CategoryPills;
