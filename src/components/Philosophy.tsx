"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CountUp from "react-countup";

gsap.registerPlugin(ScrollTrigger);

export function Philosophy() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const headlineRef = useRef(null);
  const bodyRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const headline = headlineRef.current;
    const body = bodyRef.current;
    const stats = statsRef.current;

    gsap.fromTo(
      headline,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      body,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.3,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      image,
      { opacity: 0, scale: 1.1 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      stats,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.6,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-28 bg-black text-white font-sans"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-16 items-center">
        <div className="relative order-2 md:order-1">
          <div
            ref={imageRef}
            className="aspect-w-4 aspect-h-5 rounded-lg overflow-hidden shadow-luxury"
          >
            <img
              src="/philosophy.webp"
              alt="Barber at work"
              loading="lazy"
              width={1000}
              height={1250}
              className="w-full h-full object-cover filter grayscale"
            />
          </div>
        </div>

        <div className="space-y-8 order-1 md:order-2">
          <div ref={headlineRef}>
            <h2 className="text-4xl md:text-5xl font-heading text-white mb-4">
              Our Philosophy
            </h2>
            <div className="w-24 h-0.5 bg-primary/50"></div>
          </div>

          <div ref={bodyRef} className="space-y-6">
            <p className="text-lg text-gray-300 leading-relaxed">
              “Excellence is not a skill, it's an attitude.”
            </p>
            <p className="text-lg text-gray-400 leading-relaxed">
              At Prestige, we believe that true luxury lies in the details. Our master craftsmen blend time-honored traditions with contemporary refinement to create an experience that transcends ordinary grooming.
            </p>
          </div>

          <div ref={statsRef} className="flex items-center space-x-8 pt-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">
                <CountUp end={25} duration={3} scrollSpyOnce />+
              </div>
              <div className="text-sm text-gray-400 mt-1">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">
                <CountUp end={8500} duration={3} scrollSpyOnce />+
              </div>
              <div className="text-sm text-gray-400 mt-1">Distinguished Clients</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">
                <CountUp end={98} duration={3} scrollSpyOnce />%
              </div>
              <div className="text-sm text-gray-400 mt-1">Client Retention</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}