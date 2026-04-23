import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { ArrowLeft, ArrowRight, Mic, Info, Upload, Link as LinkIcon, Sparkles, Rocket } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { OnboardingData, UserRoadmap } from "../types";
import { generateRoadmap, suggestFocusAreas } from "../services/gemini";
import { cn } from "../lib/utils";

interface OnboardingViewProps {
  onComplete: (user: any, roadmap: UserRoadmap) => void;
}

const OnboardingView = ({ onComplete }: OnboardingViewProps) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingInterests, setLoadingInterests] = useState(false);
  const [suggestedInterests, setSuggestedInterests] = useState<string[]>([]);
  const [showPricing, setShowPricing] = useState(false);
  const [subscription, setSubscription] = useState<"free" | "premium">("free");
  const [formData, setFormData] = useState<OnboardingData>({
    goal: "",
    skillLevel: "Beginner",
    interests: [],
    hoursPerWeek: "5-10 hrs",
    timeline: "6 months",
    motivation: "",
  });

  const INSPIRATION_CATEGORIES = [
    {
      name: "Tech & Dev",
      examples: ["Senior Frontend Engineer", "Mobile App Developer", "Data Scientist"]
    },
    {
      name: "Business & Growth",
      examples: ["Launch a SaaS Startup", "Venture Capital Analyst", "Chief of Staff"]
    },
    {
      name: "Creative & Design",
      examples: ["Principal Product Designer", "Creative Director", "UX Researcher"]
    },
    {
      name: "Health & Life",
      examples: ["Master Marathon Runner", "Published Novelist", "Public Speaker"]
    }
  ];

  const INTEREST_TAGS = [
    "Technical Mastery", "Leadership", "Creative Design", "Business Strategy", 
    "Communication", "Problem Solving", "Data Analysis", "Public Speaking",
    "Networking", "Project Management", "Marketing", "Product Thinking",
    "Time Management", "Critical Thinking", "EQ & Empathy", "Research"
  ];

  const toggleInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const [minHours, setMinHours] = useState(5);
  const [maxHours, setMaxHours] = useState(10);

  useEffect(() => {
    setFormData(prev => ({ ...prev, hoursPerWeek: `${minHours}-${maxHours} hrs` }));
  }, [minHours, maxHours]);

  const nextStep = async () => {
    if (step === 2) {
      setLoadingInterests(true);
      setStep(3); // Move forward immediately for perceived speed
      try {
        const suggested = await suggestFocusAreas(formData.goal, formData.motivation);
        if (suggested && suggested.length > 0) {
          setSuggestedInterests(suggested);
        }
      } catch (error) {
        console.error("Failed to suggest interests:", error);
      } finally {
        setLoadingInterests(false);
      }
    } else {
      setStep((s) => Math.min(s + 1, 5));
    }
  };
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleFinish = async () => {
    setLoading(true);
    try {
      const roadmap = await generateRoadmap(formData);
      onComplete({ 
        email: "agonzalezdlf26@gmail.com", 
        subscription,
        goals: [formData.goal],
        joinedAt: new Date().toISOString(),
        ...formData 
      }, roadmap);
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Failed to generate roadmap:", error);
      const errorMessage = error?.message || (typeof error === 'string' ? error : "Unknown error");
      alert(`Something went wrong: ${errorMessage}\n\nPlease check your console for details.`);
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col gap-8"
          >
            <div className="relative">
              <div className="absolute -top-4 right-4 opacity-10 w-24 h-24 text-primary">
                <Rocket size={80} strokeWidth={1} />
              </div>
              <h1 className="text-3xl font-black leading-tight pb-3">What's your big mission?</h1>
              <p className="text-slate-600 dark:text-slate-400">Not sure? Explore our inspirations below to find your path.</p>
            </div>
            <div className="relative group">
              <textarea 
                className="w-full min-h-[140px] rounded-xl border-2 border-primary/20 bg-white dark:bg-slate-800 focus:border-primary focus:ring-0 p-5 text-lg"
                placeholder="e.g., Become a Senior Product Designer..."
                value={formData.goal}
                onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
              />
              <button className="absolute bottom-4 right-4 flex items-center justify-center size-12 rounded-full bg-primary text-white shadow-lg">
                <Mic size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Inspirations</span>
              <div className="flex flex-col gap-4 overflow-y-auto max-h-[300px] pr-2 custom-scrollbar">
                {INSPIRATION_CATEGORIES.map(category => (
                  <div key={category.name} className="space-y-2">
                    <p className="text-[10px] font-black text-primary uppercase tracking-tighter">{category.name}</p>
                    <div className="flex flex-wrap gap-2">
                      {category.examples.map(insp => (
                        <button 
                          key={insp}
                          onClick={() => setFormData({ ...formData, goal: insp })}
                          className={cn(
                            "px-3 py-1.5 rounded-lg border text-xs font-medium transition-all",
                            formData.goal === insp 
                              ? "bg-primary border-primary text-white" 
                              : "border-primary/20 bg-primary/5 text-primary hover:bg-primary/10"
                          )}
                        >
                          {insp}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col gap-6"
          >
            <div className="w-full aspect-[4/3] rounded-3xl overflow-hidden flex items-center justify-center bg-primary/5 text-primary">
              <Rocket size={120} strokeWidth={1.5} className="animate-bounce" />
            </div>
            <h3 className="text-2xl font-black text-center">Current Status Check</h3>
            <p className="text-slate-600 dark:text-slate-400 text-center">What's stopping you from reaching this goal today?</p>
            <textarea 
              className="w-full p-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:border-primary focus:ring-0"
              placeholder="E.g., I'm looking to optimize my workflow..."
              rows={5}
              value={formData.motivation}
              onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
            />
            <div className="flex items-start gap-2 text-slate-500 text-sm">
              <Info size={16} className="mt-0.5" />
              <p>Your response helps our AI customize your Trajecta dashboard.</p>
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col gap-6"
          >
            <div className="w-full aspect-[3/2] rounded-3xl overflow-hidden bg-primary/5 flex items-center justify-center text-primary">
              <Sparkles size={80} strokeWidth={1.5} className="animate-pulse" />
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-black">Focus Areas</h3>
              <p className="text-slate-600 dark:text-slate-400">What specific areas should we prioritize in your roadmap?</p>
            </div>
            
            <div className="flex flex-wrap gap-2 justify-center">
              {loadingInterests ? (
                <div className="flex flex-col items-center gap-4 py-8">
                  <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                  <p className="text-sm font-black uppercase tracking-widest text-primary animate-pulse">Analyzing your path...</p>
                </div>
              ) : (
                (suggestedInterests.length > 0 ? suggestedInterests : INTEREST_TAGS).map(tag => {
                  const isSelected = formData.interests.includes(tag);
                  return (
                    <button
                      key={tag}
                      onClick={() => toggleInterest(tag)}
                      className={cn(
                        "px-4 py-2 rounded-full border-2 transition-all font-bold text-sm",
                        isSelected
                          ? "border-primary bg-primary text-white shadow-lg shadow-primary/20"
                          : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-primary/40"
                      )}
                    >
                      {tag}
                    </button>
                  );
                })
              )}
            </div>

            <div className="flex items-center gap-2 p-4 bg-primary/5 rounded-xl border border-primary/10">
              <Sparkles className="text-primary shrink-0" size={20} />
              <p className="text-xs font-medium text-slate-600 dark:text-slate-300">
                Selecting these helps our AI weight your daily tasks towards your preferred growth areas.
              </p>
            </div>
          </motion.div>
        );
      case 4:
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col gap-6"
          >
            <div className="flex justify-center py-8">
              <div className="w-40 h-40 rounded-[2.5rem] bg-gradient-to-br from-primary to-accent-purple flex items-center justify-center text-white shadow-2xl shadow-primary/20 rotate-12">
                 <Rocket size={80} strokeWidth={1.5} />
              </div>
            </div>
            <h1 className="text-3xl font-black text-center">Fuel for the journey</h1>
            <div className="space-y-8">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-end">
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Weekly Commitment</label>
                  <span className="text-2xl font-black text-primary">{minHours}-{maxHours} <span className="text-sm">hrs</span></span>
                </div>
                
                <div className="space-y-6 pt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      <span>Minimum Hours</span>
                      <span className="text-slate-600 dark:text-slate-300">{minHours} hrs</span>
                    </div>
                    <input 
                      type="range" 
                      min="1" 
                      max="40" 
                      value={minHours} 
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        setMinHours(val);
                        if (val > maxHours) setMaxHours(val);
                      }}
                      className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      <span>Maximum Hours</span>
                      <span className="text-slate-600 dark:text-slate-300">{maxHours} hrs</span>
                    </div>
                    <input 
                      type="range" 
                      min="1" 
                      max="40" 
                      value={maxHours} 
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        setMaxHours(val);
                        if (val < minHours) setMinHours(val);
                      }}
                      className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Target Timeline</label>
                <div className="grid grid-cols-3 gap-2">
                  {["3 months", "6 months", "1 year"].map(time => (
                    <button 
                      key={time}
                      onClick={() => setFormData({ ...formData, timeline: time })}
                      className={cn(
                        "py-3 px-2 rounded-lg border-2 transition-all font-bold text-xs",
                        formData.timeline === time 
                          ? "border-primary bg-primary/10 text-primary" 
                          : "border-slate-200 dark:border-slate-700 text-slate-500"
                      )}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Quick Presets</span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: "Light", min: 3, max: 5 },
                    { label: "Moderate", min: 10, max: 15 },
                    { label: "Intense", min: 25, max: 35 }
                  ].map(preset => (
                    <button 
                      key={preset.label}
                      onClick={() => {
                        setMinHours(preset.min);
                        setMaxHours(preset.max);
                      }}
                      className={cn(
                        "py-2 px-3 rounded-lg border transition-all text-xs font-bold",
                        minHours === preset.min && maxHours === preset.max
                          ? "border-primary bg-primary/10 text-primary" 
                          : "border-slate-200 dark:border-slate-700 text-slate-500"
                      )}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        );
      case 5:
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col items-center text-center">
              <h2 className="text-3xl font-black leading-tight pb-2">Choose your fuel</h2>
              <p className="text-slate-600 dark:text-slate-400">Unlock your full potential with Trajecta Premium.</p>
            </div>

            <div className="space-y-4">
              <Card 
                className={cn(
                  "p-5 cursor-pointer border-2 transition-all",
                  subscription === "free" ? "border-primary bg-primary/5" : "border-slate-100"
                )}
                onClick={() => setSubscription("free")}
              >
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-black text-lg">Free</h4>
                  <span className="bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full text-[10px] font-bold uppercase">Basic</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span> 1 Active Goal
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span> 1 Daily Action
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span> Basic Tracking
                  </li>
                </ul>
              </Card>

              <Card 
                className={cn(
                  "p-5 cursor-pointer border-2 transition-all relative overflow-hidden",
                  subscription === "premium" ? "border-primary bg-primary/5 shadow-xl shadow-primary/10" : "border-slate-100"
                )}
                onClick={() => setSubscription("premium")}
              >
                <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 rounded-bl-xl text-[10px] font-black uppercase tracking-widest">
                  Best Value
                </div>
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-black text-lg text-primary">Premium</h4>
                  <div className="text-right">
                    <p className="font-black text-lg leading-none">€2.99</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">per month</p>
                  </div>
                </div>
                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                  <li className="flex items-center gap-2">
                    <span className="text-primary font-bold">★</span> Multiple concurrent goals
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary font-bold">★</span> Full Roadmap Visibility
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary font-bold">★</span> Professional Guidance Access
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary font-bold">★</span> Advanced Progress Analytics
                  </li>
                </ul>
              </Card>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-500">Timeline</span>
                <span className="text-xs font-black text-primary">{formData.timeline}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-500">Weekly Commitment</span>
                <span className="text-xs font-black text-primary">{formData.hoursPerWeek}</span>
              </div>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div className="max-w-2xl mx-auto min-h-screen flex flex-col md:py-8">
      <div className="flex items-center p-6 justify-between sticky top-0 bg-transparent backdrop-blur-xl z-20">
        <div className="flex items-center gap-2">
          <div className="bg-primary p-1.5 rounded-lg text-white shadow-lg shadow-primary/20">
            <Rocket size={18} strokeWidth={2.5} />
          </div>
          <h2 className="text-lg font-black tracking-tighter text-slate-900 dark:text-slate-100 italic">TRAJECTA</h2>
        </div>
        <button onClick={prevStep} className="size-10 flex items-center justify-center rounded-full hover:bg-primary/10 transition-colors">
          <ArrowLeft size={20} />
        </button>
      </div>

      <div className="flex flex-col gap-4 px-6 pb-4">
        <div className="flex gap-6 justify-between items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Step {step} of 5</p>
            <p className="text-primary text-lg font-black uppercase tracking-tight mt-1">
              {step === 1 ? "Defining your path" : step === 5 ? "Membership & Goal" : "Personalization"}
            </p>
          </div>
        </div>
        <div className="rounded-full bg-primary/10 h-2 w-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${step * 20}%` }}
            className="h-full rounded-full bg-primary shadow-sm"
          />
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
      </div>

      <div className="p-4 bg-background-light dark:bg-background-dark border-t border-primary/10 mt-auto">
        <div className="flex flex-col gap-3">
          <Button 
            onClick={step === 5 ? handleFinish : nextStep} 
            disabled={loading || (step === 1 && !formData.goal)}
            className="w-full h-14 text-lg gap-2"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Generating Roadmap...
              </div>
            ) : (
              <>
                {step === 5 ? "Finish & Generate Roadmap" : "Next Step"}
                {step === 5 ? <Sparkles size={20} /> : <ArrowRight size={20} />}
              </>
            )}
          </Button>
          <button className="w-full text-slate-500 py-2 text-sm font-medium">
            I'll decide this later
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingView;
