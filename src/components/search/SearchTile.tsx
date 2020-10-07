import React from 'react'
import {Box, Text} from 'react-native-design-utility'
import {Image, StyleSheet, TouchableOpacity} from 'react-native'
import {useNavigation} from '@react-navigation/native'

import {SearchQuery_search} from '../../types/graphql'
import {theme} from '../../constants/theme'

interface Props {
  item: SearchQuery_search
}

const SearchTile: React.FC<Props> = (props: {item: SearchQuery_search}) => {
  const navigation = useNavigation()

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('PodcastDetails', {data: props.item})}>
      <Box px="sm" mb="sm">
        <Box pr="xs" radius="xs" bg={theme.color.blackLight}>
          <Box dir="row" align="center">
            <Box h={70} w={70} mr="xs" radius={5} bg="primary">
              {props.item.thumbnail && (
                <Image source={{uri: props.item.thumbnail}} style={s.img} />
              )}
            </Box>
            <Box f={1}>
              <Text color="white" bold numberOfLines={1}>
                {props.item.podcastName}
              </Text>
              <Text color="grey" size="xs" numberOfLines={1}>
                {props.item.artist}
              </Text>
              <Text color="primary" size="xs">
                {props.item.episodesCount} épisodes
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </TouchableOpacity>
  )
}

const s = StyleSheet.create({
  img: {
    flex: 1,
    borderRadius: 5,
  },
})

export default SearchTile
