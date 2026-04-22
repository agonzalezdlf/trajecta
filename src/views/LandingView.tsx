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
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col gap-8"
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full w-fit">
                <Zap size={14} className="fill-primary" />
                <span className="text-xs font-bold uppercase tracking-wider">AI-Powered Career Growth</span>
              </div>
              <div className="flex flex-col gap-4">
                <h1 className="text-5xl lg:text-7xl font-black leading-tight tracking-tight text-slate-900 dark:text-slate-100">
                  Turn Ambition into <span className="text-primary">Action</span>
                </h1>
                <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-400 max-w-lg leading-relaxed">
                  Transform your long-term career goals into personalized, daily action plans with AI. Stop dreaming and start executing.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/onboarding">
                  <Button size="lg" className="w-full sm:w-auto gap-2">
                    Start Your Journey
                    <ArrowRight size={20} />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="gap-2">
                  <Play size={20} className="fill-current" />
                  Watch Demo
                </Button>
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                      <img src={`https://picsum.photos/seed/user${i}/100/100`} alt="User" referrerPolicy="no-referrer" />
                    </div>
                  ))}
                </div>
                <span>Joined by 12,000+ professionals</span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full scale-75 animate-pulse"></div>
              <Card className="relative p-8 overflow-hidden group">
                <img 
                  src="https://illustrations.popsy.co/white/launching-rocket.svg" 
                  alt="Rocket Mascot" 
                  className="w-full h-auto rounded-2xl transition-transform group-hover:scale-105 duration-700 p-8"
                  referrerPolicy="no-referrer"
                />
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 flex items-center gap-3 max-w-[200px]"
                >
                  <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg text-green-600">
                    <CheckCircle size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Daily Task</p>
                    <p className="text-sm font-bold">Update Portfolio</p>
                  </div>
                </motion.div>
              </Card>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="py-12 bg-white dark:bg-slate-900 border-y border-primary/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { label: "Success Rate", value: "94%", trend: "+15% monthly" },
              { label: "Active Users", value: "12k+", trend: "+22% monthly" },
              { label: "Goals Reached", value: "50k+", trend: "+30% monthly" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center text-center gap-2 p-6 rounded-2xl transition-all hover:bg-background-light dark:hover:bg-background-dark">
                <p className="text-slate-500 font-medium">{stat.label}</p>
                <p className="text-4xl font-black text-slate-900 dark:text-slate-100">{stat.value}</p>
                <div className="flex items-center gap-1 text-green-500 font-bold text-sm">
                  <TrendingUp size={14} />
                  {stat.trend}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 lg:py-32" id="features">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20 flex flex-col gap-4">
            <h2 className="text-primary font-bold tracking-widest uppercase text-sm">Features</h2>
            <h3 className="text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-slate-100">Achieve Your Goals Faster</h3>
            <p className="text-lg text-slate-600 dark:text-slate-400">Our AI-driven platform breaks down complex career ambitions into manageable, consistent steps that lead to mastery.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Personalized Roadmaps",
                icon: MapIcon,
                desc: "Custom career paths generated by AI, tailored specifically to your unique skills, experience, and ultimate aspirations.",
                points: ["Skill gap analysis", "Industry benchmarks"]
              },
              {
                title: "90-Day Execution Plans",
                icon: Calendar,
                desc: "Strategic quarterly targets designed to maintain consistent momentum without the overwhelm of looking too far ahead.",
                points: ["Milestone tracking", "Adaptive scheduling"]
              },
              {
                title: "Daily Micro-Actions",
                icon: Zap,
                desc: "Bite-sized daily tasks that turn large, daunting goals into achievable habits. Progress one small step at a time.",
                points: ["15-minute tasks", "Smart notifications"]
              }
            ].map((feature) => (
              <Card key={feature.title} className="p-8 group hover:border-primary/30 transition-all hover:shadow-2xl hover:shadow-primary/10">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon size={28} />
                </div>
                <h4 className="text-xl font-bold mb-3">{feature.title}</h4>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">{feature.desc}</p>
                <ul className="space-y-3 text-sm font-medium text-slate-500 dark:text-slate-400">
                  {feature.points.map(p => (
                    <li key={p} className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-primary" />
                      {p}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white"></path>
          </svg>
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">Ready to reach your full potential?</h2>
          <p className="text-white/90 text-lg mb-10 max-w-2xl mx-auto">
            Join thousands of ambitious professionals who are already using Trajecta to accelerate their careers. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/onboarding">
              <Button size="lg" className="bg-white text-primary hover:bg-slate-50 w-full sm:w-auto">
                Start Your Journey
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="bg-primary-dark/20 border-white/30 text-white hover:bg-white/10 w-full sm:w-auto">
              View Pricing
            </Button>
          </div>
        </div>
      </section>

      <footer className="bg-white dark:bg-background-dark py-12 border-t border-primary/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="bg-primary p-1.5 rounded-lg text-white">
                <Rocket size={20} />
              </div>
              <span className="text-xl font-black tracking-tight">Trajecta</span>
            </div>
            <div className="flex gap-8 text-sm font-medium text-slate-500">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-primary transition-colors">Contact</a>
            </div>
            <p className="text-sm text-slate-400">© 2024 Trajecta AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingView;
