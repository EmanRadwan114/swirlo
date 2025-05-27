import { useEffect, useState } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

export default function ArrowUp() {
  const [visible, setVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  function toggleVisibilityAndProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight - document.documentElement.clientHeight;

    const scrolled = (scrollTop / scrollHeight) * 100;
    setScrollProgress(scrolled);

    setVisible(scrollTop > 250);
  }

  function goUp() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibilityAndProgress);
    return () => window.removeEventListener("scroll", toggleVisibilityAndProgress);
  }, []);

  // Bigger circle settings
  const radius = 38;
  const stroke = 6;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset =
    circumference - (scrollProgress / 100) * circumference;

  return (
    <div>
      {visible && (
        <button
          onClick={goUp}
          style={{
            position: "fixed",
            bottom: "90px",
            right: "20px",
            height: "80px", // larger button
            width: "80px",  // larger button
            borderRadius: "50%",
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            // boxShadow: "0 2px 2px rgba(0, 0, 0, 0.25)", // optional
          }}
        >
          <svg height="80" width="80">
            <circle
              stroke="var(--secondary)"
              fill="white"
              strokeWidth={stroke}
              r={normalizedRadius}
              cx="40"
              cy="40"
            />
            <circle
              stroke="var(--primary)"
              fill="transparent"
              strokeWidth={stroke}
              strokeDasharray={`${circumference} ${circumference}`}
              style={{
                strokeDashoffset,
                transition: "stroke-dashoffset 0.3s ease",
                transform: "rotate(-90deg)",
                transformOrigin: "50% 50%",
              }}
              r={normalizedRadius}
              cx="40"
              cy="40"
            />
          </svg>
          <ArrowUpwardIcon
            sx={{
              position: "absolute",
              color: "var(--primary)",
              fontSize: "36px", // larger icon
            }}
          />
        </button>
      )}
    </div>
  );
}
