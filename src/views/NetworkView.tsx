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
    <div className="max-w-4xl mx-auto min-h-screen pb-24 px-4 md:px-8">
      <div className="p-8 flex flex-col gap-10">
        <h1 className="text-3xl md:text-5xl font-black italic tracking-tighter text-slate-900 dark:text-slate-100 uppercase py-6">Network</h1>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Recommended Mentors</h3>
            {professionals.map((pro, index) => (
              <Card key={pro.name} className="p-6 flex items-center gap-5 bg-white border-none shadow-xl shadow-slate-100 rounded-[2rem] hover:scale-[1.02] transition-transform">
                <div className={cn(
                  "w-16 h-16 rounded-[1.2rem] overflow-hidden shadow-lg",
                  index === 0 ? "bg-primary" : index === 1 ? "bg-accent-purple" : "bg-accent-blue"
                )}>
                  <img 
                    src={`https://picsum.photos/seed/${pro.name}/100/100`} 
                    alt={pro.name} 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer" 
                  />
                </div>
                <div className="flex-1">
                  <p className="text-lg font-black uppercase tracking-tight text-slate-900 dark:text-slate-100 italic">{pro.name}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">{pro.role}</p>
                </div>
                <Button variant="secondary" className="rounded-2xl h-12 px-6 border-slate-100 font-black uppercase tracking-widest text-[10px] shadow-sm">
                  Connect
                </Button>
              </Card>
            ))}
          </div>

          <div className="space-y-6">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Recent Activity</h3>
            <Card className="p-8 flex items-start gap-5 bg-white/50 backdrop-blur-sm border-none shadow-xl rounded-[2.5rem]">
              <div className="w-12 h-12 rounded-2xl overflow-hidden bg-accent-green shrink-0 shadow-md">
                 <img 
                   src="https://picsum.photos/seed/activity/100/100" 
                   alt="User" 
                   className="w-full h-full object-cover" 
                   referrerPolicy="no-referrer" 
                 />
              </div>
              <div>
                <p className="text-base font-medium leading-relaxed">
                  <span className="font-black italic text-xl block mb-1">ALEX G.</span> just completed <span className="text-primary font-black italic">Communication Fundamentals</span>
                </p>
                <div className="flex items-center gap-2 mt-4 text-slate-300">
                  <Zap size={14} className="fill-primary text-primary" />
                  <p className="text-[10px] font-black uppercase tracking-widest italic">2 hours ago</p>
                </div>
              </div>
            </Card>

            {/* Added a community stats card for desktop */}
            <Card className="p-8 bg-gradient-to-br from-primary to-accent-purple text-white border-none rounded-[2.5rem] shadow-2xl">
               <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60">Global Community</p>
               <h4 className="text-4xl font-black italic tracking-tighter mt-4">12,482</h4>
               <p className="text-xs font-medium opacity-80 mt-2 italic">Active professionals growing together.</p>
               <div className="flex -space-x-3 mt-6">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className="w-10 h-10 rounded-xl border-4 border-primary/20 overflow-hidden shadow-lg bg-slate-200">
                      <img src={`https://picsum.photos/seed/net${i}/100/100`} className="w-full h-full object-cover" />
                    </div>
                  ))}
               </div>
            </Card>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default NetworkView;
