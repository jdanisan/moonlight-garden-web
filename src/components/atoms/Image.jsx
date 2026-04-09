export function Image({ src, alt, className }) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e) => (e.target.src = "/fallback.png")}
    />
  );
}

export default Image;