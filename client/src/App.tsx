import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import { useState } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AudioProvider } from "./contexts/AudioController";
import PasswordGate from "./components/PasswordGate";
import Home from "./pages/Home";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [unlocked, setUnlocked] = useState(
    () => sessionStorage.getItem("vault_unlocked") === "1"
  );

  const handleUnlock = () => {
    sessionStorage.setItem("vault_unlocked", "1");
    setUnlocked(true);
  };

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <AudioProvider>
          <TooltipProvider>
            <Toaster />
            {!unlocked ? (
              <PasswordGate onUnlock={handleUnlock} />
            ) : (
              <Router />
            )}
          </TooltipProvider>
        </AudioProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
