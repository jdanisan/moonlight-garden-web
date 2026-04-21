import { EpisodesList } from "./EpisodeList";
import { StarIcon } from "../atoms/icons/StarIcon";
import { getSavedRatings, getSeasonAverage } from "../utils/episodeRating";
import { useEffect, useState } from "react";

export function SeasonItem({ season, className = "" }) {
  const [open, setOpen] = useState(false);
  const [ratings, setRatings] = useState(getSavedRatings());

  useEffect(() => {
    setRatings(getSavedRatings());
  }, []);
  const average = getSeasonAverage(season.episodes, ratings);
  return (
    <ul className="w-full p-0 list-none ">
      <li className="block list-none" onClick={() => setOpen(!open)}>
        <div className="cursor-pointer font-bold p-2.5 text-blue-700 border-b border-b-white  flex flex-row sm:items-center md:justify-between">
          <h3>{season.name}</h3>
          <div className="flex flex-row ml-2.5">
            {[1, 2, 3, 4, 5].map((i) => {
              const value = average / 2;

              let fill = 0;

              if (value >= i) fill = 1;
              else if (value >= i - 0.5) fill = 0.5;

              return <StarIcon key={i} filled={fill} />;
            })}
          </div>
        </div>
      </li>

      {open && (
        <EpisodesList
          episodes={season.episodes}
          ratings={ratings}
          setRatings={setRatings}
        />
      )}
    </ul>
  );
}
