
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateQuote from "./pages/CreateQuote";
import PrintQuote from "./pages/PrintQuote";
import QuoteDetail from "./pages/QuoteDetail";
import QuotesList from "./pages/QuotesList";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout"; // Add this import

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout> {/* Wrap routes with Layout */}
          <Routes>
            <Route path="/" element={<CreateQuote />} />
            <Route path="/quotes" element={<QuotesList />} />
            <Route path="/quotes/new" element={<CreateQuote />} /> {/* Add this route */}
            <Route path="/print/:id" element={<PrintQuote />} />
            <Route path="/quotes/:id" element={<QuoteDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

