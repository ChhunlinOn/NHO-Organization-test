import React from "react";
// import dynamic from "next/dynamic";
import Flipbook from "../component/flipbook";

// Dynamically import Flipbook with client-side rendering
// const Flipbook = dynamic(() => import("../../components/Flipbook"), {
//   ssr: false, // Disable server-side rendering
// });

const FlipbookPage = () => {
  return <Flipbook />;
};

export default FlipbookPage;
