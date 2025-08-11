import { Authenticated, Unauthenticated, useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { SignInForm } from "./SignInForm";
import { SignOutButton } from "./SignOutButton";
import { Toaster } from "sonner";
import { useEffect, useState } from "react";
import { Hero } from "./components/Hero";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { lazy, Suspense } from "react";

// Lazy load heavy components
const Philosophy = lazy(() => import("./components/Philosophy").then(m => ({ default: m.Philosophy })));
const Services = lazy(() => import("./components/Services").then(m => ({ default: m.Services })));
const Gallery = lazy(() => import("./components/Gallery").then(m => ({ default: m.Gallery })));
const Team = lazy(() => import("./components/Team").then(m => ({ default: m.Team })));
const Testimonials = lazy(() => import("./components/Testimonials").then(m => ({ default: m.Testimonials })));
const Booking = lazy(() => import("./components/Booking").then(m => ({ default: m.Booking })));
const SplineScene = lazy(() => import("./components/SplineScene").then(m => ({ default: m.SplineScene })));


export default function App() {
  const loggedInUser = useQuery(api.auth.loggedInUser);
  const [isLoading, setIsLoading] = useState(true);
  const seedDatabase = useMutation(api.seed.seedAll);
  const services = useQuery(api.services.list);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Seed database if no services exist
  useEffect(() => {
    if (services !== undefined && services.length === 0) {
      seedDatabase().catch(console.error);
    }
  }, [services, seedDatabase]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-2 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold text-white tracking-wider">PRESTIGE</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main>
        <Hero />
        <Suspense fallback={<div className="h-96 bg-black flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div></div>}>
          <Philosophy />
        </Suspense>
        <Suspense fallback={<div className="h-screen bg-black flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div></div>}>
          <SplineScene />
        </Suspense>
        <Suspense fallback={<div className="h-96 bg-cream flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div></div>}>
          <Services />
        </Suspense>
        <Suspense fallback={<div className="h-96 bg-black flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div></div>}>
          <Gallery />
        </Suspense>
        <Suspense fallback={<div className="h-96 bg-white flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div></div>}>
          <Team />
        </Suspense>
        <Suspense fallback={<div className="h-96 bg-black flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div></div>}>
          <Testimonials />
        </Suspense>
        <Suspense fallback={<div className="h-96 bg-white flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div></div>}>
          <Booking />
        </Suspense>
      </main>
      <Footer />
      <Toaster theme="dark" />
    </div>
  );
}
