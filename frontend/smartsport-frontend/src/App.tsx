import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Tournaments from "./pages/Tournaments";
import TournamentDetail from "./pages/TournamentDetail";
import Games from "./pages/Games";
import Ranking from "./pages/Ranking";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FAQ from "./pages/FAQ";
import Support from "./pages/Support";
import News from "./pages/News";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import ProfilePage from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";

const queryClient = new QueryClient();

// Protected Route component for admin-only access
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  
  if (!user || user.role !== 'administrateur') {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/tournaments" element={<Tournaments />} />
            <Route path="/tournament/:id" element={<TournamentDetail />} />
            <Route path="/games" element={<Games />} />
            <Route path="/ranking" element={<Ranking />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/support" element={<Support />} />
            <Route path="/news" element={<News />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/profile" element={<ProtectedRoute />}>
              <Route index element={<ProfilePage />} />
            </Route>
            <Route 
              path="/admin/dashboard" 
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
