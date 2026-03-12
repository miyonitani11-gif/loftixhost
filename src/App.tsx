import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Pricing from "./pages/Pricing.tsx";
import Features from "./pages/Features.tsx";
import Locations from "./pages/Locations.tsx";
import Status from "./pages/Status.tsx";
import About from "./pages/About.tsx";
import Contact from "./pages/Contact.tsx";
import Partnership from "./pages/Partnership.tsx";
import Policies from "./pages/Policies.tsx";
import Knowledgebase from "./pages/Knowledgebase.tsx";
import NotFound from "./pages/NotFound.tsx";
import Auth from "./pages/Auth.tsx";
import Tickets from "./pages/Tickets.tsx";
import NewTicket from "./pages/NewTicket.tsx";
import TicketDetail from "./pages/TicketDetail.tsx";
import ResetPassword from "./pages/ResetPassword.tsx";
import MyAccount from "./pages/MyAccount.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/features" element={<Features />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/status" element={<Status />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/partnership" element={<Partnership />} />
          <Route path="/policies" element={<Policies />} />
          <Route path="/knowledgebase" element={<Knowledgebase />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/account" element={<MyAccount />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/tickets/new" element={<NewTicket />} />
          <Route path="/tickets/:id" element={<TicketDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
