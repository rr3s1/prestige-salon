import { useState } from "react";

const galleryImages = [
  {
    id: 1,
    src: "/gallery-1.webp",
    category: "haircut",
    title: "Precision Cut"
  },
  {
    id: 2,
    src: "/gallery-2.webp",
    category: "beard",
    title: "Beard Sculpting"
  },
  {
    id: 3,
    src: "/gallery-3.webp",
    category: "styling",
    title: "Classic Style"
  },
  {
    id: 4,
    src: "/gallery-4.webp",
    category: "salon",
    title: "Our Space"
  },
  {
    id: 5,
    src: "/gallery-5.webp",
    category: "haircut",
    title: "Modern Cut"
  },
  {
    id: 6,
    src: "/gallery-6.webp",
    category: "beard",
    title: "Beard Design"
  }
];

export function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const categories = ["all", "haircut", "beard", "styling", "salon"];

  const filteredImages = selectedCategory === "all" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  return (
    <section id="gallery" className="py-20 relative overflow-hidden">
      {/* Dynamic animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-950 via-black to-indigo-900 animate-gradient-xy" 
           style={{ backgroundSize: '400% 400%' }}></div>
      <div className="absolute inset-0 "></div>
      <div className="absolute inset-0 bg-gradient-to-bl from-amber-600/10 via-transparent to-primary/15 animate-pulse"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-wider">
            THE CRAFT
          </h2>
          <div className="w-24 h-1 bg-amber-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Witness the artistry and attention to detail that defines every service at Prestige.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-amber-600 text-black"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer"
              onClick={() => setSelectedImage(image.id)}
            >
              <img
                src={image.src}
                alt={image.title}
                loading="lazy"
                width={800}
                height={800}
                className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-white font-bold text-xl mb-2">{image.title}</h3>
                  <div className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Before/After Showcase */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-center text-white mb-12">
            TRANSFORMATIONS
          </h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <h4 className="text-xl font-semibold text-gray-300 mb-4">BEFORE</h4>
              <div className="aspect-square rounded-lg overflow-hidden">
                <img
                  src="/before.webp"
                  alt="Before transformation"
                  loading="lazy"
                  width={800}
                  height={800}
                  className="w-full h-full object-cover filter grayscale"
                />
              </div>
            </div>
            <div className="text-center">
              <h4 className="text-xl font-semibold text-amber-600 mb-4">AFTER</h4>
              <div className="aspect-square rounded-lg overflow-hidden">
                <img
                  src="/gallery-1.webp"
                  alt="After transformation"
                  loading="lazy"
                  width={800}
                  height={800}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for enlarged image */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <img
              src={galleryImages.find(img => img.id === selectedImage)?.src}
              alt="Enlarged view"
              width={1200}
              height={1200}
              className="max-w-full max-h-full object-contain"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white hover:text-amber-600 text-3xl"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
