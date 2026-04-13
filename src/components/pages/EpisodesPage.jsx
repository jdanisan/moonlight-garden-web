import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { List } from "../molecules/Lists";
import { SeasonItem } from "../molecules/SeasonItm";
import { groupEpisodesBySeason } from "../utils/groupEpisodesBySeasons";
import { GoTopBTN } from "../atoms/GoTopBTN";

export default function EpisodesPage() {
  const { episodes, loading } = useContext(AppContext);

  if (loading) return <p>Loading...</p>;

  const seasons = Object.values(groupEpisodesBySeason(episodes));

  return (
    <>
      <div className="container-list">
        <List
          className="seasons-lists"
          items={seasons}
          renderItem={(season) => (
            <SeasonItem season={season} className="list-element" />
          )}
        />
      </div>

      <GoTopBTN />
    </>
  );
}
