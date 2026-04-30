import { useState, useMemo } from "react";
import { reports } from "@ng-analytics/shared";



const COLUMNS = [
  { key: "name", label: "Report Name", width: "22%" },
  { key: "acronym", label: "Code", width: "7%" },
  { key: "frequency", label: "Frequency", width: "8%" },
  { key: "releaseDay", label: "Release Schedule", width: "14%" },
  { key: "firstPublished", label: "Since", width: "6%" },
  { key: "dataTypes", label: "Primary Data", width: "24%" },
  { key: "coverage", label: "Coverage", width: "19%" },
];

const FREQ_ORDER = { Daily: 0, Weekly: 1, Monthly: 2, Annual: 3 };

function SortIcon({ direction }) {
  if (!direction) {
    return (
      <svg width="10" height="14" viewBox="0 0 10 14" fill="none" style={{ opacity: 0.3, marginLeft: 5, flexShrink: 0 }}>
        <path d="M5 1L1 5H9L5 1Z" fill="currentColor" />
        <path d="M5 13L9 9H1L5 13Z" fill="currentColor" />
      </svg>
    );
  }
  return (
    <svg width="10" height="14" viewBox="0 0 10 14" fill="none" style={{ marginLeft: 5, flexShrink: 0 }}>
      {direction === "asc" ? (
        <path d="M5 1L1 6H9L5 1Z" fill="#f0a500" />
      ) : (
        <path d="M5 13L9 8H1L5 13Z" fill="#f0a500" />
      )}
    </svg>
  );
}

const FREQ_COLORS = {
  Daily:   { bg: "rgba(240,165,0,0.15)",  text: "#f0a500",  border: "rgba(240,165,0,0.4)" },
  Weekly:  { bg: "rgba(74,222,128,0.12)", text: "#4ade80",  border: "rgba(74,222,128,0.35)" },
  Monthly: { bg: "rgba(96,165,250,0.12)", text: "#60a5fa",  border: "rgba(96,165,250,0.35)" },
  Annual:  { bg: "rgba(192,132,252,0.12)",text: "#c084fc",  border: "rgba(192,132,252,0.35)" },
};

function FreqBadge({ freq }) {
  const c = FREQ_COLORS[freq] || { bg: "#333", text: "#aaa", border: "#555" };
  return (
    <span style={{
      display: "inline-block",
      padding: "2px 8px",
      borderRadius: 4,
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: "0.06em",
      fontFamily: "'IBM Plex Mono', monospace",
      background: c.bg,
      color: c.text,
      border: `1px solid ${c.border}`,
      whiteSpace: "nowrap",
    }}>
      {freq.toUpperCase()}
    </span>
  );
}

export default function EIANaturalGasReports() {
  const [sortKey, setSortKey] = useState("frequency");
  const [sortDir, setSortDir] = useState("asc");
  const [filterFreq, setFilterFreq] = useState("All");
  const [search, setSearch] = useState("");
  const [hoveredRow, setHoveredRow] = useState(null);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const frequencies = ["All", "Daily", "Weekly", "Monthly", "Annual"];

  const filtered = useMemo(() => {
    let data = [...reports];
    if (filterFreq !== "All") data = data.filter((r) => r.frequency === filterFreq);
    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.acronym.toLowerCase().includes(q) ||
          r.dataTypes.toLowerCase().includes(q) ||
          r.coverage.toLowerCase().includes(q)
      );
    }
    data.sort((a, b) => {
      let av = a[sortKey];
      let bv = b[sortKey];
      if (sortKey === "frequency") {
        av = FREQ_ORDER[a.frequency] ?? 99;
        bv = FREQ_ORDER[b.frequency] ?? 99;
        return sortDir === "asc" ? av - bv : bv - av;
      }
      if (sortKey === "firstPublished") {
        return sortDir === "asc" ? Number(av) - Number(bv) : Number(bv) - Number(av);
      }
      return sortDir === "asc"
        ? String(av).localeCompare(String(bv))
        : String(bv).localeCompare(String(av));
    });
    return data;
  }, [sortKey, sortDir, filterFreq, search]);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0d0f14",
      color: "#c8cdd8",
      fontFamily: "'IBM Plex Sans', 'Helvetica Neue', sans-serif",
      padding: "32px 24px 60px",
    }}>
      {/* Header */}
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 28 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 8,
                background: "linear-gradient(135deg, #f0a500, #e05c00)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 0 18px rgba(240,165,0,0.35)",
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M3 3v18h18" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M7 14l4-4 4 4 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", color: "#f0a500", fontFamily: "'IBM Plex Mono', monospace", textTransform: "uppercase" }}>
                EIA · Energy Information Administration
              </span>
            </div>
            <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, color: "#eef0f4", letterSpacing: "-0.5px", lineHeight: 1.2 }}>
              Natural Gas Reports
              <span style={{ color: "#f0a500" }}> — Historical Catalog</span>
            </h1>
            <p style={{ margin: "6px 0 0", fontSize: 13, color: "#6b7280", maxWidth: 540 }}>
              All publicly available EIA natural gas publications, their release schedules, data coverage, and primary data types.
            </p>
          </div>
          <div style={{
            padding: "10px 16px",
            background: "rgba(240,165,0,0.07)",
            border: "1px solid rgba(240,165,0,0.2)",
            borderRadius: 8,
            fontSize: 12,
            color: "#9ca3af",
            fontFamily: "'IBM Plex Mono', monospace",
            textAlign: "right",
          }}>
            <div style={{ color: "#f0a500", fontWeight: 700, fontSize: 22, lineHeight: 1 }}>{filtered.length}</div>
            <div style={{ marginTop: 2 }}>of {reports.length} reports</div>
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 20, alignItems: "center" }}>
          {/* Search */}
          <div style={{ position: "relative", flexGrow: 1, minWidth: 220, maxWidth: 380 }}>
            <svg style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", opacity: 0.4 }} width="14" height="14" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="#c8cdd8" strokeWidth="2"/>
              <path d="M21 21l-4-4" stroke="#c8cdd8" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search reports, data types..."
              style={{
                width: "100%",
                padding: "8px 12px 8px 30px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 7,
                color: "#eef0f4",
                fontSize: 13,
                outline: "none",
                boxSizing: "border-box",
                fontFamily: "inherit",
                transition: "border-color 0.15s",
              }}
              onFocus={(e) => e.target.style.borderColor = "rgba(240,165,0,0.5)"}
              onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
            />
          </div>

          {/* Frequency filter pills */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {frequencies.map((f) => {
              const active = filterFreq === f;
              const c = FREQ_COLORS[f];
              return (
                <button
                  key={f}
                  onClick={() => setFilterFreq(f)}
                  style={{
                    padding: "6px 13px",
                    borderRadius: 6,
                    border: active
                      ? `1px solid ${c ? c.border : "rgba(240,165,0,0.5)"}`
                      : "1px solid rgba(255,255,255,0.08)",
                    background: active
                      ? (c ? c.bg : "rgba(240,165,0,0.12)")
                      : "rgba(255,255,255,0.03)",
                    color: active ? (c ? c.text : "#f0a500") : "#6b7280",
                    fontSize: 12,
                    fontWeight: active ? 700 : 500,
                    cursor: "pointer",
                    fontFamily: "'IBM Plex Mono', monospace",
                    letterSpacing: "0.05em",
                    transition: "all 0.15s",
                  }}
                >
                  {f.toUpperCase()}
                </button>
              );
            })}
          </div>
        </div>

        {/* Table wrapper */}
        <div style={{
          borderRadius: 10,
          border: "1px solid rgba(255,255,255,0.08)",
          overflow: "hidden",
          boxShadow: "0 4px 32px rgba(0,0,0,0.5)",
        }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed", minWidth: 900 }}>
              {/* Colgroup */}
              <colgroup>
                {COLUMNS.map((col) => (
                  <col key={col.key} style={{ width: col.width }} />
                ))}
              </colgroup>

              {/* Header */}
              <thead>
                <tr style={{ background: "#13161e" }}>
                  {COLUMNS.map((col) => (
                    <th
                      key={col.key}
                      onClick={() => handleSort(col.key)}
                      style={{
                        padding: "12px 14px",
                        textAlign: "left",
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: sortKey === col.key ? "#f0a500" : "#4b5563",
                        fontFamily: "'IBM Plex Mono', monospace",
                        cursor: "pointer",
                        borderBottom: "1px solid rgba(255,255,255,0.07)",
                        userSelect: "none",
                        whiteSpace: "nowrap",
                        transition: "color 0.15s",
                      }}
                      onMouseEnter={(e) => { if (sortKey !== col.key) e.currentTarget.style.color = "#9ca3af"; }}
                      onMouseLeave={(e) => { if (sortKey !== col.key) e.currentTarget.style.color = "#4b5563"; }}
                    >
                      <span style={{ display: "flex", alignItems: "center" }}>
                        {col.label}
                        <SortIcon direction={sortKey === col.key ? sortDir : null} />
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Body */}
              <tbody>
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={COLUMNS.length} style={{ padding: 40, textAlign: "center", color: "#4b5563", fontSize: 13 }}>
                      No reports match your filters.
                    </td>
                  </tr>
                )}
                {filtered.map((report, i) => {
                  const isHovered = hoveredRow === i;
                  return (
                    <tr
                      key={report.acronym}
                      onMouseEnter={() => setHoveredRow(i)}
                      onMouseLeave={() => setHoveredRow(null)}
                      style={{
                        background: isHovered
                          ? "rgba(240,165,0,0.04)"
                          : i % 2 === 0
                          ? "rgba(255,255,255,0.015)"
                          : "transparent",
                        borderBottom: "1px solid rgba(255,255,255,0.04)",
                        transition: "background 0.12s",
                        cursor: "default",
                      }}
                    >
                      {/* Report Name */}
                      <td style={{ padding: "11px 14px", verticalAlign: "top" }}>
                        <a
                          href={report.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: isHovered ? "#f0a500" : "#d1d5db",
                            textDecoration: "none",
                            fontSize: 13,
                            fontWeight: 600,
                            lineHeight: 1.35,
                            display: "block",
                            transition: "color 0.15s",
                          }}
                        >
                          {report.name}
                        </a>
                      </td>

                      {/* Acronym */}
                      <td style={{ padding: "11px 14px", verticalAlign: "top" }}>
                        <span style={{
                          fontFamily: "'IBM Plex Mono', monospace",
                          fontSize: 11,
                          fontWeight: 700,
                          color: "#6b7280",
                          letterSpacing: "0.05em",
                        }}>
                          {report.acronym}
                        </span>
                      </td>

                      {/* Frequency */}
                      <td style={{ padding: "11px 14px", verticalAlign: "top" }}>
                        <FreqBadge freq={report.frequency} />
                      </td>

                      {/* Release schedule */}
                      <td style={{ padding: "11px 14px", verticalAlign: "top", fontSize: 12, color: "#9ca3af", lineHeight: 1.5 }}>
                        {report.releaseDay}
                      </td>

                      {/* Since */}
                      <td style={{ padding: "11px 14px", verticalAlign: "top" }}>
                        <span style={{
                          fontFamily: "'IBM Plex Mono', monospace",
                          fontSize: 12,
                          color: "#6b7280",
                        }}>
                          {report.firstPublished}
                        </span>
                      </td>

                      {/* Data Types */}
                      <td style={{ padding: "11px 14px", verticalAlign: "top", fontSize: 12, color: "#9ca3af", lineHeight: 1.55 }}>
                        {report.dataTypes}
                      </td>

                      {/* Coverage */}
                      <td style={{ padding: "11px 14px", verticalAlign: "top", fontSize: 12, color: "#6b7280", lineHeight: 1.55 }}>
                        {report.coverage}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Footer bar */}
          <div style={{
            background: "#13161e",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            padding: "10px 16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 8,
          }}>
            <span style={{ fontSize: 11, color: "#374151", fontFamily: "'IBM Plex Mono', monospace" }}>
              SOURCE: U.S. ENERGY INFORMATION ADMINISTRATION — EIA.GOV
            </span>
            <span style={{ fontSize: 11, color: "#374151", fontFamily: "'IBM Plex Mono', monospace" }}>
              CLICK REPORT NAME TO OPEN · CLICK COLUMN HEADER TO SORT
            </span>
          </div>
        </div>

        {/* Legend */}
        <div style={{ display: "flex", gap: 16, marginTop: 14, flexWrap: "wrap" }}>
          {Object.entries(FREQ_COLORS).map(([freq, c]) => (
            <div key={freq} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "#4b5563", fontFamily: "'IBM Plex Mono', monospace" }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: c.text, opacity: 0.8 }} />
              {freq}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}