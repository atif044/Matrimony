import React,{useContext, useEffect,useRef,useState} from 'react';
import  {toast, Toaster } from 'react-hot-toast';
import "../CSS/Custom.css"
import context from '../Context/context'
import { useNavigate,NavLink } from 'react-router-dom';
import {Puff} from 'react-loader-spinner';
import Utils from './Utils';
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs'
const Profile = () => {
    const navigate=useNavigate()
    const {myProfile,profile,photoUpdate,profilePic}=useContext(context)
    const [loading, setLoading] = useState(true);
    const ScrollRef=useRef();
    const [dp,setDp]=useState("");
    const [imagePreview,setImagePreview]=useState({raw:"",preview:""})
    const clickRef=useRef();
    const [photos,setPhotos]=useState([]);
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
    useEffect(
        ()=>{
        let fetchData=async()=>{
            try {
                let res = await myProfile();
                if (res?.err) {
                 return toast.error(res.err);
                }
                setLoading(false)
            } catch (error) {
                toast.error("Server Down")
            }
            }
        fetchData();
        // eslint-disable-next-line
    },[])
    const uploadImg=async()=>{
        let res=await photoUpdate(photos);
        if(res.msg){
            toast.success(res.msg)
            await myProfile()
            setPhotos([])
        }
    }
    const uploadProfilePic=async(e)=>{
        e.preventDefault();
        let res=await profilePic(dp)
        if(res?.error){
            toast.error(res.error);
        }
        else if(res.msg){
            toast.success(res.msg)
        }
     setDp("")
     setImagePreview({ raw: "", preview: "" });
     await myProfile();
    }
    const handleFileChange = (e) => {
        setDp(e.target.files[0]);
        setImagePreview({raw:e.target.files[0],
        preview:URL.createObjectURL(e.target.files[0])
        })
      };
      const cancelPreview=()=>{
        setDp("");
        setImagePreview({ raw: "", preview: null });
    }
  return (
    <>
    <div><Toaster reverseOrder={true}/></div>
      {
        loading?<div className='flex justify-center items-center'>
        <Puff
          color="#00BFFF"
          height={100}
          width={100}/>
          </div>:
        profile!==null? 
               <div class="bg-gray-100">
    <div class="container mx-auto py-8">
        <div class="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
            <div class="col-span-4 sm:col-span-3">
                <div class="bg-white shadow rounded-lg p-6">
                    <div class="flex flex-col items-center">
            {imagePreview.raw===""&&<img src={`${profile?.profile?.userId?.profilePic}`} alt={"Profile"} class="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"/>}
            {imagePreview.raw!==""&&<img src={`${imagePreview.preview}`} alt={"Profile"} class="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"/>}
                        <h1 class="text-xl font-bold">{profile?.profile?.userId?.Name}</h1>
                        <p class="text-gray-600">{profile?.profile?.profession}</p>
                        <div class="mt-6 flex flex-wrap gap-4 justify-center">
                           {dp==="" ? <button type='button' onClick={()=>clickRef.current.click()} className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded">Change DP</button>:
                           <div>
                           <button type='button' onClick={uploadProfilePic} className="bg-green-500 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded">Confirm</button>
                           <button type='button' onClick={cancelPreview} className="bg-white hover:bg-gray-400 text-gray-700 py-2 px-4 rounded">Cancel</button>
                           </div>
                           }
                            <input ref={clickRef} type='file' className=" hidden bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded" onChange={handleFileChange}/>

                        </div>
                    </div>
                    <hr class="my-6 border-t border-gray-300"/>
                    <div class="flex flex-col">
                        <span class="text-gray-600 uppercase font-bold tracking-wider mb-2">Interests</span>
                        <ul>
                            {profile?.profile?.Interests?.map((val)=>{
                                return <li key={val} class="mb-2">{val}</li>
                            })}
                        </ul>
                    </div>
                    <hr class="my-6 border-t border-gray-300"/>
                    <div class="flex flex-col">
                        <span class="text-gray-600 uppercase font-bold tracking-wider mb-2">Hobbies</span>
                        <ul>
                        {profile?.profile?.Hobbies?.map((val)=>{
                                return <li key={val} class="mb-2">{val}</li>
                            })}    
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-span-4 sm:col-span-9">
    <div class="bg-white shadow rounded-lg p-6">
                            <div className='flex justify-between'>
                    <h2 class="text-xl font-bold mb-4">About Me</h2>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded" onClick={()=>{
                        navigate("/CompleteProfile",{state:profile.profile});
                    }}>Update Profile</button>
                            </div>
                            <div className='max-w-md mx-auto break-words md:max-w-2xl'>
                    <p class="text-gray-700">{profile?.profile?.description}
                    </p>
                    </div>
                    
                    <div class="mb-4">
                        <div class="flex justify-evenly">
                        <div>
                        <h2 class="text-xl font-bold mt-2 mb-4">Age</h2>
                            <span class="text-gray-600 font-bold">{profile?.profile?.Age}</span>
                        </div>
                        <div>
                        <h2 class="text-xl font-bold mt-2 mb-4">Weight</h2>
                            <span class="text-gray-600 font-bold">{profile?.profile?.bodyWeight}</span>
                        </div>
                        <div>
                        <h2 class="text-xl font-bold mt-2 mb-4">Height</h2>
                            <span class="text-gray-600 font-bold">{profile?.profile?.height}</span>
                        </div>
                        </div>
                    </div>
                    <div class="mb-4">
                        <div class="flex justify-around">
                        <div>
                        <h2 class="text-xl font-bold mt-2 mb-4">Nationality</h2>
                            <span class="text-gray-600 font-bold">{profile?.profile?.nationality}</span>
                        </div>
                        <div>
                        <h2 class="text-xl font-bold mt-2 mb-4">Religion</h2>
                            <span class="text-gray-600 font-bold">{profile?.profile?.religon}</span>
                        </div>
                        <div>
                        <h2 class="text-xl font-bold mt-2 mb-4">Salary</h2>
                            <span class="text-gray-600 font-bold">{profile?.profile?.salary}</span>
                        </div>
                       </div>
                    </div>
                    <h2 class="text-xl font-bold mt-6 mb-4">Education</h2>
                    <div class="mb-4">
                        <div class="flex">
                            <span class="text-gray-600 font-bold">{profile?.profile?.education}</span>
                        </div>
                    </div>
                    <h2 class="text-xl font-bold mt-6 mb-4">Location</h2>
                    <div class="mb-4">
                        <div class="flex">
                            <span class="text-gray-600 font-bold">{`${profile?.profile?.location?.address}, ${profile?.profile?.location?.city+ " " +profile?.profile?.location?.country}`}</span>
                        </div>
                    </div>
                    <h2 class="text-xl font-bold mt-6 mb-4">Family Background</h2>
                    <div class="mb-4">
                    <div class="accordion">
    <input type="checkbox" id="section1"/>
    <label for="section1">Father Status</label>
    <div class="accordion-content">
      <p class="p-4">{profile?.profile?.familyBackground?.fatherStatus}</p>
    </div>
    <input type="checkbox" id="section2"/>
    <label for="section2">Mother Status</label>
    <div class="accordion-content">
      <p class="p-4">{profile?.profile?.familyBackground?.motherStatus}</p>
    </div>
    <input type="checkbox" id="section3"/>
    <label for="section3">Siblings</label>
    <div class="accordion-content">
      <p class="p-4">{profile?.profile?.Siblings}</p>
    </div>
  </div>
                    </div>   
                    <div className='flex justify-between'>
                    <h2 class="text-xl font-bold mb-4">Images</h2>
                   {photos.length===0 && <input type='file' accept='image/*' multiple onChange={(e)=>{setPhotos(Array.from(e.target.files))}} className=''/>}
                   {photos.length!==0 && <div className='flex'>
                    <button onClick={uploadImg} className='bg-green-500 rounded-sm p-1 mr-3'>Upload</button>
                    <button className='text-red-700 font-bold' onClick={()=>setPhotos([])}>Cancel</button>
                    </div>}
                    </div> 
                        <div ref={ScrollRef} className='flex overflow-auto mb-4 hero'>
                       { profile?.profile?.photos?.map((img,i)=>{
                            return <img key={i} alt={`gallery-${i}`} src={`${img}`} class="w-auto max-h-96 object-contain mr-5"/>
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
</div>:
<NavLink to="/CompleteProfile">
<h1 className="text-4xl font-bold">
    Click to Goto Complete Profile Page
</h1>
</NavLink>
}
    </>

  );
};

export default Profile;
