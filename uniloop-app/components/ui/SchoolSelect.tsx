"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, ChevronDown, Search, X, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { School } from "@/types/database.types";
import type { FormErrors } from "@/types/auth";

interface SchoolSelectProps {
  value: string;
  onChange: (value: string) => void;
  error?: FormErrors[string];
}

type FetchState = "loading" | "ready" | "error";

export function SchoolSelect({ value, onChange, error }: SchoolSelectProps) {
  const [open, setOpen]           = useState(false);
  const [query, setQuery]         = useState("");
  const [schools, setSchools]     = useState<School[]>([]);
  const [fetchState, setFetchState] = useState<FetchState>("loading");
  const containerRef              = useRef<HTMLDivElement>(null);

  // Fetch the list of active partnered schools once on mount
  useEffect(() => {
    let cancelled = false;

    async function load() {
      const supabase = createClient();
      const { data, error: fetchError } = await supabase
        .from("schools")
        .select("id, name, city, is_active, created_at")
        .eq("is_active", true)
        .order("name");

      if (cancelled) return;

      if (fetchError || !data) {
        setFetchState("error");
        return;
      }

      setSchools(data);
      setFetchState("ready");
    }

    load();
    return () => { cancelled = true; };
  }, []);

  const filtered = schools.filter((s) =>
    s.name.toLowerCase().includes(query.toLowerCase())
  );

  const selected = schools.find((s) => s.id === value);

  // Close on outside click
  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, []);

  // Close on Escape
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function handleSelect(id: string) {
    onChange(id);
    setOpen(false);
    setQuery("");
  }

  const triggerLabel =
    fetchState === "loading" ? "Loading schools…"  :
    fetchState === "error"   ? "Failed to load schools" :
    selected                 ? selected.name        :
                               "Select your school / college";

  const triggerColor =
    fetchState === "error" ? "#EF4444" :
    selected               ? "#0F172A" :
                             "#94A3B8";

  return (
    <div ref={containerRef} className="relative">
      {/* Screen-reader announcement for async load/error state */}
      <div role="status" aria-live="polite" className="sr-only">
        {fetchState === "loading" && "Loading schools…"}
        {fetchState === "error"   && "Failed to load schools. Please refresh."}
        {fetchState === "ready"   && `${schools.length} schools available`}
      </div>

      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        disabled={fetchState !== "ready"}
        onClick={() => setOpen((prev) => !prev)}
        className={[
          "school-select-trigger",
          open   ? "school-select-trigger--open"  : "",
          error  ? "school-select-trigger--error" : "",
        ].join(" ").trim()}
      >
        {fetchState === "error" ? (
          <AlertCircle size={16} style={{ color: "#EF4444", flexShrink: 0 }} aria-hidden="true" />
        ) : (
          <Building2 size={16} className="school-select-icon" aria-hidden="true" />
        )}

        <span
          className="flex-1 text-left text-sm font-medium truncate"
          style={{ color: triggerColor }}
        >
          {triggerLabel}
        </span>

        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          aria-hidden="true"
        >
          <ChevronDown size={15} style={{ color: "#CBD5E1" }} />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && fetchState === "ready" && (
          <motion.div
            role="listbox"
            aria-label="Select institution"
            initial={{ opacity: 0, y: -6, scaleY: 0.96 }}
            animate={{ opacity: 1, y: 0,  scaleY: 1    }}
            exit={{    opacity: 0, y: -6, scaleY: 0.96 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="school-select-dropdown"
            style={{ transformOrigin: "top" }}
          >
            <div className="school-select-search">
              <Search size={13} aria-hidden="true" />
              <input
                autoFocus
                aria-label="Search institutions"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search institution…"
                className="school-select-search-input"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="school-select-clear"
                >
                  <X size={12} />
                </button>
              )}
            </div>

            <ul className="school-select-list">
              {filtered.length === 0 ? (
                <li className="school-select-empty">No institution found</li>
              ) : (
                filtered.map((school) => (
                  <li
                    key={school.id}
                    role="option"
                    aria-selected={value === school.id}
                  >
                    <button
                      type="button"
                      onClick={() => handleSelect(school.id)}
                      className={[
                        "school-select-option",
                        value === school.id ? "school-select-option--selected" : "",
                      ].join(" ").trim()}
                    >
                      <span className="font-semibold">{school.name}</span>
                      <span className="school-select-city">{school.city}</span>
                    </button>
                  </li>
                ))
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {error && (
          <motion.p
            key="error"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0  }}
            exit={{    opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className="input-error-msg"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
