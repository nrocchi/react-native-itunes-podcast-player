import React from 'react'
import {Box, Text} from 'react-native-design-utility'
import {FlatList, StyleSheet, TextInput} from 'react-native'
import {useLazyQuery} from '@apollo/react-hooks'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import {theme} from '../../constants/theme'
import {
  SearchQuery,
  SearchQuery_search,
  SearchQueryVariables,
} from '../../types/graphql'
import searchQuery from '../../graphql/query/searchQuery'
import SearchEmpty from './SearchEmpty'
import SearchTile from './SearchTile'
import SearchLoader from './SearchLoader'

const SearchScreen = () => {
  const [term, setTerm] = React.useState<string>('')
  const [search, {data, loading, error}] = useLazyQuery<
    SearchQuery,
    SearchQueryVariables
  >(searchQuery)

  const onSearch = async () => {
    try {
      await search({variables: {term}})
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <Box f={1} bg="black" p="sm">
      <Text color="white" size="xxl" center bold mb="xs">
        Recherche
      </Text>

      <Box
        dir="row"
        align="center"
        h={50}
        bg="blackLight"
        radius={5}
        px="sm"
        mb="xs">
        <Box mr="xs">
          <FontAwesome5
            name={'search'}
            size={theme.text.size.md}
            color={theme.color.grey}
          />
        </Box>
        <TextInput
          style={s.input}
          placeholder="Artistes, podcasts ou épisodes"
          placeholderTextColor={theme.color.grey}
          selectionColor={theme.color.primary}
          onChangeText={setTerm}
          autoCorrect={false}
          onSubmitEditing={onSearch}
          value={term}
        />
      </Box>

      {error ? (
        <Box f={1} center>
          <Text color="primary">{error.message}</Text>
        </Box>
      ) : (
        <FlatList<SearchQuery_search>
          keyboardShouldPersistTaps="never"
          contentContainerStyle={s.listContentContainer}
          data={data?.search ?? []}
          ListHeaderComponent={
            <>
              {loading ? (
                <SearchLoader />
              ) : data?.search ? (
                data?.search.length === 0 ? (
                  <Box dir="row" align="center" justify="center" mb="sm">
                    <Box mr="xs">
                      <FontAwesome5
                        name={'exclamation-circle'}
                        color={theme.color.primary}
                        size={theme.text.size.md}
                      />
                    </Box>
                    <Text color="primary" size="sm" center>
                      Aucun résultat
                    </Text>
                  </Box>
                ) : (
                  <Text color="primary" mb="xs" size="sm" right>
                    {data?.search.length} résultat
                    {data?.search.length > 1 ? 's' : ''}
                  </Text>
                )
              ) : (
                <Box dir="row" align="center" justify="center" mb="md">
                  <Box mr="xs">
                    <FontAwesome5
                      name={'info-circle'}
                      color={theme.color.primary}
                      size={theme.text.size.md}
                    />
                  </Box>
                  <Text color="primary" size="sm" center>
                    Veuillez rechercher un podcast !
                  </Text>
                </Box>
              )}
            </>
          }
          ListEmptyComponent={<>{!loading && <SearchEmpty />}</>}
          keyExtractor={(item) => String(item.feedUrl)}
          renderItem={({item}) => <SearchTile item={item} />}
        />
      )}
    </Box>
  )
}

const s = StyleSheet.create({
  input: {
    flex: 1,
    fontSize: theme.text.size.md,
    color: theme.color.white,
  },
  listContentContainer: {
    // paddingBottom: 90
  },
})

export default SearchScreen
