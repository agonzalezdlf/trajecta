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
  Trophy
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
    <div className="max-w-md mx-auto min-h-screen bg-background-light dark:bg-background-dark pb-24">
      <div className="p-6 flex flex-col gap-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src="https://illustrations.popsy.co/white/launching-rocket.svg" alt="Trajecta Logo" className="size-8 object-contain" referrerPolicy="no-referrer" />
            <h1 className="text-xl font-black tracking-tighter text-primary">TRAJECTA</h1>
          </div>
          <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
            <Settings size={24} />
          </button>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full border-4 border-primary shadow-lg overflow-hidden bg-primary/5">
            <img src="https://illustrations.popsy.co/white/launching-rocket.svg" alt="Profile" className="w-full h-full object-contain p-3" referrerPolicy="no-referrer" />
          </div>
          <div>
            <h2 className="text-xl font-black">{user.email.split('@')[0]}</h2>
            <div className="flex items-center gap-2">
              <p className="text-primary font-bold text-sm">Aspiring {roadmap.goal}</p>
              <div className={cn(
                "px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest",
                user.subscription === "premium" ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-slate-100 text-slate-500"
              )}>
                {user.subscription}
              </div>
            </div>
            <div className="flex items-center gap-1 mt-1 text-primary">
              <ShieldCheck size={14} />
              <span className="text-xs font-bold uppercase tracking-wider">Verified Professional</span>
            </div>
          </div>
        </div>

        {/* Premium Upsell for Free Users */}
        {user.subscription === "free" && (
          <Card className="p-4 bg-primary/5 border-primary/20 border-2 border-dashed flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="bg-primary p-2 rounded-lg text-white">
                <Zap size={20} className="fill-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-black">Upgrade to Premium</p>
                <p className="text-[10px] text-slate-500">Track multiple goals and get full roadmap access for only €2.99/mo</p>
              </div>
            </div>
            <Button size="sm" className="w-full">Get Premium Access</Button>
          </Card>
        )}

        {/* Career Readiness Score */}
        <Card className="p-6 bg-gradient-to-br from-primary to-orange-600 text-white border-none shadow-xl shadow-primary/20">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-white/80 text-xs font-bold uppercase tracking-widest">Career Readiness Score</p>
              <h3 className="text-5xl font-black mt-1">{roadmap.careerReadinessScore}%</h3>
            </div>
            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
              <Award size={32} />
            </div>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${roadmap.careerReadinessScore}%` }}
              className="h-full bg-white"
            />
          </div>
          <p className="text-xs mt-4 text-white/80 leading-relaxed">
            You're in the top 15% of aspiring {roadmap.goal}s this month. Complete 3 more modules to reach 75%.
          </p>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat) => (
            <Card key={stat.label} className="p-3 flex flex-col items-center text-center gap-2">
              <stat.icon size={20} className={stat.color} />
              <div>
                <p className="text-lg font-bold leading-none">{stat.value}</p>
                <p className="text-[10px] text-slate-500 mt-1 font-medium">{stat.label}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Professional Guidance */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold">Professional Guidance</h3>
            <button className="text-primary text-xs font-bold">View All</button>
          </div>
          <Card className="p-4 flex items-center gap-4 hover:border-primary/30 transition-all cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-slate-100 overflow-hidden">
              <img src="https://picsum.photos/seed/mentor1/100/100" alt="Mentor" referrerPolicy="no-referrer" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold">Sarah Jenkins</p>
              <p className="text-xs text-slate-500">Principal Consultant @ BCG</p>
            </div>
            <Button variant="secondary" size="sm">Connect</Button>
          </Card>
        </div>

        {/* Social Accountability */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold">Community Progress</h3>
            <Users size={20} className="text-slate-400" />
          </div>
          <div className="flex -space-x-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 overflow-hidden">
                <img src={`https://picsum.photos/seed/friend${i}/100/100`} alt="Friend" referrerPolicy="no-referrer" />
              </div>
            ))}
            <div className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-900 bg-primary flex items-center justify-center text-white text-xs font-bold">
              +12
            </div>
          </div>
          <p className="text-xs text-slate-500">5 friends are currently working on their roadmaps. <span className="text-primary font-bold">Cheer them on!</span></p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default ProfileView;
