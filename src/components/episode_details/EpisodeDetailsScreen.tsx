import React from 'react';
import { Box, Text } from 'react-native-design-utility';
import { useRoute } from '@react-navigation/native';
import {Image, ScrollView, TouchableOpacity} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import {theme} from "../../constants/theme";
import {FeedQuery_feed, SearchQuery_search} from "../../types/graphql";
import {getMonth, getWeekDay, humanDuration} from "../../lib/dateTimeHelpers";
import {usePlayerContext} from "../../context/PlayerContext";

const EpisodeDetailsScreen = () => {
  const routeParams = (useRoute().params ?? {}) as {episode: FeedQuery_feed, podcast: SearchQuery_search};
  const playerContext = usePlayerContext();

  return (
    <Box f={1} center bg="black">
      <ScrollView>
        <Box px="sm" mt="sm" style={{minWidth: '100%'}}>
          <Box center mb="md">
            <Box h={100} w={100} radius={5} mb="sm" style={{overflow: 'hidden'}}>
              <Image source={{uri: routeParams.episode.image ?? routeParams.podcast.thumbnail}} style={{flex: 1}} />
            </Box>
            <Box f={1}>
              <Text color="white" size="md" center bold numberOfLines={2}>{routeParams.episode.title}</Text>
            </Box>
          </Box>

          <Box dir="row" align="center" mb="md">
            <TouchableOpacity onPress={() => {
              playerContext.play({
                id: routeParams.episode.linkUrl,
                title: routeParams.episode.title,
                artwork: routeParams.episode.image ?? routeParams.podcast.thumbnail,
                url: routeParams.episode.linkUrl,
                artist: routeParams.podcast.artist
              })
            }}>
              <Box mr="sm">
                <FontAwesome5 name={"play"} size={30} color={theme.color.primary} />
              </Box>
            </TouchableOpacity>
            <Box>
              <Text bold size="sm" color="primary">Lancer l'épisode</Text>
              <Text size="sm" color="grey">
                {humanDuration(routeParams.episode.duration)}
              </Text>
            </Box>
          </Box>

          <Box bg="white" h={1} mb="md" />

          <Box>
            <Text size="sm" color="primary">
              {getWeekDay(new Date(routeParams.episode.pubDate))} {new Date(routeParams.episode.pubDate).getDate()} {getMonth(new Date(routeParams.episode.pubDate))} {new Date(routeParams.episode.pubDate).getFullYear()}
            </Text>
            <Box dir="row" align="center" mb="sm">
              <Text color="grey" size="sm" mr="xs">publié par</Text>
              <Text color="primary" bold size="sm" numberOfLines={1}>{routeParams.podcast.artist}</Text>
            </Box>
            <Text color="white" size="sm" style={{textAlign: "justify"}}>{routeParams.episode.description}</Text>
          </Box>
        </Box>
      </ScrollView>
    </Box>
  )
};

export default EpisodeDetailsScreen;