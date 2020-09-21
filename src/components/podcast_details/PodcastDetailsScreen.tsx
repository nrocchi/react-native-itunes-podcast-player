import React from 'react';
import {Box, Text} from 'react-native-design-utility';
import {SearchStackRouteParamsList} from "../../navigators/types";
import {RouteProp, useRoute, useNavigation} from '@react-navigation/native';
import {ActivityIndicator, FlatList, Image, StyleSheet, TouchableOpacity} from "react-native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {theme} from "../../constants/theme";
import {useQuery} from "@apollo/react-hooks";
import feedQuery from "../../graphql/query/feedQuery";
import {FeedQuery, FeedQueryVariables} from "../../types/graphql";
import {getMonth, getWeekDay, humanDuration} from "../../lib/dateTimeHelpers";
import {usePlayerContext} from "../../context/PlayerContext";
import HTMLReader from "../utils/HTMLReader";

type NavigationParams = RouteProp<SearchStackRouteParamsList, 'PodcastDetails'>;

const PodcastDetailsScreen = () => {
  const playerContext = usePlayerContext();
  const navigation = useNavigation();
  const {data: podcastData} = useRoute<NavigationParams>().params ?? {};

  const {data, loading} = useQuery<FeedQuery, FeedQueryVariables>(feedQuery, {
    variables: {
      feedUrl: podcastData.feedUrl
    }
  });

  return (
    <Box f={1} bg="black">
      <FlatList
        ListHeaderComponent={
          <>
            <Box dir="row" px="sm" mt="sm" mb="md" center>
              {podcastData.thumbnail && (

                <Box mr="sm">
                  <Image source={{uri: podcastData.thumbnail}} style={s.thumbnail} />
                </Box>
              )}
              <Box f={1}>
                <Text color="white" size="xl" bold>{podcastData.podcastName}</Text>
                <Text color="grey" size="sm">{podcastData.artist}</Text>
                <Text color="primary" size="xs" >Abonné</Text>
              </Box>
            </Box>
            <Box px="sm" mb="lg" dir="row" align="center">
              <Box mr="sm">
                  {/*<FontAwesome5 name={"play"} size={30} color={theme.color.primary} />*/}
                  {playerContext.isPlaying && (playerContext.currentTrack?.id === data?.feed[0].linkUrl) ? (
                      <TouchableOpacity onPress={() => {
                        playerContext.pause()
                      }}>
                          <FontAwesome5 name={'pause'} color={theme.color.primary} size={theme.text.size.lg} />
                      </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={() => {
                      const elt = data?.feed[0];
                      if (!elt) {
                        return
                      }
                      playerContext.play({
                        id: elt.linkUrl,
                        title: elt.title,
                        artwork: elt.image ?? podcastData.thumbnail,
                        url: elt.linkUrl,
                        artist: podcastData.artist
                      })
                    }}>
                      <FontAwesome5 name={'play'} color={theme.color.primary} size={theme.text.size.lg} />
                    </TouchableOpacity>
                  )}
              </Box>
             <Box f={1}>
               <Text color="primary" bold>Lancer le dernier épisode</Text>
               <Text color="white" size="sm">{data?.feed[0].title}</Text>
             </Box>
            </Box>
            <Box px="sm" mb="sm">
              <Text size="xl" color="white" bold>Tous les épisodes</Text>
            </Box>
            {loading && (
              <Box h={300} center>
                <ActivityIndicator size="large" color={theme.color.primary} />
              </Box>
            )}
          </>
        }
        data={data?.feed}
        ItemSeparatorComponent={() =>
          <Box w="100%" px="sm" my="sm">
            <Box style={{height: StyleSheet.hairlineWidth}} bg="white"/>
          </Box>
        }
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => navigation.navigate('EpisodeDetails', {episode: item, podcast: podcastData})}>
            <Box px="sm">
              <Text size="sm" color="primary">
                {getWeekDay(new Date(item.pubDate))} {new Date(item.pubDate).getDate()} {getMonth(new Date(item.pubDate))} {new Date(item.pubDate).getFullYear()}
              </Text>
              <Text bold color="white">
                {item.title}
              </Text>
              <Text size="xs" color="grey" numberOfLines={2}>
                {item.summary}
              </Text>
              <Text size="sm" color="primary">
                {humanDuration(item.duration)}
              </Text>
            </Box>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.linkUrl}
      />
    </Box>
  )
};

const s = StyleSheet.create({
  thumbnail: {
    height: 100,
    width: 100,
    borderRadius: 5
  }
});

export default PodcastDetailsScreen;