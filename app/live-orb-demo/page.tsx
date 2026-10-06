"use client";

import { useState } from "react";
import LiveOrb from "@/components/ui/live-orb";
import { WEBGL_COLORS } from "@/components/ui/live-orb";

export default function LiveOrbDemo() {
  const [variant, setVariant] = useState<"white" | "black" | "webgl" | "custom">("white");
  const [interactive, setInteractive] = useState(true);
  const [blink, setBlink] = useState(true);
  const [customColor, setCustomColor] = useState("#7C5CFF");
  const [customEyeColor, setCustomEyeColor] = useState("#FAFAFA");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-2">LiveOrb Component</h1>
        <p className="text-slate-400 mb-12">Interactive 3D sphere with WebGL rendering and eye tracking</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Preview */}
          <div className="lg:col-span-1 flex items-center justify-center bg-slate-800 rounded-lg p-8 h-80">
            <LiveOrb
              variant={variant as any}
              color={variant === "custom" ? customColor : undefined}
              eyeColor={variant === "custom" ? customEyeColor : undefined}
              colors={variant === "webgl" ? WEBGL_COLORS : undefined}
              interactive={interactive}
              blink={blink}
              size={240}
            />
          </div>

          {/* Controls */}
          <div className="lg:col-span-2 space-y-6">
            {/* Variant Selection */}
            <div>
              <label className="block text-sm font-medium text-white mb-3">Variant</label>
              <div className="grid grid-cols-2 gap-2">
                {["white", "black", "webgl", "custom"].map((v) => (
                  <button
                    key={v}
                    onClick={() => setVariant(v as any)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
                      variant === v
                        ? "bg-blue-600 text-white"
                        : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Colors (only show when variant is custom) */}
            {variant === "custom" && (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Body Color</label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="color"
                      value={customColor}
                      onChange={(e) => setCustomColor(e.target.value)}
                      className="w-12 h-12 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={customColor}
                      onChange={(e) => setCustomColor(e.target.value)}
                      className="flex-1 bg-slate-700 text-white px-3 py-2 rounded text-sm font-mono"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Eye Color</label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="color"
                      value={customEyeColor}
                      onChange={(e) => setCustomEyeColor(e.target.value)}
                      className="w-12 h-12 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={customEyeColor}
                      onChange={(e) => setCustomEyeColor(e.target.value)}
                      className="flex-1 bg-slate-700 text-white px-3 py-2 rounded text-sm font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Toggles */}
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={interactive}
                  onChange={(e) => setInteractive(e.target.checked)}
                  className="w-4 h-4 rounded"
                />
                <span className="text-white font-medium">Eyes follow pointer</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={blink}
                  onChange={(e) => setBlink(e.target.checked)}
                  className="w-4 h-4 rounded"
                />
                <span className="text-white font-medium">Enable blinking</span>
              </label>
            </div>

            {/* Info */}
            <div className="bg-slate-800 rounded-lg p-4 space-y-2 text-sm text-slate-300">
              <p>
                <span className="font-medium text-white">Variant:</span> {variant}
              </p>
              <p>
                <span className="font-medium text-white">Interactive:</span>{" "}
                {interactive ? "Yes" : "No"}
              </p>
              <p>
                <span className="font-medium text-white">Blink:</span> {blink ? "Yes" : "No"}
              </p>
            </div>
          </div>
        </div>

        {/* Examples */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-8">Examples</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { variant: "white", label: "White" },
              { variant: "black", label: "Black" },
              { variant: "webgl", label: "WebGL" },
              {
                variant: "custom",
                label: "Custom Purple",
                color: "#A78BFA",
                eyeColor: "#1E1B4B",
              },
            ].map((example, i) => (
              <div
                key={i}
                className="bg-slate-800 rounded-lg p-6 flex flex-col items-center justify-center h-64"
              >
                <LiveOrb
                  variant={example.variant as any}
                  color={(example as any).color}
                  eyeColor={(example as any).eyeColor}
                  interactive={false}
                  size={150}
                />
                <p className="text-white font-medium mt-4">{example.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Usage Info */}
        <div className="mt-16 bg-slate-800 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Usage</h2>
          <pre className="bg-slate-900 text-slate-300 p-4 rounded text-sm overflow-x-auto">
{`import LiveOrb from "@/components/ui/live-orb";

export default function App() {
  return (
    <LiveOrb
      variant="white"
      interactive={true}
      blink={true}
      size={280}
    />
  );
}`}
          </pre>
        </div>
      </div>
    </div>
  );
}
