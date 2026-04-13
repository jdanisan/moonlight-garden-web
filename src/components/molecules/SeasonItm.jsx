import { useState } from "react";
import { EpisodesList } from "./EpisodeList";

export function SeasonItem({ season ,className=""}) {
  const [open, setOpen] = useState(false);

  return (
    <div className={className}>
      <div onClick={() => setOpen(!open)}>{season.name}</div>

      {open && <EpisodesList episodes={season.episodes} />}
    </div>
  );
}
