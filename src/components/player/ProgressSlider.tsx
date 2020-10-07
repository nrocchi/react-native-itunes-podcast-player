import {ProgressComponent} from 'react-native-track-player'
import Slider from '@react-native-community/slider'
import React from 'react'
import {Box, Text} from 'react-native-design-utility'
import {theme} from '../../constants/theme'
import {PlayerContext} from '../../context/PlayerContext'

function buildTime(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600)
  totalSeconds %= 3600
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = Math.floor(totalSeconds % 60)

  const minutesStr = String(minutes).padStart(2, '0')
  const secondsStr = String(seconds).padStart(2, '0')

  if (hours > 0) {
    return `${hours}:${minutesStr}:${secondsStr}`
  }

  return `${minutesStr}:${secondsStr}`
}

class ProgressSlider extends ProgressComponent {
  static contextType = PlayerContext

  get totalTime(): string {
    return buildTime(this.state.duration - this.state.position)
  }

  get currentTime(): string {
    return buildTime(this.state.position)
  }

  render() {
    return (
      <>
        <Slider
          style={{width: '100%', height: 20}}
          minimumValue={0}
          maximumValue={this.state.duration}
          value={this.state.position}
          onSlidingComplete={(value) => {
            console.log('slide value', value)
            this.context.goTo(value)
          }}
          minimumTrackTintColor={theme.color.primary}
          maximumTrackTintColor="white"
          thumbTintColor={theme.color.primary}
        />
        <Box dir="row" align="center" justify="between">
          <Text color="white" size="sm">
            {this.currentTime}
          </Text>
          <Text color="white" size="sm">
            -{this.totalTime}
          </Text>
        </Box>
      </>
    )
  }
}

export default ProgressSlider
