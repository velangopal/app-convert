
import React, { useRef } from 'react';
import { AppConfig } from '../types';

interface Props {
  config: AppConfig;
  setConfig: React.Dispatch<React.SetStateAction<AppConfig>>;
  onBack: () => void;
  onBuild: () => void;
}

const BrandingStep: React.FC<Props> = ({ config, setConfig, onBack, onBuild }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleFeature = (key: keyof AppConfig['features']) => {
    setConfig(prev => ({
      ...prev,
      features: { ...prev.features, [key]: !prev.features[key] }
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setConfig(prev => ({ 
          ...prev, 
          customLogoUrl: reader.result as string,
          generateLogoWithAI: false 
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const colors = [
    '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#0f172a'
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-1 bg-blue-600 rounded-full mb-6"></div>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight">App Configuration</h2>
        <p className="text-slate-500 mt-2 max-w-lg">Finalize your APK's branding and native system capabilities.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column: Visuals */}
        <div className="space-y-8">
          <section>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Branding Palette</h3>
            <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
              <div className="flex flex-wrap gap-4">
                {colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setConfig(prev => ({ ...prev, themeColor: color }))}
                    className={`group relative w-12 h-12 rounded-2xl transition-all duration-300 ${
                      config.themeColor === color ? 'scale-110 shadow-xl' : 'hover:scale-105'
                    }`}
                    style={{ backgroundColor: color }}
                  >
                    {config.themeColor === color && (
                      <div className="absolute inset-0 border-4 border-white/30 rounded-2xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section>
             <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Launcher Icon (Mandatory)</h3>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => setConfig(prev => ({ ...prev, generateLogoWithAI: true }))}
                  className={`p-5 rounded-3xl border-2 text-left transition-all ${
                    config.generateLogoWithAI ? 'border-blue-600 bg-blue-50/50' : 'border-slate-100 bg-white hover:border-slate-200'
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </div>
                    <span className="font-bold text-sm">Gemini AI Icon</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">Auto-generate a 1024px production icon using brand analysis.</p>
                </button>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className={`p-5 rounded-3xl border-2 text-left transition-all ${
                    !config.generateLogoWithAI ? 'border-blue-600 bg-blue-50/50' : 'border-slate-100 bg-white hover:border-slate-200'
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white text-xs">
                      {config.customLogoUrl ? <img src={config.customLogoUrl} className="w-full h-full rounded-lg object-cover" /> : <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>}
                    </div>
                    <span className="font-bold text-sm">{config.customLogoUrl ? 'Logo Uploaded' : 'Upload Image'}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">Use your own logo file. Supports high-res PNG/JPG.</p>
                  <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />
                </button>
             </div>
          </section>
        </div>

        {/* Right Column: Native Logic */}
        <div className="space-y-8">
           <section>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Runtime Features</h3>
            <div className="space-y-4">
              {[
                { id: 'pullToRefresh', label: 'Pull to Refresh', desc: 'Native swipe-down refresh logic for better UX.' },
                { id: 'offlineFallback', label: 'Edge-Caching', desc: 'Automatic offline screen when connectivity is lost.' },
                { id: 'fileUploads', label: 'Media Support', desc: 'Full support for Camera, Gallery, and File pickers.' }
              ].map(f => (
                <div 
                  key={f.id}
                  onClick={() => toggleFeature(f.id as any)}
                  className={`p-5 rounded-3xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                    config.features[f.id as keyof AppConfig['features']] 
                    ? 'border-blue-200 bg-blue-50/30' 
                    : 'border-slate-100 bg-slate-50/50 hover:border-slate-200'
                  }`}
                >
                  <div className="flex-grow">
                    <p className="text-sm font-black text-slate-800 tracking-tight">{f.label}</p>
                    <p className="text-[11px] text-slate-500">{f.desc}</p>
                  </div>
                  <div className={`w-12 h-6 rounded-full transition-colors relative ${config.features[f.id as keyof AppConfig['features']] ? 'bg-blue-600' : 'bg-slate-200'}`}>
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${config.features[f.id as keyof AppConfig['features']] ? 'left-7' : 'left-1'}`}></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-2xl">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Ready for Deployment</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-6">
              Our engine will now build a signed APK targeting API Level 34 (Android 14) with your specified branding.
            </p>
            <button 
              onClick={onBuild}
              className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-700 hover:-translate-y-1 transition-all active:scale-95 shadow-lg shadow-blue-500/20"
            >
              Start Build v1.0.0
            </button>
          </div>
        </div>
      </div>

      <div className="pt-6 flex justify-start">
        <button onClick={onBack} className="text-slate-400 font-bold text-xs uppercase tracking-widest hover:text-slate-600 transition-colors">
          ← Back to Setup
        </button>
      </div>
    </div>
  );
};

export default BrandingStep;
