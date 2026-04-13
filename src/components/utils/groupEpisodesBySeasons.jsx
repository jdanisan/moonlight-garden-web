export function groupEpisodesBySeason(episodes) {
  return episodes.reduce((acc, ep) => {
    const season = ep.episode.slice(0, 3); // "S01"

    if (!acc[season]) {
      acc[season] = {
        id: season,
        //TODO: view if this can be a little bite more responsive if there are more than 5 seasons, like 10
        name: `Season ${season.slice(2)}`,
        episodes: [],
      };
    }

    acc[season].episodes.push(ep);

    return acc;
  }, {});
}
