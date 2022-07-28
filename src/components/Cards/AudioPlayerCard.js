import React from "react";
import { HeartIcon } from "../../icons";
import { Button } from '@windmill/react-ui'
import {Slider} from '@windmill/react-ui';



export default function AudioPlayerCard()
{

return(

	<div >

		<div className="bg-red-400 flex items-center justify-center">
		<Button icon={HeartIcon} aria-label="Like" size="small" className='m-2'/>
		<Button icon={HeartIcon} aria-label="Like" size="larger" className='m-2'/>
		<Button icon={HeartIcon} aria-label="Like" size="small" className='m-2'/>
		</div>
		<div className="flex items-center justify-center">
		<Button icon={HeartIcon} aria-label="Like" size="small" className='m-2'/>

		</div>
		
	</div>

)
}