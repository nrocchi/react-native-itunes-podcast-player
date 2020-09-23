import React from 'react';
import { Box, Text } from 'react-native-design-utility';

import { DBContext } from '../../context/DBContext';


const LibraryScreen = () => {

    const dbContext = React.useContext(DBContext);

    return (
      <Box f={1} bg="black">
        <Text color="white" mt="xl" size="xxl" center bold>Bibliothèque</Text>
        {dbContext.podcasts.map(podcast => (
          <Box key={podcast.feedUrl}>
            <Text color="white">{podcast.name}</Text>
          </Box>
        ))}
      </Box>
    )
};

export default LibraryScreen