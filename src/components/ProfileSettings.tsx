
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

type UserPreferences = {
  timer_duration: number;
  break_duration: number;
  music_preference: string;
  dark_mode: boolean;
};

export function ProfileSettings() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [preferences, setPreferences] = useState<UserPreferences>({
    timer_duration: 25,
    break_duration: 5,
    music_preference: "lofi",
    dark_mode: false,
  });
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      loadPreferences();
      loadProfile();
    }
  }, [user]);

  const loadPreferences = async () => {
    try {
      const { data, error } = await supabase
        .from("user_preferences")
        .select("*")
        .eq("id", user?.id)
        .single();

      if (error) throw error;
      if (data) setPreferences(data);
    } catch (error) {
      console.error("Error loading preferences:", error);
    }
  };

  const loadProfile = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("first_name, last_name")
        .eq("id", user?.id)
        .single();

      if (error) throw error;
      if (data) {
        setFirstName(data.first_name || "");
        setLastName(data.last_name || "");
      }
    } catch (error) {
      console.error("Error loading profile:", error);
    }
  };

  const savePreferences = async () => {
    setIsLoading(true);
    try {
      const { error: preferencesError } = await supabase
        .from("user_preferences")
        .update(preferences)
        .eq("id", user?.id);

      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          first_name: firstName,
          last_name: lastName,
        })
        .eq("id", user?.id);

      if (preferencesError || profileError) throw preferencesError || profileError;

      toast({
        title: "Einstellungen gespeichert",
        description: "Ihre Präferenzen wurden erfolgreich aktualisiert.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Fehler beim Speichern",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Persönliche Informationen</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="firstName">Vorname</Label>
            <Input
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Nachname</Label>
            <Input
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Timer Einstellungen</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="timerDuration">Fokus-Zeit (Minuten)</Label>
            <Input
              id="timerDuration"
              type="number"
              min="1"
              max="60"
              value={preferences.timer_duration}
              onChange={(e) => setPreferences(prev => ({
                ...prev,
                timer_duration: parseInt(e.target.value)
              }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="breakDuration">Pause (Minuten)</Label>
            <Input
              id="breakDuration"
              type="number"
              min="1"
              max="30"
              value={preferences.break_duration}
              onChange={(e) => setPreferences(prev => ({
                ...prev,
                break_duration: parseInt(e.target.value)
              }))}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Musik Präferenzen</h2>
        <RadioGroup
          value={preferences.music_preference}
          onValueChange={(value) => setPreferences(prev => ({
            ...prev,
            music_preference: value
          }))}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="lofi" id="lofi" />
            <Label htmlFor="lofi">Lo-Fi</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="classical" id="classical" />
            <Label htmlFor="classical">Klassik</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="nature" id="nature" />
            <Label htmlFor="nature">Naturgeräusche</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Erscheinungsbild</h2>
        <div className="flex items-center space-x-2">
          <Switch
            id="darkMode"
            checked={preferences.dark_mode}
            onCheckedChange={(checked) => setPreferences(prev => ({
              ...prev,
              dark_mode: checked
            }))}
          />
          <Label htmlFor="darkMode">Dark Mode</Label>
        </div>
      </div>

      <Button onClick={savePreferences} disabled={isLoading} className="w-full">
        {isLoading ? "Speichern..." : "Einstellungen speichern"}
      </Button>
    </div>
  );
}
