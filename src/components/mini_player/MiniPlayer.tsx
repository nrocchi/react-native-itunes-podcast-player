import React from "react";
import {Box, Text} from 'react-native-design-utility';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Image, TouchableOpacity} from "react-native";

import {usePlayerContext} from "../../context/PlayerContext";
import {theme} from "../../constants/theme";

const MiniPlayer = () => {
  const playerContext = usePlayerContext();

  if (playerContext.isEmpty || !playerContext.currentTrack) {
    return null;
  }

  return (
    <Box h={70} bg="blackLight" px="sm" style={{borderTopWidth: 1, borderTopColor: theme.color.grey}}>
      <Box f={1} dir="row" align="center">
        <Box h={50} w={50} bg="primary" radius={5} mr="sm" style={{overflow: 'hidden'}}>
          <Image source={{uri: playerContext.currentTrack.artwork}} style={{flex: 1}}/>
        </Box>
        <Box f={1} mr="md">
          <Text numberOfLines={1} color="white" size="sm">{playerContext.currentTrack.title}</Text>
        </Box>
        <Box mr="sm">
          <TouchableOpacity onPress={() => playerContext.seekToBackward()}>
            <FontAwesome5 name={'backward'} color={theme.color.primary} size={theme.text.size.lg}/>
          </TouchableOpacity>
        </Box>
        <Box mr="sm">
          {playerContext.isPaused ? (
            <TouchableOpacity onPress={() => playerContext.play()}>
              <FontAwesome5 name={'play'} color={theme.color.primary} size={theme.text.size.lg}/>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={playerContext.pause}>
              <FontAwesome5 name={'pause'} color={theme.color.primary} size={theme.text.size.lg}/>
            </TouchableOpacity>
          )}
        </Box>
        <Box>
          <TouchableOpacity onPress={() => playerContext.seekToForward()}>
            <FontAwesome5 name={'forward'} color={theme.color.primary} size={theme.text.size.lg}/>
          </TouchableOpacity>
        </Box>
      </Box>
    </Box>
  )
};

export default MiniPlayer;