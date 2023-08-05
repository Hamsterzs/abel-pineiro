import React from "react";
import Contacts from "../../../components/Contacts";

const Page = async () => {
  return <Contacts loadTime={10000} />;
};

export default Page;
