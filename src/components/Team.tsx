import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export function Team() {
  const barbers = useQuery(api.barbers.list) || [];

  return (
    // 1. Changed section background to white
    <section id="team" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {/* 2. Changed heading text to dark gray */}
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-wider">
            THE MASTERS
          </h2>
          {/* Amber accent remains */}
          <div className="w-24 h-1 bg-amber-600 mx-auto mb-8"></div>
          {/* 2. Changed paragraph text to medium-dark gray */}
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet the artisans behind the craft. Each master brings years of experience and passion to every service.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {barbers.map((barber, index) => (
            <div key={barber._id} className="group text-center">
              <div className="relative mb-6 overflow-hidden rounded-lg">
                {/* 3. Changed placeholder background to light gray */}
                <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                  <img
                    src={barber.imageUrl || `https://images.unsplash.com/photo-${
                      index === 0 ? '1507003211169-0a1dd7228f2d' : 
                      index === 1 ? '1472099645785-5658abf4ff4e' : 
                      '1566492031773-4f4e44671d66'
                    }?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`}
                    alt={barber.name}
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                  />
                </div>
                {/* Removed dark gradient overlay which is not suitable for a light theme */}
              </div>

              {/* 2. Changed name text to dark gray */}
              <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">
                {barber.name}
              </h3>
              
              <p className="text-amber-600 font-semibold mb-4">
                {barber.title}
              </p>
              
              {/* 2. Changed bio text to medium-dark gray */}
              <p className="text-gray-600 mb-6 leading-relaxed">
                {barber.bio}
              </p>

              <div className="mb-6">
                {/* 2. Changed specialties heading to dark gray */}
                <h4 className="text-gray-900 font-semibold mb-3">Specialties:</h4>
                <div className="flex flex-wrap justify-center gap-2">
                  {barber.specialties.map((specialty, idx) => (
                    <span
                      key={idx}
                      className="bg-amber-600/20 text-amber-600 px-3 py-1 rounded-full text-sm"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-amber-600 mb-1">
                  {barber.experience}+
                </div>
                {/* 2. Changed secondary text to medium gray */}
                <div className="text-sm text-gray-500">Years Experience</div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          {/* 4. Changed button text to white for better contrast */}
          <button
            onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-8 py-4 rounded text-lg transition-all duration-300 hover:scale-105"
          >
            BOOK WITH A MASTER
          </button>
        </div>
      </div>
    </section>
  );
}