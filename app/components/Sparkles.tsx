'use client';

import { useEffect, useState } from 'react';

interface Sparkle {
  id: number;
  x: number;
  startY: number;
  endY: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export default function Sparkles() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    // Tạo sparkles ban đầu
    const createSparkles = () => {
      const newSparkles: Sparkle[] = [];
      for (let i = 0; i < 30; i++) {
        newSparkles.push({
          id: Date.now() + i,
          x: Math.random() * 100,
          startY: -10 - Math.random() * 20, // Bắt đầu từ trên màn hình
          endY: 110, // Rơi xuống dưới màn hình
          size: Math.random() * 5 + 3,
          duration: Math.random() * 3000 + 4000, // 4-7 giây để rơi
          delay: Math.random() * 2000, // Delay khác nhau để rơi liên tục
          opacity: Math.random() * 0.5 + 0.5, // 0.5-1.0
        });
      }
      return newSparkles;
    };

    // Tạo sparkles ban đầu
    requestAnimationFrame(() => {
      setSparkles(createSparkles());
    });

    // Tạo thêm sparkles mới mỗi 1.5 giây để rơi liên tục
    const interval = setInterval(() => {
      const newSparkles: Sparkle[] = [];
      // Tạo 5-8 sparkles mới mỗi lần
      const count = Math.floor(Math.random() * 4) + 5;
      for (let i = 0; i < count; i++) {
        newSparkles.push({
          id: Date.now() + Math.random() * 1000,
          x: Math.random() * 100,
          startY: -10 - Math.random() * 20,
          endY: 110,
          size: Math.random() * 5 + 3,
          duration: Math.random() * 3000 + 4000,
          delay: 0,
          opacity: Math.random() * 0.5 + 0.5,
        });
      }
      setSparkles((prev) => {
        // Giữ tối đa 50 sparkles để không quá nhiều
        const updated = [...prev, ...newSparkles];
        return updated.slice(-50);
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  if (sparkles.length === 0) return null;

  return (
    <div className='fixed inset-0 pointer-events-none overflow-hidden z-50'>
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className='absolute sparkle-fall'
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.startY}%`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            opacity: sparkle.opacity,
            animation: `sparkleFall ${sparkle.duration}ms ${sparkle.delay}ms linear infinite`,
          }}
        >
          <div
            className='w-full h-full rounded-full blur-[1px]'
            style={{
              background: 'linear-gradient(135deg, #D4AF37 0%, #FFD700 50%, #D4AF37 100%)',
              boxShadow: '0 0 8px rgba(212, 175, 55, 0.8), 0 0 4px rgba(212, 175, 55, 0.5)',
            }}
          />
        </div>
      ))}
    </div>
  );
}
