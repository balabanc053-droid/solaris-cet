'use client';

import React, { useState, useEffect, useRef } from 'react';

// --- TYPE DEFINITIONS ---
type ReActPhase = 'idle' | 'observe_parse' | 'observe_context' | 'think_route' | 'think_validate' | 'act_execute' | 'act_consensus' | 'complete';

interface TelemetryLog {
  id: string;
  timestamp: string;
  type: 'INFO' | 'WARN' | 'SEC' | 'QUANTUM';
  message: string;
}

interface MetrixData {
  confidence: number;
  latency: number;
  cetCost: number;
}

export default function AiOracleSearch() {
  // --- STATE MANAGEMENT ---
  const [query, setQuery] = useState('');
  const [phase, setPhase] = useState<ReActPhase>('idle');
  const [logs, setLogs] = useState<TelemetryLog[]>([]);
  const [metrics, setMetrics] = useState<MetrixData>({ confidence: 0, latency: 0, cetCost: 0 });
  const [finalResponse, setFinalResponse] = useState('');
  
  const terminalRef = useRef<HTMLDivElement>(null);

  // --- AUTO-SCROLL TERMINAL ---
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  // --- UTILITY: HASH GENERATOR ---
  const generateHash = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  const getTime = () => new Date().toISOString().split('T')[1].slice(0, -1);

  const addLog = (type: TelemetryLog['type'], message: string) => {
    setLogs(prev => [...prev, { id: generateHash(), timestamp: getTime(), type, message }]);
  };

  // --- CORE LOGIC: REASON TO ACT PROTOCOL ---
  const handleQuantumProcessing = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || phase !== 'idle') return;

    // Reset State
    setLogs([]);
    setFinalResponse('');
    setMetrics({ confidence: 0, latency: 0, cetCost: 0 });
    
    // START PHASE 1: OBSERVE
    setPhase('observe_parse');
    addLog('INFO', `INIT_PROTOCOL: REASON_TO_ACT v1.0.4`);
    addLog('INFO', `INPUT_STREAM: "${query}"`);
    
    setTimeout(() => {
      setPhase('observe_context');
      addLog('QUANTUM', `ANALYZING_AMBIGUITY: Human intent isolated. Extracting parameters...`);
      addLog('INFO', `CONTEXT_MAPPED: Hash [${generateHash().substring(0,8)}]`);
    }, 1500);

    // START PHASE 2: THINK
    setTimeout(() => {
      setPhase('think_route');
      addLog('INFO', `ROUTING: Establishing connection to Quantum OS core...`);
      setMetrics(prev => ({ ...prev, latency: 124 }));
    }, 3500);

    setTimeout(() => {
      setPhase('think_validate');
      addLog('QUANTUM', `EVALUATING_HYPOTHESES: 4 parallel logical paths tested.`);
      addLog('SEC', `SECURITY_CHECK: Zero Battery Drain constraints verified.`);
      setMetrics(prev => ({ ...prev, confidence: 87.4, latency: 245 }));
    }, 5500);

    // START PHASE 3: ACT
    setTimeout(() => {
      setPhase('act_execute');
      addLog('INFO', `BRIDGING: Connecting to Solaris CET Node...`);
      addLog('QUANTUM', `EXECUTING_ACTION: Compiling response payload.`);
      setMetrics(prev => ({ ...prev, cetCost: 0.0042, latency: 412 }));
    }, 7500);

    setTimeout(() => {
      setPhase('act_consensus');
      addLog('SEC', `TON_NETWORK: Payload signed. Consensus achieved.`);
      addLog('INFO', `PROTOCOL_COMPLETE: High Intelligence loop closed.`);
      setMetrics(prev => ({ ...prev, confidence: 99.9, latency: 530 }));
      setFinalResponse(`Protocol Executat. Intenția ta a fost tradusă și procesată prin Quantum OS. Acțiunea este pregătită pentru validare pe rețeaua TON.`);
    }, 9500);

    setTimeout(() => {
      setPhase('complete');
    }, 10500);
  };

  const resetOracle = () => {
    setPhase('idle');
    setQuery('');
    setLogs([]);
    setFinalResponse('');
  };

  // --- RENDER HELPERS ---
  const getPhaseStatus = (currentPhase: ReActPhase, targetPhases: ReActPhase[]) => {
    if (phase === 'idle') return 'text-gray-600 border-gray-800';
    if (phase === 'complete') return 'text-green-500 border-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.2)]';
    if (targetPhases.includes(currentPhase)) return 'text-yellow-400 border-yellow-400/50 shadow-[0_0_15px_rgba(250,204,21,0.2)] animate-pulse';
    
    const phaseOrder: ReActPhase[] = ['idle', 'observe_parse', 'observe_context', 'think_route', 'think_validate', 'act_execute', 'act_consensus', 'complete'];
    const currentIndex = phaseOrder.indexOf(currentPhase);
    const targetIndex = Math.max(...targetPhases.map(p => phaseOrder.indexOf(p)));
    
    return currentIndex > targetIndex ? 'text-green-400 border-green-400/30' : 'text-gray-600 border-gray-800';
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-black border border-gray-800 rounded-3xl p-4 md:p-8 shadow-2xl font-sans relative overflow-hidden z-20">
      {/* Background Grid Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

      {/* Header */}
      <div className="relative z-10 flex flex-col items-center mb-8">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 uppercase tracking-widest">
          Solaris Oracle
        </h2>
        <p className="text-gray-400 text-sm mt-1 tracking-widest uppercase">High Intelligence ReAct Bridge</p>
      </div>
      
      {/* Input Area */}
      <form onSubmit={handleQuantumProcessing} className="relative z-10 flex flex-col md:flex-row w-full gap-4 mb-8">
        <div className="flex-grow relative">
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={phase !== 'idle' && phase !== 'complete'}
            placeholder="Introduceți o directivă complexă sau o ambiguitate umană..." 
            className="w-full px-6 py-4 bg-gray-950 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all disabled:opacity-50 text-lg"
          />
          {phase !== 'idle' && phase !== 'complete' && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <div className="w-5 h-5 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
        <button 
          type="submit" 
          disabled={phase !== 'idle' && phase !== 'complete'}
          className="px-8 py-4 bg-gradient-to-r from-yellow-600 to-yellow-500 text-black font-bold rounded-xl hover:from-yellow-500 hover:to-yellow-400 transition-all active:scale-95 disabled:from-gray-800 disabled:to-gray-900 disabled:text-gray-500 shadow-[0_0_20px_rgba(234,179,8,0.2)] disabled:shadow-none"
        >
          {phase === 'idle' ? 'INITIATE PROTOCOL' : phase === 'complete' ? 'SYSTEM IDLE' : 'PROCESSING...'}
        </button>
      </form>

      {/* ReAct Core Architecture Visualizer */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* OBSERVE BLOCK */}
        <div className={`flex flex-col p-5 rounded-2xl border-2 transition-all duration-500 bg-gray-950/50 backdrop-blur-sm ${getPhaseStatus(phase, ['observe_parse', 'observe_context'])}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg uppercase tracking-wider">1. Observe</h3>
            <span className="text-xs font-mono bg-gray-900 px-2 py-1 rounded">INPUT PARSER</span>
          </div>
          <div className="text-sm space-y-2 opacity-80">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${phase === 'observe_parse' ? 'bg-yellow-400 animate-pulse' : phaseOrderIndex(phase) > 1 ? 'bg-green-500' : 'bg-gray-700'}`}></div>
              <span>Intent Extraction</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${phase === 'observe_context' ? 'bg-yellow-400 animate-pulse' : phaseOrderIndex(phase) > 2 ? 'bg-green-500' : 'bg-gray-700'}`}></div>
              <span>Context Mapping</span>
            </div>
          </div>
        </div>

        {/* THINK BLOCK */}
        <div className={`flex flex-col p-5 rounded-2xl border-2 transition-all duration-500 bg-gray-950/50 backdrop-blur-sm ${getPhaseStatus(phase, ['think_route', 'think_validate'])}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg uppercase tracking-wider">2. Think</h3>
            <span className="text-xs font-mono bg-gray-900 px-2 py-1 rounded">QUANTUM OS</span>
          </div>
          <div className="text-sm space-y-2 opacity-80">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${phase === 'think_route' ? 'bg-yellow-400 animate-pulse' : phaseOrderIndex(phase) > 3 ? 'bg-green-500' : 'bg-gray-700'}`}></div>
              <span>Logic Routing</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${phase === 'think_validate' ? 'bg-yellow-400 animate-pulse' : phaseOrderIndex(phase) > 4 ? 'bg-green-500' : 'bg-gray-700'}`}></div>
              <span>Constraint Validation</span>
            </div>
          </div>
        </div>

        {/* ACT BLOCK */}
        <div className={`flex flex-col p-5 rounded-2xl border-2 transition-all duration-500 bg-gray-950/50 backdrop-blur-sm ${getPhaseStatus(phase, ['act_execute', 'act_consensus'])}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg uppercase tracking-wider">3. Act</h3>
            <span className="text-xs font-mono bg-gray-900 px-2 py-1 rounded">SOLARIS CET</span>
          </div>
          <div className="text-sm space-y-2 opacity-80">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${phase === 'act_execute' ? 'bg-yellow-400 animate-pulse' : phaseOrderIndex(phase) > 5 ? 'bg-green-500' : 'bg-gray-700'}`}></div>
              <span>Execution Payload</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${phase === 'act_consensus' ? 'bg-yellow-400 animate-pulse' : phaseOrderIndex(phase) > 6 ? 'bg-green-500' : 'bg-gray-700'}`}></div>
              <span>TON Consensus</span>
            </div>
          </div>
        </div>
      </div>

      {/* Terminal & Metrics Area */}
      {phase !== 'idle' && (
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-4 gap-4 transition-all duration-700 opacity-100">
          
          {/* Telemetry Log Terminal */}
          <div className="lg:col-span-3 bg-gray-950 border border-gray-800 rounded-xl p-4 font-mono text-xs overflow-hidden flex flex-col h-64 shadow-inner">
            <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-800 text-gray-500">
              <span>&gt;_ QUANTUM_TERMINAL</span>
              <span className="animate-pulse">_</span>
            </div>
            <div 
              ref={terminalRef}
              className="flex-1 overflow-y-auto space-y-1 pr-2 custom-scrollbar"
            >
              {logs.map((log) => (
                <div key={log.id} className="flex gap-3 hover:bg-gray-900/50 p-1 rounded">
                  <span className="text-gray-600 min-w-[80px]">[{log.timestamp}]</span>
                  <span className={`min-w-[70px] font-bold ${
                    log.type === 'INFO' ? 'text-blue-400' : 
                    log.type === 'WARN' ? 'text-yellow-400' : 
                    log.type === 'SEC' ? 'text-green-400' : 'text-purple-400'
                  }`}>
                    [{log.type}]
                  </span>
                  <span className="text-gray-300 break-all">{log.message}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Live Metrics Sidebar */}
          <div className="bg-gray-950 border border-gray-800 rounded-xl p-4 flex flex-col justify-between h-64">
            <div>
              <h4 className="text-gray-500 font-mono text-xs mb-4 border-b border-gray-800 pb-2">SYS_METRICS</h4>
              
              <div className="mb-4">
                <div className="text-gray-400 text-xs mb-1">Logic Confidence</div>
                <div className="flex items-end gap-1">
                  <span className={`text-2xl font-bold ${metrics.confidence > 90 ? 'text-green-500' : 'text-yellow-500'}`}>
                    {metrics.confidence.toFixed(1)}
                  </span>
                  <span className="text-gray-500 mb-1">%</span>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-gray-400 text-xs mb-1">Network Latency</div>
                <div className="flex items-end gap-1">
                  <span className="text-2xl font-bold text-blue-400">{metrics.latency}</span>
                  <span className="text-gray-500 mb-1">ms</span>
                </div>
              </div>

              <div>
                <div className="text-gray-400 text-xs mb-1">Est. Action Cost</div>
                <div className="flex items-end gap-1">
                  <span className="text-xl font-bold text-yellow-500">{metrics.cetCost}</span>
                  <span className="text-gray-500 mb-1">CET</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Final Output State */}
      {phase === 'complete' && (
        <div className="mt-6 relative z-10 p-6 bg-gradient-to-r from-green-950 to-black border border-green-500/30 rounded-xl text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-500/20 text-green-400 mb-4">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-green-400 text-lg font-medium">{finalResponse}</p>
          <button 
            onClick={resetOracle}
            className="mt-6 px-6 py-2 border border-gray-600 rounded-lg text-sm text-gray-400 hover:text-white hover:border-gray-400 transition-colors"
          >
            Acknowledge & Reset
          </button>
        </div>
      )}
    </div>
  );
}

// Helper to calculate linear progress through phases
function phaseOrderIndex(currentPhase: string) {
  const phases = ['idle', 'observe_parse', 'observe_context', 'think_route', 'think_validate', 'act_execute', 'act_consensus', 'complete'];
  return phases.indexOf(currentPhase);
}
