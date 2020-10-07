import React from 'react'

import {PodcastModel} from '../models/PodcastModel'
import {IDatabaseContract} from '../contracts/DatabaseContract'
import {SQLiteServices} from '../services/SQLiteServices'

interface DBContextProps {
  podcasts: PodcastModel[]
  isSub: boolean
  subToPodcast: (podcast: PodcastModel) => Promise<void>
  delPodcast: (podcast: PodcastModel) => Promise<void>
}

export const DBContext = React.createContext<DBContextProps>({
  podcasts: [],
  isSub: false,
  subToPodcast: () => Promise.resolve(),
  delPodcast: () => Promise.resolve(),
})

export const DBProvider: React.FC = (props) => {
  const [podcasts, setPodcasts] = React.useState<PodcastModel[]>([])
  const [isSub, setIsSub] = React.useState<boolean>(false)
  const db = React.useRef<IDatabaseContract | null>(null)

  React.useEffect(() => {
    db.current = new SQLiteServices()
  }, [])

  React.useEffect(() => {
    if (db.current?.isReady) {
      ;(async () => {
        if (db.current) {
          const _podcasts = await db.current.getAllPodcasts()
          setPodcasts(_podcasts)
          // setIsSub(false);
        }
      })()
    }
  }, [db.current?.isReady])

  const subToPodcast = async (podcast: PodcastModel) => {
    if (db.current) {
      await db.current.subscribeToPodcast(podcast)

      const _podcasts = await db.current.getAllPodcasts()

      setPodcasts(_podcasts)
      setIsSub(true)
    }
  }

  const delPodcast = async (podcast: PodcastModel) => {
    if (db.current) {
      await db.current.deletePodcast(podcast)

      const _podcasts = await db.current.getAllPodcasts()

      setPodcasts(_podcasts)
      setIsSub(false)
    }
  }

  const value: DBContextProps = {
    podcasts,
    isSub,
    subToPodcast,
    delPodcast,
  }

  return <DBContext.Provider value={value}>{props.children}</DBContext.Provider>
}
