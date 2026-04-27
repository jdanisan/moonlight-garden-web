import { useContext, useState } from "react";
import { NavBar } from "../templates/NavBar";
import { MoonlightIcon } from "../atoms/icons/MoonlightIcon";

export default function NotFoundPage() {
  return (
    <>
      <h1 className="flex items-center justify-center mt-8 font-['Segoe_UI','Arial','sans-serif']  font-bold text-4xl m-2.5">
        404 page not found
      </h1>
      <div className="flex justify-center p-5 h-full">
        <MoonlightIcon width="460" height="460" className="text-primary-900" />
      </div>
      <h3>Please return home</h3>
    </>
  );
}
