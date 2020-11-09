import React from 'react'
import {Box, Text} from 'react-native-design-utility'
import {Image, ScrollView, StyleSheet, TouchableOpacity} from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import {useNavigation} from '@react-navigation/native'
import {theme} from '../../constants/theme'

const SearchEmpty = () => {
  const navigation = useNavigation()

  return (
    <>
      {/* <Box f={1} center mb="sm">
        <Box
          dir="row"
          align="center"
          justify="center"
          bg="blackLight"
          radius={5}
          p="xs">
          <Box mr="xs">
            <FontAwesome5
              name={'exclamation-triangle'}
              color={theme.color.white}
              size={theme.text.size.md}
            />
          </Box>
          <Text color="white" size="sm" center>
            Aucun résultat
          </Text>
        </Box>
      </Box> */}

      <Text color="white" size="md" mb="xs" bold>
        Recherches récentes
      </Text>

      <ScrollView>
        <Box pr="xs" radius="xs" bg={theme.color.blackLight} mb="sm">
          <Box dir="row" align="center">
            <Box
              h={60}
              w={60}
              mr="xs"
              radius={5}
              bg="primary"
              dir="row"
              align="center"
              justify="center">
              <FontAwesome5
                name={'camera'}
                color={theme.color.white}
                size={theme.text.size.xl}
              />
            </Box>
            <Box f={1}>
              <Text color="white" bold numberOfLines={1}>
                Title
              </Text>
              <Text color="grey" size="xs" numberOfLines={1}>
                Artist
              </Text>
              <Text color="primary" size="xs">
                Duration
              </Text>
            </Box>
            <FontAwesome5
              name={'times'}
              color={theme.color.grey}
              size={theme.text.size.xl}
            />
          </Box>
        </Box>
      </ScrollView>

      <Text color="grey">Effacer les dernières recherches</Text>
    </>
  )
}

const s = StyleSheet.create({
  img: {
    flex: 1,
    borderRadius: 5,
  },
})

export default SearchEmpty
