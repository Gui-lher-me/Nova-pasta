import { cn } from "@/lib/utils";

export const Avatar = ({ initials, className }) => {
  // Generate a random number and use it to pick a color
  const colors = [
    "bg-gray-800 text-white",
    "bg-gray-500 text-white",
    "bg-green-500 text-white",
    "bg-blue-600 text-white dark:bg-blue-500",
    "bg-red-500 text-white",
    "bg-yellow-500 text-white",
    // "bg-white text-gray-800",
  ];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  return (
    <span
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-lg font-semibold leading-none",
        randomColor,
        className,
      )}
    >
      {initials}
    </span>
  );
};
