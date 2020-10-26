import React from 'react'
import {Box, Text} from 'react-native-design-utility'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import {Image, TouchableOpacity} from 'react-native'

import {useNavigation} from '@react-navigation/native'
import {usePlayerContext} from '../../context/PlayerContext'
import {theme} from '../../constants/theme'
import {makeHitSlop} from '../../constants/metrics'

const MiniPlayer = () => {
  const playerContext = usePlayerContext()
  const navigation = useNavigation()

  if (playerContext.isEmpty || !playerContext.currentTrack) {
    return null
  }

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Player')}>
      <Box
        h={70}
        bg="blackLight"
        px="sm"
        style={{borderTopWidth: 1, borderTopColor: theme.color.grey}}>
        <Box f={1} dir="row" align="center">
          <Box
            h={60}
            w={60}
            bg="primary"
            radius={5}
            mr="xs"
            style={{overflow: 'hidden'}}>
            <Image
              source={{uri: playerContext.currentTrack.artwork}}
              style={{flex: 1}}
            />
          </Box>
          <Box f={1} mr="xs">
            <Text numberOfLines={2} color="white" size="sm">
              {playerContext.currentTrack.title}
            </Text>
          </Box>
          <Box mr="sm">
            <TouchableOpacity
              onPress={() => playerContext.seekTo(-30)}
              hitSlop={makeHitSlop(20)}>
              <FontAwesome5
                name={'backward'}
                color={theme.color.primary}
                size={theme.text.size.lg}
              />
            </TouchableOpacity>
          </Box>
          <Box mr="sm">
            {playerContext.isPaused ? (
              <TouchableOpacity
                onPress={() => playerContext.play()}
                hitSlop={makeHitSlop(20)}>
                <FontAwesome5
                  name={'play'}
                  color={theme.color.primary}
                  size={theme.text.size.xl}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={playerContext.pause}
                hitSlop={makeHitSlop(20)}>
                <FontAwesome5
                  name={'pause'}
                  color={theme.color.primary}
                  size={theme.text.size.xl}
                />
              </TouchableOpacity>
            )}
          </Box>
          <Box>
            <TouchableOpacity
              onPress={() => playerContext.seekTo()}
              hitSlop={makeHitSlop(20)}>
              <FontAwesome5
                name={'forward'}
                color={theme.color.primary}
                size={theme.text.size.lg}
              />
            </TouchableOpacity>
          </Box>
        </Box>
      </Box>
    </TouchableOpacity>
  )
}

export default MiniPlayer
