import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';
import { useCompany } from '../../context/CompanyContext';

export function ImageBanner() {
  const { banners } = useCompany();
  const bannerSlides = banners && banners.length > 0 ? banners : [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Resetear índice si los banners cambian o se eliminan
  useEffect(() => {
    if (currentIndex >= bannerSlides.length) {
      setCurrentIndex(0);
    }
  }, [bannerSlides.length, currentIndex]);

  // Auto-rotación del Banner cada 5 segundos
  useEffect(() => {
    if (bannerSlides.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [bannerSlides.length]);


  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? bannerSlides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % bannerSlides.length);
  };

  // Soporte para gestos táctiles (Swipe en móviles)
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) handleNext(); // Deslizar a la izquierda
    if (distance < -50) handlePrev(); // Deslizar a la derecha
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  return (
    <section className="py-3 sm:py-5 md:py-6 container mx-auto px-3 sm:px-4 max-w-7xl">
      <div 
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl border border-gray-100 group h-[210px] xs:h-[230px] sm:h-[280px] md:h-[340px] lg:h-[400px] xl:h-[440px] 2xl:h-[480px] flex items-center bg-gray-950"
      >
        
        {/* Renderizado de Diapositivas */}
        {bannerSlides.map((slide, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out flex items-center ${
                isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Imagen de Fondo del Banner Adaptable */}
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover object-center transform scale-100 group-hover:scale-105 transition-transform duration-1000"
              />

              {/* Degradado Oscuro Adaptable para Máxima Legibilidad en Cualquier Pantalla */}
              <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-gray-950/95 via-gray-950/75 sm:via-gray-950/65 to-transparent p-4 xs:p-5 sm:p-8 md:p-10 lg:p-14 flex flex-col justify-center max-w-full sm:max-w-xl md:max-w-2xl text-white">
                
                <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                  <span className="bg-green-600/90 backdrop-blur-md text-white text-[9px] xs:text-[10px] sm:text-xs font-black uppercase tracking-wider px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-green-400/30 flex items-center gap-1.5 shadow-md">
                    <Sparkles size={11} className="text-amber-300 shrink-0" />
                    <span>{slide.badge}</span>
                  </span>
                </div>

                <h2 className="text-base xs:text-lg sm:text-2xl md:text-3xl lg:text-4xl 2xl:text-5xl font-black leading-tight text-white mb-1.5 sm:mb-3 drop-shadow-md">
                  {slide.title}
                </h2>

                <p className="text-[11px] xs:text-xs sm:text-sm md:text-base text-gray-200 line-clamp-2 mb-3 sm:mb-6 max-w-lg font-medium drop-shadow-sm leading-relaxed">
                  {slide.subtitle}
                </p>

                <div>
                  <a
                    href="#catalogo"
                    style={{ backgroundColor: '#58A618' }}
                    className="inline-flex items-center gap-2 hover:bg-green-600 text-white text-xs sm:text-sm font-black px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl shadow-lg transition-all hover:scale-105 min-h-[40px] sm:min-h-[44px]"
                  >
                    <span>{slide.ctaText}</span>
                    <ArrowRight size={15} />
                  </a>
                </div>

              </div>
            </div>
          );
        })}

        {/* Flechas de Navegación Manual (Ocultas en pantallas muy pequeñas, visibles desde SM en adelante o Touch Swipe) */}
        <button
          onClick={handlePrev}
          aria-label="Anterior banner"
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md text-white border border-white/30 flex items-center justify-center transition-all opacity-80 hover:opacity-100 shadow-md min-w-[36px] min-h-[36px]"
        >
          <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
        </button>

        <button
          onClick={handleNext}
          aria-label="Siguiente banner"
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md text-white border border-white/30 flex items-center justify-center transition-all opacity-80 hover:opacity-100 shadow-md min-w-[36px] min-h-[36px]"
        >
          <ChevronRight size={20} className="sm:w-6 sm:h-6" />
        </button>

        {/* Indicadores Circulares de Diapositiva (Puntos) */}
        <div className="absolute bottom-2.5 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 sm:gap-2 bg-black/40 backdrop-blur-md px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-white/20">
          {bannerSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 ${
                idx === currentIndex ? 'w-5 sm:w-7 bg-green-400' : 'w-2 sm:w-2.5 bg-white/50 hover:bg-white'
              }`}
              aria-label={`Ir al banner ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
