import React from 'react'
import {Box} from 'react-native-design-utility'
import {ActivityIndicator, StyleSheet, Dimensions} from 'react-native'

import {theme} from '../../constants/theme'

const {width, height} = Dimensions.get('window')

const SearchLoader = () => {
  return (
    <Box f={1} center mt="xl">
      <ActivityIndicator size="large" color={theme.color.primary} />
    </Box>
  )
}

export default SearchLoader
