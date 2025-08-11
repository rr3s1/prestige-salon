import { useRef, useEffect } from "react";
import { gsap } from "gsap";

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    // Auto-play the video with blur effect
    if (videoRef.current) {
      // Apply initial blur
      videoRef.current.style.filter = "blur(8px)";
      
      videoRef.current.play().catch(error => {
        console.error("Video autoplay failed:", error);
      });

      // Remove blur after 2 seconds
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.style.transition = "filter 0.5s ease-out";
          videoRef.current.style.filter = "blur(0px)";
        }
      }, 2000);
    }

    // GSAP animations with stagger effect starting 1.2 seconds after page load
    const tl = gsap.timeline({ delay: 1.2 });
    
    // Set initial states
    gsap.set([titleRef.current, subtitleRef.current, descriptionRef.current, buttonRef.current], {
      opacity: 0,
      y: 50
    });

    // Animate elements with stagger
    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    })
    .to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.4")
    .to(descriptionRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.4")
    .to(buttonRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.4");

  }, []);

  const scrollToBooking = () => {
    const bookingSection = document.getElementById("booking");
    bookingSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          className="min-w-full min-h-full w-auto h-auto object-cover absolute top-1/2 lg:top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/hero-poster.webp"
          aria-label="Background video showing hair salon atmosphere"
        >
          <source src="/HeroPrestige.webm" type="video/webm" />
          <track kind="captions" src="/captions.vtt" srcLang="en" label="English" />
        </video>
        {/* 2. Replaced simple overlay with a vignette for a soft glow effect on the margins */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_rgba(0,0,0,0.7))]"></div>
      </div>
      
      {/* Spline Scene Overlay (commented out) */}
      {/* <div className="absolute inset-0 z-10 ml-[70%]"> ... </div> */}

      {/* Spotlight Gradient Scrim - Industry Standard Solution */}
      <div className="absolute inset-0 z-15 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-b from-black/30 via-black/10 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 text-center max-w-4xl mx-auto px-4 mb-30">
        {/* Enhanced text with drop shadow for maximum effect */}
        <h1 ref={titleRef} className="hero-title drop-shadow-lg">PRESTIGE</h1>
        <h1 ref={subtitleRef} className="text-5xl md:text-7xl font-bold mb-6 tracking-wider drop-shadow-lg">
          <span className="block text-white navbar-item">HairStyle</span>
        </h1>
        <p ref={descriptionRef} className="hero-subtitle drop-shadow-md">Luxury Grooming • Timeless Elegance</p>
        <a ref={buttonRef} href="#" className="cta-button drop-shadow-md">Book Appointment</a>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}