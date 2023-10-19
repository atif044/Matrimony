import React,{useRef,useContext} from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs'
import context from '../../Context/context'
import toast, { Toaster } from 'react-hot-toast';

const FullProfile2 = () => {
    const {expressInterest}=useContext(context)
    const location = useLocation();
    const navigate=useNavigate()
    const { state: largeObject,
    } = location;
    const ScrollRef=useRef()
    const handleScroll = (direction) => {
        const { current } = ScrollRef;
        const scrollAmount = 154
    
        if (direction === "left") {
          current.scrollLeft -= scrollAmount;
        }
        else if (direction === "right") {
          current.scrollLeft += scrollAmount;
        }
      }
      const expressInterests=async()=>{
            let res=await expressInterest(largeObject.userId._id)
            if(res?.error){
                return toast.error(res.error);
            }
            else if(res?.msg){
                return toast.success(res.msg);
            }
      }
    return (
        <div className="p-16">
        <div><Toaster reverseOrder={true}/></div>
        <div className="p-8 bg-white shadow mt-24">
            <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="relative">
                    <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                        <img src={`${largeObject.userId.profilePic}`} className="w-48 h-48 bg-gray-300 rounded-full mb-4 shrink-0" alt={"ksnkjfnkj"}/>

                        
                    </div>
                </div>
                <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
                    
                     
                       <div>
                    <button className="text-white py-2 px-4 uppercase rounded bg-green-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5" onClick={expressInterests}>  Connect</button>
                    <button className="text-white py-2 px-4 uppercase rounded bg-cyan-300 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5" disabled>  Message</button> 
                        </div>
                        
                </div>
                  </div>
            <div className="mt-20 text-center border-b pb-12">
                <h1 className="text-4xl font-medium text-gray-700">{largeObject.userId.Name}, <span className="font-light text-gray-500">{largeObject.Age}</span>
                </h1>
                <p className="font-light text-gray-600 mt-3">{largeObject.location.city + ", " + largeObject.location.country}</p>
                <p className="mt-8 text-gray-500">{largeObject.profession}</p>
                <p className="mt-2 text-gray-500">{largeObject.education}</p>
            </div>
            <div className="mt-12 flex flex-col justify-center">
                <p className="text-gray-600 text-center font-light lg:px-16">{largeObject.description}</p>
            </div>
            <div className="mb-4">
                <div className="md:flex md:justify-evenly">
                    <div>
                        <h2 className="text-xl font-bold mt-2 mb-4">Siblings</h2>
                        <span className="text-gray-600 font-bold">{largeObject.Siblings}</span>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold mt-2 mb-4">Nationality</h2>
                        <span className="text-gray-600 font-bold">{largeObject.nationality}</span>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold mt-2 mb-4">Religon</h2>
                        <span className="text-gray-600 font-bold">{largeObject.religon}</span>
                    </div>
                </div>
            </div>
            <div className="mb-4">
                <div className="md:flex md:justify-evenly">
                    <div>
                        <h2 className="text-xl font-bold mt-2 mb-4">Complexion</h2>
                        <span className="text-gray-600 font-bold">{largeObject.complexion}</span>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold mt-2 mb-4">Weight</h2>
                        <span className="text-gray-600 font-bold">{largeObject.bodyWeight}</span>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold mt-2 mb-4">Height</h2>
                        <span className="text-gray-600 font-bold">{largeObject.height}</span>
                    </div>
                </div>
            </div>
            <div className='mb-4'>
                <div className='md:flex md:justify-evenly'>
                    <div className='flex-col'>
                        <h1 className='text-xl font-bold mt-2 mb-4'>Interests</h1>
                        {
                            largeObject.Interests.map((val, i) => {
                                return <div key={i}>
                                    <li>{val}</li>
                                </div>
                            })
                        }
                    </div>
                    <div className='flex-col'>
                        <h1 className='text-xl font-bold mt-2 mb-4s'>Hobbies</h1>
                        {
                            largeObject.Hobbies.map((val, i) => {
                                return <div key={i}>
                                    <li>{val}</li>
                                </div>
                            })
                        }
                    </div>
                    <div>
                    <h2 className="text-xl font-bold mt-6 mb-4">Family Background</h2>
                    <div className="mb-2">
                        <div className="accordion">
                            <input type="checkbox" id="section1" />
                            <label htmlFor="section1">Father Status</label>
                            <div className="accordion-content">
                                <p className="p-4">{largeObject.familyBackground.fatherStatus}</p>
                            </div>
                            <input type="checkbox" id="section2" />
                            <label htmlFor="section2">Mother Status</label>
                            <div className="accordion-content">
                                <p className="p-4">{largeObject.familyBackground.motherStatus}</p>
                            </div>
                            <input type="checkbox" id="section3" />
                            <label htmlFor="section3">Siblings</label>
                            <div className="accordion-content">
                                <p className="p-4">{largeObject.Siblings}</p>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            <div>
            <h2 className="text-xl font-bold mb-4">Images</h2>
            <div ref={ScrollRef} className='flex overflow-auto mb-4 hero'>
                       { largeObject.photos?.map((img,i)=>{
                            return <img key={i} alt={`gallery-${i}`} src={`${img}`} className="w-auto max-h-96 object-contain mr-5"/>
                        })
                        }
                        <div onClick={() => handleScroll("left")} style={{ display: "flex", cursor: "pointer", position: "absolute",marginLeft:'-20px', alignSelf: "center",  }}>
        <BsFillArrowLeftCircleFill size={25} />
      </div>
      <div onClick={() => handleScroll("right")} style={{ display: "flex", cursor: "pointer", position: "absolute", right: 0, alignSelf: "center", marginRight: "15px" }}>
        <BsFillArrowRightCircleFill  size={25} />
      </div>
            </div>
            </div>
            </div>
        </div>
        </div>
    )
}
export default FullProfile2