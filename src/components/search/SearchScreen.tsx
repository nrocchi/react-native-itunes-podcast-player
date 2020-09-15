import React from 'react';
import {Box, Text} from 'react-native-design-utility';
import {FlatList, StyleSheet, TextInput} from 'react-native';
import {useLazyQuery} from "@apollo/react-hooks";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {theme} from '../../constants/theme';
import {SearchQuery, SearchQuery_search, SearchQueryVariables} from "../../types/graphql";
import searchQuery from "../../graphql/query/searchQuery";
import SearchEmpty from "./SearchEmpty";
import SearchTile from "./SearchTile";
import SearchLoader from "./SearchLoader";

const SearchScreen = () => {

  const [term, setTerm] = React.useState<string>('');
  const [search, {data, loading, error}] = useLazyQuery<SearchQuery, SearchQueryVariables>(searchQuery);

  const onSearch = async () => {
      try {
        await search({variables: {term}});
      } catch (error) {
        console.log('error', error);
    }
  };

  return (
    <Box f={1} bg="black">
      <Text color="white" mt="xl" size="xxl" center bold>Recherche</Text>
      <Box h={50} w="100%" px="sm" my="sm">
        <Box dir="row" align="center" h={40} bg="greyLightest" radius={5} px="sm">
          <Box mr="xs">
            <FontAwesome5 name={"search"} size={theme.text.size.md} color={theme.color.grey} />
          </Box>
          <TextInput
            style={s.input}
            placeholder="Artistes, titres ou podcasts"
            selectionColor={theme.color.primary}
            onChangeText={setTerm}
            autoCorrect={false}
            onSubmitEditing={onSearch}
            value={term}
          />
        </Box>
      </Box>

      {error ? (
        <Box f={1} center>
          <Text color="primary">
            {error.message}
          </Text>
        </Box>
      ) : (
        <FlatList<SearchQuery_search>
          keyboardShouldPersistTaps="never"
          contentContainerStyle={s.listContentContainer}
          data={data?.search ?? []}
          ListHeaderComponent={
            <>
              {loading && (
                <SearchLoader />
              )}
            </>
          }
          ListEmptyComponent={
            <>
              {!loading && (
                <SearchEmpty />
              )}
            </>
          }
          keyExtractor={(item) => String(item.feedUrl)}
          renderItem={({item}) => (<SearchTile item={item}/>)}
        />
      )}
    </Box>
  )
};

const s = StyleSheet.create({
  input: {
    flex: 1,
    fontSize: theme.text.size.sm
  },
  listContentContainer: {
    // paddingBottom: 90
  }
});

export default SearchScreen