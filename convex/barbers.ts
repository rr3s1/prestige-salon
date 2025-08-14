import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("barbers").collect();
  },
});

export const getFeatured = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("barbers")
      .filter((q) => q.eq(q.field("featured"), true))
      .collect();
  },
});

export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    const barbers = [
      {
        name: "Marcus Rodriguez",
        title: "Master Barber & Owner",
        bio: "With over 15 years of experience, Marcus combines traditional barbering techniques with modern styling to create timeless looks.",
        specialties: ["Classic Cuts", "Beard Sculpting", "Straight Razor"],
        experience: 15,
        featured: true,
        imageUrl: "/MarcusR.webp",
      },
      {
        name: "James Chen",
        title: "Senior Stylist",
        bio: "James specializes in contemporary cuts and precision fades, bringing fresh perspectives to classic styles.",
        specialties: ["Modern Cuts", "Fades", "Hair Styling"],
        experience: 8,
        featured: true,
        imageUrl: "/JamesC.webp",
      },
      {
        name: "Antonia Silva",
        title: "HairStyle Specialist",
        bio: "Antonia is our elite hairstylist, renowned for her creative vision and precision in crafting sophisticated, contemporary styles.",
        specialties: ["Creative Styling", "Color Consultation", "Texture Treatments"],
        experience: 12,
        featured: true,
        imageUrl: "/AntoniaS.webp",
      },
    ];

    for (const barber of barbers) {
      await ctx.db.insert("barbers", barber);
    }
  },
});

export const reseedBarbers = mutation({
  args: {},
  handler: async (ctx) => {
    // Clear existing barbers
    const existingBarbers = await ctx.db.query("barbers").collect();
    for (const barber of existingBarbers) {
      await ctx.db.delete(barber._id);
    }

    // Insert new barbers with correct image paths
    const barbers = [
      {
        name: "Marcus Rodriguez",
        title: "Master Barber & Owner",
        bio: "With over 15 years of experience, Marcus combines traditional barbering techniques with modern styling to create timeless looks.",
        specialties: ["Classic Cuts", "Beard Sculpting", "Straight Razor"],
        experience: 15,
        featured: true,
        imageUrl: "/MarcusR.webp",
      },
      {
        name: "James Chen",
        title: "Senior Stylist",
        bio: "James specializes in contemporary cuts and precision fades, bringing fresh perspectives to classic styles.",
        specialties: ["Modern Cuts", "Fades", "Hair Styling"],
        experience: 8,
        featured: true,
        imageUrl: "/JamesC.webp",
      },
      {
        name: "Antonia Silva",
        title: "HairStyle Specialist",
        bio: "Antonia is our elite hairstylist, renowned for her creative vision and precision in crafting sophisticated, contemporary styles.",
        specialties: ["Creative Styling", "Color Consultation", "Texture Treatments"],
        experience: 12,
        featured: true,
        imageUrl: "/AntoniaS.webp",
      },
    ];

    for (const barber of barbers) {
      await ctx.db.insert("barbers", barber);
    }

    return "Barbers reseeded successfully!";
  },
});
