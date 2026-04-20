import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { cn } from "@/lib/utils";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const MiniCalendar = () => {
  const [active, setActive] = useState(19);
  const dates = [15, 16, 17, 18, 19, 20, 21];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">Januari 2024</h3>
        <div className="flex items-center gap-1">
          <button className="w-7 h-7 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:bg-secondary">
            <FiChevronLeft size={14} />
          </button>
          <button className="w-7 h-7 rounded-md bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90">
            <FiChevronRight size={14} />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {days.map((d) => (
          <div key={d} className="text-[10px] text-muted-foreground font-medium py-1">
            {d}
          </div>
        ))}
        {dates.map((d) => (
          <button
            key={d}
            onClick={() => setActive(d)}
            className={cn(
              "aspect-square rounded-full text-xs font-medium flex items-center justify-center transition-colors",
              active === d
                ? "bg-primary text-primary-foreground"
                : "text-foreground hover:bg-secondary"
            )}
          >
            {d}
          </button>
        ))}
      </div>
    </div>
  );
};
