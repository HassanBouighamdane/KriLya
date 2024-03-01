import React from 'react'

import profile from '../images/avatar.jpg'

function Review(userId, rating, comment, date) {

  
  return (
    <div>
      <div className="flex flex-col gap-2 bg-blue-100 p-4">
                                            
        <div className="flex justify-between">
                                    <div className="flex gap-2">
                                    <img className='w-10 h-10 rounded-full mx-auto' src={profile} alt='avatar' />
                                        {/* <div className="w-7 h-7 text-center rounded-full">J</div> */}
                                        <span>Ahmed Haroun</span>
                                    </div>
                                    <div className="flex p-1 gap-1 text-orange-300">
                                        <ion-icon name="star"></ion-icon>
                                        <ion-icon name="star"></ion-icon>
                                        <ion-icon name="star"></ion-icon>
                                        <ion-icon name="star"></ion-icon>
                                        <ion-icon name="star-half"></ion-icon>
                                    </div>
                                </div>

                                <div>
                                    Tres bon service !
                                </div>

                                <div className="flex justify-between">
                                    <span>Feb 13, 2021</span>
                                    <button className="p-1 px-2 text-white bg-blue-900 hover:bg-blue-800 border border-blue-950">
                                        <ion-icon name="share-outline"></ion-icon> Show item
                                    </button>
                                </div>
                                </div>
    </div>
  )
}

export default Review