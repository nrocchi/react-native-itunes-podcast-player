import React from 'react'
import {ActivityIndicator} from 'react-native'

import {theme} from '../../constants/theme'

const SearchLoader = () => {
  return <ActivityIndicator size="large" color={theme.color.primary} />
}

export default SearchLoader
