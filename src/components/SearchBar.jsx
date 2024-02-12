import imdb from "../assets/imdb.png";
import styles from "../App.module.css";
import menu from "../assets/menu.png";
import account from "../assets/account.png";
import watchlist from "../assets/watchlist.png";
import SearchSelector from "./SearchSelector.jsx";
import LanguageSelector from "./LanguageSelector.jsx";
import search from "../assets/search.png";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import Login from "../pages/Login.jsx";
import { useEffect, useState } from "react";
import close from "../assets/close.png";


interface Props {
	search: string;
	setSearch: () => void;
	user: string;
	token: string;
	formData: formData;
	setFormData: () => void;
	loggedin: boolean;
	setlogin: () => void;
	setShower: () => void;
	shower: boolean;
}

function SearchBar( {setSearch, search, user, token, setFormData, loggedin, setlogin, setShower, shower} : Props ) {

	const [info, setInfo] = useState(false);

	useEffect(() => {
	if (user) {
		setlogin(true);
	}
	}, [])
	function handleSearch(event) {
		setSearch(event.target.value);
	};
	function Remover() {
		localStorage.removeItem("user");
		localStorage.removeItem("token");
		setlogin(false);
	}
	function getInfo() {
		setInfo(true);
	}
	function removeInfo() {
		setInfo(false);
	}

	return (
		<>
		<a href="/"> <button className={styles.imdbbutton}>
		<img src={imdb} className={styles.imdb} />
		</button>
		</a>
		<button onClick={getInfo} className={styles.menu}>
		<img src={menu} className={styles.menuicon} /> 
		<div className={styles.menuword}>Menu</div>
		</button>
		{ info ?
		<div className={styles.imdbinfo}>
			<img onClick={removeInfo} className={styles.infoimage} src={close} />
			<div className={styles.imdbinfo}>
			<h2 className={styles.infotitle} >What is IMDb?</h2>
			</div>
			<div className={styles.infocontent}>
			<p> 
<span className={styles.indent}></span>Launched online in 1990 and a subsidiary of Amazon.com since 1998, IMDb is the world's most popular and authoritative source for movie, TV and celebrity content, designed to help fans explore the world of movies and shows and decide what to watch.

Our searchable database includes millions of movies, TV and entertainment programs and cast and crew members. 

IMDb can help you:

Jog your memory about a movie, show, or person on the tip of your tongue
Find the best movie or show to watch next
Empower you to share your entertainment knowledge and opinions with the world’s largest community of fans
For fans deciding what to watch and where to watch it, we offer local movie showtimes, ticketing, trailers, critic and user reviews, personalized recommendations, photo galleries, entertainment news, quotes, trivia, box-office data, editorial feature sections and a universal Watchlist. To learn more about watching Trailers, Clips, Featurettes, and IMDb Originals, please see the IMDb Video FAQs.

IMDb creates new original video content each week and you can find it all at IMDb Originals.

You can find new videos highlighted every day on the IMDb homepage via your desktop computer or IMDb app.
			</p>
			</div>
		</div>
		: 
		null
		}

		<div className={styles.allsearch}>
		<form onSubmit={handleSearch} >
		<SearchSelector />
		<div className={styles.search}>
		<label htmlFor="search" className={styles.searchword}></label>
		<input onChange={handleSearch} id="search" placeholder={`Search IMDb`} type="text" className={styles.searchbar} />
		<button className={styles.searchbutton} type="submit">
		<img  className={styles.searchimage} src={search} />
		</button>
		</div>
		</form>
		</div>
		{ user ?
		<div>
		{ ! shower ?
		<button onClick={() => setShower(true)} className={styles.watchbutton}>
		<img src={watchlist} className={styles.watchimage} />
		<div className={styles.watchword}>
		Watchlist
		</div>
		</button>
			:
		<button onClick={() => setShower(false)} className={styles.watchbutton}>
                <img src={watchlist} className={styles.watchimage} />
                <div className={styles.watchword}>
                Hide Watchlist
                </div>
                </button>
		}
		</div>
			:
		<a href="/login"><button className={styles.watchbutton}>
                <img src={watchlist} className={styles.watchimage} />
                <div className={styles.watchword}>
                Watchlist
                </div>
                </button>
		</a>
			}




		<div className={styles.signupbutton}>
		{!loggedin ? (
		<>
                <a className={styles.signinlink} href="/login"> <img src={account} className={styles.signupimage} /></a>
                <div className={styles.signupword}>
                <a className={styles.signinlink} href="/login">Sign In</a>
                </div>
		</>) : (
			<>
			<div className={styles.signupworduser}> {user}</div>
		<div className={styles.signupwordbutton}><button onClick={Remover} className={styles.logout}> Log out</button></div>
		</>
		)}
                </div>
		<LanguageSelector />
		</>
	);
};

export default SearchBar;
