"use client";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { MusicPageProps, Vinyl } from "./MusicPage";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Song = ({
  musicData,
}: {
  musicData: MusicPageProps["music"][number];
}) => {
  const pathName = usePathname();
  const baseUrl = pathName.split("/").slice(0, 3).join("/");

  return (
    <AnimatePresence>
      <motion.div
        layoutId={musicData.id}
        className="absolute top-0 left-0 z-10 min-h-screen min-w-full bg-white"
      >
        <Vinyl music={musicData} active />
        <motion.div className="bg-red-400 px-4 py-1">
          <Link href={baseUrl}>Close</Link>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Song;
