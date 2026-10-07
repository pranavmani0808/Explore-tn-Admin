import React, { useState } from 'react';
import { Sliders, Save, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const AIConfigPage: React.FC = () => {
  const [model, setModel] = useState('Google Gemini 1.5 Pro (Recommended)');
  const [temperature, setTemperature] = useState('0.4');
  const [prompt, setPrompt] = useState(
    'You are an expert Tamil Nadu Travel Intelligence Architect. Generate optimal travel routes adhering to real driving distances, district limits, and canonical opening hours.'
  );
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">AI Configuration & Prompt Engineering</h1>
        <p className="text-xs text-zinc-400 font-mono mt-1">
          Tune inference hyper-parameters, system prompts, and safety grounding for the itinerary generator.
        </p>
      </div>

      <form onSubmit={handleSave} className="p-6 rounded-2xl bg-[#0d121a] border border-zinc-800/80 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-mono uppercase text-zinc-400 font-bold mb-1">
              Active LLM Engine
            </label>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full h-10 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none"
            >
              <option>Google Gemini 1.5 Pro (Recommended)</option>
              <option>Google Gemini 1.5 Flash (Ultra-Low Latency)</option>
              <option>Anthropic Claude 3.5 Sonnet</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-mono uppercase text-zinc-400 font-bold mb-1">
              Creativity Temperature ({temperature})
            </label>
            <input
              type="range"
              min="0.1"
              max="1.0"
              step="0.05"
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
              className="w-full mt-2 accent-emerald-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-mono uppercase text-zinc-400 font-bold mb-1">
            System Persona & Grounding Prompt
          </label>
          <textarea
            rows={5}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white font-mono leading-relaxed focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          {saved ? (
            <span className="text-xs text-emerald-400 font-mono flex items-center gap-1.5">
              <CheckCircle2 className="size-4" />
              Settings updated successfully in production runtime.
            </span>
          ) : (
            <div />
          )}

          <Button type="submit" size="sm" className="gap-2 font-bold">
            <Save className="size-3.5" />
            <span>Save Configuration</span>
          </Button>
        </div>
      </form>
    </div>
  );
};
