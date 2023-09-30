import {useState} from "react"
import styles from "../App.module.css";

interface Props {
	children: string;
	maxChars?: number;
	length : number;
}


function ExpandableText({children, maxChars = 100, trivialength}: Props) {
	const [isExpanded, setExpanded] = useState(false);
	if (!children[2]) return <div>{children}</div>;
	const text = isExpanded ? children : children.slice(0, 2);
	
	return (
		<div>{text}...<button className={styles.expandable} onClick={() => setExpanded(!isExpanded)}>{isExpanded ? "Less" : "more"}</button></div>
	);
}

export default ExpandableText;
