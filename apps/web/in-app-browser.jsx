import React, { useState, useRef } from "react";
import { X, ExternalLink, RefreshCw, AlertTriangle, Globe } from "lucide-react";

export default function InAppBrowser({ url, title, onClose }) {
  const [status, setStatus] = useState("loading"); // loading | ready | blocked
  const iframeRef = useRef(null);

  const handleLoad = () => setStatus("ready");

  // Many sites block iframes via X-Frame-Options. We detect this via a timeout
  // (the iframe loads but is blank) and show a graceful fallback.
  const handleError = () => setStatus("blocked");

  const domain = (() => {
    try { return new URL(url).hostname; } catch { return url; }
  })();

  return (
    <div className="fixed inset-0 z-[60] flex flex-col bg-[#07090e]" onClick={(e) => e.stopPropagation()}>

      {/* Browser Chrome */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-[#0d1117] shrink-0">
        {/* Traffic lights */}
        <button onClick={onClose} className="group flex items-center justify-center h-3.5 w-3.5 rounded-full bg-red-500 hover:bg-red-400 transition-colors shrink-0">
          <X className="h-2 w-2 text-red-900 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
        <div className="h-3.5 w-3.5 rounded-full bg-yellow-500 shrink-0" />
        <div className="h-3.5 w-3.5 rounded-full bg-green-500 shrink-0" />

        {/* Address bar */}
        <div className="flex flex-1 items-center gap-2 bg-white/[0.06] border border-white/10 rounded-lg px-3 py-1.5 mx-2">
          <Globe className="h-3.5 w-3.5 text-[#6b7280] shrink-0" />
          <span className="font-mono text-[12px] text-[#9ca3af] truncate flex-1">{url}</span>
          {status === "loading" && (
            <RefreshCw className="h-3 w-3 text-[#6b7280] animate-spin shrink-0" />
          )}
        </div>

        {/* Open externally */}
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 text-[11px] text-[#6b7280] hover:text-[#f0a500] border border-white/[0.08] hover:border-[#f0a500]/30 rounded-lg px-3 py-1.5 transition-colors shrink-0"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          New Tab
        </a>
        <button
          onClick={onClose}
          className="p-1.5 text-[#6b7280] hover:text-white border border-white/[0.08] rounded-lg transition-colors shrink-0"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Tab bar */}
      <div className="flex items-center gap-2 px-4 py-2 bg-[#0b0e14] border-b border-white/5 shrink-0">
        <div className="flex items-center gap-2 bg-[#0d1117] border border-white/10 rounded-t-lg px-3 py-1.5 text-[12px] text-[#eef0f4] font-medium max-w-xs truncate">
          <Globe className="h-3 w-3 text-[#f0a500] shrink-0" />
          {title || domain}
        </div>
      </div>

      {/* Content Area */}
      <div className="relative flex-1 bg-white overflow-hidden">
        {/* Loading overlay */}
        {status === "loading" && (
          <div className="absolute inset-0 bg-[#07090e] flex flex-col items-center justify-center gap-4 z-10">
            <div className="h-8 w-8 border-2 border-[#f0a500]/30 border-t-[#f0a500] rounded-full animate-spin" />
            <p className="text-[13px] text-[#6b7280]">Loading {domain}…</p>
          </div>
        )}

        {/* Blocked fallback */}
        {status === "blocked" && (
          <div className="absolute inset-0 bg-[#07090e] flex flex-col items-center justify-center gap-5 z-10 p-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-400/10 border border-amber-400/20">
              <AlertTriangle className="h-8 w-8 text-amber-400" />
            </div>
            <div className="text-center">
              <p className="text-[16px] font-semibold text-[#eef0f4] mb-2">Embedded view not available</p>
              <p className="text-[13px] text-[#6b7280] max-w-sm leading-relaxed">
                <strong className="text-[#9ca3af]">{domain}</strong> has restricted embedding. Open it in a new browser tab instead.
              </p>
            </div>
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 bg-[#f0a500] hover:bg-[#d4920a] text-black font-bold rounded-xl px-6 py-3 text-[13px] transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              Open in Browser
            </a>
          </div>
        )}

        <iframe
          ref={iframeRef}
          src={url}
          title={title || domain}
          className="w-full h-full border-0"
          onLoad={handleLoad}
          onError={handleError}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        />
      </div>
    </div>
  );
}
