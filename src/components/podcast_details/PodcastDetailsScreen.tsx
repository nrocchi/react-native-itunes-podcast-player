import React from 'react'
import {Box, Text} from 'react-native-design-utility'
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native'
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import {connect} from 'react-redux'

import {useQuery} from '@apollo/react-hooks'
import Icon from 'react-native-vector-icons/FontAwesome'
import {theme} from '../../constants/theme'
import {SearchStackRouteParamsList} from '../../navigators/types'
import feedQuery from '../../graphql/query/feedQuery'
import {
  FeedQuery,
  FeedQuery_feed,
  FeedQueryVariables,
  SearchQuery_search,
} from '../../types/graphql'
import {getMonth, humanDuration} from '../../lib/dateTimeHelpers'
import {usePlayerContext} from '../../context/PlayerContext'
import {DBContext} from '../../context/DBContext'
import {PodcastModel} from '../../models/PodcastModel'
import {makeHitSlop} from '../../constants/metrics'
import {favoritesSelector} from '../../store/selectors/favoritesSelector'
import {toggleFavoriteAction} from '../../store/actions/favoritesActions'

type NavigationParams = RouteProp<SearchStackRouteParamsList, 'PodcastDetails'>

const PodcastDetailsScreen = (props: {
  favorites?: any
  dispatch: (arg0: {type: string; value: any}) => void
}) => {
  const playerContext = usePlayerContext()
  const navigation = useNavigation()
  const routeParams = (useRoute().params ?? {}) as {
    episode: FeedQuery_feed
    podcast: SearchQuery_search
  }
  const {data: podcastData} = useRoute<NavigationParams>().params ?? {}
  const dbContext = React.useContext(DBContext)

  const {data, loading} = useQuery<FeedQuery, FeedQueryVariables>(feedQuery, {
    variables: {
      feedUrl: podcastData.feedUrl,
    },
  })

  const genres = podcastData.genres.toString().split(',')

  function handleSub() {
    dbContext
      .subToPodcast(
        new PodcastModel({
          episodesCount: podcastData.episodesCount,
          thumbnail: podcastData.thumbnail,
          feedUrl: podcastData.feedUrl,
          name: podcastData.podcastName || podcastData.name,
          artist: podcastData.artist,
          genres: podcastData.genres.toString(),
        }),
      )
      .then((r) => {
        console.log('podcast is sub')
      })
      .catch((e) => {
        console.log('podcast is not sub error :', e)
      })
  }

  function handleDeleteSub() {
    dbContext
      .delPodcast(
        new PodcastModel({
          episodesCount: podcastData.episodesCount,
          thumbnail: podcastData.thumbnail,
          feedUrl: podcastData.feedUrl,
          name: podcastData.podcastName || podcastData.name,
          artist: podcastData.artist,
          genres: podcastData.genres.toString(),
        }),
      )
      .then((r) => {
        console.log('podcast delete')
      })
      .catch((e) => {
        console.log('podcast not delete error :', e)
      })
  }

  function _toggleFavorite(
    favorite: FeedQuery_feed,
    podcast_thumbnail: string,
    podcast_artist: string,
  ) {
    const episodeWithPodcastInfo = {
      title: favorite.title,
      description: favorite.description,
      image: favorite.image,
      linkUrl: favorite.linkUrl,
      summary: favorite.summary,
      text: favorite.text,
      duration: favorite.duration,
      pubDate: favorite.pubDate,
      thumbnail: podcast_thumbnail,
      podcastName: podcast_artist,
    }

    props.dispatch(toggleFavoriteAction(episodeWithPodcastInfo))
  }

  return (
    <Box f={1} bg="black">
      <FlatList
        data={data?.feed}
        keyExtractor={(item) => item.linkUrl.toString()}
        ListHeaderComponent={
          <>
            <Box dir="row" px="sm" mt="sm" mb="sm" center>
              {podcastData.thumbnail && (
                <Box mr="sm">
                  <Image
                    source={{uri: podcastData.thumbnail}}
                    style={s.thumbnail}
                  />
                </Box>
              )}
              <Box f={1}>
                <Text color="white" size="xl" bold>
                  {podcastData.podcastName || podcastData.name}
                </Text>
                <Text color="grey" size="sm" mb="xs">
                  {podcastData.artist}
                </Text>
                <Box dir="row" align="center">
                  {!dbContext.isSub ? (
                    <TouchableOpacity onPress={() => handleSub()}>
                      <Box
                        radius="sm"
                        bg={theme.color.primary}
                        px="xs"
                        py={5}
                        center>
                        <Text color="white" bold size="xs" uppercase>
                          S'abonner
                        </Text>
                      </Box>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={() => handleDeleteSub()}>
                      <Box
                        radius="sm"
                        bg={theme.color.primary}
                        px="xs"
                        py={5}
                        center>
                        <Text color="white" bold size="xs" uppercase>
                          S'abonner
                        </Text>
                      </Box>
                    </TouchableOpacity>
                  )}
                </Box>
              </Box>
            </Box>
            <Box f={1} px="sm" mb="sm">
              <Box dir="row">
                {genres.map((item, key) => (
                  <Box
                    key={key}
                    radius="sm"
                    bg={theme.color.blackLight}
                    px="xs"
                    py={3}
                    mr="xs">
                    <Text color="primary" bold size="xs">
                      {item}
                    </Text>
                  </Box>
                ))}
              </Box>
              {/* <Text color={theme.color.green} bold size="xs" mt="xs">{podcastData.genres}</Text> */}
            </Box>
            <Box f={1} px="sm" mb="sm">
              <Box
                dir="row"
                align="center"
                px="sm"
                py="xs"
                radius="xs"
                bg={theme.color.blackLight}>
                <Box mr="sm">
                  {loading ? (
                    <ActivityIndicator
                      size={theme.text.size.lg}
                      color={theme.color.primary}
                    />
                  ) : playerContext.currentTrack?.id ===
                    data?.feed[0].linkUrl ? (
                    playerContext.isPaused ? (
                      <TouchableOpacity
                        onPress={() => playerContext.play()}
                        hitSlop={makeHitSlop(20)}>
                        <Icon
                          name="play-circle"
                          size={theme.text.size.xxl}
                          color={theme.color.primary}
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={playerContext.pause}
                        hitSlop={makeHitSlop(20)}>
                        <Icon
                          name="pause-circle"
                          size={theme.text.size.xxl}
                          color={theme.color.primary}
                        />
                      </TouchableOpacity>
                    )
                  ) : (
                    <TouchableOpacity
                      hitSlop={makeHitSlop(20)}
                      onPress={() => {
                        const elt = data?.feed[0]
                        if (!elt) {
                          return
                        }
                        playerContext.play({
                          id: elt.linkUrl,
                          title: elt.title,
                          artwork: elt.image ?? podcastData.thumbnail,
                          url: elt.linkUrl,
                          artist: podcastData.artist,
                          date: elt.pubDate,
                          duration: elt.duration,
                        })
                      }}>
                      <Icon
                        name="play-circle"
                        size={theme.text.size.xxl}
                        color={theme.color.primary}
                      />
                    </TouchableOpacity>
                  )}
                </Box>
                <Box f={1}>
                  <Text color="primary" bold>
                    Lire le dernier épisode
                  </Text>
                  <Text color="white" size="sm">
                    {data?.feed[0].title}
                  </Text>
                </Box>
              </Box>
            </Box>

            <Box px="sm">
              <Text size="md" color="white" bold>
                Tous les épisodes
              </Text>
            </Box>
            <Box px="sm" mb="sm">
              <Text size="xs" color={theme.color.grey}>
                {podcastData.episodesCount} épisodes
              </Text>
            </Box>
            {loading && (
              <Box f={1} center pt="xl">
                <ActivityIndicator size="large" color={theme.color.primary} />
              </Box>
            )}
          </>
        }
        extraData={props.favorites}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('EpisodeDetails', {
                episode: item,
                podcast: podcastData,
              })
            }>
            <Box px="sm" mb="sm">
              <Box
                px="xs"
                pt="xs"
                pb="xs"
                radius="xs"
                bg={theme.color.blackLight}>
                <Box dir="row" center mb="xs">
                  {(podcastData.thumbnail || item.image) && (
                    <Box mr="xs">
                      <Image
                        source={{uri: item.image ?? podcastData.thumbnail}}
                        style={s.thumbnail}
                      />
                    </Box>
                  )}
                  <Box f={1}>
                    <Text color="white" bold numberOfLines={2}>
                      {item.title}
                    </Text>
                    <Text color="grey" size="sm" numberOfLines={2}>
                      {podcastData.artist}
                    </Text>
                  </Box>

                  {props.favorites.findIndex(
                    (fav: {linkUrl: string}) => fav.linkUrl === item.linkUrl,
                  ) !== -1 ? (
                    // The episode is in favorite redux state
                    <Box ml="xs">
                      <TouchableOpacity
                        hitSlop={makeHitSlop(20)}
                        onPress={() =>
                          _toggleFavorite(
                            item,
                            podcastData.thumbnail,
                            podcastData.artist,
                          )
                        }>
                        <Icon
                          name="heart"
                          size={theme.text.size.lg}
                          color={theme.color.primary}
                        />
                      </TouchableOpacity>
                    </Box>
                  ) : (
                    <Box ml="xs">
                      <TouchableOpacity
                        hitSlop={makeHitSlop(20)}
                        onPress={() =>
                          _toggleFavorite(
                            item,
                            podcastData.thumbnail,
                            podcastData.artist,
                          )
                        }>
                        <Icon
                          name="heart-o"
                          size={theme.text.size.lg}
                          color={theme.color.white}
                        />
                      </TouchableOpacity>
                    </Box>
                  )}
                </Box>
                <Box>
                  <Text size="xs" color="white" mb="xs">
                    {new Date(item.pubDate).getDate()}{' '}
                    {getMonth(new Date(item.pubDate))}{' '}
                    {new Date(item.pubDate).getFullYear()}
                  </Text>

                  {item.description || item.summary ? (
                    <Text size="xs" color="grey" mb="xs" numberOfLines={5}>
                      {item.summary ?? item.description}
                    </Text>
                  ) : (
                    <Box dir="row" align="center">
                      <Box mr="xs">
                        <FontAwesome5
                          name={'info-circle'}
                          color={theme.color.grey}
                          size={theme.text.size.md}
                        />
                      </Box>
                      <Text color="grey" size="sm" center>
                        Aucune description
                      </Text>
                    </Box>
                  )}
                </Box>
                <Box f={1}>
                  <Box dir="row" align="center">
                    <Box mr="xs">
                      {loading ? (
                        <ActivityIndicator
                          size={theme.text.size.lg}
                          color={theme.color.primary}
                        />
                      ) : playerContext.currentTrack?.id === item.linkUrl ? (
                        playerContext.isPaused ? (
                          <TouchableOpacity
                            onPress={() => playerContext.play()}
                            hitSlop={makeHitSlop(20)}>
                            <Icon
                              name="play-circle"
                              size={theme.text.size.xl}
                              color={theme.color.primary}
                            />
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            onPress={playerContext.pause}
                            hitSlop={makeHitSlop(20)}>
                            <Icon
                              name="pause-circle"
                              size={theme.text.size.xl}
                              color={theme.color.primary}
                            />
                          </TouchableOpacity>
                        )
                      ) : (
                        <TouchableOpacity
                          hitSlop={makeHitSlop(20)}
                          onPress={() =>
                            playerContext.play({
                              id: item.linkUrl,
                              title: item.title,
                              artwork: item.image ?? podcastData.thumbnail,
                              url: item.linkUrl,
                              artist: podcastData.artist,
                              date: item.pubDate,
                              duration: item.duration,
                            })
                          }>
                          <Icon
                            name="play-circle"
                            size={theme.text.size.xl}
                            color={theme.color.primary}
                          />
                        </TouchableOpacity>
                      )}
                    </Box>
                    <Box f={1} dir="row" align="center">
                      <Text size="xs" color="primary">
                        {humanDuration(item.duration)}
                      </Text>
                      {/* <Text size="xs" color="green" ml="xs">({item.duration})</Text> */}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </TouchableOpacity>
        )}
      />
    </Box>
  )
}

const s = StyleSheet.create({
  thumbnail: {
    height: 80,
    width: 80,
    borderRadius: 5,
  },
})

const mapStateToProps = (state: any) => {
  return {
    favorites: favoritesSelector(state),
  }
}

const mapDispatchToProps = (dispatch: (arg0: any) => void) => {
  return {
    dispatch: (action: any) => {
      dispatch(action)
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PodcastDetailsScreen)
