import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import LandingView from "./views/LandingView";
import OnboardingView from "./views/OnboardingView";
import DashboardView from "./views/DashboardView";
import ProfileView from "./views/ProfileView";
import SkillsView from "./views/SkillsView";
import NetworkView from "./views/NetworkView";
import { UserRoadmap } from "./types";

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [roadmap, setRoadmap] = useState<UserRoadmap | null>(null);

  // Load from local storage for prototype persistence
  useEffect(() => {
    const savedUser = localStorage.getItem("trajecta_user");
    const savedRoadmap = localStorage.getItem("trajecta_roadmap");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      if (!parsedUser.subscription) parsedUser.subscription = "free";
      setUser(parsedUser);
    }
    if (savedRoadmap) {
      const parsedRoadmap = JSON.parse(savedRoadmap);
      if (!parsedRoadmap.badges) parsedRoadmap.badges = [];
      setRoadmap(parsedRoadmap);
    }
  }, []);

  const handleOnboardingComplete = (userData: any, generatedRoadmap: UserRoadmap) => {
    setUser(userData);
    setRoadmap(generatedRoadmap);
    localStorage.setItem("trajecta_user", JSON.stringify(userData));
    localStorage.setItem("trajecta_roadmap", JSON.stringify(generatedRoadmap));
  };

  const handleTaskComplete = (taskId: string) => {
    if (!roadmap) return;
    
    const newRoadmap = { ...roadmap };
    let taskFound = false;
    
    newRoadmap.phases.forEach(phase => {
      phase.modules.forEach(module => {
        module.tasks.forEach(task => {
          if (task.id === taskId && !task.completed) {
            task.completed = true;
            taskFound = true;
          }
        });
        // Update module progress
        const completedTasks = module.tasks.filter(t => t.completed).length;
        module.progress = Math.round((completedTasks / module.tasks.length) * 100);
        module.completed = module.progress === 100;
      });
    });

    if (taskFound) {
      // Update streak
      const today = new Date().toISOString().split('T')[0];
      const lastDate = newRoadmap.streak?.lastCompletedDate;
      
      if (!newRoadmap.streak) {
        newRoadmap.streak = { current: 1, best: 1, lastCompletedDate: today, milestonesReached: [] };
      } else {
        if (lastDate === today) {
          // Already completed something today, streak stays same
        } else {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayStr = yesterday.toISOString().split('T')[0];
          
          if (lastDate === yesterdayStr) {
            newRoadmap.streak.current += 1;
          } else {
            newRoadmap.streak.current = 1;
          }
          
          if (newRoadmap.streak.current > newRoadmap.streak.best) {
            newRoadmap.streak.best = newRoadmap.streak.current;
          }
          
          newRoadmap.streak.lastCompletedDate = today;
        }
        
        // Check milestones
        const milestones = [7, 14, 30];
        milestones.forEach(m => {
          if (newRoadmap.streak!.current >= m && !newRoadmap.streak!.milestonesReached.includes(m)) {
            newRoadmap.streak!.milestonesReached.push(m);
          }
        });
      }
      
      setRoadmap(newRoadmap);
      localStorage.setItem("trajecta_roadmap", JSON.stringify(newRoadmap));
    }
  };

  // Check for streak reset on load
  useEffect(() => {
    if (roadmap?.streak?.lastCompletedDate) {
      const today = new Date().toISOString().split('T')[0];
      const lastDate = roadmap.streak.lastCompletedDate;
      
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];
      
      if (lastDate !== today && lastDate !== yesterdayStr) {
        const newRoadmap = { ...roadmap };
        newRoadmap.streak = { ...newRoadmap.streak, current: 0 };
        setRoadmap(newRoadmap);
        localStorage.setItem("trajecta_roadmap", JSON.stringify(newRoadmap));
      }
    }
  }, [roadmap?.streak?.lastCompletedDate]);

  return (
    <Router>
      <div className="min-h-screen grainy-bg font-sans text-slate-900 dark:text-slate-100">
        <Routes>
          <Route path="/" element={<LandingView />} />
          <Route 
            path="/onboarding" 
            element={<OnboardingView onComplete={handleOnboardingComplete} />} 
          />
          <Route 
            path="/dashboard" 
            element={roadmap && user ? <DashboardView roadmap={roadmap} user={user} onTaskComplete={handleTaskComplete} /> : <Navigate to="/onboarding" />} 
          />
          <Route 
            path="/skills" 
            element={roadmap ? <SkillsView roadmap={roadmap} /> : <Navigate to="/onboarding" />} 
          />
          <Route 
            path="/network" 
            element={roadmap ? <NetworkView /> : <Navigate to="/onboarding" />} 
          />
          <Route 
            path="/profile" 
            element={roadmap && user ? <ProfileView roadmap={roadmap} user={user} /> : <Navigate to="/onboarding" />} 
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}
