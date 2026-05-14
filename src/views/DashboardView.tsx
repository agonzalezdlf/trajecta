import { useState } from "react";
import { UserRoadmap, RoadmapPhase, RoadmapModule, RoadmapTask } from "../types";
import { BottomNav } from "../components/Navigation";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import RoadmapPath from "../components/RoadmapPath";
import { generateModuleContent, ModuleContent } from "../services/gemini";
import Markdown from "react-markdown";
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
  User,
  Loader2,
  X
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
  const [selectedTask, setSelectedTask] = useState<RoadmapTask | null>(null);
  const [taskContent, setTaskContent] = useState<ModuleContent | null>(null);
  const [loadingContent, setLoadingContent] = useState(false);
  const [showGapAnalysis, setShowGapAnalysis] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const streak = roadmap.streak?.current || 0;

  const handleTaskClick = async (task: RoadmapTask) => {
    setSelectedTask(task);
    setLoadingContent(true);
    setTaskContent(null);
    setQuizAnswers({});
    setQuizSubmitted(false);
    
    try {
      const content = await generateModuleContent(task.title, task.description, roadmap.goal);
      setTaskContent(content);
    } catch (error) {
      console.error("Error loading task content:", error);
    } finally {
      setLoadingContent(false);
    }
  };

  const closeTaskModal = () => {
    setSelectedTask(null);
    setTaskContent(null);
  };

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
          {/* Today's Focus Card */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-6 bg-gradient-to-br from-primary to-primary-dark text-white rounded-[2rem] border-none shadow-xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                 <Zap size={80} fill="white" />
               </div>
               <div className="relative z-10">
                 <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60 mb-1">Today's Focus</p>
                 <h4 className="text-xl font-black italic uppercase tracking-tight mb-4">Daily Momentum</h4>
                 <div className="space-y-3">
                   <div className="flex items-center gap-3 bg-white/10 p-3 rounded-2xl">
                     <div className="bg-white text-primary rounded-lg p-1.5">
                       <Rocket size={16} />
                     </div>
                     <span className="text-xs font-black uppercase tracking-tight">Complete 2 tasks</span>
                   </div>
                   <div className="flex items-center gap-3 bg-white/10 p-3 rounded-2xl">
                     <div className="bg-white/20 text-white rounded-lg p-1.5">
                       <Brain size={16} />
                     </div>
                     <span className="text-xs font-black uppercase tracking-tight opacity-70">Review Weak Skills</span>
                   </div>
                 </div>
               </div>
            </Card>
          </motion.div>

          {/* Profile Section */}
          <Card className="flex p-8 flex-col items-center gap-6 rounded-[2.5rem] border-none bg-white shadow-xl">
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
          <Card className="p-4 md:p-8 rounded-[2.5rem] border-none bg-white shadow-xl min-h-[800px] overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
            
            <div className="flex flex-col items-center py-6 relative">
              <div className="flex flex-col items-center mb-12 text-center">
                 <div className="bg-primary/10 text-primary px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                   Your Path to {roadmap.goal}
                 </div>
                 <h3 className="text-3xl font-black italic tracking-tighter text-slate-900 uppercase">Learning Path</h3>
              </div>

              <RoadmapPath 
                phases={roadmap.phases} 
                onModuleClick={(mod) => setSelectedModule(mod)} 
              />
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
                    onClick={() => handleTaskClick(task)}
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-2xl border transition-all cursor-pointer group/task relative",
                      task.completed ? "bg-green-50 dark:bg-green-900/10 border-green-100 dark:border-green-800" : "bg-white dark:bg-slate-800 shadow-sm border-slate-100 dark:border-slate-800 hover:border-primary/30 hover:shadow-md",
                      user.subscription === "free" && taskIdx > 0 && "opacity-40 grayscale blur-[1px] pointer-events-none"
                    )}
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover/task:scale-110",
                      task.completed ? "bg-green-100 text-green-600" : "bg-primary/5 text-primary"
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
                      <div className={cn(
                        "size-6 rounded-full border-2 flex items-center justify-center transition-all",
                        task.completed ? "bg-green-500 border-green-500 text-white" : "border-slate-300 dark:border-slate-600"
                      )}>
                        {task.completed && <Check size={14} strokeWidth={4} />}
                      </div>
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

      {/* Task Content Modal */}
      <AnimatePresence>
        {selectedTask && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl relative flex flex-col max-h-[90vh] overflow-hidden"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center sticky top-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-10">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-xl text-primary">
                    {selectedTask.type === "lesson" && <PlayCircle size={20} />}
                    {selectedTask.type === "exercise" && <Brain size={20} />}
                    {selectedTask.type === "quiz" && <HelpCircle size={20} />}
                    {selectedTask.type === "action" && <FileText size={20} />}
                  </div>
                  <div>
                    <h3 className="text-lg font-black tracking-tight">{selectedTask.title}</h3>
                    <p className="text-[10px] font-black uppercase tracking-widest text-primary italic">Daily Mission</p>
                  </div>
                </div>
                <button onClick={closeTaskModal} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
                  <X size={24} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-8 overflow-y-auto flex-1">
                {loadingContent ? (
                  <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <Loader2 size={48} className="text-primary animate-spin" />
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Generating Content...</p>
                  </div>
                ) : taskContent ? (
                  <div className="prose prose-slate dark:prose-invert max-w-none">
                    {taskContent.type === "lesson" ? (
                      <div className="markdown-body">
                        <Markdown>{taskContent.body}</Markdown>
                      </div>
                    ) : (
                      <div className="space-y-8">
                        {taskContent.quiz?.map((q, idx) => (
                          <div key={idx} className="space-y-4">
                            <h4 className="text-lg font-bold flex gap-3">
                              <span className="text-primary">{idx + 1}.</span>
                              {q.question}
                            </h4>
                            <div className="grid grid-cols-1 gap-3 ml-7">
                              {q.options.map((opt, optIdx) => (
                                <button
                                  key={optIdx}
                                  disabled={quizSubmitted}
                                  onClick={() => setQuizAnswers(prev => ({ ...prev, [idx]: optIdx }))}
                                  className={cn(
                                    "p-4 rounded-xl border-2 text-left transition-all font-medium text-sm",
                                    quizAnswers[idx] === optIdx
                                      ? quizSubmitted
                                        ? optIdx === q.correctAnswer
                                          ? "border-green-500 bg-green-50 text-green-700"
                                          : "border-red-500 bg-red-50 text-red-700"
                                        : "border-primary bg-primary/5 text-primary ring-2 ring-primary/20"
                                      : quizSubmitted && optIdx === q.correctAnswer
                                        ? "border-green-500 bg-green-50 text-green-700"
                                        : "border-slate-100 dark:border-slate-800 hover:border-slate-200"
                                  )}
                                >
                                  {opt}
                                </button>
                              ))}
                            </div>
                            {quizSubmitted && (
                              <div className={cn(
                                "ml-7 p-4 rounded-xl text-xs font-medium leading-relaxed",
                                quizAnswers[idx] === q.correctAnswer ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                              )}>
                                <span className="font-bold uppercase tracking-wider block mb-1">
                                  {quizAnswers[idx] === q.correctAnswer ? "Correct!" : "Mistake"}
                                </span>
                                {q.explanation}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-20 flex flex-col items-center gap-4">
                    <ShieldAlert size={48} className="text-slate-300" />
                    <p className="text-slate-500">Failed to load content. Please try again.</p>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 sticky bottom-0">
                {!loadingContent && taskContent && (
                  <>
                    {taskContent.type === "quiz" && !quizSubmitted ? (
                      <Button 
                        className="w-full h-14" 
                        disabled={Object.keys(quizAnswers).length < (taskContent.quiz?.length || 0)}
                        onClick={() => setQuizSubmitted(true)}
                      >
                        Submit Quiz
                      </Button>
                    ) : (
                      <Button 
                        className="w-full h-14 gap-2" 
                        onClick={() => {
                          onTaskComplete(selectedTask.id);
                          closeTaskModal();
                        }}
                      >
                        Complete Lesson <Zap size={20} className="fill-white" />
                      </Button>
                    )}
                  </>
                )}
              </div>
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
