import React from "react";
import { motion } from "motion/react";
import { cn } from "../lib/utils";
import { Check, Lock, Star, Play, BookOpen, Trophy, HelpCircle, MessageSquare, Flag, Rocket } from "lucide-react";
import { RoadmapPhase, RoadmapModule } from "../types";

interface RoadmapPathProps {
  phases: RoadmapPhase[];
  onModuleClick: (module: RoadmapModule) => void;
}

const RoadmapPath = ({ phases, onModuleClick }: RoadmapPathProps) => {
  // Flatten modules with phase context for path rendering
  const pathNodes: Array<{
    type: "phase" | "module" | "milestone";
    data: any;
    status: "completed" | "in_progress" | "locked";
  }> = [];

  if (!phases || phases.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-400">
        <Rocket size={48} className="mb-4 opacity-20" />
        <p className="font-medium">Initializing your roadmap...</p>
      </div>
    );
  }

  const allModules = phases.flatMap(p => p.modules || []);
  const firstUncompletedInRoadmap = allModules.find(m => !m.completed);

  phases.forEach((phase, phaseIndex) => {
    // Add Phase title
    pathNodes.push({
      type: "phase",
      data: { ...phase, phaseIndex },
      status: phase.status,
    });

    phase.modules.forEach((module, moduleIndex) => {
      let status = module.completed ? "completed" : "locked";
      if (phase.status === "in_progress" && !module.completed && module.id === phase.modules.find(m => !m.completed)?.id) {
        status = "in_progress";
      }
      if (module.id === firstUncompletedInRoadmap?.id && status === "locked") {
        status = "in_progress";
      }

      pathNodes.push({
        type: "module",
        data: { ...module, phaseIndex },
        status: status as any,
      });
    });

    if (phase.milestone) {
      pathNodes.push({
        type: "milestone",
        data: { title: phase.milestone, phaseIndex },
        status: phase.status === "completed" ? "completed" : "locked",
      });
    }
  });

  // Add final Goal node
  pathNodes.push({
    type: "milestone",
    data: { title: "GOAL", phaseIndex: phases.length - 1 },
    status: phases.every(p => p.status === "completed") ? "completed" : "locked",
  });

  const phaseColors = [
    "bg-[#ff8a65] border-[#e67a5a] shadow-[0_8px_0_0_#e67a5a]", // Trajecta Coral
    "bg-[#ffa726] border-[#f57c00] shadow-[0_8px_0_0_#f57c00]", // Soft Orange
    "bg-[#f06292] border-[#d81b60] shadow-[0_8px_0_0_#d81b60]", // Warm Rose
    "bg-[#ffb74d] border-[#fb8c00] shadow-[0_8px_0_0_#fb8c00]", // Warm Amber
    "bg-[#ff7043] border-[#f4511e] shadow-[0_8px_0_0_#f4511e]", // Deep Coral
  ];

  const phaseHoverColors = [
    "hover:shadow-[0_4px_0_0_#e67a5a]",
    "hover:shadow-[0_4px_0_0_#f57c00]",
    "hover:shadow-[0_4px_0_0_#d81b60]",
    "hover:shadow-[0_4px_0_0_#fb8c00]",
    "hover:shadow-[0_4px_0_0_#f4511e]",
  ];

  const getModuleIcon = (type?: string, status?: string) => {
    if (status === "locked") return <Lock size={44} className="text-slate-400 opacity-60" />;
    
    switch (type) {
      case "video":
        return <Play size={44} fill="white" className="ml-1" />;
      case "quiz":
        return <HelpCircle size={44} strokeWidth={3} />;
      case "reading":
        return <BookOpen size={44} strokeWidth={3} />;
      case "practice":
        return <Star size={44} fill="white" />;
      default:
        return <Play size={44} fill="white" className="ml-1" />;
    }
  };

  return (
    <div className="relative w-full max-w-lg mx-auto py-12 flex flex-col items-center">
      {/* SVG Background Path - Drawn based on normalized 200px increments */}
      <div className="absolute inset-x-0 top-0 bottom-0 pointer-events-none" style={{ zIndex: 0 }}>
        <svg width="100%" height="100%" className="overflow-visible">
          {/* Base Path (Grey) */}
          <path
            d={(() => {
              const startX = 256;
              const startY = 120;
              let d = `M ${startX} ${startY}`;
              
              pathNodes.forEach((node, i) => {
                const xOffsets = [0, 80, 0, -80];
                const xOffset = node.type === "phase" ? 0 : xOffsets[(i + 1) % 4];
                const x = 256 + xOffset;
                const y = (i + 1) * 200 + 120;
                
                const prevXOffset = i === 0 ? 0 : (pathNodes[i-1].type === "phase" ? 0 : xOffsets[i % 4]);
                const prevX = i === 0 ? startX : 256 + prevXOffset;
                const prevY = i === 0 ? startY : i * 200 + 120;
                const cpY = (prevY + y) / 2;
                
                d += ` C ${prevX} ${cpY}, ${x} ${cpY}, ${x} ${y}`;
              });
              return d;
            })()}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="24"
            className="dark:stroke-slate-800"
            strokeLinecap="round"
          />
          {/* Progress Path (Green) */}
          <path
            d={(() => {
              const startX = 256;
              const startY = 120;
              let d = `M ${startX} ${startY}`;
              
              // Only draw the path up to the last completed node
              const completedNodes = pathNodes.map((n, idx) => n.status === "completed" ? idx : -1).filter(idx => idx !== -1);
              const maxCompletedIdx = completedNodes.length > 0 ? Math.max(...completedNodes) : -1;

              pathNodes.forEach((node, i) => {
                if (i > maxCompletedIdx) return;
                
                const xOffsets = [0, 80, 0, -80];
                const xOffset = node.type === "phase" ? 0 : xOffsets[(i + 1) % 4];
                const x = 256 + xOffset;
                const y = (i + 1) * 200 + 120;
                
                const prevXOffset = i === 0 ? 0 : (pathNodes[i-1].type === "phase" ? 0 : xOffsets[i % 4]);
                const prevX = i === 0 ? startX : 256 + prevXOffset;
                const prevY = i === 0 ? startY : i * 200 + 120;
                const cpY = (prevY + y) / 2;
                
                d += ` C ${prevX} ${cpY}, ${x} ${cpY}, ${x} ${y}`;
              });
              return d;
            })()}
            fill="none"
            stroke="#ff8a65"
            strokeWidth="24"
            strokeLinecap="round"
            className="transition-all duration-1000 drop-shadow-sm"
          />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col gap-0 w-full items-center">
        {/* Starting Flag */}
        <div className="flex flex-col items-center h-[200px] justify-center pt-0">
          <div className={cn(
            "w-24 h-24 rounded-full flex items-center justify-center border-[8px] border-white shadow-2xl text-white transform hover:scale-110 transition-transform",
            phaseColors[0]
          )}>
            <Flag size={44} fill="white" />
          </div>
        </div>

        {pathNodes.map((node, index) => {
          const phaseIdx = node.data.phaseIndex ?? 0;
          const activeColor = phaseColors[phaseIdx % phaseColors.length];
          const hoverColor = phaseHoverColors[phaseIdx % phaseHoverColors.length];

          const xOffsets = [0, 80, 0, -80];
          const xOffset = node.type === "phase" ? 0 : xOffsets[(index + 1) % 4];

          if (node.type === "phase") {
            return (
              <div
                key={`phase-${node.data.id}-${index}`}
                className="w-full flex flex-col items-center h-[200px] justify-center"
              >
                <div className={cn(
                  "px-8 py-3 rounded-2xl border-4 border-b-8 transform -rotate-1 shadow-2xl transition-all",
                  "bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700"
                )}>
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-1 text-center">
                    Section {phaseIdx + 1}
                  </h3>
                  <h4 className="text-sm font-black uppercase tracking-tight text-slate-900 dark:text-white italic text-center">
                    {node.data.title}
                  </h4>
                </div>
              </div>
            );
          }

          if (node.type === "milestone") {
            const isCompleted = node.status === "completed";
            return (
              <motion.div
                key={`milestone-${index}`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center h-[200px] justify-center relative z-10"
                style={{ marginLeft: `${xOffset * 2}px` }}
              >
                <div className={cn(
                  "w-24 h-24 rounded-[2.5rem] flex items-center justify-center rotate-45 shadow-2xl border-b-[10px] transition-all",
                  isCompleted ? "bg-[#ffc800] border-[#e5a400] text-white" : "bg-slate-200 border-slate-300 text-slate-400"
                )}>
                  <Trophy size={48} className="-rotate-45 drop-shadow-md" />
                </div>
              </motion.div>
            );
          }

          const isCompleted = node.status === "completed";
          const isInProgress = node.status === "in_progress";
          const isLocked = node.status === "locked";

          return (
            <div key={`module-${node.data.id}-${index}`} className="flex flex-col items-center w-full group/item h-[200px] justify-center relative z-10">
              <motion.button
                disabled={isLocked}
                onClick={() => onModuleClick(node.data)}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={!isLocked ? { scale: 1.1, translateY: -8 } : {}}
                whileTap={!isLocked ? { scale: 0.95 } : {}}
                viewport={{ once: true }}
                className={cn(
                  "relative flex items-center justify-center z-20",
                  "w-24 h-24 rounded-full transition-all cursor-pointer",
                  isCompleted 
                    ? cn(activeColor, hoverColor, "hover:scale-105 active:scale-95 active:translate-y-[4px]") 
                    : isInProgress 
                      ? cn(activeColor, "ring-12 ring-primary/20 animate-bounce-subtle shadow-[0_12px_20px_rgba(0,0,0,0.2)] hover:scale-110 active:scale-95 active:translate-y-[4px]") 
                      : "bg-slate-200 border-b-[8px] border-slate-300 opacity-60 cursor-not-allowed"
                )}
                style={{ marginLeft: `${xOffset * 2}px` }}
              >
                <div className="text-white drop-shadow-lg">
                  {getModuleIcon(node.data.type, node.status)}
                </div>

                <div className={cn(
                  "absolute left-1/2 -top-16 -translate-x-1/2 px-4 py-2 rounded-2xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-black uppercase tracking-tight whitespace-nowrap shadow-2xl border-2 border-slate-100 dark:border-slate-700 transition-all z-20 pointer-events-none",
                  isLocked ? "opacity-0 group-hover/item:opacity-100" : "opacity-100",
                   "after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-[8px] after:border-transparent after:border-t-white dark:after:border-t-slate-800"
                )}>
                  {node.data.title}
                </div>
                
                {isInProgress && (
                  <div className="absolute -right-4 -top-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-2xl border-4 border-primary z-30 pointer-events-none">
                    <span className="text-[12px] font-black text-primary italic">GO!</span>
                  </div>
                )}
              </motion.button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RoadmapPath;
