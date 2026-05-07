"use client";

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  "aria-label"?: string;
}

export function Checkbox({ checked, onChange, "aria-label": ariaLabel }: CheckboxProps) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={ariaLabel}
      onClick={onChange}
      className={`checkbox${checked ? " checkbox--checked" : ""}`}
    >
      {checked && (
        <svg
          viewBox="0 0 10 10"
          width="10"
          height="10"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="1.5,5.5 4,8 8.5,2" />
        </svg>
      )}
    </button>
  );
}
