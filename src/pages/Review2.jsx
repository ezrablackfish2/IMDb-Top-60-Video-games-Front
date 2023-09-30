import React, { useState } from 'react';

function SubmitReview({ user, token }) {
 	const [review, setReview] = useState('');

	const handleSubmit = (e) => {
	e.preventDefault();

	const reviewData = {
      		review: review,
    };

    fetch("http://0.0.0.0:8000/d790c144-5da2-4ef5-b278-e4840b0349f3/review/", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
	body: JSON.stringify(reviewData),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Review submitted successfully');
        } else {
          console.error('Review submission failed');
        }
      })
      .catch((error) => {
        console.error('Network error:', error);
      });
  };

  return (
    <div>
      <h2>Submit Your Review</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          rows="4"
          cols="50"
          placeholder="Write your review here"
          required
        />
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
}

export default SubmitReview;





