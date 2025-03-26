import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from '@/pages/login';
import RegisterPage from '@/pages/register';
import Index from "./pages/Index";

const queryClient = new QueryClient();


const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Router>
            <Routes>
              <Route
                path="/login"
                element={
                  
                    <LoginPage />
          
                }
              />
              <Route
                path="/register"
                element={
                
                    <RegisterPage />
                  
                }
              />
               <Route
                path="/"
                element={<Index/>}
              />
              <Route
                path="*"
                element={<Navigate to="/" replace />}
              />
            </Routes>
          </Router>
        </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;