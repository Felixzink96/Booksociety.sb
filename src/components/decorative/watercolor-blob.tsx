interface WatercolorBlobProps {
  className?: string;
  size?: number;
  opacity?: number;
  color?: string;
}

export function WatercolorBlob({
  className = "",
  size = 200,
  opacity = 0.3,
  color = "#F4C2C2",
}: WatercolorBlobProps) {
  return (
    <div
      className={`absolute pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        opacity,
        filter: "blur(20px)",
      }}
    />
  );
}
