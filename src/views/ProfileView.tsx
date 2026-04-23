import { UserRoadmap } from "../types";
import { BottomNav } from "../components/Navigation";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { cn } from "../lib/utils";
import { 
  Award, 
  TrendingUp, 
  Target, 
  Zap, 
  Users, 
  Settings, 
  ChevronRight,
  ShieldCheck,
  Star,
  Flame,
  Trophy,
  Rocket,
  User
} from "lucide-react";
import { motion } from "motion/react";

interface ProfileViewProps {
  roadmap: UserRoadmap;
  user: any;
}

const ProfileView = ({ roadmap, user }: ProfileViewProps) => {
  const stats = [
    { label: "Roadmap Progress", value: "32%", icon: Target, color: "text-blue-500" },
    { label: "Skills Mastered", value: "8/24", icon: Zap, color: "text-yellow-500" },
    { label: "Daily Streak", value: `${roadmap.streak?.current || 0} days`, icon: Flame, color: "text-orange-500" },
  ];

  return (
    <div className="max-w-md mx-auto min-h-screen pb-24">
      <div className="p-6 flex flex-col gap-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-primary p-1.5 rounded-lg text-white">
              <Rocket size={18} strokeWidth={2.5} />
            </div>
            <h1 className="text-xl font-black tracking-tighter text-slate-900 dark:text-slate-100 italic">TRAJECTA</h1>
          </div>
          <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
            <Settings size={24} />
          </button>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-primary/20 to-accent-purple/20 flex items-center justify-center text-primary shadow-xl ring-4 ring-white dark:ring-slate-800">
             <User size={40} strokeWidth={1.5} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 leading-none uppercase tracking-tight">{user.email.split('@')[0]}</h2>
            <div className="flex items-center gap-2 mt-2">
              <p className="text-primary font-black uppercase text-[10px] tracking-widest leading-none">{roadmap.goal}</p>
              <div className={cn(
                "px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest",
                user.subscription === "premium" ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-slate-100 text-slate-500"
              )}>
                {user.subscription}
              </div>
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-primary">
              <ShieldCheck size={14} />
              <span className="text-[10px] font-black uppercase tracking-widest">Verified Expert</span>
            </div>
          </div>
        </div>

        {/* Premium Upsell for Free Users */}
        {user.subscription === "free" && (
          <Card className="p-6 bg-white/50 backdrop-blur-sm border-primary/20 border-2 border-dashed flex flex-col gap-4 rounded-3xl">
            <div className="flex items-center gap-4">
              <div className="bg-primary p-3 rounded-2xl text-white shadow-lg shadow-primary/20">
                <Zap size={24} strokeWidth={2.5} />
              </div>
              <div className="flex-1">
                <p className="text-base font-black uppercase tracking-tight">Unlock Everything</p>
                <p className="text-xs text-slate-500 font-medium">Track multiple goals and get full roadmap access for only €2.99/mo</p>
              </div>
            </div>
            <Button className="w-full h-12 rounded-xl text-sm font-black uppercase tracking-widest">Go Premium</Button>
          </Card>
        )}

        {/* Career Readiness Score */}
        <Card className="p-8 bg-gradient-to-br from-primary via-primary to-accent-purple text-white border-none shadow-2xl shadow-primary/30 rounded-[2.5rem]">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-white/70 text-[10px] font-black uppercase tracking-[0.2em]">Readiness Score</p>
              <h3 className="text-6xl font-black mt-2 tracking-tighter">{roadmap.careerReadinessScore}%</h3>
            </div>
            <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
              <Award size={40} />
            </div>
          </div>
          <div className="h-2.5 bg-white/20 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${roadmap.careerReadinessScore}%` }}
              className="h-full bg-white"
            />
          </div>
          <p className="text-xs font-medium mt-6 text-white/80 leading-relaxed uppercase tracking-wide">
            You're in the top 15% of aspiring {roadmap.goal}s <br />Complete 3 more daily actions to level up.
          </p>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat) => (
            <Card key={stat.label} className="p-4 flex flex-col items-center text-center gap-3 border-none bg-white shadow-lg shadow-slate-100 rounded-3xl">
              <stat.icon size={20} className={stat.color} />
              <div>
                <p className="text-xl font-black leading-none">{stat.value}</p>
                <p className="text-[9px] text-slate-400 mt-2 font-black uppercase tracking-widest leading-none">{stat.label}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Professional Guidance */}
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-black uppercase text-xs tracking-widest text-slate-400">Collaborators</h3>
            <button className="text-primary text-xs font-black uppercase tracking-widest">Connect</button>
          </div>
          <Card className="p-5 flex items-center gap-4 bg-white border-none shadow-lg shadow-slate-100 rounded-3xl hover:translate-y-[-2px] transition-all cursor-pointer">
            <div className="w-12 h-12 rounded-2xl bg-accent-blue/20 flex items-center justify-center text-accent-blue">
               <User size={24} strokeWidth={2.5} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-black uppercase italic">Sarah Jenkins</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Expert Mentor</p>
            </div>
            <Button variant="secondary" size="sm" className="rounded-full px-4 text-[10px] font-black uppercase border-slate-100">Invite</Button>
          </Card>
        </div>

        {/* Social Accountability */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-black uppercase text-xs tracking-widest text-slate-400">Community Activity</h3>
            <Users size={20} className="text-slate-300" />
          </div>
          <div className="flex -space-x-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className={`w-11 h-11 rounded-2xl border-4 border-white dark:border-slate-800 flex items-center justify-center text-white text-xs font-black shadow-lg
                ${i === 1 ? 'bg-primary' : i === 2 ? 'bg-accent-purple' : i === 3 ? 'bg-accent-blue' : i === 4 ? 'bg-accent-green' : 'bg-slate-400'}`}>
                {String.fromCharCode(64 + i)}
              </div>
            ))}
            <div className="w-11 h-11 rounded-2xl border-4 border-white dark:border-slate-800 bg-slate-100 flex items-center justify-center text-slate-400 text-xs font-black">
              +12
            </div>
          </div>
          <p className="text-xs text-slate-400 font-medium">5 colleagues are currently active. <span className="text-primary font-black uppercase tracking-widest">Sync progress</span></p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default ProfileView;
