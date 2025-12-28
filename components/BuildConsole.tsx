
import React, { useRef, useEffect } from 'react';
import { BuildLog, BuildStatus, AppConfig, AnalysisResult } from '../types';

interface Props {
  logs: BuildLog[];
  status: BuildStatus;
  config: AppConfig;
  analysis: AnalysisResult | null;
}

const BuildConsole: React.FC<Props> = ({ logs, status, config, analysis }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const getStatusDisplay = () => {
    switch(status) {
      case BuildStatus.ANALYZING: return { label: 'Analyzing Site', color: 'text-blue-600', bg: 'bg-blue-50' };
      case BuildStatus.GENERATING_ASSETS: return { label: 'Generating Assets', color: 'text-indigo-600', bg: 'bg-indigo-50' };
      case BuildStatus.GENERATING_CODE: return { label: 'Synthesizing Code', color: 'text-purple-600', bg: 'bg-purple-50' };
      case BuildStatus.COMPILING: return { label: 'Compiling Binaries', color: 'text-orange-600', bg: 'bg-orange-50' };
      case BuildStatus.SIGNING: return { label: 'Finalizing APK', color: 'text-emerald-600', bg: 'bg-emerald-50' };
      default: return { label: 'Build Process', color: 'text-slate-600', bg: 'bg-slate-50' };
    }
  };

  const current = getStatusDisplay();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Active Build</h2>
          <div className="flex items-center mt-1 space-x-2">
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${current.bg} ${current.color}`}>
              {current.label}
            </span>
            <span className="text-xs text-slate-400">• Session ID: {Math.random().toString(36).substring(7).toUpperCase()}</span>
          </div>
        </div>
        
        {analysis && (
          <div className="hidden sm:flex space-x-2">
            <div className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-lg text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Framework</p>
              <p className="text-xs font-bold text-slate-700">{analysis.detectedFramework}</p>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-slate-950 rounded-2xl overflow-hidden shadow-2xl border-t border-white/10">
          <div className="bg-slate-900 px-4 py-2 flex items-center justify-between border-b border-slate-800/50">
            <div className="flex space-x-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
            </div>
            <span className="text-[9px] text-slate-500 font-mono font-bold uppercase tracking-[0.2em]">Android-System-Log</span>
          </div>
          <div 
            ref={scrollRef}
            className="h-80 p-6 font-mono text-xs overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-slate-800"
          >
            {logs.map((log, i) => (
              <div key={i} className={`flex items-start space-x-3 transition-opacity duration-300 ${
                log.type === 'error' ? 'text-rose-400' : 
                log.type === 'success' ? 'text-emerald-400' : 
                log.type === 'warning' ? 'text-amber-400' : 
                'text-slate-400'
              }`}>
                <span className="text-slate-700 tabular-nums">{(i + 1).toString().padStart(3, '0')}</span>
                <span className="flex-1 whitespace-pre-wrap">{log.message}</span>
              </div>
            ))}
            {status !== BuildStatus.COMPLETED && status !== BuildStatus.FAILED && (
              <div className="flex items-center space-x-3 text-blue-400/80 animate-pulse">
                <span className="text-slate-700">...</span>
                <span className="typing-indicator">Executing background tasks...</span>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 group hover:border-blue-200 transition-colors">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Optimization Report</h3>
            </div>
            <div className="space-y-2">
              {analysis?.optimizationTips.slice(0, 3).map((tip, idx) => (
                <div key={idx} className="flex items-start space-x-3">
                  <span className="text-slate-300 font-bold text-[10px] mt-0.5">0{idx+1}</span>
                  <p className="text-[11px] text-slate-600 leading-relaxed font-medium">{tip}</p>
                </div>
              ))}
              {!analysis && <div className="h-20 flex items-center justify-center text-[10px] text-slate-300 font-medium">Waiting for analysis...</div>}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
             <div className="flex items-center space-x-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Environment</h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { l: 'Min SDK', v: '26 (Android 8)' },
                { l: 'Target SDK', v: '34 (Android 14)' },
                { l: 'Java', v: 'JDK 17' },
                { l: 'Gradle', v: '8.2.1' }
              ].map(item => (
                <div key={item.l} className="bg-white p-2 rounded-lg border border-slate-100">
                  <p className="text-[9px] font-bold text-slate-400 uppercase">{item.l}</p>
                  <p className="text-[10px] font-extrabold text-slate-700">{item.v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildConsole;
