import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { List } from "../molecules/Lists";
import { GoTopBTN } from "../atoms/GoTopBTN";
import AgriDashboard from "../organism/AgriDashboard";

export default function StatisticsPage() {
  // const { episodes, loading } = useContext(AppContext);
  // if (loading) return <p>Loading...</p>;

 

  return (
    <>
      <h1 className="flex items-center justify-center mt-8 font-['Segoe_UI','Arial','sans-serif']  font-bold sm:text-4xl text-2xl m-2.5">
        Statistics
      </h1>
      <AgriDashboard />

      <GoTopBTN />
    </>
  );
}
