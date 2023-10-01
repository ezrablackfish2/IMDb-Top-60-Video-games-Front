import useGames from "../hooks/useGames.js";
import styles from "../App.module.css";
import star from "../assets/star.png";
import starblue from "../assets/starblue.png";
import starfilled from "../assets/starfilled.png";
import bullet from "../assets/bullet.png";
import tiktok from "../assets/tiktok.png";
import instagram from "../assets/instagram.png";
import twitter from "../assets/twitter.png";
import youtube from "../assets/youtube.png";
import facebook from "../assets/facebook.png";
import SortSelector from "../components/SortSelector.jsx";
import { useState, useEffect } from "react";
import Rate from "./Rate.jsx";
import Watchlist from "./Watchlist.jsx";
import watchlistimage from "../assets/watchlist.png";
import addwatchlist from "../assets/addwatchlist.png";
import add from "../assets/add.png";
import { useNavigate } from "react-router-dom";
import HomeRate from "./HomeRate.jsx";
import loadhome from "../assets/loadhome.gif";



interface Props {
	search: string;
	user: string;
	token: string;
        loggedin: boolean;
        rateOn: boolean;
        setRateOn: () => void;
        darkoverlay: boolean;
        setdarkoverlay: () => void;
        VG: [];
	setVG: () => void;
        watchlistOn: boolean;
        setWatchlistOn: () => void;
        watchlist: boolean;
        setWatchlist: () => void;
        watchlistSuccess: boolean;
        setWatchlistSuccess: () => void;
	shower: boolean;
	setShower: () => void;
}

function Home( {search, user, token,  loggedin, rateOn, setRateOn, darkoverlay, setdarkoverlay, VG, setVG, watchlistOn, setWatchlistOn, watchlist, setWatchlist, watchlistSuccess, setWatchlistSuccess, shower={shower}, setShower={setShower} } : Props ) {
	const {games, error, isLoading } = useGames(user, token);
	const [selectedSort, setSelectedSort] = useState("Metascore");
	const navigate = useNavigate();
	const [hider, setHider] = useState(false);

	        function Rater() {
                setRateOn(true);
                setdarkoverlay(true);
        }

        function Watchlister() {
                setWatchlistOn(true);
                setWatchlist(true);
        }
	useEffect(() => {
		if (!user) {
			setHider(false);
			setShower(false);
		}
	}, []);

return (
	<>
	<div className={styles.topmain}>
	<div className={styles.toptitle}> IMDb Charts </div>
	<div className={styles.hometitle}><span className={styles.yellowbox}></span>IMDb Top 60 VideoGames</div>
	<div className={styles.bottomtitle}>IMDb Top 60 as rated by regular IMDb voters</div>
	<div>
	<SortSelector onSelectSort={sort => setSelectedSort(sort)} selectedSort={selectedSort}/>
	</div>
	<div className={styles.attribute}>
	{ user ?
	<div>
	{ !hider  ? (
	<button className={styles.showerandhider} onClick={() => setHider(true)}>Hide games You've rated</button>
	) : (
<button className={styles.showerandhider} onClick={() => setHider(false)}>Show all the games </button>
	)}
	</div>
		: (
		<button className={styles.showerandhider} onClick={() => navigate("/login")}>Hide games You've rated
		</button> 
	) }
	</div>


	</div>
	<div className={styles.middlemain}>
		{error && <p> Ezra site request error code 77 </p>}
	{isLoading && <img src={loadhome} className={styles.loadhome} />}
	<ol className={styles.numbering}>
	{games
		.sort( (a, b) => 
			(selectedSort == "Name" ? (a.title > b.title ? 1: -1) : null) ||
			(selectedSort == "Year" ? (a.release_date > b.release_date ? -1: 1) : null) ||
			(selectedSort == "Metascore" ? (a.metascore > b.metascore ? -1: 1) : null) ||
			(selectedSort == "Certificate" ? (a.certificate > b.certificate ? 1: -1) : null) ||
			(selectedSort == "IMDb Rating" ? (parseFloat(a.imdb_rating) < parseFloat(b.imdb_rating) ? 1: -1) : null) || 
			(selectedSort == "Your Rating" ? (a.ratings.map((rate, index) =>( rate != null ? parseInt(rate.your_rating) : null)) < b.ratings.map((rate, index) =>( rate != null ? parseInt(rate.your_rating) : null)) ? 1: -1): null)
		)
		.filter((game) => {
			return search.toLowerCase() === ""
			? game
			: game.title.toLowerCase().includes(search);
		})
		.filter((game) => {
			if (!user) {
				return game;
			}
			return hider ?
				!(game.ratings[0] ? game.ratings.map( rate => ( rate => rate.username.includes(user))
				 ) 
				: null)
				: game
		})
		.filter((game) => {
			if (!user) {
				return (game);
			}
			return shower ?
				(game.watchlists[0] ? game.watchlists.map( watchlist => ( watchlist => watchlist.username.includes(user))
				 ) 
				: null)
				: game
		})

		.map(game =>
		(<li key={game.id}>
			<a href={`/${game.id}`}>
			<img className={styles.maincover} src={game.cover} /> 
			<div className={styles.gametitle}> {game.title}</div>
			</a>
		<a href={`/${game.id}`}>
		{user ?
		<div>
		{ game.watchlists[0] ? (
			<div>
			{ game.watchlists.map(watchlist => (
				watchlist.your_watchlist == true ? 
				<img className={styles.homewatchlist} src={watchlistimage} />
				:
				<img className={styles.homewatchlist} src={addwatchlist} />
			)
			)}
			</div>
		)
			: ( 
			<img className={styles.homewatchlist} src={addwatchlist} />
			)
		}
		</div>
			:
			null
		}
		</a>

			<div className={styles.gameyear}>
			{game.year}
			</div>

			<div className={styles.gamemetascore}>
			{game.metascore}
			</div>
			<div className={styles.gamecertificate}>
			{game.certificate}
			</div>
			<div className={styles.gamerating}>
			<img className={styles.gameratingstar} src={star} />
			{game.imdb_rating}
			</div>
		<div className={styles.topownrating}>
		{rateOn ? (
		<div>
		{!user ?(
			<div>{navigate("/login")}</div>
		): (<div className={darkoverlay ? (styles.darkoverlay) : (styles.overlay)}>
			</div>)}
		</div>
		) : (<div>
			<img className={styles.homeratingstar} src={loggedin ? starfilled : starblue} /> 
			{ loggedin ?(<span className={styles.homeratingvalue}> {game.ratings.map((rate, index) =>( rate != null ? <span key={index}> {rate.your_rating} </span> : null))}</span>) : (null) }
			<span className={styles.homeratelink}>
			{ loggedin ?
			<span>
			{ game.ratings[0] ?
			(<span>
				{game.ratings.map(rate => rate != null ? 
					<span></span>
	: 
					<span className={styles.gameownrating}> Rate</span>
				)}
			</span>)
			:
			(<span className={styles.gameownrating}> Rate</span>)
			}
			</span>
			:
				<span className={styles.gameownrating}>
				  Rate
				</span>
			}
			</span>
				</div>)}


		</div>
			<hr />
			</li>
	))}
	</ol>
	</div>
	<div className={styles.blackbottomhome}>
          <div className={styles.blacktitle}>Recently viewed</div>
          <p className={styles.blackcontent}>You have no recently viewed pages</p>
          <a href="https://www.tiktok.com/@imdb"><img src={tiktok} className={styles.blackicons}/></a>
          <a href="https://www.instagram.com/imdb/"> <img src={instagram} className={styles.blackicons}/></a>
          <a href="https://twitter.com/imdb"> <img src={twitter} className={styles.blackicons}/></a>
          <a href="https://www.youtube.com/imdb"> <img src={youtube} className={styles.blackicons}/></a>
          <a href="https://www.facebook.com/imdb"> <img src={facebook} className={styles.blackicons}/></a>
          </div>
	</>
);
};

export default Home;
