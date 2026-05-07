import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { List } from "../molecules/Lists";
import { GoTopBTN } from "../atoms/GoTopBTN";
import { ForumList } from "../organism/ForumList";

export default function ForumPage() {

  return (
    <>
      <h1 className="flex items-center justify-center mt-8 font-['Segoe_UI','Arial','sans-serif']  font-bold sm:text-4xl text-2xl m-2.5">
        Foro
      </h1>
        <ForumList />

      <GoTopBTN />
    </>
  );
}
