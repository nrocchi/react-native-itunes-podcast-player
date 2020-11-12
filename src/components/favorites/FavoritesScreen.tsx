import React from 'react'
import {Box, Text} from 'react-native-design-utility'
import {connect} from 'react-redux'
import {FlatList, Image, StyleSheet, TouchableOpacity} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Icon from 'react-native-vector-icons/FontAwesome'
import {theme} from '../../constants/theme'
import {getMonth, humanDuration} from '../../lib/dateTimeHelpers'
import {usePlayerContext} from '../../context/PlayerContext'
import {makeHitSlop} from '../../constants/metrics'
import {favoritesSelector} from '../../store/favorites/favoritesSelector'
import {
  deleteFavoriteAction,
  sortFavoriteAction,
} from '../../store/favorites/favoritesActions'

const FavoritesScreen = (props: {
  favorites: any
  dispatch: (arg0: any) => void
}) => {
  const navigation = useNavigation()
  const playerContext = usePlayerContext()

  function _deleteFavorite(favorite: any) {
    props.dispatch(deleteFavoriteAction(favorite))
  }

  function _sortFavorite(sortType: string) {
    props.dispatch(sortFavoriteAction(sortType))
  }

  return (
    <Box f={1} bg="black" p="sm">
      <Text color="white" size="xxl" center bold>
        Favoris
      </Text>

      <FlatList
        data={props.favorites}
        keyExtractor={(item) => item.linkUrl.toString()}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'flex-start',
        }}
        ListHeaderComponent={
          props.favorites?.length && (
            <Box dir="row" align="center" justify="start">
              <TouchableOpacity onPress={() => _sortFavorite('added')}>
                <Box dir="row" align="center" mr="sm">
                  <FontAwesome5
                    name={'sort-amount-up-alt'}
                    color={theme.color.grey}
                    size={theme.text.size.md}
                  />

                  <Text color="grey" bold ml={5} size="sm">
                    Date
                  </Text>
                </Box>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => _sortFavorite('title')}>
                <Box dir="row" align="center" mr="sm">
                  <FontAwesome5
                    name={'sort-amount-up-alt'}
                    color={theme.color.grey}
                    size={theme.text.size.md}
                  />

                  <Text color="grey" bold ml={5} size="sm">
                    Titre
                  </Text>
                </Box>
              </TouchableOpacity>

              <Box f={1} align="end">
                <Text color="primary" mb="xs" size="sm">
                  {props.favorites.length} épisode
                  {props.favorites.length > 1 ? 's' : ''}
                </Text>
              </Box>
            </Box>
          )
        }
        ListEmptyComponent={
          <Box f={1} center>
            <Box
              dir="row"
              align="center"
              justify="center"
              bg="blackLight"
              radius={5}
              p="sm">
              <Box mr="xs">
                <FontAwesome5
                  name={'info-circle'}
                  color={theme.color.white}
                  size={theme.text.size.md}
                />
              </Box>
              <Text color="white" size="sm" center>
                Aucun épisode
              </Text>
            </Box>
          </Box>
        }
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('EpisodeDetails', {
                episode: item,
                podcast: {},
                podcastThumb: item.thumbnail,
                podcastName: item.podcastName,
              })
            }>
            <Box mb="sm" radius="xs" bg={theme.color.blackLight}>
              <Box dir="row" align="center" mr="xs">
                {(item.image || item.thumbnail) && (
                  <Box h={70} w={70} mr="xs" radius={5} bg="primary">
                    <Image
                      source={{
                        uri: item.image || item.thumbnail,
                      }}
                      style={s.img}
                    />
                  </Box>
                )}
                <Box f={1} mr="xs">
                  <Text color="white" bold numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text color="grey" size="xs" numberOfLines={1}>
                    {item.author || item.podcastName}
                  </Text>

                  <Box dir="row" align="center" justify="between">
                    <Box mr="xs">
                      {playerContext.currentTrack?.id === item.linkUrl ? (
                        playerContext.isPaused ? (
                          <TouchableOpacity
                            hitSlop={makeHitSlop(20)}
                            onPress={() => playerContext.play()}>
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
                              artwork: item.image || item.thumbnail,
                              url: item.linkUrl,
                              artist: item.author || item.podcastName,
                              date: item.pubDate,
                              duration: parseFloat(item.duration),
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

                    <Box f={1} dir="row">
                      <Text size="xs" color="primary">
                        {item.duration && humanDuration(item.duration)}
                      </Text>
                      {/* <Text size="xs" color="green" ml="xs">
                        ({item.duration})
                      </Text> */}
                    </Box>

                    <Text size="xs" color="grey">
                      {item.pubDate && new Date(item.pubDate).getDate()}{' '}
                      {item.pubDate && getMonth(new Date(item.pubDate))}{' '}
                      {item.pubDate && new Date(item.pubDate).getFullYear()}
                    </Text>
                  </Box>
                </Box>

                <TouchableOpacity
                  onPress={() => _deleteFavorite(item)}
                  hitSlop={makeHitSlop(20)}>
                  <FontAwesome5
                    name={'times'}
                    color={theme.color.grey}
                    size={theme.text.size.xl}
                  />
                </TouchableOpacity>
              </Box>
            </Box>
          </TouchableOpacity>
        )}
      />
    </Box>
  )
}

const s = StyleSheet.create({
  img: {
    flex: 1,
    borderRadius: 5,
  },
})

const mapStateToProps = (state: any) => {
  return {
    favorites: favoritesSelector(state.favoritesReducer),
  }
}

const mapDispatchToProps = (dispatch: (arg0: any) => void) => {
  return {
    dispatch: (action: any) => {
      dispatch(action)
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesScreen)
