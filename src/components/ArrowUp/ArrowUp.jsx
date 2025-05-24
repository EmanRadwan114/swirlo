import { useEffect, useState } from "react";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

export default function ArrowUp() {
  const [visible, setVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  function toggleVisibilityAndProgress() {
    const scrollTop =
      window.pageYOffset || document.documentElement.scrollTop;
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

  // Constants for SVG circle
  const radius = 48;  // Increased radius for a larger button
  const stroke = 8;   // Increased stroke width for a bolder border
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div>
      {visible && (
        <button
          onClick={goUp}
          style={{
            position: "fixed",
            bottom: "40px",
            right: "30px",
            height: "96px", // Increased size of button
            width: "96px",  // Increased size of button
            borderRadius: "50%",
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
            zIndex: 1000,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <svg height="96" width="96">
            <circle
              stroke="var(--secondary)" // Use the light color for the border
              fill="white"
              strokeWidth={stroke}
              r={normalizedRadius}
              cx="48"  // Adjusted for new size
              cy="48"  // Adjusted for new size
            />
            <circle
              stroke="var(--primary)" // Use the primary color for the progress circle
              fill="transparent"
              strokeWidth={stroke}
              strokeDasharray={circumference + " " + circumference}
              style={{
                strokeDashoffset,
                transition: "stroke-dashoffset 0.3s ease",
                transform: "rotate(-90deg)",
                transformOrigin: "50% 50%",
              }}
              r={normalizedRadius}
              cx="48"  // Adjusted for new size
              cy="48"  // Adjusted for new size
            />
          </svg>
          {/* Positioning the ArrowUpwardIcon inside the button */}
          <ArrowUpwardIcon
            sx={{
              position: "absolute",
              color: "var(--primary)", // Color of the arrow
              fontSize: "40px", // Increased font size
            }}
          />
        </button>
      )}
    </div>
  );
}
