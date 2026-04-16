const STORAGE_KEY = "episode-ratings";

export function getSavedRatings() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
}

export function saveRating(episodeId, rating) {
    const ratings = getSavedRatings();
    ratings[episodeId] = rating;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ratings));
    return ratings;
}

export function getEpisodeRating(ratings, episodeId) {
    return ratings?.[episodeId] ?? 0;
}

export function getSeasonAverage(episodes, ratings) {
    const valid = episodes
        .map(ep => ratings[ep.id])
        .filter(r => r != null);

    if (!valid.length) return 0;

    return Math.round(
        valid.reduce((a, b) => a + b, 0) / valid.length
    );
}