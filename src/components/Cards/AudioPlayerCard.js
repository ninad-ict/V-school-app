import React,{useState,useEffect} from "react";
import { AudioPause,AudioPlay,AudioForward,AudioBackward } from "../../icons";
import { Button,Label } from '@windmill/react-ui'
// import ReactSlider from "react-slider";




function AudioPlayerCard(props)
{

	const {audioLink}=props;
	const [time,setTime]=useState('00:00');
	const [audio,setAudio] = useState(new Audio(audioLink));
	const [isPlaying,setIsPlaying]=useState(false);
	const [audioDuration,setAudioDuration]=useState(0);
	const [audioCurrentTime,setAudioCurrentTime]=useState(0);

	// const audio=new Audio(audioLink);

	function createMinutesSeconds(time)
	{
		console.log("total Time is "+time);
		console.log("Minutes is "+parseInt(time/60));
		console.log("Seconds is "+parseInt(time%60));
		// console.log()
		const minutes=parseInt(time/60);
		const seconds=parseInt(time%60);
		// String(minutes).padEnd(2,'0');

		return String(minutes).padStart(2,'0')+":"+String(seconds).padStart(2,'0');
	}

	useEffect(()=>{

		console.log("Current time is"+audio.currentTime);

	},
	[audio.currentTime]);


	useEffect(()=>{

		const timeupdate = (e) => {
			let time = e.target.currentTime;
			// setCurrentTime(time);
			console.log("The actual time is"+time);
			setAudioCurrentTime(time);	
		  };
		  audio.addEventListener("timeupdate", timeupdate);
		  return () => {
			audio.removeEventListener("timeup	date", timeupdate);
		  };

	},[]);






	audio.addEventListener('loadedmetadata', (e) => {
		// return "Hii";
		setAudioDuration(e.target.duration);
		console.log("Current time->"+e.target.currentTime);
  });
	
	useEffect(()=>{

		console.log("Value of playing"+isPlaying);

		if(isPlaying)
		{
			console.log("Playing");
			audio.play();
		}
		else
		{
			console.log("Paused");
			audio.pause();
		}

		return(()=>{
			audio.pause();
		})

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
			{createMinutesSeconds(audioCurrentTime)}
			{/* 000 */}
			</Label>
		</div>
		<div className="flex-1">
			<Label htmlFor="default-range" className="float-right block text-sm font-medium text-gray-900 dark:text-gray-300 mx-10">
			{/* 03:00 */}
			{/* {audio.duration} */}
			{/* {audio && duration} */}
			{audio && createMinutesSeconds(audioDuration)}
			</Label>
		</div>
		</div>
		<div className="flex">
			<input id="default-range"  type="range" value={audio.currentTime} max={audioDuration} className="w-full h-2 my-4 mx-10 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"/>
		</div>
		</div>
		
	</div>
</>
)
}

export default AudioPlayerCard