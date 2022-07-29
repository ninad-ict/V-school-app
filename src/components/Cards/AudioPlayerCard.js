import React,{useState,useEffect} from "react";
import { AudioPause,AudioPlay,AudioForward,AudioBackward } from "../../icons";
import { Button } from '@windmill/react-ui'
import ReactSlider from "react-slider";




export default function AudioPlayerCard()
{

return(

	<div>

		<div className="flex items-center justify-center">
		<div className='m-2'>
		<Button icon={AudioBackward} aria-label="Like" size="small"/>
		</div>
		<div className='m-2'>
		<Button icon={AudioPlay} size='large'/>
		</div>
		<div className='m-2'><Button icon={AudioForward} aria-label="Like" size="small"/></div>

		</div>
		<div className="flex-wrap">
		<div className="flex">
		<div >
			<label for="default-range" class="block text-sm font-medium text-gray-900 dark:text-gray-300 mx-10">00:00</label>
		</div>
		<div className="flex-1">
			<label for="default-range" class="float-right block text-sm font-medium text-gray-900 dark:text-gray-300 mx-10">Default range</label>
		</div>
		</div>
		{/* </div>
		<div className="flex"> */}
		<div className="flex">
			<input id="default-range" value='0' type="range" class="w-full h-2 my-4 mx-10 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"/>
		</div>
		</div>
		
	</div>

)
}