import { motion } from "motion/react";
import { Loader2 } from "lucide-react";

interface ApiLoadingStateProps {
  title?: string;
  message?: string;
  lines?: number;
  cards?: number;
}

export function ApiLoadingState({
  title = "Loading data",
  message = "Please wait while we fetch the latest content.",
  lines = 2,
  cards = 4,
}: ApiLoadingStateProps) {
  return (
    <div className="rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-2xl shadow-blue-100/60">
      <div className="mb-6 flex items-center gap-3">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-reguler/20 to-blue-reguler/20">
          <Loader2 size={20} className="animate-spin text-blue-reguler" />
        </span>
        <div>
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-600">{message}</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: cards }).map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: [0.45, 0.85, 0.45] }}
            transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut", delay: index * 0.12 }}
            className="overflow-hidden rounded-[1.5rem] bg-white shadow-lg"
          >
            <div className="h-44 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100" />
            <div className="space-y-3 p-4">
              <div className="h-4 w-3/4 rounded-full bg-gray-200" />
              <div className="h-4 w-1/2 rounded-full bg-gray-200" />
              <div className="h-3 w-full rounded-full bg-gray-100" />
              <div className="h-3 w-5/6 rounded-full bg-gray-100" />
              <div className="flex items-center justify-between pt-2">
                <div className="h-8 w-24 rounded-full bg-gray-200" />
                <div className="h-8 w-24 rounded-full bg-gray-200" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {lines > 0 ? (
        <div className="mt-6 space-y-3">
          {Array.from({ length: lines }).map((_, index) => (
            <div
              key={index}
              className={`h-4 rounded-full bg-gray-200 ${
                index === 0 ? "w-5/6" : index === 1 ? "w-2/3" : "w-3/4"
              }`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
