import React from 'react';
import {Box, Text} from 'react-native-design-utility';
import {SearchStackRouteParamsList} from "../../navigators/types";
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {ActivityIndicator, FlatList, Image, StyleSheet, TouchableOpacity} from "react-native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {theme} from "../../constants/theme";
import {useQuery} from "@apollo/react-hooks";
import feedQuery from "../../graphql/query/feedQuery";
import {FeedQuery, FeedQueryVariables} from "../../types/graphql";
import {getMonth, humanDuration} from "../../lib/dateTimeHelpers";
import {usePlayerContext} from "../../context/PlayerContext";

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
        data={data?.feed}
        keyExtractor={(item) => item.linkUrl}
        /*ItemSeparatorComponent={() =>
          <Box w="100%" px="sm" my="sm">
            <Box style={{height: StyleSheet.hairlineWidth}} bg="white"/>
          </Box>
        }*/
        ListHeaderComponent={
          <>
            <Box dir="row" px="sm" mt="sm" mb="sm" center>
              {podcastData.thumbnail && (
                <Box mr="sm">
                  <Image source={{uri: podcastData.thumbnail}} style={s.thumbnail}/>
                </Box>
              )}
              <Box f={1}>
                <Text color="white" size="xl" bold>{podcastData.podcastName}</Text>
                <Text color="grey" size="sm" mb="xs">{podcastData.artist}</Text>
                <Box dir="row" align="center">
                  <Box radius="sm" bg={theme.color.primary} px="xs" py={5} center>
                    <Text color="white" bold size="xs" uppercase>S'abonner</Text>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box f={1} px="sm" mb="sm">
              <Box dir="row" align="center" px="sm" py="xs" radius="xs" bg={theme.color.blackLight}>
                <Box mr="sm">
                  {/*<FontAwesome5 name={"play"} size={30} color={theme.color.primary} />*/}
                  {playerContext.isPlaying && (playerContext.currentTrack?.id === data?.feed[0].linkUrl) ? (
                    <TouchableOpacity onPress={() => {
                      playerContext.pause()
                    }}>
                      <FontAwesome5 name={'pause'} color={theme.color.primary} size={theme.text.size.xl}/>
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
                      <FontAwesome5 name={'play'} color={theme.color.primary} size={theme.text.size.xl}/>
                    </TouchableOpacity>
                  )}
                </Box>
                <Box f={1}>
                  <Text color="primary" bold>Lire le dernier épisode</Text>
                  <Text color="white" size="sm">{data?.feed[0].title}</Text>
                </Box>
              </Box>
            </Box>
            <Box f={1} px="sm" mb="md">
              <Box dir="row">
                {podcastData.genres.map((item, key) => (
                  <Box key={key} radius="sm" bg={theme.color.primary} px="xs" py={3} mr="xs">
                    <Text color="white" bold size="xs">{item}</Text>
                  </Box>)
                )}
              </Box>
              {/*<Text color={theme.color.green} bold size="xs" mt="xs">{podcastData.genres}</Text>*/}
            </Box>
            <Box px="sm">
              <Text size="md" color="white" bold>Tous les épisodes</Text>
            </Box>
            <Box px="sm" mb="sm">
              <Text size="xs" color={theme.color.grey}>{podcastData.episodesCount} épisodes</Text>
            </Box>
            {loading && (
              <Box h={300} center>
                <ActivityIndicator size="large" color={theme.color.primary}/>
              </Box>
            )}
          </>
        }
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('EpisodeDetails', {episode: item, podcast: podcastData})}>
            <Box px="sm" mb="sm">
              <Box px="sm" pt="xs" pb="sm" radius="xs" bg={theme.color.blackLight}>
                <Box dir="row" center mb="sm">
                  {(podcastData.thumbnail || item.image) && (
                    <Box mr="sm">
                      <Image source={{uri: item.image ?? podcastData.thumbnail}} style={s.thumbnail}/>
                    </Box>
                  )}
                  <Box f={1}>
                    <Text color="white" bold numberOfLines={2}>{item.title}</Text>
                    <Text color="grey" size="sm" numberOfLines={2}>{podcastData.artist}</Text>
                  </Box>
                </Box>
                <Box>
                  <Text size="xs" color="white" mb="xs">
                    {new Date(item.pubDate).getDate()} {getMonth(new Date(item.pubDate))} {new Date(item.pubDate).getFullYear()}
                  </Text>
                  <Text size="xs" color="grey" mb="sm" numberOfLines={5}>
                    {item.summary ?? item.description}
                  </Text>
                </Box>
                <Box f={1}>
                  <Box dir="row" align="center">
                    <Box mr="xs">
                      <FontAwesome5 name={'play'} color={theme.color.primary} size={theme.text.size.lg}/>
                    </Box>
                    <Box f={1} dir="row" align="center">
                      <Text size="xs" color="primary">
                        {humanDuration(item.duration)}
                      </Text>
                      <Text size="xs" color="green" ml="xs">
                        ({item.duration})
                      </Text>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </TouchableOpacity>
        )}
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