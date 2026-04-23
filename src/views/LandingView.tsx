import { Link } from "react-router-dom";
import { Navbar } from "../components/Navigation";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { ArrowRight, CheckCircle, TrendingUp, Map as MapIcon, Calendar, Zap, Play, Rocket } from "lucide-react";
import { motion } from "motion/react";

const LandingView = () => {
  return (
    <div className="relative overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <header className="relative pt-16 pb-20 lg:pt-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col gap-8"
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full w-fit">
                <Zap size={14} className="fill-primary" />
                <span className="text-xs font-extra-bold uppercase tracking-[0.2em]">Next Generation Growth</span>
              </div>
              <div className="flex flex-col gap-6">
                <h1 className="text-6xl lg:text-8xl font-black leading-[1.1] tracking-tight text-slate-900 dark:text-slate-100">
                  Turn Ambition into <span className="text-primary italic">Action</span>
                </h1>
                <p className="text-xl lg:text-2xl text-slate-600 dark:text-slate-400 max-w-lg leading-relaxed font-medium">
                  Transform your long-term career goals into personalized, daily action plans with AI.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-5">
                <Link to="/onboarding">
                  <Button size="lg" className="w-full sm:w-auto gap-3 text-lg h-14 px-8 rounded-2xl shadow-2xl shadow-primary/30">
                    Get Started
                    <ArrowRight size={20} />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="gap-3 text-lg h-14 px-8 rounded-2xl bg-white/20 backdrop-blur-sm border-slate-200">
                  <Play size={20} className="fill-current" />
                  Watch Process
                </Button>
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-500 font-medium">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className={`w-10 h-10 rounded-full border-2 border-white dark:border-slate-900 overflow-hidden shadow-lg
                      ${i === 1 ? 'bg-primary' : i === 2 ? 'bg-accent-purple' : i === 3 ? 'bg-accent-blue' : 'bg-accent-green'}`}>
                      <img 
                        src={`https://picsum.photos/seed/hero${i}/100/100`} 
                        alt="User" 
                        className="w-full h-full object-cover" 
                        referrerPolicy="no-referrer" 
                      />
                    </div>
                  ))}
                </div>
                <span>Joined by <span className="text-slate-900 dark:text-slate-100 font-bold">12,000+</span> professionals</span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-square"
            >
              <div className="absolute inset-0 bg-primary/10 blur-[120px] rounded-full scale-90 animate-pulse"></div>
              <div className="absolute inset-0 bg-accent-purple/10 blur-[100px] rounded-full translate-x-20 -translate-y-10 animate-pulse delay-700"></div>
              <Card className="relative h-full border-none bg-white/10 backdrop-blur-md shadow-2xl overflow-hidden group flex items-center justify-center rounded-[3rem]">
                <div className="relative z-10 flex flex-col items-center gap-8 p-12">
                   <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-primary to-accent-purple text-white shadow-2xl shadow-primary/40 group-hover:scale-110 transition-transform duration-700">
                      <Rocket size={80} strokeWidth={1.5} />
                   </div>
                   <div className="text-center">
                     <p className="text-2xl font-black italic tracking-tight">TRAJECTA</p>
                     <p className="text-slate-500 dark:text-slate-400 font-medium">Your path, simplified.</p>
                   </div>
                </div>
                
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute bottom-10 left-10 right-10 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-white flex items-center gap-4"
                >
                  <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-2xl text-green-600">
                    <CheckCircle size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Today's Milestone</p>
                    <p className="text-lg font-black text-slate-900 dark:text-slate-100 uppercase">Update Portfolio Strategy</p>
                  </div>
                  <div className="ml-auto bg-slate-100 dark:bg-slate-700/50 px-3 py-1 rounded-full text-[10px] font-black italic">
                    +15 XP
                  </div>
                </motion.div>
              </Card>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="py-20 border-y border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { label: "Success Rate", value: "94%", trend: "Consistency first" },
              { label: "Active Users", value: "12k+", trend: "Growing global" },
              { label: "Goals Reached", value: "50k+", trend: "Impact made" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center text-center gap-4">
                <p className="text-slate-400 font-black uppercase text-xs tracking-widest">{stat.label}</p>
                <p className="text-6xl font-black text-slate-900 dark:text-slate-100 tracking-tighter">{stat.value}</p>
                <div className="flex items-center gap-1.5 text-primary font-bold text-sm bg-primary/5 px-3 py-1 rounded-full">
                  <TrendingUp size={14} />
                  {stat.trend}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32" id="features">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl mb-24 flex flex-col gap-6">
            <h2 className="text-primary font-black tracking-[0.3em] uppercase text-xs">Framework</h2>
            <h3 className="text-5xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-slate-100 leading-tight">
              A Structured Approach to <span className="italic">Excellence</span>
            </h3>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Personalized Roadmaps",
                icon: MapIcon,
                desc: "Custom career paths generated by AI, tailored explicitly to your unique skills and aspirations.",
                points: ["Skill gap analysis", "Industry benchmarks"],
                color: "bg-accent-purple"
              },
              {
                title: "90-Day Execution",
                icon: Calendar,
                desc: "Strategic quarterly targets designed to maintain consistent momentum without overwhelm.",
                points: ["Milestone tracking", "Adaptive scheduling"],
                color: "bg-accent-blue"
              },
              {
                title: "Daily Micro-Actions",
                icon: Zap,
                desc: "Bite-sized daily tasks that turn large, daunting goals into achievable daily habits.",
                points: ["15-minute tasks", "Smart notifications"],
                color: "bg-primary"
              }
            ].map((feature) => (
              <Card key={feature.title} className="p-10 border-none bg-white shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 rounded-[2.5rem] flex flex-col h-full">
                <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg`}>
                  <feature.icon size={32} />
                </div>
                <h4 className="text-2xl font-black mb-4 tracking-tight">{feature.title}</h4>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-8 font-medium">{feature.desc}</p>
                <div className="mt-auto space-y-4">
                  <div className="h-px bg-slate-100 w-full" />
                  <ul className="grid gap-3 text-sm font-bold text-slate-900 dark:text-slate-100 italic">
                    {feature.points.map(p => (
                      <li key={p} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 relative">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 flex flex-col gap-8">
          <h2 className="text-5xl lg:text-7xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight">
            Ready to reach your <br /><span className="italic text-primary">full potential?</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-300 text-xl font-medium max-w-2xl mx-auto">
            Join thousands of ambitious professionals who are already using Trajecta to accelerate their careers.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center mt-4">
            <Link to="/onboarding">
              <Button size="lg" className="w-full sm:w-auto h-16 px-12 text-xl rounded-2xl shadow-2xl shadow-primary/40">
                Start Journey
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="w-full sm:w-auto h-16 px-12 text-xl rounded-2xl border-slate-200">
              View Curriculum
            </Button>
          </div>
        </div>
      </section>

      <footer className="py-16 border-t border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex items-center gap-3">
              <div className="bg-primary p-2 rounded-xl text-white">
                <Rocket size={24} strokeWidth={2.5} />
              </div>
              <span className="text-2xl font-black tracking-tight italic">TRAJECTA</span>
            </div>
            <div className="flex gap-10 text-sm font-black uppercase tracking-widest text-slate-400">
              <a href="#" className="hover:text-primary transition-colors">Privacy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms</a>
              <a href="#" className="hover:text-primary transition-colors">Support</a>
            </div>
            <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">© 2024 TRAJECTA AI.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingView;
