import {PodcastModel} from '../models/PodcastModel'

export interface IDatabaseContract {
  getAllPodcasts(): Promise<PodcastModel[]>
  getPodcast(podcast: PodcastModel): Promise<PodcastModel>
  subscribeToPodcast(podcast: PodcastModel): Promise<void>
  deletePodcast(podcast: PodcastModel): Promise<void>
  isReady: boolean
}
