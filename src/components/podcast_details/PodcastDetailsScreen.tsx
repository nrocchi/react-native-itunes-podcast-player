import React from 'react';
import {Box, Text} from 'react-native-design-utility';
import {SearchStackRouteParamsList} from "../../navigators/types";
import {RouteProp, useRoute} from '@react-navigation/native';
import {ActivityIndicator, FlatList, Image, StyleSheet} from "react-native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {theme} from "../../constants/theme";
import {useQuery} from "@apollo/react-hooks";
import feedQuery from "../../graphql/query/feedQuery";
import {FeedQuery, FeedQueryVariables} from "../../types/graphql";
import {getMonth, getWeekDay, humanDuration} from "../../lib/dateTimeHelpers";

type NavigationParams = RouteProp<SearchStackRouteParamsList, 'PodcastDetails'>;

const PodcastDetailsScreen = () => {
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
            <Box dir="row" px="sm" mt="sm" mb="md">
              {podcastData.thumbnail && (
                <Box mr="sm">
                  <Image source={{uri: podcastData.thumbnail}} style={s.thumbnail} />
                </Box>
              )}
              <Box f={1}>
                <Text color="white" size="lg" bold>{podcastData.podcastName}</Text>
                <Text color="grey" size="xs">{podcastData.artist}</Text>
                <Text color="primary" size="xs" >Abonné</Text>
              </Box>
            </Box>
            <Box px="sm" mb="lg" dir="row" align="center">
              <Box mr="sm">
                <FontAwesome5 name={"play"} size={30} color={theme.color.primary} />
              </Box>
             <Box f={1}>
               <Text color="white" bold>Ecouter le dernier épisode</Text>
               <Text color="primary" size="sm">{data?.feed[0].title}</Text>
             </Box>
            </Box>
            <Box px="sm" mb="md">
              <Text size="lg" color="white" bold>Tous les épisodes</Text>
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
          <Box px="sm">
            <Text size="sm" color="grey">
              {getWeekDay(new Date(item.pubDate))} {new Date(item.pubDate).getDate()} {getMonth(new Date(item.pubDate))} {new Date(item.pubDate).getFullYear()}
            </Text>
            <Text bold color="primary">
              {item.title}
            </Text>
            <Text size="xs" color="white" numberOfLines={2}>
              {item.description}
            </Text>
            <Text size="sm" color="grey">
              {humanDuration(item.duration)}
            </Text>
          </Box>
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