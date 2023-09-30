import React, { useState, useContext, useRef, useEffect } from 'react';
import axios from 'axios';
import styles from "../App.module.css";
import AuthContext from "../context/AuthProvider";
import { useNavigate } from 'react-router-dom';
import imdb from "../assets/imdb.png";

interface Props {
	user: string;
	token: string;
	formData: {};
	setFormData: () => void;
	loggedin: boolean;
	setlogin: () => void;
}

function Login( {user, token, formData, setFormData, loggedin, setlogin} : Props) {
	const { setAuth } = useContext(AuthContext);
	const userRef = useRef();
	const errRef = useRef();

	const [errMsg, setErrMsg] = useState("");
	const [success, setSuccess] = useState(false);
	const navigate = useNavigate();
	

	useEffect(() => {
		if (user) {
		setSuccess(true);
		setlogin(true);
		navigate("/");
	}

		userRef.current.focus();
	}, [])
	useEffect(() => {
		setErrMsg("")
	}, [formData.username, formData.password])

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
    		e.preventDefault();

		try {
			const response = await axios.post('https://imdb-top-60-video-games-ezra.onrender.com/dj-rest-auth/login/', formData);
			const token = response?.data?.key
			console.log(token)
			console.log(formData.username)
			console.log(formData.password)
			const user = formData.username;
			const pwd = formData.password
			console.log('Login successful:', response.data);
			setAuth({ user, pwd, token});
			localStorage.setItem("user", user)
			localStorage.setItem("token", token);
			setSuccess(true);
			setlogin(true);
			navigate("/");

		} catch (err) {
		if (!err?.response){
		setErrMsg("No Server Response");

		} else if (err.response?.status === 400) {
			setErrMsg("missing user name or password");
		} else if (err.response?.status === 401) {
			setErrMsg("Unauthorized");
		} else {
			setErrMsg("Login Failed");
		}
			errRef.current.focus();
		}
	};
	function remover() {
		localStorage.removeItem("user");
		localStorage.removeItem("token");
		setSuccess(false);
		setlogin(false);
	}

	return (
		<>
	  			{success ? (
				<div>
				<h1>You are logged In!</h1>
				<br />
				<p><button onClick={remover}>Log Out</button></p>
				</div>
			) : (
				<>	
				<img className={styles.loginimdb} src={imdb} />
				<div className={styles.login}>
				<h1>Sign In</h1>
				<p className={styles.rederror} ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive"><span className={styles.rederror}>{errMsg}</span></p>
 				<form onSubmit={handleSubmit}>
				<div className={styles.loginlabel}>
				<label>Username</label>
				</div>
				<div>
				<input
				className={styles.logininput}
				type="text"
				name="username"
				ref = {userRef}
				autoComplete="off"
				value={formData.username}
				onChange={handleChange}
			/>
				</div>
				<div className={styles.loginlabel}>
				<label >Password</label>
				</div>
				<div>
				<input 
				className={styles.logininput}
				type="password"
				name="password"
				value={formData.password}
				onChange={handleChange}
			/>
				</div>
				<button className={styles.loginbutton} type="submit">Signin</button>
			<button className={styles.signuplinkbutton} ><a href="/signup">Create your IMDb account</a></button>
		</form>
		</div>
		</>
		)}
	</>
  );
}

export default Login;

