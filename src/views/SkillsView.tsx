import { UserRoadmap } from "../types";
import { BottomNav } from "../components/Navigation";
import { Card } from "../components/Card";
import { Brain, Star, ChevronRight } from "lucide-react";
import { cn } from "../lib/utils";

interface SkillsViewProps {
  roadmap: UserRoadmap;
}

const SkillsView = ({ roadmap }: SkillsViewProps) => {
  return (
    <div className="max-w-md mx-auto min-h-screen bg-background-light dark:bg-background-dark pb-24">
      <div className="p-6 flex flex-col gap-6">
        <h1 className="text-2xl font-black">Skill Tracks</h1>
        <div className="grid gap-4">
          {roadmap.skillTracks.map((skill) => (
            <Card key={skill.id} className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Brain size={24} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <p className="font-bold">{skill.title}</p>
                  <span className="text-xs font-bold text-primary">Lvl {skill.level}</span>
                </div>
                <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: `${skill.progress}%` }} />
                </div>
              </div>
              <ChevronRight size={20} className="text-slate-300" />
            </Card>
          ))}
        </div>

        <div className="mt-8">
          <h3 className="font-bold mb-4">Mastery Badges</h3>
          <div className="grid grid-cols-2 gap-4">
            {roadmap.badges?.map((badge) => (
              <Card 
                key={badge.id} 
                className={cn(
                  "p-3 flex flex-col items-center text-center gap-2 transition-all",
                  badge.unlocked ? "border-primary/20 bg-primary/5" : "opacity-50 grayscale"
                )}
              >
                <div className={cn(
                  "size-12 rounded-full flex items-center justify-center mb-1",
                  badge.unlocked ? "bg-primary text-white" : "bg-slate-200 text-slate-400"
                )}>
                  <Star size={24} className={badge.unlocked ? "fill-white" : ""} />
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs font-black">{badge.label}</p>
                  <p className="text-[10px] text-slate-500 leading-tight">{badge.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default SkillsView;
