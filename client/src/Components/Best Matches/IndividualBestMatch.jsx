import React from 'react'

const IndividualBestMatch = (props) => {
  return (
    <div>
    <div className="p-6 sm:p-12 dark:bg-gray-900 dark:text-gray-100 ml-5 mr-5 mt-5 rounded-xl">
	<div className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
		<img src={`${props.profilePic}`} alt="hiughiuh" className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0" />
		<div className="flex flex-col">
			<h4 className="text-lg font-semibold text-center md:text-left">{props.name}</h4> 
			<p className="dark:text-gray-400">{props.description}</p>
		</div>
	</div>
	
</div></div>
  )
}

export default IndividualBestMatch