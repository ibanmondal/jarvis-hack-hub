import { useState, useCallback } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParticleGrid from "@/components/ParticleGrid";
import LoadingScreen from "@/components/LoadingScreen";
import Index from "./pages/Index";
import About from "./pages/About";
import Problems from "./pages/Problems";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Chatbot from "@/components/Chatbot";

const queryClient = new QueryClient();

const App = () => {
  const [loaded, setLoaded] = useState(false);
  const handleLoaded = useCallback(() => setLoaded(true), []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {!loaded && <LoadingScreen onComplete={handleLoaded} />}
        <div className={`transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}>
          <BrowserRouter>
            <ParticleGrid />
            <Navbar />
            <main className="pt-0">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/problems" element={<Problems />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
            <Chatbot />
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
