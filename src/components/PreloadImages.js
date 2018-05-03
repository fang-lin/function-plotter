import React from 'react';
import { preload_images } from './PreloadImages.css';
import images from '../images';

const PreloadImages = () => {
  return <div className={ preload_images }>
    { images.map((image, index) => <img src={ image } key={ index }/>) }
  </div>
};

export default PreloadImages;
