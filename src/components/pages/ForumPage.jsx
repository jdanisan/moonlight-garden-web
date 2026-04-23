import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { List } from "../molecules/Lists";
import { SeasonItem } from "../molecules/SeasonItm";
import { groupEpisodesBySeason } from "../utils/groupEpisodesBySeasons";
import { GoTopBTN } from "../atoms/GoTopBTN";

export default function ForumPage() {
  const { episodes, loading } = useContext(AppContext);

  if (loading) return <p>Loading...</p>;

  const seasons = Object.values(groupEpisodesBySeason(episodes));

  return (
    <>
      <h1 className="flex items-center justify-center font-['Segoe_UI','Arial','sans-serif']  font-bold sm:text-4xl text-2xl m-2.5">
        Forum
      </h1>
      <div className="w-11/12 p-5 bg-white m-auto rounded-xl grid gap-4 text-black">
        {/* <List
          className="w-full p-0 list-none"
          items={seasons}
          renderItem={(season) => (
            <SeasonItem
              season={season}
              className="font-bold py-1.5 px-5 text-blue-700 bg-gray-400 rounded-md"
            />
          )}
        /> */}
      </div>

      <GoTopBTN />
    </>
  );
}
