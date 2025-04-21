
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // In a future implementation, we would toggle the actual dark mode
  };

  return (
    <header className="w-full py-4 px-6 md:px-12 flex items-center justify-between border-b">
      <Link to="/" className="font-bold text-xl text-focus-blue">
        QuietWork
      </Link>
      
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={toggleDarkMode}
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </Button>
        
        <Link to="/login">
          <Button variant="outline">Log in</Button>
        </Link>
        
        <Link to="/signup">
          <Button>Sign up</Button>
        </Link>
      </div>
    </header>
  );
}
