import React from 'react';
import {Box, Text} from 'react-native-design-utility';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Image, ScrollView, TouchableOpacity} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import {theme} from "../../constants/theme";
import {FeedQuery_feed, SearchQuery_search} from "../../types/graphql";
import {getMonth, getWeekDay, humanDuration} from "../../lib/dateTimeHelpers";
import {usePlayerContext} from "../../context/PlayerContext";
import HTMLReaderGrey from '../utils/HTMLReaderGrey';

const EpisodeDetailsScreen = () => {
  const routeParams = (useRoute().params ?? {}) as { episode: FeedQuery_feed, podcast: SearchQuery_search };
  const playerContext = usePlayerContext();
  const navigation = useNavigation();

  return (
    <Box f={1} center bg="black">
      <ScrollView>
        <Box px="sm" mt="sm" style={{minWidth: '100%'}}>
          <Box center>
            <Box h={100} w={100} radius={5} mb="sm" style={{overflow: 'hidden'}}>
              <Image source={{uri: routeParams.episode.image ?? routeParams.podcast.thumbnail}} style={{flex: 1}}/>
            </Box>
          </Box>

          <Text color="white" mb="sm" size="xl" bold>{routeParams.episode.title}</Text>

          <Box f={1} mb="sm">
            <Box dir="row" align="center" px="sm" py="xs" radius="xs" bg={theme.color.blackLight}>
              <Box mr="sm">
                {/*<FontAwesome5 name={"play"} size={30} color={theme.color.primary} />*/}
                {playerContext.isPlaying && (playerContext.currentTrack?.id === routeParams.episode.linkUrl) ? (
                  <TouchableOpacity onPress={() => {
                    playerContext.pause()
                  }}>
                    <FontAwesome5 name={'pause'} color={theme.color.primary} size={theme.text.size.lg}/>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={() => {
                    playerContext.play({
                      id: routeParams.episode.linkUrl,
                      title: routeParams.episode.title,
                      artwork: routeParams.episode.image ?? routeParams.podcast.thumbnail,
                      url: routeParams.episode.linkUrl,
                      artist: routeParams.podcast.artist
                    })
                  }}>
                    <FontAwesome5 name={'play'} color={theme.color.primary} size={theme.text.size.lg}/>
                  </TouchableOpacity>
                )}
              </Box>
              <Box>
                <Text bold color="primary">
                  {playerContext.isPlaying && (playerContext.currentTrack?.id === routeParams.episode.linkUrl) ? 'Pause' : 'Lecture'}
                </Text>
                <Text size="xs" color="white">
                  {humanDuration(routeParams.episode.duration)}
                </Text>
              </Box>
            </Box>
          </Box>

          <Box px="sm" pt="xs" pb="sm" mb="md" radius="xs" bg={theme.color.blackLight}>
            <Text size="xs" mb="xs" color="white">
              {getWeekDay(new Date(routeParams.episode.pubDate))} {new Date(routeParams.episode.pubDate).getDate()} {getMonth(new Date(routeParams.episode.pubDate))} {new Date(routeParams.episode.pubDate).getFullYear()}
            </Text>
            <Text color="white" bold size="sm" mb="sm">{routeParams.podcast.artist}</Text>
            <HTMLReaderGrey html={routeParams.episode.description}/>
            {/*<Text color="green" size="sm" style={{textAlign: "justify"}}>{routeParams.episode.description}</Text>*/}
          </Box>

          <TouchableOpacity onPress={() => navigation.navigate('PodcastDetails', {data: routeParams.podcast})}>
            <Box dir="row" align="center" justify="between" mb="xl">
              <Text color="grey">
                Voir tous les épisodes
              </Text>
              <FontAwesome5 name={'arrow-right'} color={theme.color.grey} size={theme.text.size.xl}/>
            </Box>
          </TouchableOpacity>

        </Box>
      </ScrollView>
    </Box>
  )
};

export default EpisodeDetailsScreen;