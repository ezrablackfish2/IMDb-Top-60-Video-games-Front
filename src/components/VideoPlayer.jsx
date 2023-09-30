import React, { useState, useRef } from 'react';
import YouTube from 'react-youtube';
import CustomPosterOverlay from './Poster.jsx';
import styles from "../App.module.css";

interface Props {
	poster : string;
	film : string;
}

const VideoPlayer = ( {poster, film}: Props) => {
	const [videoState, setVideoState] = useState('unstarted');
	const [isPlaying, setIsPlaying] = useState(false);
	const playerRef = useRef(null);

	const opts = {
		playerVars: {
		autoplay: 0,
		loop: 1,
		playlist: film,
		controls: 0,
		showinfo: 0,
		modestbranding: 1,
		},
	};

  const videoId = film;

	const onVideoStateChange = (event) => {
		setVideoState(event.data);
};


	const toggleVideoPlayPause = () => {
    	const player = playerRef.current;
    if (player) {
      if (isPlaying) {
        player.pauseVideo();
      } else {
        player.playVideo();
      }
		setIsPlaying(!isPlaying);
	}
	};



  return (
    <div className={styles.Player}>
      <YouTube 
	  className={styles.detailtrailer} 
	  videoId={videoId} 
	  opts={opts} 
	  onStateChange={onVideoStateChange}
	  onReady={(e) => (playerRef.current = e.target)}
	  />
      {videoState !== 1  && (
        <div onClick={toggleVideoPlayPause}>
	      <CustomPosterOverlay poster={poster}/>
	</div>
      )}
    </div>
  );
};

export default VideoPlayer;

