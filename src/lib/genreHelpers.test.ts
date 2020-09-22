import {splitGenreString} from "./genreHelpers";

describe('genreHelpers', () => {
  describe('#splitGenreString()', () => {
    it('should return the genre string splitted in array', () => {
      expect(splitGenreString('MusicPodcastsTechnology')).toStrictEqual(["Music", "Podcasts", "Technology"]);
      expect(splitGenreString('Society & CulturePodcasts')).toStrictEqual(["Society", "Culture", "Podcasts"]);
      expect(splitGenreString('Music PodcastsTechnology')).toStrictEqual(["Music", "Podcasts", "Technology"]);
    });
  });
});