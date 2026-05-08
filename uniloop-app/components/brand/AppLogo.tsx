import { RefreshCw } from "lucide-react";

interface AppLogoProps {
  compact?: boolean;
}

export function AppLogo({ compact = false }: AppLogoProps) {
  return (
    <div className="brand-logo">
      <div className={`brand-logo-mark${compact ? " brand-logo-mark--compact" : ""}`}>
        <RefreshCw
          size={compact ? 13 : 16}
          color="#fff"
          strokeWidth={2.5}
          aria-hidden="true"
        />
      </div>
      <span className={`brand-logo-text${compact ? " brand-logo-text--compact" : ""}`}>
        uniloop
      </span>
    </div>
  );
}
