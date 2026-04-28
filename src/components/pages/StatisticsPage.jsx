import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { List } from "../molecules/Lists";
import { GoTopBTN } from "../atoms/GoTopBTN";

export default function StatisticsPage() {
  // const { episodes, loading } = useContext(AppContext);
  // if (loading) return <p>Loading...</p>;

 

  return (
    <>
      <h1 className="flex items-center justify-center mt-8 font-['Segoe_UI','Arial','sans-serif']  font-bold sm:text-4xl text-2xl m-2.5">
        Statistics
      </h1>
      <div className="w-11/12 p-5 bg-white m-auto rounded-xl grid gap-4 text-black">
       
      </div>

      <GoTopBTN />
    </>
  );
}
