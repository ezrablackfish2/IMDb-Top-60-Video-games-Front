import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import addwatchlist from "../assets/addwatchlist.png";
import styles from "../App.module.css";
import watchlistimage from "../assets/watchlist.png";

interface Props {
	user: string;
	token: string;
	setWatchlistOn: () => void;
	watchlistSuccess: boolean;
	setWatclistSuccess: () => void;
	watchlist: boolean;
	setWatchlist: () => void;
	Remover: boolean;
}

function Watchlist({ user, token, watchlistSuccess, setWatchlistSuccess, setWatchlistOn, watchlist, setWatchlist, Remover}: Props) {
	const { id } = useParams();
	const watchlistData = {
		your_watchlist: watchlist,
	};

	const handleRemove = async () => {
		
		setWatchlist(false);
		setWatchlistOn(false);

		try {
			const response = await axios.delete(`https://imdb-top-60-video-games-ezra.onrender.com/${id}/watchlist/`,
        		{
				headers: {
				'Content-Type': 'application/json',
				Authorization: `Token ${token}`,
			},
			}
		);

	if (response.status === 200) {
		console.log('Watchlist removed successfully');
		setWatchlistSuccess(true);
	} else {
		console.error('Watchlist remove failed');
	}
	} catch (error) {
		console.error('Network error:', error);
	}
		window.location.reload();
	};

	const handleSubmit = async () => {
		

		try {
			const response = await axios.put(`https://imdb-top-60-video-games-ezra.onrender.com/${id}/watchlist/`, watchlistData,
        		{
				headers: {
				'Content-Type': 'application/json',
				Authorization: `Token ${token}`,
			},
			}
		);

	if (response.status === 200) {
		console.log('Watchlist Added successfully');
		setWatchlistSuccess(true);
	} else {
		console.error('Watchlist failed');
	}
	} catch (error) {
		console.error('Network error:', error);
	}
		window.location.reload();
	};
	if (watchlist && Remover) {
		watchlistData.your_watchlist = false;
		handleSubmit();
	}
	else if (watchlist && !Remover) {
		watchlistData.your_watchlist = true;
		handleSubmit();
	}

	return (
		<div>
		</div>
	);
}

export default Watchlist;

