import SQLite from 'react-native-sqlite-storage'

import {IDatabaseContract} from '../contracts/DatabaseContract'
import {PodcastModel} from '../models/PodcastModel'

export class SQLiteServices implements IDatabaseContract {
  private _db: SQLite.SQLiteDatabase

  public isReady = false

  constructor() {
    this._db = SQLite.openDatabase(
      {
        name: 'db.sqlite',
        location: 'Documents',
      },
      () => {
        console.log('SQLite database connect')

        this.init().then(() => {
          console.log('SQLite init is ready')
        })
      },
      (err) => {
        console.log('SQLite database error', err)
      },
    )
  }

  private async init() {
    await this._db.executeSql(`
        CREATE TABLE IF NOT EXISTS podcasts
        (
            name           VARCHAR(255) UNIQUE,
            episodes_count INT DEFAULT 0,
            feed_url       TEXT,
            artist         TEXT,
            thumbnail      TEXT,
            genres         TEXT
        );
    `)

    this.isReady = true
  }

  public getPodcast(podcast: PodcastModel): Promise<PodcastModel> {
    return new Promise((resolve, reject) => {
      this._db.transaction((tx) => {
        // noinspection SqlResolve
        tx.executeSql(
          'SELECT * FROM podcasts WHERE name = ?',
          [podcast.name],
          (_, results) => {
            const row = results.rows.item(0)

            const _podcast = new PodcastModel({
              name: row.name,
              thumbnail: row.thumbnail,
              artist: row.artist,
              episodesCount: row.episodes_count,
              feedUrl: row.feed_url,
              genres: row.genres,
            })

            resolve(_podcast)
          },
          (_, err) => {
            reject(err)
          },
        )
      })
    })
  }

  public getAllPodcasts(): Promise<PodcastModel[]> {
    const podcasts: PodcastModel[] = []
    return new Promise((resolve, reject) => {
      this._db.transaction((tx) => {
        // noinspection SqlResolve
        tx.executeSql(
          'SELECT * FROM podcasts ORDER BY name;',
          [],
          (_, results) => {
            for (let i = 0; i < results.rows.length; i += 1) {
              const row = results.rows.item(i)

              podcasts.push(
                new PodcastModel({
                  name: row.name,
                  thumbnail: row.thumbnail,
                  artist: row.artist,
                  episodesCount: row.episodes_count,
                  feedUrl: row.feed_url,
                  genres: row.genres,
                }),
              )
            }
            resolve(podcasts)
          },
          (_, err) => {
            reject(err)
          },
        )
      })
    })
  }

  public subscribeToPodcast(podcast: PodcastModel): Promise<void> {
    return new Promise((resolve, reject) => {
      this._db.transaction((tx) => {
        tx.executeSql(
          'INSERT OR IGNORE INTO podcasts (artist, episodes_count, feed_url, name, thumbnail, genres) VALUES ($1, $2, $3, $4, $5, $6)',
          [
            podcast.artist,
            podcast.episodesCount,
            podcast.feedUrl,
            podcast.name,
            podcast.thumbnail,
            podcast.genres,
          ],
          () => {
            console.log('podcast insert')
            resolve()
          },
          (err) => {
            console.log('podcast insert error', err)
            reject(err)
          },
        )
      })
    })
  }

  public deletePodcast(podcast: PodcastModel): Promise<void> {
    return new Promise((resolve, reject) => {
      this._db.transaction((tx) => {
        tx.executeSql(
          'DELETE FROM podcasts WHERE name = ?',
          [podcast.name],
          () => {
            console.log('podcast delete')
            resolve()
          },
          (err) => {
            console.log('podcast delete error', err)
            reject(err)
          },
        )
      })
    })
  }
}
