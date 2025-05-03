
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { YoutubeProvider } from "@/contexts/YoutubeContext";
import Layout from "@/components/layout/Layout";
import HomePage from "@/pages/HomePage";
import WatchPage from "@/pages/WatchPage";
import ChannelPage from "@/pages/ChannelPage";
import MessagesPage from "@/pages/MessagesPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <YoutubeProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/watch" element={<WatchPage />} />
              <Route path="/channel" element={<ChannelPage />} />
              <Route path="/messages" element={<MessagesPage />} />
              {/* Placeholder routes for sidebar navigation */}
              <Route path="/shorts" element={<NotFound />} />
              <Route path="/subscriptions" element={<NotFound />} />
              <Route path="/history" element={<NotFound />} />
              <Route path="/your-videos" element={<NotFound />} />
              <Route path="/watch-later" element={<NotFound />} />
              <Route path="/liked-videos" element={<NotFound />} />
              <Route path="/trending" element={<NotFound />} />
              <Route path="/shopping" element={<NotFound />} />
              <Route path="/music" element={<NotFound />} />
              <Route path="/sports" element={<NotFound />} />
              <Route path="/learning" element={<NotFound />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </YoutubeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
