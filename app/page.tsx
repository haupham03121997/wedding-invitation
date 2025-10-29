'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Sparkles from './components/Sparkles';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const carouselIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const heroImages = ['/wedding-hero.jpg', '/wedding-1.jpg', '/wedding-2.jpg', '/wedding-3.jpg', '/wedding-4.jpg'];

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      sectionRefs.current.forEach((ref) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          const isInView = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
          if (isInView) {
            ref.classList.add('animate-fade-in');
          }
        }
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Carousel auto-play
  useEffect(() => {
    carouselIntervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => {
      if (carouselIntervalRef.current) {
        clearInterval(carouselIntervalRef.current);
      }
    };
  }, [heroImages.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    if (carouselIntervalRef.current) {
      clearInterval(carouselIntervalRef.current);
    }
    carouselIntervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
  };

  // Gallery images với các kích thước khác nhau cho masonry layout
  const galleryImages = [
    { src: '/wedding-1.jpg', alt: 'Wedding Photo 1', span: 'col-span-1 row-span-2' },
    { src: '/wedding-2.jpg', alt: 'Wedding Photo 2', span: 'col-span-1 row-span-1' },
    { src: '/wedding-3.jpg', alt: 'Wedding Photo 3', span: 'col-span-1 row-span-1' },
    { src: '/wedding-4.jpg', alt: 'Wedding Photo 4', span: 'col-span-2 row-span-1' },
    { src: '/wedding-5.jpg', alt: 'Wedding Photo 5', span: 'col-span-1 row-span-1' },
    { src: '/wedding-6.jpg', alt: 'Wedding Photo 6', span: 'col-span-1 row-span-2' },
    { src: '/wedding-7.jpg', alt: 'Wedding Photo 7', span: 'col-span-1 row-span-1' },
    { src: '/wedding-8.jpg', alt: 'Wedding Photo 8', span: 'col-span-1 row-span-1' },
    { src: '/wedding-9.jpg', alt: 'Wedding Photo 9', span: 'col-span-2 row-span-1' },
    { src: '/wedding-10.jpg', alt: 'Wedding Photo 10', span: 'col-span-1 row-span-1' },
  ];

  return (
    <div className='min-h-screen bg-[#111111] relative'>
      {/* Sparkles Effect - Tự động rơi xuống */}
      <Sparkles />

      {/* Hero Section with Carousel */}
      <section className='relative min-h-screen flex items-center justify-center overflow-hidden'>
        {/* Carousel Background */}
        <div className='absolute inset-0 z-0'>
          {heroImages.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                transform: `translateY(${scrollY * 0.5}px) scale(${1 + scrollY * 0.0001})`,
              }}
            >
              <Image src={img} alt={`Wedding Hero ${index + 1}`} fill className='object-cover' priority={index === 0} />
              <div className='absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/80' />
            </div>
          ))}
        </div>

        {/* Hero Content */}
        <div className='relative z-10 text-center px-4'>
          <div className='mb-6 animate-fade-in-delay'>
            <h2 className='text-2xl md:text-3xl font-light text-[#C0C0C0] mb-4 tracking-widest uppercase'>
              Chúng tôi sắp kết hôn
            </h2>
            <div
              className='w-24 h-px bg-[#D4AF37] mx-auto mb-6'
              style={{ boxShadow: '0 0 10px rgba(212, 175, 55, 0.8)' }}
            />
          </div>

          <h1 className='text-5xl md:text-7xl lg:text-8xl font-serif mb-6 animate-fade-in-delay-2 gold-text'>
            Xuân Hậu & Thuý Uyên
          </h1>

          <div className='animate-fade-in-delay-3'>
            <p className='text-xl md:text-2xl text-[#F4F4F4] mb-2 font-light'>15 Tháng 12, 2024</p>
            <p className='text-lg md:text-xl text-[#C0C0C0] font-light'>Hà Nội, Việt Nam</p>
          </div>

          {/* Carousel Indicators */}
          <div className='flex justify-center gap-2 mt-12 mb-6'>
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'w-8 bg-[#D4AF37]' : 'w-2 bg-[#C0C0C0]/30 hover:bg-[#C0C0C0]/50'
                }`}
                style={index === currentSlide ? { boxShadow: '0 0 10px rgba(212, 175, 55, 0.8)' } : {}}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <div className='mt-6 animate-bounce-slow'>
            <a href='#invitation' className='inline-block text-[#D4AF37] hover:text-[#FFD700] transition-colors'>
              <svg className='w-8 h-8 mx-auto' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 14l-7 7m0 0l-7-7m7 7V3' />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Invitation Section */}
      <section
        id='invitation'
        ref={(el) => {
          sectionRefs.current[0] = el as HTMLDivElement;
        }}
        className='py-24 px-4 md:px-8 opacity-0 bg-[#111111]'
      >
        <div className='max-w-4xl mx-auto text-center'>
          <h2 className='text-4xl md:text-5xl font-serif mb-8 gold-text'>Thiệp Mời</h2>
          <div className='w-32 h-px bg-[#D4AF37] mx-auto mb-12' />

          <div className='space-y-6 text-lg md:text-xl text-[#F4F4F4] leading-relaxed font-light'>
            <p>Kính mời Quý bạn bè và người thân</p>
            <p>Đến dự Lễ Thành Hôn của chúng tôi</p>
            <div className='my-12'>
              <p className='text-3xl md:text-4xl font-serif mb-4 gold-text'>Xuân Hậu & Thuý Uyên</p>
            </div>
            <p>
              Vào lúc <span className='font-semibold text-[#D4AF37]'>17:00</span> ngày{' '}
              <span className='font-semibold text-[#D4AF37]'>15 Tháng 12, 2024</span>
            </p>
            <p>
              Tại <span className='font-semibold text-[#D4AF37]'>Khách sạn InterContinental</span>
            </p>
            <p className='text-base md:text-lg text-[#C0C0C0] mt-8'>
              1A Nam Hồ, Đường Tôn Đức Thắng, Quận Ba Đình, Hà Nội
            </p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section
        ref={(el) => {
          sectionRefs.current[1] = el as HTMLDivElement;
        }}
        className='py-24 px-4 md:px-8 bg-black/30 opacity-0'
      >
        <div className='max-w-4xl mx-auto'>
          <h2 className='text-4xl md:text-5xl font-serif mb-16 text-center gold-text'>Lịch Trình</h2>

          <div className='space-y-12'>
            <div className='flex flex-col md:flex-row gap-6 items-start'>
              <div className='w-full md:w-1/3 text-right md:pr-8'>
                <p className='text-2xl font-serif text-[#D4AF37]'>17:00</p>
                <p className='text-[#C0C0C0]'>Đón khách</p>
              </div>
              <div className='w-full md:w-2/3 pl-0 md:pl-8 border-l-2 border-[#D4AF37]/50'>
                <p className='text-lg text-[#F4F4F4] leading-relaxed'>
                  Đón tiếp quý khách và chụp ảnh lưu niệm tại sảnh chính
                </p>
              </div>
            </div>

            <div className='flex flex-col md:flex-row gap-6 items-start'>
              <div className='w-full md:w-1/3 text-right md:pr-8'>
                <p className='text-2xl font-serif text-[#D4AF37]'>18:00</p>
                <p className='text-[#C0C0C0]'>Lễ cưới</p>
              </div>
              <div className='w-full md:w-2/3 pl-0 md:pl-8 border-l-2 border-[#D4AF37]/50'>
                <p className='text-lg text-[#F4F4F4] leading-relaxed'>Nghi thức trao nhẫn và lời hứa hôn phối</p>
              </div>
            </div>

            <div className='flex flex-col md:flex-row gap-6 items-start'>
              <div className='w-full md:w-1/3 text-right md:pr-8'>
                <p className='text-2xl font-serif text-[#D4AF37]'>19:00</p>
                <p className='text-[#C0C0C0]'>Tiệc cưới</p>
              </div>
              <div className='w-full md:w-2/3 pl-0 md:pl-8 border-l-2 border-[#D4AF37]/50'>
                <p className='text-lg text-[#F4F4F4] leading-relaxed'>Chúc mừng và thưởng thức bữa tiệc thịnh soạn</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section - Masonry Layout */}
      <section
        ref={(el) => {
          sectionRefs.current[2] = el as HTMLDivElement;
        }}
        className='py-24 px-4 md:px-8 opacity-0 bg-[#111111]'
      >
        <div className='max-w-7xl mx-auto'>
          <h2 className='text-4xl md:text-5xl font-serif mb-16 text-center gold-text'>Khoảnh Khắc</h2>

          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-fr'>
            {galleryImages.map((img, index) => (
              <div
                key={index}
                className={`relative overflow-hidden rounded-xl group cursor-pointer transform hover:scale-[1.02] transition-all duration-700 border-2 border-transparent hover:border-[#D4AF37]/50 ${img.span} ${
                  img.span.includes('row-span-2') ? 'h-[400px] md:h-[500px]' : 'h-[200px] md:h-[240px]'
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className='object-cover group-hover:scale-110 transition-transform duration-700'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
                <div className='absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500'>
                  <p className='text-white font-medium text-sm'>{img.alt}</p>
                </div>
                {/* Sparkles on hover */}
                <div className='absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500'>
                  <div className='absolute top-1/4 left-1/4 w-2 h-2 bg-[#D4AF37] rounded-full animate-ping' />
                  <div className='absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-[#FFD700] rounded-full animate-ping delay-150' />
                  <div className='absolute bottom-1/4 left-1/3 w-2.5 h-2.5 bg-[#D4AF37] rounded-full animate-ping delay-300' />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RSVP Section */}
      <section
        ref={(el) => {
          sectionRefs.current[3] = el as HTMLDivElement;
        }}
        className='py-24 px-4 md:px-8 bg-black/50 opacity-0'
      >
        <div className='max-w-2xl mx-auto text-center'>
          <h2 className='text-4xl md:text-5xl font-serif mb-8 gold-text'>Xác Nhận Tham Dự</h2>
          <div className='w-32 h-px bg-[#D4AF37] mx-auto mb-12' />

          <p className='text-lg text-[#F4F4F4] mb-12 font-light'>
            Chúng tôi rất mong được đón tiếp bạn trong ngày trọng đại của chúng tôi
          </p>

          <form className='space-y-6 text-left'>
            <div>
              <label className='block text-[#F4F4F4] mb-2 font-medium'>Họ và tên *</label>
              <input
                type='text'
                className='w-full px-4 py-3 bg-black/50 border border-[#C0C0C0]/30 text-[#F4F4F4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] transition-all placeholder:text-[#C0C0C0]/50'
                placeholder='Nhập họ và tên của bạn'
              />
            </div>

            <div>
              <label className='block text-[#F4F4F4] mb-2 font-medium'>Số điện thoại</label>
              <input
                type='tel'
                className='w-full px-4 py-3 bg-black/50 border border-[#C0C0C0]/30 text-[#F4F4F4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] transition-all placeholder:text-[#C0C0C0]/50'
                placeholder='Nhập số điện thoại'
              />
            </div>

            <div>
              <label className='block text-[#F4F4F4] mb-2 font-medium'>Số lượng người tham dự *</label>
              <select className='w-full px-4 py-3 bg-black/50 border border-[#C0C0C0]/30 text-[#F4F4F4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] transition-all'>
                <option className='bg-black text-[#F4F4F4]'>1 người</option>
                <option className='bg-black text-[#F4F4F4]'>2 người</option>
                <option className='bg-black text-[#F4F4F4]'>3 người</option>
                <option className='bg-black text-[#F4F4F4]'>4 người trở lên</option>
              </select>
            </div>

            <div>
              <label className='block text-[#F4F4F4] mb-2 font-medium'>Lời chúc (tùy chọn)</label>
              <textarea
                rows={4}
                className='w-full px-4 py-3 bg-black/50 border border-[#C0C0C0]/30 text-[#F4F4F4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] transition-all resize-none placeholder:text-[#C0C0C0]/50'
                placeholder='Gửi lời chúc đến cô dâu chú rể...'
              />
            </div>

            <button
              type='submit'
              className='w-full bg-gradient-to-r from-[#D4AF37] to-[#FFD700] hover:from-[#FFD700] hover:to-[#D4AF37] text-black font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.8)]'
            >
              Gửi xác nhận
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className='py-12 px-4 text-center bg-black text-[#F4F4F4]'>
        <p className='text-lg font-serif mb-2 gold-text'>Xuân Hậu & Thuý Uyên</p>
        <p className='text-sm text-[#C0C0C0]'>15 Tháng 12, 2024</p>
        <div className='mt-8 pt-8 border-t border-[#D4AF37]/30'>
          <p className='text-sm text-[#C0C0C0]'>Made with ❤️ for our special day</p>
        </div>
      </footer>
    </div>
  );
}
