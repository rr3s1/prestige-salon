import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState, useEffect } from "react";

export function Testimonials() {
  const testimonials = useQuery(api.testimonials.list) || [];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (testimonials.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [testimonials.length]);

  if (testimonials.length === 0) return null;

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section id="testimonials" className="py-20 relative overflow-hidden">
      {/* Dynamic animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-950 via-black to-indigo-900 animate-gradient-xy" 
           style={{ backgroundSize: '400% 400%' }}></div>
      <div className="absolute inset-0 "></div>
      <div className="absolute inset-0 bg-gradient-to-bl from-amber-600/10 via-transparent to-primary/15 animate-pulse"></div>
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-wider">
            CLIENT EXPERIENCES
          </h2>
          <div className="w-24 h-1 bg-amber-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Hear from our distinguished clientele about their experiences at Prestige.
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="text-center mb-12">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-6 h-6 text-amber-600 inline-block mx-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            
            <blockquote className="text-2xl md:text-3xl text-white font-light italic mb-8 leading-relaxed">
              "{currentTestimonial.review}"
            </blockquote>
            
            <div className="text-center">
              <div className="text-xl font-bold text-amber-600 mb-2">
                {currentTestimonial.clientName}
              </div>
              <div className="text-gray-400">
                {currentTestimonial.service} • {new Date(currentTestimonial.date).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial Navigation */}
        <div className="flex justify-center space-x-2 mb-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-8 h-8 rounded-full transition-all duration-300 flex items-center justify-center ${
                index === currentIndex ? "bg-amber-600" : "bg-gray-600 hover:bg-gray-500"
              }`}
              aria-label={`View testimonial ${index + 1}`}
              aria-pressed={index === currentIndex}
            >
              <span className="sr-only">Testimonial {index + 1}</span>
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-amber-600 mb-2">4.9</div>
            <div className="text-gray-400">Average Rating</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-amber-600 mb-2">250+</div>
            <div className="text-gray-400">Reviews</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-amber-600 mb-2">98%</div>
            <div className="text-gray-400">Satisfaction</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-amber-600 mb-2">94%</div>
            <div className="text-gray-400">Return Clients</div>
          </div>
        </div>
      </div>
    </section>
  );
}
