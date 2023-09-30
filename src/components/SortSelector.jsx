import React, { useState } from "react";
import styles from "../App.module.css";

interface Props {
	onSelectSort: (sort: sort) => void;
	selectedSort: string;
}

function SortSelector( {onSelectSort, selectedSort} : Props) {
	const sorts = ["Name", "Year", "Certificate", "Metascore", "IMDb Rating", "Your Rating"]
	function handleOptionChange(event) {
                onSelectSort(event.target.value);
        };
	return (
		                <div className={styles.sortall}>
                <label htmlFor="platform">Sort By   </label>
                <select className={styles.sorter} id="platform" value={""} onChange={handleOptionChange}>
                        <option value="">{selectedSort}</option>
                        {sorts.map((option, index) => (
                                <option key={index} value={option.title}>
                                {option}
                                </option>
                        ))}
                </select>
                </div>
	);
}
export default SortSelector;
