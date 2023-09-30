import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../App.module.css";
import vid from "../assets/video1.mp4"; 
import share from "../assets/share.png";
import alltopic from "../assets/alltopic.png";
import star from "../assets/star.png";
import starblue from "../assets/starblue.png";
import starfilled from "../assets/starfilled.png";
import award from "../assets/award.png";
import arrowleft from "../assets/arrowleft.png";
import arrowright from "../assets/arrowright.png";
import arrowdown from "../assets/arrowdown.png";
import VideoPlayer from '../components/VideoPlayer.jsx';
import MiniVideoPlayer1 from '../components/MiniVideoPlayer1.jsx';
import MiniVideoPlayer2 from '../components/MiniVideoPlayer2.jsx';
import black from '../assets/black.jpg';
import cast from '../assets/cast.png';
import ExpandableText from "../components/ExpandableText.jsx";
import bullet from "../assets/bullet.png";
import tiktok from "../assets/tiktok.png";
import instagram from "../assets/instagram.png";
import twitter from "../assets/twitter.png";
import youtube from "../assets/youtube.png";
import facebook from "../assets/facebook.png";
import Rate from "./Rate.jsx";
import Watchlist from "./Watchlist.jsx";
import watchlistimage from "../assets/watchlist.png";
import addwatchlist from "../assets/addwatchlist.png";
import add from "../assets/add.png";
import loading from "../assets/loading.gif";



function GameDetail({ user, token, loggedin, rateOn, setRateOn, darkoverlay, setdarkoverlay, VG, setVG, watchlistOn, setWatchlistOn, watchlist, setWatchlist, watchlistSuccess, setWatchlistSuccess }) {
	const { id } = useParams();
	const navigate = useNavigate();
	const [Remover, setRemover] = useState(false);
	let [photocount, setphotocount] = useState(0);
	let [videocount, setvideocount] = useState(0);

	function handlecountphotoincrease() {
		setphotocount(photocount += 1);
	}
	function handlecountphotodecrease() {
		setphotocount(photocount -= 1);
	}

	function handlecountvideoincrease() {
		setvideocount(videocount += 1);
	}
	function handlecountvideodecrease() {
		setvideocount(videocount -= 1);
	}


	useEffect(() => {
		if (!token) {
		axios.get(`https://imdb-top-60-video-games-ezra.onrender.com/${id}`)
		.then((response) => {
			setVG(response.data);
		})
		.catch((error) => {
			console.log(error);
		});
		} else if (token) {
			axios.get(`https://imdb-top-60-video-games-ezra.onrender.com/${id}`,
			{
                                headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Token ${token}`,
                        },
				})
		.then((response) => {
                        setVG(response.data);
                })
			                .catch((error) => {
                        console.log(error);
                });
		}
	}, [id]);
	
	if (!VG) {
		return <div className={styles.loading}><img className={styles.loadingimage} src={loading}/> </div>;
	}
	let k = 0;
	let trivialength = 0
	let quotelength = 0
	let gooflength = 0
	while (VG.trivias[k]) {
		trivialength += VG.trivias[k].trivia.length
		k += 1;
	}
	while (VG.quotes[k]) {
		quotelength += VG.quotes[k].quote.length
		k += 1;
	}
	while (VG.goofs[k]) {
		gooflength += VG.goofs[k].goof.length
		k += 1;
	}

	const min = 0;
	const max = 10;

	const reviewnum = Math.floor(Math.random() * (max - min + 1)) + min;
	function Rater() {
		setRateOn(true);
		setdarkoverlay(true);
	}
	function Watchlister() {
		setWatchlistOn(true);
		setWatchlist(true);
		setRemover(false);
	}
	function WatchlistRemover() {
		setWatchlistOn(true);
		setWatchlist(true);
		setRemover(true);

	}
	document.title = VG.title;

	return (
		<div className={styles.alldetail}>
		<div className={styles.topdetail}>
		<h1 className={styles.detailtitle}>{VG.title}</h1>
		<div className={styles.v}>
		<div className={styles.v1}>Video Game</div>
		<div className={styles.v2}><span className={styles.d1}>. </span> {VG.year}</div>
		<div className={styles.v3}><span className={styles.d2}>.</span> {VG.certificate}</div>
		</div>
		<div className={styles.detailtopmain}>
		<VideoPlayer film = { VG.videos[0] ? VG.videos[0].video : "" } poster= { VG.thumbnail[0] ? VG.thumbnail[0].thumbnail : black} />
		<div className={styles.topgallery}>
		<a className={styles.topvideos}>
		Videos
		</a>
		<a className={styles.topphotos}>
		Photos
		</a>
		</div>

		<div>
		{watchlist ? 
			(<div>
			<Watchlist user={user} token={token} setWatchlistOn={setWatchlistOn} watchlistSuccess={watchlistSuccess} setWatchlistSuccess={setWatchlistSuccess} watchlist={watchlist} setWatchlist={setWatchlist} Remover={Remover}/>
			</div>
			) : (null)}
		</div>

		<div className={styles.watchlist}>


		<div>
			{ user ? (
		<div>
		{VG.watchlists[0] ? (
			<div>
			{VG.watchlists.map( watchlist => watchlist.your_watchlist == true ? 
				<img onClick={WatchlistRemover} src={watchlistimage} className={styles.watchlistimage}/> 
			 : 
				<img onClick={Watchlister} className={styles.watchlistimage} src={addwatchlist} />)}
			</div>
		)
			: 
			(<div onClick={Watchlister}>  <img className={styles.watchlistimage} src={addwatchlist}/> </div>  )}
		</div> )
			: (
			<div> 
				{ watchlistOn ? (
				<div>
				{navigate("/login")}
				</div>)
			: 
			(<div onClick={Watchlister}>  <img className={styles.watchlistimage} src={addwatchlist}/> </div>)
			}
				</div>
			)}
			</div>



		</div>
		<img className={styles.detailcover} src={VG.cover} />

		<div className={styles.topdetailgenre}>
		{VG.genra.map((genre, index) =>( <div key={index} className={styles.topdetailgenrelist}>{genre.genre}</div>))}
		</div>
		<div className={styles.topstory}>
		{VG.storyline}
		</div>
		<div className={styles.topwriters}>
		Writers <span className={styles.topwriterlist}>{VG.writer}</span>
		</div>
		<div className={styles.topstars}>
		Stars {VG.casts.map((cast, index) => <div key={index} className={styles.topstarlist}>cast.cast</div>)}
		</div>

		<div className={styles.topratings}>
		<div className={styles.topimdbrating}>
		IMDb Rating
		<div>
		<img className={styles.topyellowstar} src={star}/>
		{VG.imdb_rating}/10
		</div>
		</div>


		<div className={styles.topownrating}>
		Your Rating
		{rateOn ? (
		<div>
		{!user ?(
			<div>{navigate("/login")}</div>
		): (<div className={darkoverlay ? (styles.darkoverlay) : (styles.overlay)}>
			<Rate user={user} token={token} darkoverlay={darkoverlay} setdarkoverlay={setdarkoverlay} setRateOn={setRateOn}/>
			</div>)}
		</div>
		) : (<div onClick={Rater}>
			<img className={styles.youratingstar} src={loggedin ? starfilled : starblue} /> 
			{ loggedin ?(<span> {VG.ratings.map((rate, index) =>( rate != null ? <span key={index}> {rate.your_rating}/10 </span> : null))}</span>) : (null) }
			<span className={styles.ratelink}>Rate</span></div>)}


		</div>
		</div>
		</div>

		<div className={styles.links}>
		<a className={styles.castlink}>Cast & Crew</a>
		<span className={styles.l1}>.</span>
		<a className={styles.userlink}>User reviews</a>
		<span className={styles.l2}>.</span>
		<a className={styles.trivialink}>Trivia</a>
		<a className={styles.alltopiclink}> <img className={styles.alltopic}src={alltopic} /><span className={styles.topicword}>AllTopics</span></a>
		<a className={styles.topsharelink}><img className={styles.topshareimage} src={share}/></a>
		</div>
		</div>
		<div className={styles.middledetail}>
		<div className={styles.awards}>	
		<div className={styles.awardimage}> </div>
		<div className={styles.awardword}>
		{VG.award}
		</div>
		</div>
		
		<div className={styles.detailvideo}>
		<div className={styles.detailvideoword}> <span className={styles.yellowbox}></span>Videos</div>
		<div className={styles.arrowleftvideo}onClick={() => handlecountvideodecrease()}><img className={styles.arrowleftvideoimage} src={arrowleft} /></div>
		<MiniVideoPlayer1 film = { VG.videos[videocount + 1] ? VG.videos[videocount + 1].video : "" } poster= { VG.thumbnail[videocount + 1] ? VG.thumbnail[videocount + 1].thumbnail : black} />
		<MiniVideoPlayer2 film = { VG.videos[videocount + 2] ? VG.videos[videocount + 2].video : "" } poster= { VG.thumbnail[videocount + 2] ? VG.thumbnail[videocount + 2].thumbnail : black} />
		<div className={styles.arrowrightvideo} onClick={() => handlecountvideoincrease()}> <img className={styles.arrowrightvideoimage} src={arrowright} /></div>
		</div>


		<div className={styles.detailphoto}>
		<div className={styles.detailphotoword}><span className={styles.yellowbox}></span>Photos</div>
		<div className={styles.arrowleftphoto}onClick={() => handlecountphotodecrease()}><img className={styles.arrowleftphotoimage} src={arrowleft} /></div>
		<img className={styles.detailphotoimage} src={VG.photos[photocount] ? VG.photos[photocount].photo : black} />
		<div className={styles.arrowrightphoto} onClick={() => handlecountphotoincrease()}> <img className={styles.arrowrightphotoimage} src={arrowright} /></div>
		</div>
		<div className={styles.video}>
		</div>
		<div className={styles.detailcast}>
		<span className={styles.yellowbox}></span>TopCast
		<div>
		<img className={styles.detailcastimage} src={cast} />
		<img className={styles.detailcastimage} src={cast} />
		<img className={styles.detailcastimage} src={cast} />
		<img className={styles.detailcastimage} src={cast} />
		<img className={styles.detailcastimage} src={cast} />
		<img className={styles.detailcastimage} src={cast} />
		<img className={styles.detailcastimage} src={cast} />
		<img className={styles.detailcastimage} src={cast} />
		<img className={styles.detailcastimage} src={cast} />
		<img className={styles.detailcastimage} src={cast} />
		</div>
		<hr className={styles.detailhr}/>
		<div className={styles.middlewriter}>
		Writers <span className={styles.topwriterlist}>{VG.writer}</span>
		</div>
	
		<div className={styles.review}><span className={styles.yellowbox}></span>Storyline</div>
		{VG.storyline ?
                <div className={styles.detailadd}>
                <ul>
                <div>{VG.storyline}</div>
                </ul>
                </div>
                        : null}
		<div className={styles.details}>
		<div className={styles.detailseach}>Genre <span className={styles.detailresult}>{VG.genra.map((genre, index) => <div key={index} className={styles.genra}>{genre.genre}</div>)}</span></div>
		<div className={styles.detailseach}>Certificate <span className={styles.detailresult}>{VG.certificate}</span></div>
</div>

		<div className={styles.parentalguide}>
		{VG.parentalguides[0] ?
		<div className={styles.detailadditional}>
		<ul>
		<div className={styles.wordadditional}> Parental Guide </div>
		<ExpandableText length={trivialength}>
		<div className={styles.wordparent}> Certification </div> 
		{VG.parentalguides.map((guide, index) =>
			<div key={index}> 
			{guide.certification}
			</div>
		)}
		<div className={styles.wordparent}> Sex & Nudity </div>
		{VG.parentalguides.map((guide, index) =>
			<div key={index}> 
			{guide.nudity}
			</div>
		)}
		<div className={styles.wordparent}> Violence & Gore </div>
		{VG.parentalguides.map((guide, index) =>
			<div key={index}> 
			{guide.violence}
			</div>
		)}
		<div className={styles.wordparent}> Profanity </div>
		{VG.parentalguides.map((guide, index) =>
			<div key={index}> 
			{guide.profanity}
			</div>
		)}
		<div className={styles.wordparent}> Alcohol, Drugs & Smoking </div>
		{VG.parentalguides.map((guide, index) =>
			<div key={index}> 
			{guide.drugs}
			</div>
		)}
		<div className={styles.wordparent}> Frightening & Intense Scenes </div>
		{VG.parentalguides.map((guide, index) =>
			<div key={index}> 
			{guide.intense_scene}
			</div>
		)}


		</ExpandableText>
		</ul>
		</div>
			: null}

		</div>
		<div className={styles.know}><span className={styles.yellowbox}></span>Did you know?</div>
		
		{VG.trivias[0] ?
		<div className={styles.detailadditional}>
		<ul>
		<div className={styles.wordadditional}>Trivia</div>
		<ExpandableText length={trivialength}>
		{VG.trivias.map((trivia, index) => <div key={index}> {trivia.trivia}</div>)}
		</ExpandableText>
		</ul>
		</div>
			: null}
		{VG.goofs[0] ?
		<div className={styles.detailadditional}>
		<ul> 
		<div className={styles.wordadditional}>Goofs</div>
		<ExpandableText length={gooflength}>
		{VG.goofs.map((goof, index) => <div key={index}> {goof.goof}</div>)}
		</ExpandableText>
		</ul>
		</div>
			: null}
		{VG.quotes[0] ? 
		<div className={styles.detailadditional}>
		<ul> 
		<div className={styles.wordadditional}>Quotes</div>
		<ExpandableText length={quotelength}>
		{VG.quotes.map((quote, index) => <div key={index}> {quote.quote}</div>)}
		</ExpandableText>
		</ul>
		</div>
			: null}
		<div className={styles.review}><span className={styles.yellowbox}></span>User reviews</div>
		<a href={`/${id}/review`} className={styles.reviewlink}> <img src={add} className={styles.addreview}/>review</a>	
		{VG.reviews[reviewnum] ?
		<div className={styles.detailadditional}>
		<ul>
		<div>{VG.reviews[reviewnum].review}</div>
		<div className={styles.reviewname}>{VG.reviews[reviewnum].username}</div>
		</ul>
		</div>
			: null}

		<div className={styles.faqtitle} ><span className={styles.yellowbox}></span>FAQ </div>
	{VG.faqs.map((faq, index) => <div key={index} className={styles.faq}>{faq.faq}</div>)}

		<div className={styles.detailstitle} ><span className={styles.yellowbox}></span>Details </div>
		<div className={styles.details}>
		<div className={styles.detailseach}>Release date <span className={styles.detailresult}>{VG.release_date}</span></div>
		<div className={styles.detailseach}>Countries of origin <span className={styles.detailresult}>{VG.country_of_origin}</span></div>
		<div className={styles.detailseach}>Official sites <span className={styles.detailresult}><a href={VG.officialsite}> Official Site</a></span></div>
		<div className={styles.detailseach}>Language <span className={styles.detailresult}>{VG.language}</span></div>
		<div className={styles.detailseach}>Also known as <span className={styles.detailresult}>{VG.nickname}</span></div>
		<div className={styles.detailseach}>Production Companies <span className={styles.detailresult}>{VG.company}</span></div>
		</div>


		<div className={styles.detailstitle} ><span className={styles.yellowbox}></span>Technical Specs </div>
		<div className={styles.details}>
		<div className={styles.detailseach}> Color <span className={styles.detailresult}>{VG.color}</span></div>
		<div className={styles.detailseach}>Sound Mix <span className={styles.detailresult}>{VG.soundmix}</span></div>
		</div>

		</div>
		</div>
		<div className={styles.blackbottomdetail}>
          <div className={styles.blacktitle}>Recently viewed</div>
          <div className={styles.blackcontent}>You have no recently viewed pages</div>
	<a href="https://www.tiktok.com/@imdb"><img src={tiktok} className={styles.blackicons}/></a>
          <a href="https://www.instagram.com/imdb/"> <img src={instagram} className={styles.blackicons}/></a>
          <a href="https://twitter.com/imdb"> <img src={twitter} className={styles.blackicons}/></a>
          <a href="https://www.youtube.com/imdb"> <img src={youtube} className={styles.blackicons}/></a>
          <a href="https://www.facebook.com/imdb"> <img src={facebook} className={styles.blackicons}/></a>
          </div>
		</div>
	);
}

export default GameDetail;
