import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("testimonials").collect();
  },
});

export const getFeatured = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("testimonials")
      .filter((q) => q.eq(q.field("featured"), true))
      .collect();
  },
});

export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    const testimonials = [
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
        review: "Antonia transformed my look completely. Her expertise and precision are remarkable. I wouldn't trust anyone else with my grooming.",
        service: "Ultra Sculpting",
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

    for (const testimonial of testimonials) {
      await ctx.db.insert("testimonials", testimonial);
    }
  },
});
