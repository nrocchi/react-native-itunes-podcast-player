import React from 'react'
import {Box, Text} from 'react-native-design-utility'

import {Image, ScrollView, StyleSheet, TouchableOpacity} from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import {useNavigation} from '@react-navigation/native'
import {theme} from '../../constants/theme'
import {DBContext} from '../../context/DBContext'

const ListenNowScreen = () => {
  const dbContext = React.useContext(DBContext)
  const navigation = useNavigation()

  return (
    <Box f={1} bg="black">
      <Text color="white" mt="sm" mb="sm" size="xxl" center bold>
        Accueil
      </Text>

      <Box f={2} px="sm" mb="sm">
        <Text size="md" color="white" bold>
          Dernières sorties
        </Text>
        <Text size="xs" mb="xs" color={theme.color.grey}>
          10 épisodes
        </Text>
        <ScrollView>
          <Box pr="xs" radius="xs" bg={theme.color.blackLight} mb="sm">
            <Box dir="row" align="center">
              <Box h={60} w={60} mr="xs" radius={5} bg="primary"></Box>
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
      </Box>
      <Box f={2} px="sm" mb="sm">
        <Text size="md" color="white" bold>
          Dernières écoutes
        </Text>
        <Text size="xs" mb="xs" color={theme.color.grey}>
          10 épisodes
        </Text>
        <ScrollView>
          <Box pr="xs" radius="xs" bg={theme.color.blackLight} mb="sm">
            <Box dir="row" align="center">
              <Box h={60} w={60} mr="xs" radius={5} bg="primary"></Box>
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
      </Box>
    </Box>
  )
}

const s = StyleSheet.create({
  img: {
    flex: 1,
    borderRadius: 5,
  },
})

export default ListenNowScreen
