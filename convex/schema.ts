import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  bookings: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    service: v.string(),
    barber: v.optional(v.string()),
    date: v.string(),
    time: v.string(),
    notes: v.optional(v.string()),
    status: v.union(v.literal("pending"), v.literal("confirmed"), v.literal("completed"), v.literal("cancelled")),
  }).index("by_date", ["date"]).index("by_email", ["email"]),
  
  services: defineTable({
    name: v.string(),
    description: v.string(),
    duration: v.number(),
    price: v.number(),
    category: v.string(),
    featured: v.boolean(),
  }),
  
  barbers: defineTable({
    name: v.string(),
    title: v.string(),
    bio: v.string(),
    specialties: v.array(v.string()),
    experience: v.number(),
    imageUrl: v.optional(v.string()),
    featured: v.boolean(),
  }),
  
  testimonials: defineTable({
    clientName: v.string(),
    rating: v.number(),
    review: v.string(),
    service: v.string(),
    date: v.string(),
    featured: v.boolean(),
  }),
  
  gallery: defineTable({
    title: v.string(),
    imageUrl: v.string(),
    category: v.union(v.literal("haircut"), v.literal("beard"), v.literal("styling"), v.literal("salon")),
    beforeAfter: v.optional(v.object({
      beforeUrl: v.string(),
      afterUrl: v.string(),
    })),
    featured: v.boolean(),
  }),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
