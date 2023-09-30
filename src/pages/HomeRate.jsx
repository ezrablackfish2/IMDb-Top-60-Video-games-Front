import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import starfilled from "../assets/starfilled.png";
import styles from "../App.module.css";

interface Props {
	user: string;
	token: string;
}

function HomeRate({ user, token, darkoverlay, setdarkoverlay, setRateOn, id}: Props) {
	const [rate, setRate] = useState(0);
	const [rateSuccess, setRateSuccess] = useState(false);
	const rateData = {
		your_rating: rate,
	};
	
	const handleCancel = () => {
	}
	
	const handleRemove = async (e) => {
		e.preventDefault();


		try {
			const response = await axios.delete(`http://0.0.0.0:8000/${id}/rating/`,
        		{
				headers: {
				'Content-Type': 'application/json',
				Authorization: `Token ${token}`,
			},
			}
		);

	if (response.status === 200) {
		console.log('Rated remove successfully');
		setRateSuccess(true);
	} else {
		console.error('Rate remove failed');
	}
	} catch (error) {
		console.error('Network error:', error);
	}
		window.location.reload();
	};


	const handleSubmit = async (e) => {
		e.preventDefault();
		

		try {
			const response = await axios.put(`http://0.0.0.0:8000/${id}/rating/`, rateData,
        		{
				headers: {
				'Content-Type': 'application/json',
				Authorization: `Token ${token}`,
			},
			}
		);

	if (response.status === 200) {
		console.log('Rated successfully');
		setRateSuccess(true);
	} else {
		console.error('Rate failed');
	}
	} catch (error) {
		console.error('Network error:', error);
	}
		window.location.reload();
	};
	const handleRatingChange = (event) => {
		const selectedRating = parseInt(event.target.value);
 		setRate(selectedRating);
	};

	return (
		<>
		{rateSuccess ? (
			<>
			<div>{rateData.your_rating}</div>
			</>
		) : (
	<div>
	<h2>Rate The Game</h2>
<div className={styles.starrating}>
      {[...Array(10)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <label key={ratingValue}>
            <input
              type="radio"
              id={`star${ratingValue}`}
              name="rating"
              value={ratingValue}
              onChange={handleRatingChange}
            />
            <span role="img" aria-label={`${ratingValue} star`}>
            </span>
          </label>
        );
      })}
      <p>Selected Rating: {rate}</p>
			<button onClick={handleSubmit}>Rate</button>
			<button onClick={handleCancel}>Cancel</button>
			<button onClick={handleRemove}>Remove my rating</button>
    </div>
	</div>
		) }
		</>
	);
}

export default HomeRate;
