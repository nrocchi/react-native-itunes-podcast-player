import React from 'react'
import {Box, Text} from 'react-native-design-utility'
import {Image, StyleSheet, TouchableOpacity} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

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
      <Box pr="xs" mb="sm" radius="xs" bg={theme.color.blackLight}>
        <Box dir="row" align="center">
          <Box h={70} w={70} mr="xs" radius={5} bg="primary">
            {props.item.thumbnail && (
              <Image source={{uri: props.item.thumbnail}} style={s.img} />
            )}
          </Box>
          <Box f={1} mr="xs">
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
          <FontAwesome5
            name={'chevron-right'}
            color={theme.color.grey}
            size={theme.text.size.md}
          />
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
