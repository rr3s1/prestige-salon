import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("services").collect();
  },
});

export const getFeatured = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("services")
      .filter((q) => q.eq(q.field("featured"), true))
      .collect();
  },
});

export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    const services = [
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

    for (const service of services) {
      await ctx.db.insert("services", service);
    }
  },
});
