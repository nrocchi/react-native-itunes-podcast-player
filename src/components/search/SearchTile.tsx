import React from "react";
import {Box, Text} from "react-native-design-utility";
import {Image, StyleSheet, TouchableOpacity} from "react-native";
import { useNavigation } from '@react-navigation/native';

import {SearchQuery_search} from "../../types/graphql";

interface Props {
  item: SearchQuery_search
}

const SearchTile: React.FC<Props> = (props: { item: SearchQuery_search }) => {

  const navigation = useNavigation();

  return <Box h={90} dir="row" align="center" px="sm" bg="black">
    <Box h={70} w={70} mr={10} radius={5} bg="primary">
      {props.item.thumbnail && <Image source={{uri: props.item.thumbnail}} style={s.img}/>}
    </Box>
    <Box f={1}>
      <Text color="white" bold>
        {props.item.podcastName}
      </Text>
      <Text color="grey" size="xs">
        {props.item.artist}
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate('PodcastDetails', {data: props.item})}>
        <Text color="primary" size="xs" >
          {props.item.episodesCount} episodes
        </Text>
      </TouchableOpacity>
    </Box>
  </Box>;
};

const s = StyleSheet.create({
  img: {
    flex: 1,
    borderRadius: 5
  }
});

export default SearchTile