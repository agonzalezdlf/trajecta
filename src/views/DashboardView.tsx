import { useState } from "react";
import { UserRoadmap, RoadmapPhase, RoadmapModule, RoadmapTask } from "../types";
import { BottomNav } from "../components/Navigation";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { 
  Check, 
  Lock, 
  Flag, 
  MessageSquare, 
  Brain, 
  Info, 
  ArrowLeft, 
  Verified, 
  Star,
  ChevronRight,
  PlayCircle,
  FileText,
  HelpCircle,
  Zap,
  ShieldAlert,
  ShieldCheck,
  TrendingUp,
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";

interface DashboardViewProps {
  roadmap: UserRoadmap;
  user: any;
  onTaskComplete: (taskId: string) => void;
}

const DashboardView = ({ roadmap, user, onTaskComplete }: DashboardViewProps) => {
  const [selectedModule, setSelectedModule] = useState<RoadmapModule | null>(null);
  const [showGapAnalysis, setShowGapAnalysis] = useState(false);

  const streak = roadmap.streak?.current || 0;

  return (
    <div className="max-w-md mx-auto min-h-screen bg-background-light dark:bg-background-dark pb-24">
      {/* Header */}
      <div className="sticky top-0 z-50 flex items-center bg-white/80 dark:bg-background-dark/80 backdrop-blur-md p-4 pb-2 justify-between border-b border-primary/10">
        <div className="flex items-center gap-2">
          <img src="https://illustrations.popsy.co/white/launching-rocket.svg" alt="Trajecta Logo" className="size-8 object-contain" referrerPolicy="no-referrer" />
          <h2 className="text-lg font-black tracking-tighter text-primary">TRAJECTA</h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-orange-100 dark:bg-orange-900/30 px-3 py-1.5 rounded-full border border-orange-200 dark:border-orange-800">
            <Zap size={16} className="text-orange-500 fill-orange-500" />
            <span className="text-sm font-black text-orange-600 dark:text-orange-400">{streak}</span>
          </div>
          <button className="size-10 flex items-center justify-center rounded-full hover:bg-primary/10">
            <Info size={20} />
          </button>
        </div>
      </div>

      {/* Profile Section */}
      <div className="flex p-6 flex-col items-center gap-4">
        <div className="relative">
          <div className="w-24 h-24 rounded-full border-4 border-primary shadow-lg overflow-hidden bg-primary/5">
            <img src="https://illustrations.popsy.co/white/launching-rocket.svg" alt="Profile" className="w-full h-full object-contain p-3" referrerPolicy="no-referrer" />
          </div>
          <div className="absolute -bottom-1 -right-1 bg-primary text-white rounded-full p-1 border-2 border-white dark:border-background-dark">
            <Verified size={14} />
          </div>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold">{user.email.split('@')[0]}</p>
          <p className="text-primary font-semibold text-sm">Aspiring {roadmap.goal}</p>
        </div>
      </div>

      {/* Level Progress & Streak Milestone */}
      <div className="px-4 flex flex-col gap-3">
        <Card className="p-4 flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <p className="text-sm font-semibold">Progress to Next Level</p>
            <p className="text-primary text-xs font-bold bg-primary/10 px-2 py-1 rounded-full">450/1000 XP</p>
          </div>
          <div className="h-3 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
            <div className="h-full rounded-full bg-primary" style={{ width: "45%" }}></div>
          </div>
        </Card>

        {streak > 0 && streak % 7 === 0 && (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gradient-to-r from-orange-500 to-primary p-4 rounded-2xl text-white shadow-lg flex items-center gap-4"
          >
            <div className="bg-white/20 p-2 rounded-xl">
              <Star size={24} className="fill-white" />
            </div>
            <div>
              <p className="font-black text-sm uppercase tracking-wider">Streak Milestone!</p>
              <p className="text-xs text-white/80">{streak} days of consistent growth. You're unstoppable!</p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Skills Gap Analysis Preview */}
      {roadmap.skillGapAnalysis && (
        <div className="px-4 mt-4">
          <Card className="p-4 border-l-4 border-l-primary bg-primary/5">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <Brain size={18} className="text-primary" />
                <h3 className="font-bold text-sm">Skills Gap Analysis</h3>
              </div>
              <button 
                onClick={() => setShowGapAnalysis(true)}
                className="text-primary text-[10px] font-bold uppercase tracking-widest hover:underline"
              >
                View Report
              </button>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
              {roadmap.skillGapAnalysis.summary}
            </p>
          </Card>
        </div>
      )}

      {/* Roadmap Path */}
      <div className="flex flex-col items-center py-10 relative">
        {/* Start Node */}
        <div className="z-10 flex flex-col items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shadow-lg ring-4 ring-primary/20">
            <Flag size={20} />
          </div>
          <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Start</span>
        </div>

        {roadmap.phases.map((phase, phaseIdx) => (
          <div key={phase.id} className="flex flex-col items-center w-full">
            {/* Path Line */}
            <div className={cn(
              "w-1 h-16 my-1",
              phase.status === "completed" ? "bg-primary" : 
              phase.status === "in_progress" ? "bg-gradient-to-b from-primary to-slate-200" : 
              "bg-slate-200 dark:bg-slate-800"
            )} />

            {/* Phase Node */}
            <div className="z-10 flex flex-col items-center gap-3">
              {phase.status === "completed" ? (
                <div className="group relative">
                  <div className="w-20 h-20 rounded-3xl bg-primary flex items-center justify-center text-white shadow-xl rotate-3 transform transition-transform group-hover:rotate-0">
                    <MessageSquare size={36} className="-rotate-3 group-hover:rotate-0 transition-transform" />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center border-4 border-background-light dark:border-background-dark">
                    <Check size={16} strokeWidth={3} />
                  </div>
                </div>
              ) : phase.status === "in_progress" ? (
                <div className="relative">
                  <div className="w-24 h-24 rounded-full border-4 border-slate-200 dark:border-slate-800 flex items-center justify-center relative bg-white dark:bg-slate-900 shadow-2xl">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Brain size={40} />
                    </div>
                    {/* Progress Ring Simulation */}
                    <svg className="absolute inset-0 w-full h-full -rotate-90">
                      <circle 
                        cx="48" cy="48" r="46" 
                        fill="transparent" 
                        stroke="currentColor" 
                        strokeWidth="4" 
                        className="text-primary"
                        strokeDasharray={2 * Math.PI * 46}
                        strokeDashoffset={2 * Math.PI * 46 * (1 - 0.65)}
                      />
                    </svg>
                  </div>
                  <div className="absolute -bottom-2 bg-primary text-white text-[10px] font-black px-3 py-1 rounded-full uppercase shadow-lg left-1/2 -translate-x-1/2 whitespace-nowrap">
                    In Progress
                  </div>
                </div>
              ) : (
                <div className="w-20 h-20 rounded-3xl bg-slate-300 dark:bg-slate-700 flex items-center justify-center text-slate-500 shadow-inner opacity-60 grayscale">
                  <Lock size={36} />
                </div>
              )}

              <div className="text-center px-6">
                <p className={cn("font-bold text-sm", phase.status === "locked" && "text-slate-500")}>{phase.title}</p>
                {phase.status === "completed" && <p className="text-green-600 text-[10px] font-bold uppercase tracking-wider">Completed</p>}
                {phase.status === "in_progress" && <p className="text-slate-500 text-[10px] font-medium">65% Mastered</p>}
                {phase.status === "locked" && <p className="text-slate-400 text-[10px] font-medium uppercase tracking-widest">Locked</p>}
              </div>

              {/* Modules List (if in progress) */}
              {phase.status === "in_progress" && (
                <div className="w-full px-4 mt-4 flex flex-col gap-2">
                  {phase.modules.map(module => (
                    <button 
                      key={module.id}
                      onClick={() => setSelectedModule(module)}
                      className="flex items-center gap-3 p-3 bg-white dark:bg-slate-800 rounded-xl border border-primary/10 shadow-sm hover:border-primary/30 transition-all text-left"
                    >
                      <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center",
                        module.completed ? "bg-green-100 text-green-600" : "bg-primary/10 text-primary"
                      )}>
                        {module.completed ? <Check size={20} /> : <PlayCircle size={20} />}
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-bold">{module.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex-1 h-1 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div className="h-full bg-primary" style={{ width: `${module.progress}%` }} />
                          </div>
                          <span className="text-[10px] text-slate-400 font-medium">{module.progress}%</span>
                        </div>
                      </div>
                      <ChevronRight size={16} className="text-slate-300" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Goal Node */}
        <div className="z-10 flex flex-col items-center gap-4 py-12">
          <div className="w-1 h-16 bg-slate-200 dark:bg-slate-800 mb-2" />
          <div className="w-24 h-24 rounded-full border-4 border-dashed border-primary/40 flex items-center justify-center bg-white dark:bg-slate-900 relative">
            <Star size={40} className="text-primary/30" />
            <div className="absolute -top-4">
              <Star size={32} className="text-primary fill-primary" />
            </div>
          </div>
          <div className="text-center">
            <h3 className="text-primary font-black text-lg tracking-tight uppercase">Goal: {roadmap.goal}</h3>
            <p className="text-slate-400 text-xs">Estimated completion: Oct 2024</p>
          </div>
        </div>
      </div>

      {/* Module Detail Modal */}
      <AnimatePresence>
        {selectedModule && (
          <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/40 backdrop-blur-sm p-4">
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="w-full max-w-md bg-white dark:bg-slate-900 rounded-t-[32px] p-6 shadow-2xl"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold">{selectedModule.title}</h3>
                  <p className="text-slate-500 text-sm mt-1">{selectedModule.description}</p>
                </div>
                <button onClick={() => setSelectedModule(null)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
                  <ArrowLeft size={24} className="rotate-90" />
                </button>
              </div>

              <div className="space-y-4 mb-8">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Daily Actions</p>
                {selectedModule.tasks.map((task, taskIdx) => (
                  <div 
                    key={task.id} 
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-2xl border transition-all",
                      task.completed ? "bg-green-50 dark:bg-green-900/10 border-green-100 dark:border-green-800" : "bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-800",
                      user.subscription === "free" && taskIdx > 0 && "opacity-40 grayscale blur-[1px] pointer-events-none"
                    )}
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center",
                      task.completed ? "bg-green-100 text-green-600" : "bg-white dark:bg-slate-700 shadow-sm text-slate-400"
                    )}>
                      {task.type === "lesson" && <PlayCircle size={20} />}
                      {task.type === "exercise" && <Brain size={20} />}
                      {task.type === "quiz" && <HelpCircle size={20} />}
                      {task.type === "action" && <FileText size={20} />}
                    </div>
                    <div className="flex-1">
                      <p className={cn("text-sm font-bold", task.completed && "text-slate-400 line-through")}>{task.title}</p>
                      <p className="text-[10px] text-slate-500">{task.duration} • {task.type}</p>
                    </div>
                    {user.subscription === "free" && taskIdx > 0 ? (
                      <Lock size={16} className="text-slate-400" />
                    ) : (
                      <button 
                        onClick={() => onTaskComplete(task.id)}
                        className={cn(
                          "size-6 rounded-full border-2 flex items-center justify-center transition-all",
                          task.completed ? "bg-green-500 border-green-500 text-white" : "border-slate-300 dark:border-slate-600"
                        )}
                      >
                        {task.completed && <Check size={14} strokeWidth={4} />}
                      </button>
                    )}
                  </div>
                ))}
                {user.subscription === "free" && selectedModule.tasks.length > 1 && (
                  <div className="p-3 bg-primary/5 rounded-xl border border-primary/10 flex items-center justify-between">
                    <p className="text-[10px] font-bold text-primary uppercase">Upgrade to Premium for full access</p>
                    <Sparkles size={14} className="text-primary animate-pulse" />
                  </div>
                )}
              </div>

              <Button className="w-full h-14 text-lg" onClick={() => setSelectedModule(null)}>Continue Learning</Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Skills Gap Analysis Modal */}
      <AnimatePresence>
        {showGapAnalysis && roadmap.skillGapAnalysis && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-md bg-white dark:bg-slate-900 rounded-[32px] p-8 shadow-2xl max-h-[80vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-black tracking-tight">Skills Gap Report</h3>
                <button onClick={() => setShowGapAnalysis(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
                  <ArrowLeft size={24} className="rotate-90" />
                </button>
              </div>

              <div className="space-y-6">
                <section>
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Summary</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {roadmap.skillGapAnalysis.summary}
                  </p>
                </section>

                <section>
                  <h4 className="text-xs font-black uppercase tracking-widest text-green-500 mb-3 flex items-center gap-2">
                    <ShieldCheck size={14} />
                    Strengths
                  </h4>
                  <div className="space-y-3">
                    {roadmap.skillGapAnalysis.strengths.map((s, i) => (
                      <div key={i} className="p-3 bg-green-50 dark:bg-green-900/10 rounded-xl border border-green-100 dark:border-green-900/30">
                        <p className="text-sm font-bold text-green-700 dark:text-green-400">{s.skill}</p>
                        <p className="text-xs text-green-600/80 dark:text-green-500/60 mt-1">{s.description}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h4 className="text-xs font-black uppercase tracking-widest text-orange-500 mb-3 flex items-center gap-2">
                    <ShieldAlert size={14} />
                    Skill Gaps
                  </h4>
                  <div className="space-y-3">
                    {roadmap.skillGapAnalysis.gaps.map((g, i) => (
                      <div key={i} className="p-3 bg-orange-50 dark:bg-orange-900/10 rounded-xl border border-orange-100 dark:border-orange-900/30">
                        <p className="text-sm font-bold text-orange-700 dark:text-orange-400">{g.skill}</p>
                        <p className="text-xs text-orange-600/80 dark:text-orange-500/60 mt-1">{g.description}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <div className="pt-4">
                  <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20 flex items-center gap-4">
                    <TrendingUp size={24} className="text-primary" />
                    <p className="text-xs font-medium text-primary">
                      Your roadmap has been adjusted to prioritize these gaps.
                    </p>
                  </div>
                </div>
              </div>

              <Button className="w-full mt-8 h-14" onClick={() => setShowGapAnalysis(false)}>Got it!</Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <BottomNav />
    </div>
  );
};

export default DashboardView;
