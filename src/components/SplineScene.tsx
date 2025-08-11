import { useState, useEffect } from "react";
import Spline from '@splinetool/react-spline';

export function SplineScene() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="relative w-full min-h-[100vh] overflow-hidden">
      {/* Dynamic animated gradient background - optimized for performance */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-950 via-black to-indigo-900" 
           style={{ 
             backgroundSize: '400% 400%',
             animation: 'gradient-xy 15s ease infinite',
             willChange: 'background-position'
           }}></div>
      <div className="absolute inset-0 bg-gradient-to-bl from-amber-600/10 via-transparent to-primary/15" 
           style={{ 
             animation: 'pulse 4s ease-in-out infinite',
             willChange: 'opacity'
           }}></div>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="animate-pulse text-white/70">Loading 3D scene...</div>
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center z-20 bg-red-900/20">
          <div className="text-red-400">Error loading 3D scene: {error}</div>
        </div>
      )}
      
      <div className={`relative w-full h-full min-h-[100vh] z-10 ${isMobile ? 'flex items-center justify-center' : ''}`}>
        <div className={`${isMobile ? 'w-full h-[80vh] transform scale-90' : 'w-full h-full'}`}>
          <Spline 
            scene="https://prod.spline.design/kjqTUgEBMS8LpLkw/scene.splinecode"
            onLoad={() => {
              console.log('Spline scene loaded successfully');
              setIsLoading(false);
            }}
            onError={(error) => {
              console.error('Spline error:', error);
              setError('Failed to load 3D content');
              setIsLoading(false);
            }}
            style={{
              width: '100%',
              height: '100%',
              minHeight: isMobile ? '80vh' : '100vh',
              opacity: isLoading ? 0 : 1,
              transition: 'opacity 0.2s ease-in-out'
            }}
          />
        </div>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none z-20"></div>
      
      {/* Modern Title */}
      <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
        <div className="text-center px-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
            <span className="bg-gradient-to-r from-amber-200 via-orange-300 to-amber-400 bg-clip-text text-transparent">
              Preocupied to help shine 
            </span>
            <br />
            <span className="text-white/90">
                any light on you 
            </span>
          </h1>
          <div className="mt-4 h-1 w-24 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
