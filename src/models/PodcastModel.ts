export class PodcastModel {
  public artist: string

  public episodesCount: number

  public feedUrl: string

  public name: string

  public thumbnail: string

  public genres: string

  constructor(params: {
    thumbnail: string
    feedUrl: string
    artist: string
    genres: string
    name: string
    episodesCount: number
  }) {
    this.artist = params.artist
    this.episodesCount = params.episodesCount
    this.feedUrl = params.feedUrl
    this.name = params.name
    this.thumbnail = params.thumbnail
    this.genres = params.genres
  }
}
