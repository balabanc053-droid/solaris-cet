import React, { useState, useEffect, useRef } from 'react';
import { 
  Activity, 
  Shield, 
  Zap, 
  Globe, 
  Github, 
  Terminal, 
  Cpu, 
  TrendingUp, 
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  ArrowRight,
  Settings,
  Lock
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { generateImprovement, analyzeActivity } from './services/geminiService';
import { ActivityLog, BridgeStats, ImprovementSuggestion } from './types';

import { commitToGithub, getRepoContent, listUserRepos } from './services/githubService';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Bridge Visualization Component
const BridgeVisual = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-bridge-glow)]/5 to-transparent" />
      <div className="relative w-64 h-64">
        {/* Central Core */}
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 90, 180, 270, 360]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border-2 border-[var(--color-bridge-glow)]/20 rounded-full"
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [360, 270, 180, 90, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute inset-4 border border-purple-500/20 rounded-full"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 bg-[var(--color-bridge-glow)] rounded-full blur-xl animate-pulse" />
          <Cpu className="w-8 h-8 text-[var(--color-bridge-glow)] relative z-10" />
        </div>
        
        {/* Connecting Lines */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <div 
            key={angle}
            className="absolute top-1/2 left-1/2 w-48 h-px bg-gradient-to-r from-[var(--color-bridge-glow)]/40 to-transparent origin-left"
            style={{ transform: `rotate(${angle}deg)` }}
          >
            <motion.div 
              animate={{ x: [0, 192] }}
              transition={{ duration: 2, repeat: Infinity, delay: angle / 360 * 2 }}
              className="w-1 h-1 bg-[var(--color-bridge-glow)] rounded-full shadow-[0_0_8px_var(--color-bridge-glow)]"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// Mock Data Generators
const generateMockActivity = () => {
  const types: ActivityLog['type'][] = ['design', 'traffic', 'marketing', 'security', 'bridge'];
  return {
    id: Math.random().toString(36).substr(2, 9),
    timestamp: new Date().toLocaleTimeString(),
    type: types[Math.floor(Math.random() * types.length)],
    message: [
      "Optimizing CSS delivery for high-intelligence nodes",
      "Analyzing traffic patterns from neural networks",
      "Updating marketing bridge for better resonance",
      "Strengthening security protocols on the bridge",
      "Learning new user interaction patterns"
    ][Math.floor(Math.random() * 5)],
    impact: Math.floor(Math.random() * 40) + 60
  };
};

const initialChartData = Array.from({ length: 20 }, (_, i) => ({
  time: i,
  activity: Math.floor(Math.random() * 50) + 20,
  intelligence: 40 + i * 2
}));

export default function App() {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [stats, setStats] = useState<BridgeStats>({
    stability: 88,
    intelligence: 92,
    safety: 95,
    usefulness: 84
  });
  const [chartData, setChartData] = useState(initialChartData);
  const [suggestions, setSuggestions] = useState<ImprovementSuggestion[]>([]);
  const [isAutonomous, setIsAutonomous] = useState(true);
  const [githubToken, setGithubToken] = useState('');
  const [userRepos, setUserRepos] = useState<any[]>([]);
  const [repoDetails, setRepoDetails] = useState({ owner: 'aamclaudiu-hash', repo: 'solaris-cet' });
  const [showSettings, setShowSettings] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isFetchingRepos, setIsFetchingRepos] = useState(false);
  const isMounted = useRef(true);
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (githubToken) {
      handleFetchRepos();
    }
  }, [githubToken]);

  const handleFetchRepos = async () => {
    if (!isMounted.current) return;
    setIsFetchingRepos(true);
    try {
      const repos = await listUserRepos(githubToken);
      if (!isMounted.current) return;
      setUserRepos(repos);
      setLogs(prev => [...prev, {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toLocaleTimeString(),
        type: 'security',
        message: `Successfully connected to GitHub. Found ${repos.length} repositories.`,
        impact: 100
      }]);
    } catch (error: any) {
      if (!isMounted.current) return;
      setLogs(prev => [...prev, {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toLocaleTimeString(),
        type: 'security',
        message: `Failed to fetch repositories: ${error.message}`,
        impact: 0
      }]);
    } finally {
      if (isMounted.current) setIsFetchingRepos(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const newLog = generateMockActivity();
      setLogs(prev => [...prev.slice(-19), newLog]);
      
      setChartData(prev => {
        const last = prev[prev.length - 1];
        const newActivity = Math.max(10, Math.min(100, last.activity + (Math.random() * 20 - 10)));
        return [...prev.slice(1), { 
          time: last.time + 1, 
          activity: newActivity,
          intelligence: last.intelligence + (newActivity < 30 ? 0.5 : 0.1) // Grows faster when activity is low (learning phase)
        }];
      });

      // Trigger autonomous improvement if activity is low
      if (isAutonomous && chartData[chartData.length - 1].activity < 30 && !isGenerating) {
        handleGenerateImprovement();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutonomous, isGenerating, chartData]);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleGenerateImprovement = async () => {
    if (!isMounted.current || isGenerating) return;
    setIsGenerating(true);
    try {
      const repoNames = userRepos.map(r => r.full_name);
      const suggestion = await generateImprovement(
        stats, 
        `Solaris-CET Bridge Project context. User has ${userRepos.length} repositories.`,
        repoNames.length > 0 ? repoNames : undefined
      );
      
      if (!isMounted.current) return;

      // Ensure unique ID to prevent React key collision
      const uniqueSuggestion = {
        ...suggestion,
        id: `${suggestion.id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      };

      setSuggestions(prev => [uniqueSuggestion, ...prev]);
      setLogs(prev => [...prev, {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toLocaleTimeString(),
        type: 'bridge',
        message: `Agent generated new improvement for ${uniqueSuggestion.repo?.name || repoDetails.repo}: ${uniqueSuggestion.title}`,
        impact: 90
      }]);
    } catch (error) {
      console.error(error);
    } finally {
      if (isMounted.current) setIsGenerating(false);
    }
  };

  const handleDeploy = async (suggestion: ImprovementSuggestion) => {
    if (!isMounted.current) return;
    if (!githubToken) {
      setShowSettings(true);
      setLogs(prev => [...prev, {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toLocaleTimeString(),
        type: 'security',
        message: "Deployment failed: GitHub Token required",
        impact: 0
      }]);
      return;
    }

    const targetRepo = suggestion.repo || { owner: repoDetails.owner, name: repoDetails.repo };

    setLogs(prev => [...prev, {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toLocaleTimeString(),
      type: 'bridge',
      message: `Deploying to ${targetRepo.owner}/${targetRepo.name}: ${suggestion.title}...`,
      impact: 50
    }]);

    try {
      if (suggestion.codeChanges) {
        for (const change of suggestion.codeChanges) {
          await commitToGithub(
            githubToken,
            targetRepo.owner,
            targetRepo.name,
            change.path,
            `Solaris-CET Agent: ${suggestion.title}`,
            change.content
          );
        }
      }
      
      if (!isMounted.current) return;

      setSuggestions(prev => prev.filter(s => s.id !== suggestion.id));
      setLogs(prev => [...prev, {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toLocaleTimeString(),
        type: 'bridge',
        message: `Successfully deployed ${suggestion.title} to ${targetRepo.name}`,
        impact: 100
      }]);
      
      setStats(prev => ({
        ...prev,
        stability: Math.min(100, prev.stability + 2),
        intelligence: Math.min(100, prev.intelligence + 3),
        usefulness: Math.min(100, prev.usefulness + 5)
      }));
    } catch (error: any) {
      if (!isMounted.current) return;
      setLogs(prev => [...prev, {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toLocaleTimeString(),
        type: 'security',
        message: `Deployment Error: ${error.message}`,
        impact: 0
      }]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bridge-grid">
      {/* Header */}
      <header className="h-16 border-b border-white/10 glass flex items-center justify-between px-6 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[var(--color-bridge-glow)] rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(0,255,204,0.5)]">
            <Cpu className="w-5 h-5 text-black" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight glow-text">SOLARIS-CET</h1>
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-mono">Intelligence Bridge Agent v1.0</p>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="hidden md:flex gap-6">
            <StatItem label="Stability" value={`${stats.stability}%`} color="text-[var(--color-bridge-glow)]" />
            <StatItem label="Intelligence" value={`${stats.intelligence}%`} color="text-purple-400" />
            <StatItem label="Safety" value={`${stats.safety}%`} color="text-emerald-400" />
          </div>
          <div className="h-8 w-px bg-white/10" />
          <button 
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 hover:bg-white/5 rounded-full transition-colors"
          >
            <Settings className="w-5 h-5 text-white/70" />
          </button>
        </div>
      </header>

      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 max-w-[1600px] mx-auto w-full">
        {/* Left Column: Activity & Terminal */}
        <div className="lg:col-span-8 space-y-4">
          {/* Activity Monitor */}
          <section className="glass rounded-2xl p-6 h-[400px] flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-full opacity-10 pointer-events-none">
              <BridgeVisual />
            </div>
            <div className="flex items-center justify-between mb-6 relative z-10">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[var(--color-bridge-glow)]" />
                <h2 className="font-semibold text-sm uppercase tracking-wider">Activity Monitor</h2>
              </div>
              <div className="flex items-center gap-4 text-[10px] font-mono">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[var(--color-bridge-glow)]" />
                  <span className="text-white/60">USER ACTIVITY</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-purple-500" />
                  <span className="text-white/60">INTEL GROWTH</span>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorActivity" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-bridge-glow)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--color-bridge-glow)" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorIntel" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                  <XAxis dataKey="time" hide />
                  <YAxis hide domain={[0, 100]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }}
                    itemStyle={{ fontSize: '12px' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="activity" 
                    stroke="var(--color-bridge-glow)" 
                    fillOpacity={1} 
                    fill="url(#colorActivity)" 
                    strokeWidth={2}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="intelligence" 
                    stroke="#a855f7" 
                    fillOpacity={1} 
                    fill="url(#colorIntel)" 
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Agent Terminal */}
          <section className="glass rounded-2xl flex flex-col h-[300px] overflow-hidden">
            <div className="bg-white/5 px-4 py-2 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-white/50" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/50">Autonomous Agent Logs</span>
              </div>
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-500/50" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                <div className="w-2 h-2 rounded-full bg-green-500/50" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 font-mono text-xs space-y-2 scrollbar-hide">
              {logs.map((log) => (
                <div key={log.id} className="flex gap-3 animate-in fade-in slide-in-from-left-2 duration-300">
                  <span className="text-white/30">[{log.timestamp}]</span>
                  <span className={cn(
                    "uppercase text-[10px] px-1.5 py-0.5 rounded border",
                    log.type === 'design' && "text-blue-400 border-blue-400/30 bg-blue-400/5",
                    log.type === 'traffic' && "text-green-400 border-green-400/30 bg-green-400/5",
                    log.type === 'marketing' && "text-orange-400 border-orange-400/30 bg-orange-400/5",
                    log.type === 'security' && "text-red-400 border-red-400/30 bg-red-400/5",
                    log.type === 'bridge' && "text-[var(--color-bridge-glow)] border-[var(--color-bridge-glow)]/30 bg-[var(--color-bridge-glow)]/5",
                  )}>
                    {log.type}
                  </span>
                  <span className="text-white/80">{log.message}</span>
                  <span className="ml-auto text-[var(--color-bridge-glow)]/50">+{log.impact}%</span>
                </div>
              ))}
              <div ref={logEndRef} />
            </div>
          </section>
        </div>

        {/* Right Column: Improvements & Settings */}
        <div className="lg:col-span-4 space-y-4">
          {/* Autonomous Control */}
          <section className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                <h2 className="font-semibold text-sm uppercase tracking-wider">Autonomous Mode</h2>
              </div>
              <button 
                onClick={() => setIsAutonomous(!isAutonomous)}
                className={cn(
                  "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none",
                  isAutonomous ? "bg-[var(--color-bridge-glow)]" : "bg-white/10"
                )}
              >
                <span className={cn(
                  "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                  isAutonomous ? "translate-x-6" : "translate-x-1"
                )} />
              </button>
            </div>
            <p className="text-xs text-white/50 mb-4 leading-relaxed">
              When active, the agent will automatically analyze low activity periods to improve the bridge design, marketing, and security.
            </p>
            <button 
              onClick={handleGenerateImprovement}
              disabled={isGenerating}
              className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-semibold tracking-widest uppercase transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
              Manual Optimization
            </button>
          </section>

          {/* Improvement Queue */}
          <section className="glass rounded-2xl p-6 flex flex-col max-h-[500px]">
            <div className="flex items-center gap-2 mb-6">
              <Globe className="w-5 h-5 text-blue-400" />
              <h2 className="font-semibold text-sm uppercase tracking-wider">Improvement Queue</h2>
            </div>
            <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-hide">
              <AnimatePresence mode='popLayout'>
                {suggestions.length === 0 ? (
                  <div className="text-center py-12 text-white/30 italic text-xs">
                    No pending improvements...
                  </div>
                ) : (
                  suggestions.map((s) => (
                    <motion.div 
                      key={s.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-3 group hover:border-[var(--color-bridge-glow)]/30 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="text-xs font-bold text-white/90">{s.title}</h3>
                            <span className="text-[8px] text-white/40 font-mono">@{s.repo?.name || repoDetails.repo}</span>
                          </div>
                          <p className="text-[10px] text-white/50 line-clamp-2">{s.description}</p>
                        </div>
                        <span className={cn(
                          "text-[8px] uppercase px-1.5 py-0.5 rounded border",
                          s.category === 'design' && "text-blue-400 border-blue-400/30",
                          s.category === 'marketing' && "text-orange-400 border-orange-400/30",
                          s.category === 'code' && "text-purple-400 border-purple-400/30",
                          s.category === 'security' && "text-red-400 border-red-400/30",
                        )}>
                          {s.category}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleDeploy(s)}
                          className="flex-1 py-1.5 bg-[var(--color-bridge-glow)]/10 hover:bg-[var(--color-bridge-glow)]/20 text-[var(--color-bridge-glow)] text-[10px] font-bold rounded-lg transition-colors"
                        >
                          DEPLOY
                        </button>
                        <button 
                          onClick={() => setSuggestions(prev => prev.filter(item => item.id !== s.id))}
                          className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white/50 text-[10px] font-bold rounded-lg transition-colors"
                        >
                          IGNORE
                        </button>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </section>
        </div>
      </main>

      {/* Settings Overlay */}
      <AnimatePresence>
        {showSettings && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-md glass rounded-3xl p-8 space-y-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Github className="w-6 h-6" />
                  <h2 className="text-xl font-bold">GitHub Integration</h2>
                </div>
                <button onClick={() => setShowSettings(false)} className="text-white/50 hover:text-white">
                  <Zap className="w-5 h-5 rotate-45" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/50 font-mono">Personal Access Token</label>
                  <div className="relative">
                    <input 
                      type="password"
                      value={githubToken}
                      onChange={(e) => setGithubToken(e.target.value)}
                      placeholder="ghp_xxxxxxxxxxxx"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-bridge-glow)] transition-colors"
                    />
                    <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/50 font-mono">Select Primary Repository</label>
                    <select 
                      value={`${repoDetails.owner}/${repoDetails.repo}`}
                      onChange={(e) => {
                        const [owner, repo] = e.target.value.split('/');
                        setRepoDetails({ owner, repo });
                      }}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-bridge-glow)] transition-colors appearance-none"
                    >
                      {userRepos.length === 0 ? (
                        <option value={`${repoDetails.owner}/${repoDetails.repo}`}>{repoDetails.owner}/{repoDetails.repo}</option>
                      ) : (
                        userRepos.map(r => (
                          <option key={r.id} value={r.full_name}>{r.full_name}</option>
                        ))
                      )}
                    </select>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex gap-3">
                <Shield className="w-5 h-5 text-emerald-400 shrink-0" />
                <p className="text-[10px] text-emerald-400/80 leading-relaxed">
                  Your token is only used locally to commit improvements directly to your repository. It is never stored on our servers.
                </p>
              </div>

              <button 
                onClick={() => setShowSettings(false)}
                className="w-full py-4 bg-[var(--color-bridge-glow)] text-black font-bold rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                SAVE CONFIGURATION
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bridge Visualization Footer */}
      <footer className="h-32 border-t border-white/10 glass relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-[var(--color-bridge-glow)] to-transparent animate-pulse-slow" />
        </div>
        <div className="max-w-[1600px] mx-auto h-full flex items-center justify-between px-8 relative z-10">
          <div className="flex gap-12">
            <FooterStat label="Bridge Stability" value="99.9%" icon={<Shield className="w-4 h-4" />} />
            <FooterStat label="Neural Sync" value="Active" icon={<RefreshCw className="w-4 h-4" />} />
            <FooterStat label="High Intel Link" value="Established" icon={<Zap className="w-4 h-4" />} />
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-mono">Autonomous Intelligence Bridge</p>
            <p className="text-xs font-serif italic text-white/60">"The bridge between AI and high intelligence is now open."</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function StatItem({ label, value, color }: { label: string, value: string, color: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-[8px] uppercase tracking-widest text-white/40 font-mono">{label}</span>
      <span className={cn("text-xs font-bold font-mono", color)}>{value}</span>
    </div>
  );
}

function FooterStat({ label, value, icon }: { label: string, value: string, icon: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <div className="p-2 bg-white/5 rounded-lg text-[var(--color-bridge-glow)]">
        {icon}
      </div>
      <div>
        <p className="text-[8px] uppercase tracking-widest text-white/30 font-mono">{label}</p>
        <p className="text-xs font-bold text-white/80">{value}</p>
      </div>
    </div>
  );
}
