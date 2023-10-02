import styles from './App.module.css';
import useGames from "./hooks/useGames.js";
import { useEffect, useState } from "react";
import imdb from "./assets/imdb.png";
import SearchBar from "./components/SearchBar.jsx";
import Home from "./pages/Home.jsx";
import GameDetail from "./pages/GameDetail.jsx";
import { BrowserRouter as Router, Route, Routes  } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import SubmitReview from "./pages/Review.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx"
import Rate from "./pages/Rate.jsx";
import HomeRate from "./pages/HomeRate.jsx";


function App() {
	const [search, setSearch] = useState("");
	const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");
        const [loginData, setLoginData] = useState({
                username: "",
                password: "",
        });
	  const [signupData, setSignupData] = useState({
		username: '',
		password1: '',
		password2: '',
	});
	const [loggedin, setlogin] = useState(false);
	const isAuthenticated = localStorage.getItem('token') !== null;
	const [VG, setVG] = useState(null);
	const [rateOn, setRateOn] = useState(false);
	const [watchlistOn, setWatchlistOn] = useState(false);
	const [darkoverlay, setdarkoverlay] = useState(false);
	const [watchlistSuccess, setWatchlistSuccess] = useState(false);
        const [watchlist, setWatchlist] = useState(false);
	const [Remover, setRemover] = useState(false);
	const [shower, setShower] = useState(false);

	document.title = "IMDb Top 60 Video Games Ezra";

	function getReviewPath() {
	}

  return (
	  <div className={styles.all}>
	  <div className={styles.navigation}>
	  <SearchBar search={search} setSearch={setSearch} user={user} token={token} formData={loginData} setFormDta={setLoginData} loggedin={loggedin} setlogin={setlogin} shower={shower} setShower={setShower}/>
	  </div>
	  <div className={styles.main}>
	  <Router>
	  <Routes>
	  	<Route index element={<Home search={search} user={user} token={token} loggedin={loggedin} rateOn={rateOn} setRateOn={setRateOn} darkoverlay={darkoverlay} setdarkoverlay={setdarkoverlay} VG={VG} setVG={setVG} watchlistOn={watchlistOn} setWatchlistOn={setWatchlistOn} watchlist={watchlist} setWatchlist={setWatchlist} watchlistSuccess={watchlistSuccess} setWatchlistSuccess={setWatchlistSuccess} shower={shower} setShower={setShower} />} />
	  	<Route path="/:id" element={<GameDetail user={user} token={token} loggedin={loggedin} rateOn={rateOn} setRateOn={setRateOn} darkoverlay={darkoverlay} setdarkoverlay={setdarkoverlay} VG={VG} setVG={setVG} watchlistOn={watchlistOn} setWatchlistOn={setWatchlistOn} watchlist={watchlist} setWatchlist={setWatchlist} watchlistSuccess={watchlistSuccess} setWatchlistSuccess={setWatchlistSuccess}/>} Remover={Remover} setRemover={setRemover} />
	  	<Route path="/login" element={<Login user={user} token={token} formData={loginData} setFormData={setLoginData} loggedin={loggedin} setlogin={setlogin}/>} />
	  	<Route path="/signup" element={<Signup user={user} token={token} formData={signupData} setFormData={setSignupData} loggedin={loggedin} setlogin={setlogin}/>} />
	  	<Route path="/:id/review"  element={isAuthenticated? <SubmitReview user={user} token={token} /> : <Login user={user} token={token} formData={loginData} setFormData={setLoginData} loggedin={loggedin} setlogin={setlogin}/>} />
	  </Routes>
	  </Router>
	  </div>
	  <div className={styles.side}><span className={styles.yellowbox}></span>More to explore</div>
	  </div>
  );
}

export default App;
