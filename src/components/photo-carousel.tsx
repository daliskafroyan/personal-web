import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useTransform, type PanInfo } from "framer-motion";
// Replace react-icons with lucide-react
import {
  Circle,
  Code,
  FileText,
  Layers,
  Layout,
} from "lucide-react";

// Update interface for image items
interface CarouselItem {
  id: number;
  imgSrc: string;
  alt: string;
}

// Update DEFAULT_ITEMS with your images from public folder
const DEFAULT_ITEMS: CarouselItem[] = [
  {
    id: 1,
    imgSrc: "/taksi.png", // Replace with your actual image paths
    alt: "Taksi Image 1",
  },
  {
    id: 2,
    imgSrc: "/taksi.png",
    alt: "Taksi Image 2",
  },
];

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS = { type: "spring", stiffness: 300, damping: 30 };

// Update CarouselProps interface
interface CarouselProps {
  items?: CarouselItem[];
  baseWidth?: string | number; // Allow both string and number
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  loop?: boolean;
  round?: boolean;
}

export default function Carousel({
  items = DEFAULT_ITEMS,
  baseWidth = "100%",
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = false,
  round = false,
}: CarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  // Add resize observer to get container width
  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  const containerPadding = 16;
  const itemWidth = typeof baseWidth === 'number' ? baseWidth - containerPadding * 2 : containerWidth - containerPadding * 2;
  const trackItemOffset = itemWidth + GAP;

  const carouselItems = loop ? [...items, items[0]] : items;
  const [currentIndex, setCurrentIndex] = useState(0);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => {
    if (pauseOnHover && containerRef.current) {
      const container = containerRef.current as HTMLDivElement;
      const handleMouseEnter = () => setIsHovered(true);
      const handleMouseLeave = () => setIsHovered(false);
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [pauseOnHover]);

  useEffect(() => {
    if (autoplay && (!pauseOnHover || !isHovered)) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev === items.length - 1 && loop) {
            return prev + 1; // Animate to clone.
          }
          if (prev === carouselItems.length - 1) {
            return loop ? 0 : prev;
          }
          return prev + 1;
        });
      }, autoplayDelay);
      return () => clearInterval(timer);
    }
  }, [
    autoplay,
    autoplayDelay,
    isHovered,
    loop,
    items.length,
    carouselItems.length,
    pauseOnHover,
  ]);

  const effectiveTransition = isResetting ? { duration: 0 } : SPRING_OPTIONS;

  const handleAnimationComplete = () => {
    if (loop && currentIndex === carouselItems.length - 1) {
      setIsResetting(true);
      x.set(0);
      setCurrentIndex(0);
      setTimeout(() => setIsResetting(false), 50);
    }
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
      if (loop && currentIndex === items.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex((prev) => Math.min(prev + 1, carouselItems.length - 1));
      }
    } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
      if (loop && currentIndex === 0) {
        setCurrentIndex(items.length - 1);
      } else {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
      }
    }
  };

  const dragProps = loop
    ? {}
    : {
      dragConstraints: {
        left: -trackItemOffset * (carouselItems.length - 1),
        right: 0,
      },
    };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden p-4 ${
        round ? "rounded-full" : "rounded-[24px]"
      } w-full h-full`}
      style={{
        width: typeof baseWidth === 'string' ? baseWidth : `${baseWidth}px`,
        ...(round && { height: typeof baseWidth === 'string' ? baseWidth : `${baseWidth}px` }),
      }}
    >
      <motion.div
        className="flex"
        drag="x"
        dragElastic={0}
        dragMomentum={false}
        dragConstraints={{
          left: -trackItemOffset * (items.length - 1),
          right: 0,
        }}
        style={{
          width: `${itemWidth * carouselItems.length + GAP * (carouselItems.length - 1)}px`,
          gap: `${GAP}px`,
          x,
        }}
        onDragEnd={(_, info) => {
          const offset = info.offset.x;
          const velocity = info.velocity.x;

          if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
            if (currentIndex < items.length - 1) {
              setCurrentIndex(currentIndex + 1);
            }
          } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
            if (currentIndex > 0) {
              setCurrentIndex(currentIndex - 1);
            }
          }
        }}
        animate={{ x: -(currentIndex * trackItemOffset) }}
        transition={effectiveTransition}
      >
        {carouselItems.map((item, index) => (
          <motion.div
            key={item.id}
            className={`relative shrink-0 flex flex-col ${
              round
                ? "items-center justify-center text-center bg-[#060606]"
                : "items-start justify-between bg-transparent"
            } overflow-hidden cursor-grab active:cursor-grabbing touch-pan-y`}
            style={{
              width: itemWidth,
              height: "100%",
              ...(round && { borderRadius: "50%" }),
            }}
            drag={false}
          >
            <img
              src={item.imgSrc}
              alt={item.alt}
              className="w-full h-full object-cover pointer-events-none"
              draggable={false}
            />
          </motion.div>
        ))}
      </motion.div>
      <div
        className={`flex w-full justify-center ${
          round ? "absolute z-20 bottom-12 left-1/2 -translate-x-1/2" : ""
        }`}
      >
        <div className="mt-4 flex w-[150px] justify-between px-8">
          {items.map((item) => (
            <motion.div
              key={`nav-dot-${item.id}`}
              className={`h-2 w-2 rounded-full cursor-pointer transition-colors duration-150 ${
                currentIndex % items.length === items.indexOf(item)
                  ? round
                    ? "bg-white"
                    : "bg-[#333333]"
                  : round
                    ? "bg-[#555]"
                    : "bg-[rgba(51,51,51,0.4)]"
              }`}
              animate={{
                scale: currentIndex % items.length === items.indexOf(item) ? 1.2 : 1,
              }}
              onClick={() => setCurrentIndex(items.indexOf(item))}
              transition={{ duration: 0.15 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
