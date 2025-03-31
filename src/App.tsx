
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import QuotesList from "./pages/QuotesList";
import QuoteDetail from "./pages/QuoteDetail";
import CreateQuote from "./pages/CreateQuote";
import Customers from "./pages/Customers";
import Services from "./pages/Services";
import Schedule from "./pages/Schedule";

// Install react-to-print
import "react-to-print";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Dashboard /></Layout>} />
          <Route path="/quotes" element={<Layout><QuotesList /></Layout>} />
          <Route path="/quotes/new" element={<Layout><CreateQuote /></Layout>} />
          <Route path="/quotes/:id" element={<Layout><QuoteDetail /></Layout>} />
          <Route path="/customers" element={<Layout><Customers /></Layout>} />
          <Route path="/services" element={<Layout><Services /></Layout>} />
          <Route path="/schedule" element={<Layout><Schedule /></Layout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
