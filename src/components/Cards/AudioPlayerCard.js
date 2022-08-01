import React,{useState,useEffect} from "react";
import { AudioPause,AudioPlay,AudioForward,AudioBackward } from "../../icons";
import { Button,Label } from '@windmill/react-ui'
// import ReactSlider from "react-slider";




function AudioPlayerCard(props)
{

	const {audioLink}=props;
	const [time,setTime]=useState('00:00');
	// const [audio,setAudio] = useState(new Audio(audioLink));
	const [isPlaying,setIsPlaying]=useState(false);

	// const audio=new Audio('https://vopa-bunny.b-cdn.net/media/21/452/2.mp3');
	
	useEffect(()=>{

		console.log("Value of playing"+isPlaying);

		if(isPlaying)
		{
			console.log("Playing");
			// audio.play();
		}
		else
		{
			console.log("Paused");
			// audio.pause();
		}
		// return () => {
		// 	// cancel the subscription
		// 	// setAudio(null);
		// 	setIsPlaying(false);
		// };
	},[isPlaying]);

	function handlePlayPause(e)
	{
		e.preventDefault();
		setIsPlaying(isPlaying=>!isPlaying);
	}

return(

	<>
	<div>

		<div className="flex items-center justify-center">
		<div className='m-2'>
		<Button icon={AudioBackward} aria-label="Like" size="small"/>
		</div>
		<div className='m-2'>
		<Button icon={(isPlaying) ? AudioPause:AudioPlay} size='large' 
		onClick={e=>handlePlayPause(e)}

		/>
		</div>
		<div className='m-2'><Button icon={AudioForward} aria-label="Like" size="small"/></div>

		</div>
		<div className="flex-wrap">
		<div className="flex">
		<div >
			<Label htmlFor="default-range" className="block text-sm font-medium text-gray-900 dark:text-gray-300 mx-10">
			{/* {audio.currentTime} */}
			000
			</Label>
		</div>
		<div className="flex-1">
			<Label htmlFor="default-range" className="float-right block text-sm font-medium text-gray-900 dark:text-gray-300 mx-10">03:00</Label>
		</div>
		</div>
		<div className="flex">
			{/* <input id="default-range"  type="range" className="w-full h-2 my-4 mx-10 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"/> */}
		</div>
		</div>
		
	</div>
</>
)
}

export default AudioPlayerCard