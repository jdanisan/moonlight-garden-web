import { Button } from "../atoms/Button";
import { useState, useEffect, useContext } from "react";
import { PeopleIcon } from "../atoms/icons/PeopleIcon";
import { StarIcon } from "../atoms/icons/StarIcon";
import { AppContext } from "../context/AppContext";

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
      <ul className="episode-list">
        {episodes.map((ep) => {
          const rating = getEpisodeRating(ratings, ep.id);

          return (
            <li key={ep.id} className="list-element">
              <div className="episodes">
                {/* Episode info */}
                <div className="content-episode">
                  {ep.name} - {ep.air_date}
                  <Button
                    icon={PeopleIcon}
                    onClick={() => openModal("episode", ep)}
                    label={ep.characters.length}
                    className="load-residents"
                  />
                </div>

                {/* Rating section */}
                <div className="stars">
                  <Button
                    label="Rate"
                    className="form-episode"
                    onClick={() => handleOpenRate(ep.id)}
                  />

                  {/* Select only when active */}
                  {activeRate === ep.id && (
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
                  )}

                  {/* Stars only when NOT editing */}
                  {activeRate !== ep.id && (
                    <div className="stars-view">
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
