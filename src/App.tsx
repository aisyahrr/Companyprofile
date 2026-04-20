import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import ServiceDetail from "./pages/ServiceDetail.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Login from "./pages/admin/Login.tsx";
import AboutAdmin from "./pages/admin/AboutAdmin.tsx";
import ServicesAdmin from "./pages/admin/ServicesAdmin.tsx";
import TeamAdmin from "./pages/admin/TeamAdmin.tsx";
import PortfolioAdmin from "./pages/admin/PortfolioAdmin.tsx";
import TestimonialsAdmin from "./pages/admin/TestimonialsAdmin.tsx";
import BlogAdmin from "./pages/admin/BlogAdmin.tsx";
import FaqAdmin from "./pages/admin/FaqAdmin.tsx";
import SubscribersAdmin from "./pages/admin/SubscribersAdmin.tsx";
import MessagesAdmin from "./pages/admin/MessagesAdmin.tsx";
import { ProtectedRoute } from "./components/admin/ProtectedRoute.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const protect = (el: React.ReactNode) => <ProtectedRoute>{el}</ProtectedRoute>;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/layanan/:id" element={<ServiceDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={protect(<Dashboard />)} />
          <Route path="/admin/about" element={protect(<AboutAdmin />)} />
          <Route path="/admin/services" element={protect(<ServicesAdmin />)} />
          <Route path="/admin/team" element={protect(<TeamAdmin />)} />
          <Route path="/admin/portfolio" element={protect(<PortfolioAdmin />)} />
          <Route path="/admin/testimonials" element={protect(<TestimonialsAdmin />)} />
          <Route path="/admin/blog" element={protect(<BlogAdmin />)} />
          <Route path="/admin/faq" element={protect(<FaqAdmin />)} />
          <Route path="/admin/subscribers" element={protect(<SubscribersAdmin />)} />
          <Route path="/admin/messages" element={protect(<MessagesAdmin />)} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
