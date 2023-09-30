import React from 'react';
import star from "../assets/star.png";
import styles from "../App.module.css";
import play from "../assets/play.png";

interface Props {
	poster: string;
}

const CustomPosterOverlay = ( {poster} : Props ) => {
  const posterImage = poster;

  return (
    <div className={styles.detailvideoimage2}>
	<img className={styles.postertrailer} src={posterImage} alt="Custom Poster" />
	<img className={styles.play} src={play} />
    </div>
  );
};

export default CustomPosterOverlay;

