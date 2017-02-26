// Select all list items that have data-time attribute. Since it is a node list (an array-like object), we must turn it into array. Either this way or spread [... document.querySelectorAll(etc)]
const timeNodes = Array.from(document.querySelectorAll('[data-time]'));

const seconds = timeNodes
	// Map the array and extract values from data-time attr
	.map(node => node.dataset.time)
	// This results into an array of m:s values. Split it into minutes ('m' part) and seconds ('s' part). It will return strings, so we need to map and turn into numbers (parseFloat). It returns duration of each video in seconds
	.map(timeCode => {
		const [mins, secs] = timeCode.split(':').map(parseFloat);
		// It is enough just to declare a function for map to use
		return (mins * 60) + secs;
	})
	// Sum up all videos lenght with reduce
	.reduce((total, vidSeconds) => total + vidSeconds);

let secondsLeft = seconds;
// Total hours, rounded down for only full hours
const hours = Math.floor(secondsLeft / 3600);
// Get the remaining seconds
secondsLeft = secondsLeft % 3600;
// Turn'em into minutes and get the remainder
const minutes = Math.floor(secondsLeft / 60);
secondsLeft = secondsLeft % 60;

console.log(`Total duration of videos is ${hours}:${minutes}:${secondsLeft}`);