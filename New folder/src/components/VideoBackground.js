import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

const HLSVideoPlayer = ({ src }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
  
    // Check if Hls.js is supported
    if (Hls.isSupported() && video) {
      const hls = new Hls();

      hls.loadSource(src);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play();
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        console.error('HLS.js error', event, data);
      });

      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // In case of Safari
      video.src = src;
      video.addEventListener('loadedmetadata', () => {
        video.play();
      });
    }
  }, [src]);

  return (
    <div>
      <video 
        ref={videoRef} 
        controls 
        style={{ width: '100%', height: 'auto' }} 
      />
    </div>
  );
};

export default HLSVideoPlayer;