import React from 'react'
import {Dimensions, Linking, View, Text} from 'react-native'
import HTML from 'react-native-render-html'

import {theme} from '../../constants/theme'

interface Props {
  html: string
}

const HTMLReader = (props: Props) => {
  return (
    <HTML
      html={props.html}
      imagesMaxWidth={Dimensions.get('window').width}
      onLinkPress={(event, href) => {
        Linking.openURL(href)
      }}
      tagsStyles={{
        h1: {color: theme.color.white, marginTop: 10, marginBottom: 20},
        h2: {color: theme.color.white, marginTop: 10, marginBottom: 20},
        h3: {color: theme.color.white, marginTop: 10, marginBottom: 20},
        h4: {color: theme.color.white, marginTop: 10, marginBottom: 20},
        h5: {color: theme.color.white, marginTop: 10, marginBottom: 20},
        h6: {color: theme.color.white, marginTop: 10, marginBottom: 20},
        p: {
          color: theme.color.grey,
          marginTop: 0,
          marginBottom: 10,
          textAlign: 'justify',
        },
        ul: {color: theme.color.grey},
        ol: {color: theme.color.grey},
        a: {color: theme.color.primary, fontWeight: 'bold'},
        code: {color: theme.color.primary},
      }}
      // renderers={{
      //   hr: () => (
      //     <View
      //       style={{
      //         width: '100%',
      //         height: 1,
      //         backgroundColor: theme.color.white,
      //       }}
      //     />
      //   ),
      //   ul: (htmlAttribs, children, convertedCSSStyles, passProps) => {
      //     return <Text style={{color: 'white', display: 'flex'}}>•</Text>
      //   },
      // }}
    />
  )
}

export default HTMLReader
