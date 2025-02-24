import { Star } from "lucide-react";

export function Review({ rating, onStarClick }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            size={20}
            className={index < rating ? "text-yellow-500" : "text-gray-300"}
            fill={index < rating ? "currentColor" : "none"}
            onClick={() => onStarClick(index)}
          />
        ))}
      </div>
      <p className="text-gray-600 dark:text-neutral-400">Select your rating</p>
    </div>
  );
}
