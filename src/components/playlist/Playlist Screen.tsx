import React from 'react'
import {Box, Text} from 'react-native-design-utility'

import {useNavigation} from '@react-navigation/native'
import {ScrollView} from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import {theme} from '../../constants/theme'

const PlaylistScreen = () => {
  const navigation = useNavigation()

  return (
    <Box f={1} bg="black" px="sm">
      <Text color="primary" my="xs" size="sm" right>
        10 épisodes
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
    </Box>
  )
}

export default PlaylistScreen
