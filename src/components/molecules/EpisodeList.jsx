import { Button } from "../atoms/Button";
import { PeopleIcon } from "../atoms/icons/PeopleIcon";
export function EpisodesList({ episodes }) {
  return (
    <ul>
      {episodes.map((ep) => (
        <li key={ep.id}>
          {ep.name}
          <Button
            icon = {PeopleIcon}
            // onClick={handleClick}
            // label={ep.characters.length}
            alt={"icon peeple"}
            //TODO:Change the className for the correct view
            className="label-location"
          />

          <div className="stars">
            {/* <Button label={"Rate"} className={"form-episode"}></Button> */}
          </div>
        </li>
      ))}
    </ul>
  );
}
