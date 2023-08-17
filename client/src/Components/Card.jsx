import React from 'react'
const Card = (props) => {
  return (
    <div className="w-80 max-sm:max-w-fit rounded-3xl border-2 overflow-x-hidden flex-shrink-0 mr-6 pt-6 mb-10 pb-8 shadow-md">
  <div className="h-48 flex items-center justify-center">
    <img className="h-full object-center object-cover rounded-r-full" src={props.img} alt="Sunset in the mountains"/>
  </div>
  <div className="px-2 md:px-5 py-4">
    <div className="font-bold text-xl">{props.name}</div>
    <p className="text-gray-700 text-base">
      {props.desc}
    </p>
  </div>
</div>

  //   <div className="max-w-fit rounded border overflow-x-hidden flex-shrink-0 mr-6 pt-6 mb-6">
  //   <div className="h-48 flex items-center justify-center">
  //   <img className="h-full object-center object-cover rounded-r-full" src={props.img} alt="Sunset in the mountains"/>
  // </div>
  //   <div className="px-10 py-4">
  //     <div className="font-bold text-xl mb-2">{props.name}</div>
  //     <p className="text-gray-700 text-base">
  //       {props.desc}
  //     </p>
  //   </div>
    
  // </div>
   
    
  )
}

export default Card