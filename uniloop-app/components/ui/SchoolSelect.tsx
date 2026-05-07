"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, ChevronDown, Search, X } from "lucide-react";
import { PARTNERED_SCHOOLS } from "@/constants/schools";
import type { FormErrors } from "@/types/auth";

interface SchoolSelectProps {
  value: string;
  onChange: (value: string) => void;
  error?: FormErrors[string];
}

export function SchoolSelect({ value, onChange, error }: SchoolSelectProps) {
  const [open, setOpen]     = useState(false);
  const [query, setQuery]   = useState("");
  const containerRef        = useRef<HTMLDivElement>(null);

  const filtered = PARTNERED_SCHOOLS.filter((s) =>
    s.name.toLowerCase().includes(query.toLowerCase())
  );

  const selected = PARTNERED_SCHOOLS.find((s) => s.id === value);

  // Close on outside click
  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  function handleSelect(id: string) {
    onChange(id);
    setOpen(false);
    setQuery("");
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className={`school-select-trigger${open ? " school-select-trigger--open" : ""}${error ? " school-select-trigger--error" : ""}`}
      >
        <Building2
          size={16}
          className="school-select-icon"
          aria-hidden="true"
        />
        <span className={`flex-1 text-left text-sm font-medium truncate ${selected ? "text-[#F0EDE8]" : "text-white/30"}`}>
          {selected ? selected.name : "Select your school / college"}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          aria-hidden="true"
        >
          <ChevronDown size={15} className="text-white/30" />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
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
            {/* Search */}
            <div className="school-select-search">
              <Search size={13} aria-hidden="true" />
              <input
                autoFocus
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

            {/* Options */}
            <ul className="school-select-list">
              {filtered.length === 0 ? (
                <li className="school-select-empty">No institution found</li>
              ) : (
                filtered.map((school) => (
                  <li key={school.id} role="option" aria-selected={value === school.id}>
                    <button
                      type="button"
                      onClick={() => handleSelect(school.id)}
                      className={`school-select-option${value === school.id ? " school-select-option--selected" : ""}`}
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
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
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
