import { motion } from "framer-motion";
import { InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Test = () => {
  const [show, setShow] = React.useState(false);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <h1 className="font-abel text-7xl">This is test</h1>
      {show && (
        <motion.div className="fixed top-0">
          <h1 className="bg-red-50 font-abel text-7xl">This is test</h1>
        </motion.div>
      )}
      <button onClick={() => setShow(!show)}>Show</button>
    </div>
  );
};

export default Test;
