"use client";
import { useRef, useEffect } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaCut, FaSpa, FaMagic } from 'react-icons/fa'; // Example icons

gsap.registerPlugin(ScrollTrigger);

const serviceIcons = {
  "Haircut": <FaCut className="w-8 h-8 text-primary" />,
  "Grooming": <FaSpa className="w-8 h-8 text-primary" />,
  "Styling": <FaMagic className="w-8 h-8 text-primary" />,
};

export function Services() {
  const services = useQuery(api.services.list) || [];
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const textRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const text = textRef.current;
    const cards = cardsRef.current ? Array.from(cardsRef.current.children) : [];

    gsap.fromTo(
      [headline, text],
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      cards,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
        },
      }
    );
  }, [services]); // Rerun animation logic if services data changes

  return (
    <section id="services" ref={sectionRef} className="py-28 bg-cream font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 ref={headlineRef} className="text-4xl md:text-5xl font-heading text-dark mb-4">
            Our Services
          </h2>
          <div className="w-24 h-0.5 bg-primary/50 mx-auto mb-6"></div>
          <p ref={textRef} className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Each service is a masterpiece of precision, tailored to enhance your individual style and confidence.
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service) => (
            <div
              key={service._id}
              className="group bg-white rounded-lg overflow-hidden border border-gray-200 shadow-lg hover:bg-gray-50 transition-all duration-300 hover:scale-105 hover:shadow-2xl flex flex-col"
            >
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-5">
                  <h3 className="text-2xl font-heading text-dark group-hover:text-primary transition-colors duration-300">
                    {service.name}
                  </h3>
                  <span className="text-3xl font-sans font-bold text-primary/80">
                    £{service.price}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-6 leading-relaxed flex-grow">
                  {service.description}
                </p>
                
                <div className="flex justify-between items-center text-sm text-gray-500 mb-8">
                  <span>{service.duration} minutes</span>
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                    {service.category}
                  </span>
                </div>

                <button className="w-full mt-auto bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold py-3 rounded-lg transition-all duration-300 transform hover:-translate-y-1">
                  SELECT SERVICE
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-20">
          <button
            onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-primary hover:bg-primary-hover text-white font-bold px-10 py-4 rounded-lg text-lg transition-all duration-300 hover:scale-105 shadow-glow"
          >
            BOOK YOUR APPOINTMENT
          </button>
        </div>
      </div>
    </section>
  );
}