import React from 'react'
import {Box, Text} from 'react-native-design-utility'

import {Image, ScrollView, StyleSheet, TouchableOpacity} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import {theme} from '../../constants/theme'
import {DBContext} from '../../context/DBContext'
import HomeTabNavigator from '../../navigators/HomeTabNavigator'

const LibraryScreen = () => {
  const dbContext = React.useContext(DBContext)
  const navigation = useNavigation()

  return (
    <Box f={1} bg="black" py="sm">
      <Text color="white" size="xxl" center bold>
        Accueil
      </Text>
      <HomeTabNavigator />
    </Box>
  )
}

const s = StyleSheet.create({
  img: {
    flex: 1,
    borderRadius: 5,
  },
})

export default LibraryScreen
