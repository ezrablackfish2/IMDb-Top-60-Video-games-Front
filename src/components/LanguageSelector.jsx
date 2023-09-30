import React, { useState } from "react";
import styles from "../App.module.css";

interface Props {
	onSelectLanguage: (languageselector: LanguageSelector) => void;
}

function LanguageSelector() {
	const [selectedLanguage, onSelectLanguage] = useState("English")
	const languages = ["English", "Francais", "Deutsch", "Italiano", "Portugues", "Espanol"];

	function handleOptionChange(event) {
		onSelectLanguage(event.target.value);
	};
	return (
		<>
		<div>
		<label htmlFor="Language"></label>
		<select className={styles.dropdownlanguage}id="Language" value={""} onChange={handleOptionChange}>
			<option className={styles.droplistsearch} value="">{selectedLanguage}</option>
			{languages.map((option, index) => (	
				<option key={index} value={option.title}>
				{option}
				</option>
			))}
		</select>
		</div>
		</>
	);
};

export default LanguageSelector;
