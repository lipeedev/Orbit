"use client"

import { useState, ReactNode } from 'react';
import { useSwipeable } from 'react-swipeable';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselProps {
  children: ReactNode[];
}

export function Carousel({ children }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  function nextSlide() {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % children.length);
  }

  function prevSlide() {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + children.length) % children.length);
  }

  const handlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: prevSlide,
  });

  return (
    <div className="shadow-lg shadow-gray-200 mt-10 px-3 flex flex-col justify-end bg-gray-100 h-60 md:h-full md:w-96 md:mr-8 md:mx-auto mx-6 rounded-lg">
      <div {...handlers} className="relative w-full h-full">
        <div className="overflow-hidden relative h-full">
          <div
            className="flex transition-transform duration-500 h-full"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {children.map((child, index) => (
              <div key={index} className="w-full flex-shrink-0 h-full">
                {child}
              </div>
            ))}
          </div>
        </div>
        <button
          className="absolute opacity-90 top-1/2 left-0 transform -translate-y-1/2 text-gray-600"
          onClick={prevSlide}
        >
          <ChevronLeft size={24} />
        </button>
        <button
          className="absolute opacity-90 top-1/2 right-0 transform -translate-y-1/2 text-gray-600"
          onClick={nextSlide}
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}


