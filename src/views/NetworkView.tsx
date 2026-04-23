import { BottomNav } from "../components/Navigation";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { Users, MessageCircle, UserPlus, Zap } from "lucide-react";
import { cn } from "../lib/utils";

const NetworkView = () => {
  const professionals = [
    { name: "David Chen", role: "Senior Consultant @ McKinsey", company: "McKinsey" },
    { name: "Elena Rodriguez", role: "Strategy Manager @ Google", company: "Google" },
    { name: "Marcus Thorne", role: "Director of Operations @ Amazon", company: "Amazon" },
  ];

  return (
    <div className="max-w-md mx-auto min-h-screen pb-24">
      <div className="p-8 flex flex-col gap-8">
        <h1 className="text-3xl font-black italic tracking-tighter text-slate-900 dark:text-slate-100 uppercase">Network</h1>
        
        <div className="space-y-4">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Recommended Mentors</h3>
          {professionals.map((pro, index) => (
            <Card key={pro.name} className="p-5 flex items-center gap-4 bg-white border-none shadow-lg shadow-slate-100 rounded-3xl">
              <div className={cn(
                "w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-md",
                index === 0 ? "bg-primary" : index === 1 ? "bg-accent-purple" : "bg-accent-blue"
              )}>
                <Users size={28} strokeWidth={2} />
              </div>
              <div className="flex-1">
                <p className="font-black uppercase tracking-tight text-slate-900 dark:text-slate-100 italic">{pro.name}</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">{pro.role}</p>
              </div>
              <Button variant="secondary" size="sm" className="rounded-xl size-10 p-0 border-slate-100">
                <UserPlus size={18} />
              </Button>
            </Card>
          ))}
        </div>

        <div className="mt-8 space-y-4">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Recent Activity</h3>
          <Card className="p-5 flex items-start gap-4 bg-white/50 backdrop-blur-sm border-white/20 shadow-lg rounded-3xl">
            <div className="w-10 h-10 rounded-xl bg-accent-green flex items-center justify-center text-white shrink-0">
               <Zap size={20} strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-sm font-medium leading-relaxed">
                <span className="font-black italic">ALEX</span> just completed <span className="text-primary font-black italic">Communication Fundamentals</span>
              </p>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-300 mt-2">2 hours ago</p>
            </div>
          </Card>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default NetworkView;
