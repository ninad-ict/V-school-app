import React from 'react'

import { ForbiddenIcon } from '../icons';

import ComingSoonLottie from "../assets/lottie/coming-soon.json";
import { Player, Controls } from '@lottiefiles/react-lottie-player';


function Page404() {
  return (
    <div className="flex flex-col items-center">
      {/* <ForbiddenIcon className="w-12 h-12 mt-8 text-purple-200" aria-hidden="true" /> */}
      {/* <h1 className="text-6xl font-semibold text-gray-700 dark:text-gray-200">404</h1> */}
      <Player
          autoplay
          loop
          src={ComingSoonLottie}
          style={{ height: '300px', width: '300px' }}
        >
          {/* <Controls visible={true} buttons={['play', 'repeat', 'frame', 'debug']} /> */}
            </Player>
      <p className="text-gray-700 dark:text-gray-300">
        {/* Page not found. Check the address or{' '} */}
        We will back soon with more exciting content just for you!
        {/* <a className="text-purple-600 hover:underline dark:text-purple-300" href="../index.html">
          go back
        </a> */}
        .
      </p>
    </div>
  )
}

export default Page404
