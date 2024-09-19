"use client";

import { motion } from "framer-motion";

function getGreeting(date = new Date()) {
  const hours = date.getHours();
  if (hours < 12) {
    return "Good Morning";
  } else if (hours < 18) {
    return "Good Afternoon";
  } else {
    return "Good Evening";
  }
}

export function Greeting() {
  const greeting = getGreeting();
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="my-4 text-3xl font-bold"
      >
        {greeting}, Nyuma
      </motion.div>
    </>
  );
}
