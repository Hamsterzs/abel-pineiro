import { InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

// artificial delay to test loading state

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getServerSideProps = async () => {
  await wait(5000);
  return {
    props: {
      message: "Hello World",
    },
  };
};

const Test = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  return (
    <div>
      {props.message}
      <Link href="/test">test</Link>
    </div>
  );
};

export default Test;
