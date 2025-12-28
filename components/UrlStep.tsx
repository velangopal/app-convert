
import React from 'react';
import { AppConfig } from '../types';

interface Props {
  config: AppConfig;
  setConfig: React.Dispatch<React.SetStateAction<AppConfig>>;
  onNext: () => void;
}

const UrlStep: React.FC<Props> = ({ config, setConfig, onNext }) => {
  const isValid = config.url && config.appName && /^[a-z][a-z0-9_]*(\.[a-z0-9_]+)+$/.test(config.packageName);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-900">Configure Your App</h2>
        <p className="text-slate-500 mt-2">Enter your website details to start the conversion process.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Website URL</label>
          <input 
            type="url" 
            placeholder="https://example.com"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            value={config.url}
            onChange={e => setConfig(prev => ({ ...prev, url: e.target.value }))}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">App Name</label>
          <input 
            type="text" 
            placeholder="e.g. My Cool Shop"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            value={config.appName}
            onChange={e => setConfig(prev => ({ ...prev, appName: e.target.value }))}
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-semibold text-slate-700">Package Name (Unique ID)</label>
          <input 
            type="text" 
            placeholder="com.company.appname"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-mono"
            value={config.packageName}
            onChange={e => setConfig(prev => ({ ...prev, packageName: e.target.value.toLowerCase().replace(/\s/g, '') }))}
          />
          <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider">Must follow Android standards (e.g. com.example.app)</p>
        </div>
      </div>

      <div className="pt-6 flex justify-end">
        <button 
          disabled={!isValid}
          onClick={onNext}
          className={`px-8 py-3 rounded-xl font-bold transition-all shadow-lg ${
            isValid 
            ? 'bg-blue-600 text-white hover:bg-blue-700 hover:-translate-y-0.5' 
            : 'bg-slate-100 text-slate-400 cursor-not-allowed'
          }`}
        >
          Continue to Branding
        </button>
      </div>
    </div>
  );
};

export default UrlStep;
