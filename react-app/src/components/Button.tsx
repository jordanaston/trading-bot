function Button({
  title,
  color,
  size,
  onClick,
  disabled,
}: {
  title: string;
  color: string;
  size: "small" | "medium" | "large";
  onClick: () => void;
  disabled?: boolean;
}) {
  const sizeClasses = {
    small: "px-2 text-sm",
    medium: "px-4 text-base",
    large: "px-10 text-lg",
  };

  return (
    <button
      className={`${sizeClasses[size]} ${color} text-white rounded-lg shadow-md focus:outline-none focus:ring-0 hover:border-blue-400 active:scale-95`}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
}

export default Button;