import React, { useState } from "react";
import styles from "../App.module.css";

interface Props {
	onSelectSearch: (searchselector: SearchSelector) => void;
}

function SearchSelector() {
	const [selectedSearch,onSelectSearch] = useState("All")
	const searchs = ["All", "Title", "Tv Episode", "Celebs", "Companies", "Keyword"];

	function handleOptionChange(event) {
		onSelectSearch(event.target.value);
	};
	return (
		<>
		<div>
		<label htmlFor="platform"></label>
		<select className={styles.dropdownsearch}id="platform" value={""} onChange={handleOptionChange}>
			<option className={styles.droplistsearch} value="">{selectedSearch}</option>
			{searchs.map((option, index) => (	
				<option key={index} value={option.title}>
				{option}
				</option>
			))}
		</select>
		</div>
		</>
	);
};

export default SearchSelector;
