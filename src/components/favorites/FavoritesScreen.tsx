import React from 'react'
import {Box, Text} from 'react-native-design-utility'

import {ScrollView} from 'react-native'

const FavoritesScreen = () => {
  return (
    <Box f={1} bg="black">
      <Text color="white" mt="sm" mb="sm" size="xxl" center bold>
        Favoris
      </Text>
      <ScrollView>
        <Box px="sm" mb="sm" />
      </ScrollView>
    </Box>
  )
}

export default FavoritesScreen
