import { BottomNav } from "../components/Navigation";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { Users, MessageCircle, UserPlus } from "lucide-react";

const NetworkView = () => {
  const professionals = [
    { name: "David Chen", role: "Senior Consultant @ McKinsey", company: "McKinsey" },
    { name: "Elena Rodriguez", role: "Strategy Manager @ Google", company: "Google" },
    { name: "Marcus Thorne", role: "Director of Operations @ Amazon", company: "Amazon" },
  ];

  return (
    <div className="max-w-md mx-auto min-h-screen bg-background-light dark:bg-background-dark pb-24">
      <div className="p-6 flex flex-col gap-6">
        <h1 className="text-2xl font-black">Network</h1>
        
        <div className="space-y-4">
          <h3 className="font-bold text-sm uppercase tracking-widest text-slate-400">Recommended Mentors</h3>
          {professionals.map((pro) => (
            <Card key={pro.name} className="p-4 flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-slate-200 overflow-hidden">
                <img src={`https://picsum.photos/seed/${pro.name}/100/100`} alt={pro.name} referrerPolicy="no-referrer" />
              </div>
              <div className="flex-1">
                <p className="font-bold">{pro.name}</p>
                <p className="text-xs text-slate-500">{pro.role}</p>
              </div>
              <Button variant="secondary" size="sm">
                <UserPlus size={16} />
              </Button>
            </Card>
          ))}
        </div>

        <div className="mt-8 space-y-4">
          <h3 className="font-bold text-sm uppercase tracking-widest text-slate-400">Recent Activity</h3>
          <Card className="p-4 flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden">
              <img src="https://picsum.photos/seed/activity/100/100" alt="User" referrerPolicy="no-referrer" />
            </div>
            <div>
              <p className="text-sm font-medium">
                <span className="font-bold">Alex</span> just completed <span className="text-primary font-bold">Communication Fundamentals</span>
              </p>
              <p className="text-[10px] text-slate-400 mt-1">2 hours ago</p>
            </div>
          </Card>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default NetworkView;
