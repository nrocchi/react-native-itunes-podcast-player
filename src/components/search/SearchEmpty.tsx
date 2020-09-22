import React from "react";
import {Box, Text} from "react-native-design-utility";
import {Image, TouchableOpacity} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {theme} from "../../constants/theme";

const SearchEmpty = () => {
  return (
    <Box f={1} px="sm">
      <Box dir="row" align="center" mb="xl" justify="center">
        <Box mr="xs">
          <FontAwesome5 name={'info-circle'} color={theme.color.grey} size={theme.text.size.md}/>
        </Box>
        <Text color="grey" size="sm" center>
          Veuillez rechercher un podcast !
        </Text>
      </Box>
      <Text color="white" size="md" mb="sm" bold>
        Recherches récentes
      </Text>
      <Box dir="row" align="center" mb="sm">
        <Box mr="xs">
          <FontAwesome5 name={'exclamation-triangle'} color={theme.color.primary} size={theme.text.size.md}/>
        </Box>
        <Text color="primary" size="sm">
          A venir V2
        </Text>
      </Box>

      <Box pr="sm" mb="sm" radius="xs" bg={theme.color.blackLight}>
        <Box dir="row" align="center">
          <Box h={70} w={70} mr="xs" radius={5} bg="primary"/>
          <Box f={1}>
            <Text color="white" bold numberOfLines={1}>
              Solid Steel Podcast
            </Text>
            <Text color="grey" size="xs" numberOfLines={1}>
              Ninja Tune
            </Text>
            <Text color="primary" size="xs" >
              56 épisodes
            </Text>
          </Box>
          <FontAwesome5 name={'times'} color={theme.color.grey} size={theme.text.size.xl}/>
        </Box>
      </Box>
      <Text color="grey">
        Effacer les dernières recherches
      </Text>
    </Box>
  )
};

export default SearchEmpty