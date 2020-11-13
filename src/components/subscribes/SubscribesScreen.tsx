import React from 'react'
import {Box, Text} from 'react-native-design-utility'
import {FlatList, Image, StyleSheet, TouchableOpacity} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import {connect} from 'react-redux'

import {theme} from '../../constants/theme'
import {
  deleteSubscribeAction,
  sortSubscribeAction,
} from '../../store/subscribes/subscribesActions'
import {subscribesSelector} from '../../store/subscribes/subscribesSelector'
import {makeHitSlop} from '../../constants/metrics'
import {Subscribe} from '../../store/subscribes/types'

const SubscribesScreen = (props: {
  subscribes: Subscribe[] | any
  dispatch: (arg0: any) => void
}) => {
  const navigation = useNavigation()

  function _deleteSubscribe(subscribe: any) {
    props.dispatch(deleteSubscribeAction(subscribe))
  }

  function _sortSubscribe(sortType: string) {
    props.dispatch(sortSubscribeAction(sortType))
  }

  return (
    <Box f={1} bg="black" p="sm">
      <Text color="white" size="xxl" center bold>
        Abonnements
      </Text>

      <FlatList<Subscribe>
        data={props.subscribes}
        keyExtractor={(item) => item.name.toString()}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'flex-start',
        }}
        ListHeaderComponent={
          props.subscribes?.length && (
            <Box dir="row" align="center" justify="start">
              <TouchableOpacity onPress={() => _sortSubscribe('added')}>
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
              <TouchableOpacity onPress={() => _sortSubscribe('name')}>
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
                  {props.subscribes.length} podcast
                  {props.subscribes.length > 1 ? 's' : ''}
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
                Aucun abonnement
              </Text>
            </Box>
          </Box>
        }
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('PodcastDetails', {data: item})}>
            <Box mb="sm" radius="xs" bg={theme.color.blackLight}>
              <Box dir="row" align="center" mr="xs">
                {item.thumbnail && (
                  <Box h={70} w={70} mr="xs" radius={5} bg="primary">
                    <Image
                      source={{
                        uri: item.thumbnail,
                      }}
                      style={s.img}
                    />
                  </Box>
                )}
                <Box f={1} mr="xs">
                  <Text color="white" bold numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text color="grey" size="xs" numberOfLines={1}>
                    {item.artist}
                  </Text>
                  <Text color="primary" size="xs">
                    {item.episodesCount} épisodes
                  </Text>
                </Box>

                <TouchableOpacity
                  onPress={() => _deleteSubscribe(item)}
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
    subscribes: subscribesSelector(state.subscribesReducer),
  }
}

const mapDispatchToProps = (dispatch: (arg0: any) => void) => {
  return {
    dispatch: (action: any) => {
      dispatch(action)
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubscribesScreen)
