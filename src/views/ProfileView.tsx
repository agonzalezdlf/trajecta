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
    <div className="max-w-4xl mx-auto min-h-screen pb-24 px-4 md:px-8">
      <div className="py-8 flex flex-col gap-10">
        {/* Header */}
        <div className="flex justify-between items-center bg-white/40 backdrop-blur-xl p-4 md:p-6 rounded-2xl border border-white/20">
          <div className="flex items-center gap-3">
            <div className="bg-primary p-2 rounded-xl text-white shadow-lg shadow-primary/20">
              <Rocket size={20} strokeWidth={2.5} />
            </div>
            <h1 className="text-xl md:text-2xl font-black tracking-tighter text-slate-900 dark:text-slate-100 italic">TRAJECTA</h1>
          </div>
          <div className="flex gap-2">
            <button className="p-3 hover:bg-white/50 rounded-xl transition-colors shadow-sm">
              <Users size={24} />
            </button>
            <button className="p-3 hover:bg-white/50 rounded-xl transition-colors shadow-sm">
              <Settings size={24} />
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-8">
          {/* Left Column: User Profile Details */}
          <div className="md:col-span-5 space-y-6">
            <Card className="p-8 flex flex-col items-center gap-6 rounded-[2.5rem] border-none bg-white shadow-xl">
              <div className="w-28 h-28 rounded-[2.5rem] bg-gradient-to-br from-primary/20 to-accent-purple/20 flex items-center justify-center text-primary shadow-xl ring-8 ring-slate-50">
                <div className="w-full h-full rounded-[2.5rem] overflow-hidden">
                   <img 
                     src={`https://picsum.photos/seed/${user.email}/200/200`} 
                     alt="User" 
                     className="w-full h-full object-cover" 
                     referrerPolicy="no-referrer" 
                   />
                </div>
              </div>
              <div className="text-center">
                <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100 uppercase tracking-tight italic">{user.email.split('@')[0]}</h2>
                <div className="flex items-center gap-2 justify-center mt-3">
                  <p className="text-primary font-black uppercase text-[10px] tracking-widest leading-none px-3 py-1 bg-primary/5 rounded-full border border-primary/10">{roadmap.goal}</p>
                </div>
                <div className="flex items-center gap-1.5 mt-4 text-primary justify-center">
                  <ShieldCheck size={16} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Verified Trajecta Member</span>
                </div>
              </div>
              
              <div className={cn(
                "w-full px-6 py-4 rounded-2xl text-center text-xs font-black uppercase tracking-[0.2em] shadow-sm",
                user.subscription === "premium" ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-slate-50 text-slate-400"
              )}>
                {user.subscription} Status
              </div>
            </Card>

            {/* Premium Upsell for Free Users */}
            {user.subscription === "free" && (
              <Card className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 text-white border-none flex flex-col gap-6 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform duration-700">
                  <Zap size={120} strokeWidth={1} />
                </div>
                <div className="relative z-10 space-y-4">
                  <div className="bg-primary p-3 rounded-2xl text-white w-fit shadow-lg shadow-primary/20">
                    <Zap size={24} strokeWidth={2.5} />
                  </div>
                  <div>
                    <p className="text-xl font-black uppercase tracking-tight italic">Unlock Premium</p>
                    <p className="text-sm text-slate-300 font-medium leading-relaxed mt-2">Scale your progress with unlimited roadmaps and expert guidance.</p>
                  </div>
                </div>
                <Button className="w-full h-14 rounded-2xl text-sm font-black uppercase tracking-widest relative z-10 shadow-xl shadow-primary/20">Upgrade Now — €2.99</Button>
              </Card>
            )}
          </div>

          {/* Right Column: Score & Community */}
          <div className="md:col-span-7 space-y-8">
            {/* Career Readiness Score */}
            <Card className="p-10 bg-gradient-to-br from-primary via-primary to-accent-purple text-white border-none shadow-2xl shadow-primary/30 rounded-[3rem] relative overflow-hidden">
               <div className="absolute -bottom-10 -right-10 p-10 opacity-10">
                  <Award size={200} strokeWidth={1} />
               </div>
               <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
                <div className="space-y-2">
                  <p className="text-white/70 text-[10px] font-black uppercase tracking-[0.2em]">Readiness Index</p>
                  <h3 className="text-7xl font-black tracking-tighter">{roadmap.careerReadinessScore}<span className="text-3xl opacity-50">%</span></h3>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/20">
                  <Award size={64} strokeWidth={1.5} />
                </div>
              </div>
              <div className="relative z-10 space-y-4">
                <div className="h-3 bg-white/20 rounded-full overflow-hidden shadow-inner">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${roadmap.careerReadinessScore}%` }}
                    className="h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                  />
                </div>
                <p className="text-sm font-medium text-white/80 leading-relaxed uppercase tracking-widest italic">
                  Level 4 / 15: Strategic Professional
                </p>
              </div>
            </Card>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat) => (
                <Card key={stat.label} className="p-6 flex flex-col items-center text-center gap-3 border-none bg-white shadow-xl shadow-slate-100 rounded-3xl group hover:scale-105 transition-transform duration-300">
                  <stat.icon size={28} className={cn(stat.color, "group-hover:scale-110 transition-transform")} />
                  <div className="mt-2">
                    <p className="text-2xl font-black leading-none italic">{stat.value}</p>
                    <p className="text-[10px] text-slate-400 mt-3 font-black uppercase tracking-widest leading-none">{stat.label}</p>
                  </div>
                </Card>
              ))}
            </div>

            {/* Collaborators & Community */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-black uppercase text-xs tracking-widest text-slate-400">Expert Mentor</h3>
                <Card className="p-5 flex items-center gap-4 bg-white border-none shadow-lg shadow-slate-100 rounded-3xl transition-all cursor-pointer group">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-md group-hover:scale-105 transition-transform">
                     <img 
                       src="https://picsum.photos/seed/sarah/100/100" 
                       alt="Sarah Jenkins" 
                       className="w-full h-full object-cover" 
                       referrerPolicy="no-referrer" 
                     />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-sm font-black uppercase italic truncate">Sarah Jenkins</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider truncate">Senior Advisor</p>
                  </div>
                </Card>
              </div>

              <div className="space-y-4">
                <h3 className="font-black uppercase text-xs tracking-widest text-slate-400">Community</h3>
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className={`w-12 h-12 rounded-2xl border-4 border-white dark:border-slate-800 overflow-hidden shadow-lg
                        ${i === 1 ? 'bg-primary' : i === 2 ? 'bg-accent-purple' : i === 3 ? 'bg-accent-blue' : i === 4 ? 'bg-accent-green' : 'bg-slate-400'}`}>
                        <img 
                          src={`https://picsum.photos/seed/user${i}/100/100`} 
                          alt="Community Member" 
                          className="w-full h-full object-cover" 
                          referrerPolicy="no-referrer" 
                        />
                      </div>
                    ))}
                  </div>
                  <span className="text-xs font-black text-slate-400">+128</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default ProfileView;
