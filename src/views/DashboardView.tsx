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
  Sparkles,
  Rocket,
  User
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
    <div className="max-w-4xl mx-auto min-h-screen pb-24 px-4 md:px-8">
      {/* Header */}
      <div className="sticky top-0 z-50 flex items-center bg-white/40 dark:bg-black/40 backdrop-blur-xl p-4 md:p-6 mb-6 rounded-2xl justify-between border border-white/20 mt-4">
        <div className="flex items-center gap-2">
          <div className="bg-primary p-1.5 rounded-lg text-white">
            <Rocket size={18} strokeWidth={2.5} />
          </div>
          <h2 className="text-lg md:text-xl font-black tracking-tighter text-slate-900 dark:text-slate-100 italic">TRAJECTA</h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">
            <Zap size={16} className="text-primary fill-primary" />
            <span className="text-sm font-black text-primary">{streak}</span>
          </div>
          <button className="size-10 flex items-center justify-center rounded-full hover:bg-primary/10">
            <Info size={20} />
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left Column: Profile & Summary */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Profile Section */}
          <Card className="flex p-8 flex-col items-center gap-6 rounded-[2.5rem] border-none bg-white/50 backdrop-blur-sm shadow-xl">
            <div className="relative">
              <div className="w-28 h-28 rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-primary/20 to-accent-purple/20 shadow-xl ring-4 ring-white dark:ring-slate-800">
                 <img 
                   src={`https://picsum.photos/seed/${user.email}/200/200`} 
                   alt="User Avatar" 
                   className="w-full h-full object-cover" 
                   referrerPolicy="no-referrer" 
                 />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-green-500 text-white rounded-full p-1.5 border-4 border-white dark:border-slate-800 shadow-lg">
                <ShieldCheck size={16} />
              </div>
            </div>
            <div className="text-center">
              <p className="text-2xl font-black text-slate-900 dark:text-slate-100 uppercase tracking-tight">{user.email.split('@')[0]}</p>
              <div className="mt-1 flex items-center gap-2 justify-center">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                <p className="text-primary font-black uppercase text-[10px] tracking-widest">{roadmap.goal}</p>
              </div>
            </div>
          </Card>

          {/* Level Progress & Streak Milestone */}
          <div className="flex flex-col gap-3">
            <Card className="p-6 flex flex-col gap-4 rounded-3xl border-none bg-white shadow-lg">
              <div className="flex justify-between items-center">
                <p className="text-sm font-black uppercase tracking-widest text-slate-400">Next Level</p>
                <p className="text-primary text-xs font-black bg-primary/10 px-3 py-1 rounded-full uppercase tracking-widest">450/1000 XP</p>
              </div>
              <div className="h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "45%" }}
                  className="h-full rounded-full bg-primary shadow-sm shadow-primary/20"
                />
              </div>
            </Card>

            {streak > 0 && streak % 7 === 0 && (
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-gradient-to-r from-orange-500 to-primary p-6 rounded-3xl text-white shadow-xl flex items-center gap-4"
              >
                <div className="bg-white/20 p-2.5 rounded-xl">
                  <Star size={24} className="fill-white" />
                </div>
                <div>
                  <p className="font-black text-sm uppercase tracking-wider italic">Streak Milestone!</p>
                  <p className="text-xs text-white/80 font-medium leading-relaxed">{streak} days of consistent growth. You're unstoppable!</p>
                </div>
              </motion.div>
            )}

            {/* Skills Gap Analysis Preview */}
            {roadmap.skillGapAnalysis && (
              <Card className="p-6 border-none bg-primary/5 rounded-3xl">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    <Brain size={20} className="text-primary" />
                    <h3 className="font-black text-xs uppercase tracking-widest text-slate-600">Gap Analysis</h3>
                  </div>
                  <button 
                    onClick={() => setShowGapAnalysis(true)}
                    className="text-primary text-[10px] font-black uppercase tracking-widest hover:underline"
                  >
                    Details
                  </button>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                  {roadmap.skillGapAnalysis.summary}
                </p>
              </Card>
            )}
          </div>
        </div>

        {/* Right Column: Roadmap Path */}
        <div className="lg:col-span-8">
          <Card className="p-4 md:p-8 rounded-[2.5rem] border-none bg-white/30 backdrop-blur-sm shadow-xl min-h-600">
            <div className="flex flex-col items-center py-6 relative">
              {/* Start Node */}
              <div className="z-10 flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white shadow-lg ring-8 ring-primary/10">
                  <Flag size={24} />
                </div>
                <span className="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase mt-2">Mission Start</span>
              </div>

              {roadmap.phases.map((phase, phaseIdx) => (
                <div key={phase.id} className="flex flex-col items-center w-full">
                  {/* Path Line */}
                  <div className={cn(
                    "w-1.5 h-20 my-1",
                    phase.status === "completed" ? "bg-primary" : 
                    phase.status === "in_progress" ? "bg-gradient-to-b from-primary to-slate-100" : 
                    "bg-slate-100"
                  )} />

                  {/* Phase Node container - responsive layout */}
                  <div className="z-10 flex flex-col md:flex-row items-center gap-6 w-full px-4 md:px-12 max-w-2xl">
                    <div className="shrink-0">
                      {phase.status === "completed" ? (
                        <div className="group relative">
                          <div className="w-20 h-20 rounded-3xl bg-primary flex items-center justify-center text-white shadow-xl rotate-3 transform transition-transform group-hover:rotate-0">
                            <MessageSquare size={36} className="-rotate-3 group-hover:rotate-0 transition-transform" />
                          </div>
                          <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center border-4 border-white">
                            <Check size={16} strokeWidth={3} />
                          </div>
                        </div>
                      ) : phase.status === "in_progress" ? (
                        <div className="relative">
                          <div className="w-24 h-24 rounded-full border-4 border-slate-100 flex items-center justify-center relative bg-white shadow-2xl">
                            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                              <Brain size={40} />
                            </div>
                            <svg className="absolute inset-0 w-full h-full -rotate-90">
                              <circle 
                                cx="48" cy="48" r="46" 
                                fill="transparent" 
                                stroke="currentColor" 
                                strokeWidth="4" 
                                className="text-primary shadow-sm"
                                strokeDasharray={2 * Math.PI * 46}
                                strokeDashoffset={2 * Math.PI * 46 * (1 - 0.65)}
                              />
                            </svg>
                          </div>
                          <div className="absolute -bottom-2 bg-primary text-white text-[10px] font-black px-3 py-1 rounded-full uppercase shadow-lg left-1/2 -translate-x-1/2 whitespace-nowrap italic">
                            Active
                          </div>
                        </div>
                      ) : (
                        <div className="w-20 h-20 rounded-3xl bg-slate-100 flex items-center justify-center text-slate-300 shadow-inner opacity-60">
                          <Lock size={36} />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 text-center md:text-left">
                      <p className={cn("font-black text-lg uppercase italic tracking-tight", phase.status === "locked" ? "text-slate-300" : "text-slate-900")}>
                        {phase.title}
                      </p>
                      <div className="mt-1">
                        {phase.status === "completed" && <p className="text-green-500 text-[10px] font-black uppercase tracking-widest">Mastery Achieved</p>}
                        {phase.status === "in_progress" && <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">65% COMPLETE</p>}
                        {phase.status === "locked" && <p className="text-slate-300 text-[10px] font-black uppercase tracking-widest">Awaiting Access</p>}
                      </div>
                      
                      {/* Modules list integrated into the roadmap view on desktop */}
                      {phase.status === "in_progress" && (
                        <div className="mt-6 flex flex-col gap-3 w-full">
                          {phase.modules.map(module => (
                            <button 
                              key={module.id}
                              onClick={() => setSelectedModule(module)}
                              className="flex items-center gap-4 p-4 bg-white/50 backdrop-blur-sm rounded-2xl border-none shadow-md hover:shadow-lg transition-all group w-full"
                            >
                              <div className={cn(
                                "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm",
                                module.completed ? "bg-green-100 text-green-600" : "bg-primary text-white"
                              )}>
                                {module.completed ? <Check size={20} /> : <PlayCircle size={20} />}
                              </div>
                              <div className="flex-1 overflow-hidden">
                                <p className="text-xs font-black uppercase tracking-tight truncate">{module.title}</p>
                                <div className="flex items-center gap-3 mt-1.5 text-slate-400">
                                   <div className="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden">
                                      <div className="h-full bg-primary" style={{ width: `${module.progress}%` }} />
                                   </div>
                                   <span className="text-[10px] font-black truncate">{module.progress}%</span>
                                </div>
                              </div>
                              <ChevronRight size={18} className="text-slate-300 group-hover:text-primary transition-colors" />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Goal Node */}
              <div className="z-10 flex flex-col items-center gap-4 py-16">
                <div className="w-1.5 h-20 bg-slate-100 mb-2" />
                <div className="w-28 h-28 rounded-full border-4 border-dashed border-primary/20 flex items-center justify-center bg-white relative shadow-2xl">
                  <Star size={48} className="text-primary/10" />
                  <div className="absolute -top-6">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Star size={40} className="text-primary fill-primary shadow-xl" />
                    </motion.div>
                  </div>
                </div>
                <div className="text-center mt-4">
                  <h3 className="text-primary font-black text-2xl tracking-tighter uppercase italic">{roadmap.goal}</h3>
                  <p className="text-slate-400 text-xs font-black uppercase tracking-widest mt-2">Target reached: Oct 2024</p>
                </div>
              </div>
            </div>
          </Card>
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
