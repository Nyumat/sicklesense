"use client";

import React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface NotificationButtonProps extends ButtonProps {
  notificationCount?: number;
  icon: LucideIcon;
}

export const NotificationButton: React.FC<NotificationButtonProps> = ({
  notificationCount = 0,
  icon: Icon,
  className,
  ...buttonProps
}) => {
  return (
    <Button {...buttonProps} className={cn("relative", className)}>
      <Icon />
      <AnimatePresence>
        {notificationCount > 0 && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="absolute -right-1 -top-1 flex items-center justify-center"
          >
            <motion.div
              animate={notificationCount > 1 ? { scale: [1, 1.2, 1] } : {}}
              transition={{ repeat: Infinity, duration: 2 }}
              className={cn(
                "flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white",
                notificationCount > 99 && "text-[10px]",
              )}
            >
              {notificationCount > 99 ? "99+" : notificationCount}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Button>
  );
};
