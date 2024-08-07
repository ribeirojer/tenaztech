import React from "react";

type Props = {
	className?: string;
};

const EmailIcon = (props: Props) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1em"
			height="1em"
			className={` ${props.className}`}
			fill="currentColor"
			viewBox="0 0 256 256"
		>
			<rect width="256" height="256" fill="none"></rect>
			<path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM98.7,128,40,181.8V74.2Zm11.8,10.9,12.1,11a8,8,0,0,0,10.8,0l12.1-11L203.4,192H52.6ZM157.3,128,216,74.2V181.8Z"></path>
		</svg>
	);
};

export default EmailIcon;
