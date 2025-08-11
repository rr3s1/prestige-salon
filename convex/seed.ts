import { mutation } from "./_generated/server";

export const seedAll = mutation({
  args: {},
  handler: async (ctx) => {
    // Clear existing data
    const services = await ctx.db.query("services").collect();
    const barbers = await ctx.db.query("barbers").collect();
    const testimonials = await ctx.db.query("testimonials").collect();

    for (const service of services) {
      await ctx.db.delete(service._id);
    }
    for (const barber of barbers) {
      await ctx.db.delete(barber._id);
    }
    for (const testimonial of testimonials) {
      await ctx.db.delete(testimonial._id);
    }

    // Seed services
    const serviceData = [
      {
        name: "The Signature Cut",
        description: "Our master barbers craft a personalized cut that complements your face shape and lifestyle.",
        duration: 45,
        price: 85,
        category: "Haircuts",
        featured: true,
      },
      {
        name: "Classic Beard Sculpting",
        description: "Precision beard trimming and shaping with hot towel treatment and premium oils.",
        duration: 30,
        price: 55,
        category: "Beard Care",
        featured: true,
      },
      {
        name: "The Executive Package",
        description: "Complete grooming experience: cut, beard trim, styling, and scalp massage.",
        duration: 90,
        price: 150,
        category: "Premium",
        featured: true,
      },
      {
        name: "Traditional Straight Razor Shave",
        description: "Old-world craftsmanship with modern precision. Hot towels, premium creams, and expert technique.",
        duration: 40,
        price: 65,
        category: "Shaving",
        featured: false,
      },
      {
        name: "Hair Styling & Texture",
        description: "Professional styling with premium products to achieve your desired look.",
        duration: 25,
        price: 35,
        category: "Styling",
        featured: false,
      },
      {
        name: "Scalp Treatment",
        description: "Rejuvenating scalp massage with therapeutic oils and treatments.",
        duration: 30,
        price: 45,
        category: "Treatments",
        featured: false,
      },
    ];

    for (const service of serviceData) {
      await ctx.db.insert("services", service);
    }

    // Seed barbers
    const barberData = [
      {
        name: "Marcus Rodriguez",
        title: "Master Barber & Owner",
        bio: "With over 15 years of experience, Marcus combines traditional barbering techniques with modern styling to create timeless looks.",
        specialties: ["Classic Cuts", "Beard Sculpting", "Straight Razor"],
        experience: 15,
        featured: true,
      },
      {
        name: "James Chen",
        title: "Senior Stylist",
        bio: "James specializes in contemporary cuts and precision fades, bringing fresh perspectives to classic styles.",
        specialties: ["Modern Cuts", "Fades", "Hair Styling"],
        experience: 8,
        featured: true,
      },
      {
        name: "Antonia Silva",
        title: "HairStyle Specialist",
        bio: "Antonia is our elite hairstylist, renowned for her creative vision and precision in crafting sophisticated, contemporary styles.",
        specialties: ["Creative Styling", "Color Consultation", "Texture Treatments"],
        experience: 12,
        featured: true,
        imageUrl: "/AntoniaS.png",
      },
    ];

    for (const barber of barberData) {
      await ctx.db.insert("barbers", barber);
    }

    // Seed testimonials
    const testimonialData = [
      {
        clientName: "David Thompson",
        rating: 5,
        review: "Absolutely exceptional service. Marcus understood exactly what I wanted and delivered beyond my expectations. The attention to detail is unmatched.",
        service: "The Signature Cut",
        date: "2024-01-15",
        featured: true,
      },
      {
        clientName: "Michael Rodriguez",
        rating: 5,
        review: "Best barbershop experience I've ever had. The atmosphere is sophisticated, and James is a true artist with scissors.",
        service: "The Executive Package",
        date: "2024-01-10",
        featured: true,
      },
      {
        clientName: "Robert Chen",
        rating: 5,
        review: "Antonia completely transformed my look with her creative styling. Her artistic vision and precision are remarkable. I wouldn't trust anyone else with my hair.",
        service: "Hair Styling & Texture",
        date: "2024-01-08",
        featured: true,
      },
      {
        clientName: "Alexander Kim",
        rating: 5,
        review: "The traditional straight razor shave was an incredible experience. Felt like royalty. Will definitely be returning regularly.",
        service: "Traditional Straight Razor Shave",
        date: "2024-01-05",
        featured: false,
      },
    ];

    for (const testimonial of testimonialData) {
      await ctx.db.insert("testimonials", testimonial);
    }

    return "Database seeded successfully!";
  },
});
