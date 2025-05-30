
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Moon, Sun, User } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

export function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // In a future implementation, we would toggle the actual dark mode
  };

  const handleProfileClick = () => {
    if (user) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
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
        
        {user ? (
          <>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handleProfileClick}
              aria-label="Profil öffnen"
            >
              <User size={20} />
            </Button>
            <Button variant="outline" onClick={() => signOut()}>
              Abmelden
            </Button>
          </>
        ) : (
          <>
            <Link to="/login">
              <Button variant="outline">Anmelden</Button>
            </Link>
            <Link to="/signup">
              <Button>Registrieren</Button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
