import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import mwLogo from '../../public/mw2.png'
import wzLogo from '../../public/wz.png'
import Link from 'next/link'
function GameSelectorBar({mode,user}) {

  const isWarzone = () => { //ABRIR MODAL
   return mode == 'wz'? (true):(false)
  }
  return (
    <div className='bg-card px-4 shadow'>
        <div className='container-fluid  py-2 d-flex flex-row  '>
            <Link className='link-offset-2 link-underline link-underline-opacity-0' href={`/wz/${user}`}>
                <div className='d-flex align-items-center'>
                  <Image src={wzLogo} width={25} height={20} className={`${isWarzone()? (''):('image-opacity')} `} alt='logo'></Image>
                  <h6 className={` ${isWarzone()? ('text-white'):('text-white-50')} mb-0 font-bebas mx-2 mt-1 `}>Warzone</h6>
              </div>
            </Link>
            <Link className='link-offset-2 link-underline link-underline-opacity-0' href={`/mw/${user}`}>
              <div className='d-flex align-items-center mx-4 pointer'>
                <Image src={mwLogo} width={55} height={20} className={`${!isWarzone()? (''):('image-opacity')} `} alt='logo'></Image>
                <h6 className={` ${!isWarzone()? ('text-white'):('text-white-50')} mb-0 font-bebas mx-2 mt-1 `}>Modern Warfare</h6>
              </div>
            </Link>
            
        </div>
    </div>
  )
}

export default GameSelectorBar