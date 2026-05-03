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

// New role-based app
import AppHome from "./pages/app/AppHome.tsx";
import SuperDashboard from "./pages/app/super/SuperDashboard.tsx";
import UsersAdmin from "./pages/app/super/UsersAdmin.tsx";
import Monitoring from "./pages/app/super/Monitoring.tsx";
import FinalApproval from "./pages/app/super/FinalApproval.tsx";
import ActivityLogs from "./pages/app/super/ActivityLogs.tsx";
import CmsHero from "./pages/app/super/CmsHero.tsx";
import CmsAbout from "./pages/app/super/CmsAbout.tsx";
import CmsServices from "./pages/app/super/CmsServices.tsx";
import CmsTeam from "./pages/app/super/CmsTeam.tsx";
import CmsPortfolio from "./pages/app/super/CmsPortfolio.tsx";
import CmsTestimonials from "./pages/app/super/CmsTestimonials.tsx";
import CmsBlog from "./pages/app/super/CmsBlog.tsx";
import CmsFaq from "./pages/app/super/CmsFaq.tsx";
import CmsGallery from "./pages/app/super/CmsGallery.tsx";
import CmsContact from "./pages/app/super/CmsContact.tsx";
import PetugasDashboard from "./pages/app/petugas/PetugasDashboard.tsx";
import PetugasForm from "./pages/app/petugas/PetugasForm.tsx";
import PetugasList from "./pages/app/petugas/PetugasList.tsx";
import NidiDashboard from "./pages/app/nidi/NidiDashboard.tsx";
import NidiInbox from "./pages/app/nidi/NidiInbox.tsx";
import PLNIntegration from "./pages/app/nidi/PLNIntegration.tsx";
import SloDashboard from "./pages/app/slo/SloDashboard.tsx";
import SloProcess from "./pages/app/slo/SloProcess.tsx";

const queryClient = new QueryClient();

const protect = (el: React.ReactNode, roles?: ("super_admin" | "petugas" | "admin_nidi" | "admin_slo")[]) =>
  <ProtectedRoute roles={roles}>{el}</ProtectedRoute>;

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

          {/* New role-based dashboard */}
          <Route path="/app" element={protect(<AppHome />)} />

          {/* Super Admin */}
          <Route path="/app/super" element={protect(<SuperDashboard />, ["super_admin"])} />
          <Route path="/app/super/users" element={protect(<UsersAdmin />, ["super_admin"])} />
          <Route path="/app/super/monitoring" element={protect(<Monitoring />, ["super_admin"])} />
          <Route path="/app/super/approval" element={protect(<FinalApproval />, ["super_admin"])} />
          <Route path="/app/super/activity" element={protect(<ActivityLogs />, ["super_admin"])} />
          <Route path="/app/super/cms/hero" element={protect(<CmsHero />, ["super_admin"])} />
          <Route path="/app/super/cms/about" element={protect(<CmsAbout />, ["super_admin"])} />
          <Route path="/app/super/cms/services" element={protect(<CmsServices />, ["super_admin"])} />
          <Route path="/app/super/cms/team" element={protect(<CmsTeam />, ["super_admin"])} />
          <Route path="/app/super/cms/portfolio" element={protect(<CmsPortfolio />, ["super_admin"])} />
          <Route path="/app/super/cms/testimonials" element={protect(<CmsTestimonials />, ["super_admin"])} />
          <Route path="/app/super/cms/blog" element={protect(<CmsBlog />, ["super_admin"])} />
          <Route path="/app/super/cms/faq" element={protect(<CmsFaq />, ["super_admin"])} />
          <Route path="/app/super/cms/gallery" element={protect(<CmsGallery />, ["super_admin"])} />
          <Route path="/app/super/cms/contact" element={protect(<CmsContact />, ["super_admin"])} />

          {/* Petugas */}
          <Route path="/app/petugas" element={protect(<PetugasDashboard />, ["petugas"])} />
          <Route path="/app/petugas/new" element={protect(<PetugasForm />, ["petugas"])} />
          <Route path="/app/petugas/edit/:id" element={protect(<PetugasForm />, ["petugas"])} />
          <Route path="/app/petugas/list" element={protect(<PetugasList />, ["petugas"])} />

          {/* Admin NIDI */}
          <Route path="/app/nidi" element={protect(<NidiDashboard />, ["admin_nidi"])} />
          <Route path="/app/nidi/inbox" element={protect(<NidiInbox mode="inbox" />, ["admin_nidi"])} />
          <Route path="/app/nidi/validation" element={protect(<NidiInbox mode="validation" />, ["admin_nidi"])} />
          <Route path="/app/nidi/pln" element={protect(<PLNIntegration />, ["admin_nidi"])} />

          {/* Admin SLO */}
          <Route path="/app/slo" element={protect(<SloDashboard />, ["admin_slo"])} />
          <Route path="/app/slo/queue" element={protect(<SloProcess mode="queue" />, ["admin_slo"])} />
          <Route path="/app/slo/process" element={protect(<SloProcess mode="process" />, ["admin_slo"])} />
          <Route path="/app/slo/history" element={protect(<SloProcess mode="history" />, ["admin_slo"])} />

          {/* Legacy CMS admin */}
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
