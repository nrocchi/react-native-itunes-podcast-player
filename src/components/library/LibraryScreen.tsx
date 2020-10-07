import React from 'react'
import {Box, Text} from 'react-native-design-utility'

import {Image, ScrollView, StyleSheet, TouchableOpacity} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import {theme} from '../../constants/theme'
import {DBContext} from '../../context/DBContext'

const LibraryScreen = () => {
  const dbContext = React.useContext(DBContext)
  const navigation = useNavigation()

  return (
    <Box f={1} bg="black">
      <Text color="white" mt="sm" mb="sm" size="xxl" center bold>
        Abonnements
      </Text>
      <ScrollView>
        <Box px="sm" mb="sm">
          {dbContext.podcasts.map((podcast) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('PodcastDetails', {data: podcast})
              }
              key={podcast.feedUrl}>
              <Box pr="xs" radius="xs" bg={theme.color.blackLight} mb="sm">
                <Box dir="row" align="center">
                  <Box h={70} w={70} mr="xs" radius={5} bg="primary">
                    {podcast.thumbnail && (
                      <Image source={{uri: podcast.thumbnail}} style={s.img} />
                    )}
                  </Box>
                  <Box f={1}>
                    <Text color="white" bold numberOfLines={1}>
                      {podcast.name}
                    </Text>
                    <Text color="grey" size="xs" numberOfLines={1}>
                      {podcast.artist}
                    </Text>
                    <Text color="primary" size="xs">
                      {podcast.episodesCount} épisodes
                    </Text>
                  </Box>

                  <FontAwesome5
                    name={'times'}
                    color={theme.color.grey}
                    size={theme.text.size.xl}
                  />
                </Box>
              </Box>
            </TouchableOpacity>
          ))}
        </Box>
      </ScrollView>
    </Box>
  )
}

const s = StyleSheet.create({
  img: {
    flex: 1,
    borderRadius: 5,
  },
})

export default LibraryScreen
