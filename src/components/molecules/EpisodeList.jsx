import { Button } from "../atoms/Button";
import { PeopleIcon } from "../atoms/icons/PeopleIcon";
import { StarIcon } from "../atoms/icons/StarIcon";
export function EpisodesList({ episodes }) {
  return (
    <ul>
      {episodes.map((ep) => (
        <li key={ep.id}>
          {ep.name}
          <Button
            icon={PeopleIcon}
            // onClick={handleClick}
            // label={ep.characters.length}
            alt={"icon peeple"}
            //TODO:Change the className for the correct view
            className="label-location"
          />

          <div className="stars">
            <Button label={"Rate"} className={"form-episode"}></Button> 
            <StarIcon width="24" height="24" />
            <StarIcon width="24" height="24" />
            <StarIcon width="24" height="24" />
            <StarIcon width="24" height="24" />
            <StarIcon width="24" height="24" />
          </div>
        </li>
      ))}
    </ul>
  );
}
