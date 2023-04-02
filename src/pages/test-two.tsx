import { InferGetServerSidePropsType } from "next";
import Link from "next/link";
import React from "react";

export const getServerSideProps = async () => {
	return {
		props: {
			message: "test two",
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
