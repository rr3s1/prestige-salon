import { useState, useEffect } from "react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToBooking = () => {
    const bookingSection = document.getElementById("booking");
    bookingSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/90 backdrop-blur-md border-b border-gray-800"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="header-logo text-2xl">
              PRESTIGE
            </h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#services" className="navbar-item text-lg text-white hover:text-amber-600 transition-colors">
              Services
            </a>
            <a href="#gallery" className="navbar-item text-lg text-white hover:text-amber-600 transition-colors">
              Gallery
            </a>
            <a href="#team" className="navbar-item text-lg text-white hover:text-amber-600 transition-colors">
              Team
            </a>
            <a href="#testimonials" className="navbar-item text-lg text-white hover:text-amber-600 transition-colors">
              Reviews
            </a>
          </nav>

          <button
            onClick={scrollToBooking}
            className="cta-button my-4 rounded transition-all duration-300 hover:scale-105"
          >
            BOOK NOW
          </button>
        </div>
      </div>
    </header>
  );
}
