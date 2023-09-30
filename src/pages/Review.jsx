import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";
import styles from "../App.module.css";

function SubmitReview({ user, token }) {
	const { id } = useParams();
	const [review, setReview] = useState('');
	const [reviewSuccess, setReviewSuccess] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const reviewData = {
			review: review,
		};

		try {
			const response = await axios.put(`https://imdb-top-60-video-games-ezra.onrender.com/${id}/review/`, reviewData,
        		{
				headers: {
				'Content-Type': 'application/json',
				Authorization: `Token ${token}`,
			},
			}
		);

	if (response.status === 200) {
		console.log('Review submitted successfully');
		setReviewSuccess(true);
	} else {
		console.error('Review submission failed');
	}
	} catch (error) {
		console.error('Network error:', error);
	}
	};

	return (
		<>
		{reviewSuccess ? (
			<>
			{navigate(`/${id}/`)}
			</>
		) : (
	<div className={styles.reviewall}>
	<h2>Your Review</h2>
	<form onSubmit={handleSubmit}>
	<textarea
		value={review}
		onChange={(e) => setReview(e.target.value)}
		rows="15"
		cols="50"
		placeholder="Write your review here"
		required
	/>
	<div>
	<button className={styles.reviewbutton} type="submit">Submit</button>
	</div>
	</form>
	</div>
		) }
		</>
	);
}

export default SubmitReview;

