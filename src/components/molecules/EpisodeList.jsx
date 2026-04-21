import { Button } from "../atoms/Button";
import { useState, useEffect, useContext } from "react";
import { PeopleIcon } from "../atoms/icons/PeopleIcon";
import { StarIcon } from "../atoms/icons/StarIcon";
import { AppContext } from "../context/AppContext";
import { formatDate } from "../utils/formatDate";

import {
  getSavedRatings,
  saveRating,
  getSeasonAverage,
  getEpisodeRating,
} from "../utils/episodeRating";

export function EpisodesList({ episodes, ratings, setRatings }) {
  const { openModal } = useContext(AppContext);

  const [activeRate, setActiveRate] = useState(null);

  // Save rating
  const handleRate = (episodeId, value) => {
    const updated = saveRating(episodeId, value);
    setRatings(updated);
  };

  // Toggle select
  const handleOpenRate = (episodeId) => {
    setActiveRate((prev) => (prev === episodeId ? null : episodeId));
  };

  // Season average
  const average = getSeasonAverage(episodes, ratings);

  return (
    <>
      <ul className="block list-none ">
        {episodes.map((ep) => {
          const rating = getEpisodeRating(ratings, ep.id);

          return (
            <li
              key={ep.id}
              className="font-bold text-[14px] text-primary-700 bg-primary-100 py-1.5 px-5 border-b border-primary-50 rounded-xl m-1"
            >
              <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5">
                <div className="w-fit flex flex-col sm:flex-row sm:items-center gap-1">
                  <span className="cursor-pointer font-bold">
                    {ep.name} - {formatDate(ep.air_date)}
                  </span>
                </div>

                <div className="flex items-center gap-2.5 ">
                  <Button
                    icon={PeopleIcon}
                    onClick={() => openModal("episode", ep)}
                    label={ep.characters.length}
                    variant="residentsRate"
                  />

                  <Button
                    label="Rate"
                    variant="residentsRate"
                    onClick={() => handleOpenRate(ep.id)}
                  />

                  {activeRate === ep.id ? (
                    <select
                      value={rating}
                      onChange={(e) =>
                        handleRate(ep.id, Number(e.target.value))
                      }
                    >
                      <option value="0">Rate the episode</option>
                      {Array.from({ length: 10 }, (_, i) => (
                        <option key={i} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="flex flex-row ">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <StarIcon key={i} filled={rating >= i * 2} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
