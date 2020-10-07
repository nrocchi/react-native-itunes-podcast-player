export const splitGenreString = (genres: string): RegExpMatchArray | null => {
  // MusicPodcastsTechnology
  // Music PodcastsTechnology
  // Music & PodcastsTechnology

  const arrayGenres = genres.match(/[A-Z]+[^A-Z]*|[^A-Z]+/g)
  const validGenres: string[] | null = []

  arrayGenres?.forEach(function (item) {
    const validITem: string = item.split('&').join('').trim()
    validGenres.push(validITem)
  })

  return validGenres
}
