import { useState } from "react"; 
import apiClient from "../services/api-client-axios.js";
import { useEffect } from "react";

function useGames(user, token) {
        const [games, setGames ] = useState([]);
        const [error, setError] = useState("");
        const [isLoading, setLoading] = useState(false);

        useEffect(() => {
		
		if (!token) {
		setLoading(true);
                apiClient.get("")
                        .then(res =>  {
				setGames(res.data);
				setLoading(false);
			})
                        .catch(err =>{
				setError(err.message)
				setLoading(false);
			});
		} else if (token) {
                setLoading(true);
                apiClient.get("" ,
			{
                                headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Token ${token}`,
                        },
				})
                        .then(res =>  {
                                setGames(res.data);
				console.log(res.data);
                                setLoading(false);
                        })
                        .catch(err =>{
                                setError(err.message)
                                setLoading(false);
                        });
		}

        }, []);
	return {games, error, isLoading};
};

export default useGames;
