import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";
import ContactPage from "./pages/ContactPage";
import MediaPage from "./pages/MediaPage";
import ServicesPage from "./pages/ServicesPage";
import GlobalScholarshipProgramPage from "./pages/GlobalScholarshipProgramPage";
import SchoolConsultingPage from "./pages/SchoolConsultingPage";
import ProfessionalTrainingsPage from "./pages/ProfessionalTrainingsPage";
import EventsPage from "./pages/EventsPage";
import InquiryPage from "./pages/InquiryPage";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import ApplicationFormPage from "./pages/ApplicationFormPage";
import UserRoute from "./components/UserRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Routes with Navbar and Footer */}
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/global-scholarship-program" element={<GlobalScholarshipProgramPage />} />
            <Route path="/services/school-consulting" element={<SchoolConsultingPage />} />
            <Route path="/services/professional-trainings" element={<ProfessionalTrainingsPage />} />
            <Route path="/services/:serviceId" element={<ServiceDetailPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/media" element={<MediaPage />} />
            <Route path="/events" element={<EventsPage />} />
            
            {/* User Dashboard - Protected for 'user' role only */}
            <Route element={<UserRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>

            {/* Admin Dashboard - Protected for 'father' and 'superadmin' roles */}
            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>
          </Route>
          
          {/* Auth routes without Navbar/Footer */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/inquiry" element={<InquiryPage />} />
          <Route path="/application" element={<ApplicationFormPage />} />

          {/* Catch-all Not Found Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;