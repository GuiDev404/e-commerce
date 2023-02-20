import React from 'react';
import ReactSlidy from 'react-slidy';
import { Image } from '@chakra-ui/react';
import 'react-slidy/lib/styles.css';

const Slider = ({ images }) => {
  return (
    <ReactSlidy imageObjectFit='content' keyboardNavigation>
      {images.map((img) => (
        <Image
          key={img}
          rounded='md'
          src={img}
          maxHeight='350px'
          maxW='100%'
          objectFit='cover'
          objectPosition='center'
        />
      ))}
    </ReactSlidy>
  );
};

export default React.memo(Slider);
