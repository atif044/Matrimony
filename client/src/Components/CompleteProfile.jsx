import React,{useState,useContext,useEffect} from 'react';
import {ImCross} from 'react-icons/im';
import toast, { Toaster } from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import context from '../Context/context';
const CompleteProfile = () => {  
  const [InterestArr,setInterestArr]=useState([]);
  const [HobbiesArr,setHobbiesArr]=useState([]);
  const location=useLocation()
  const { state: largeObject,
  } = location;
  const [profile,setProfile]=useState({
  Interests:"",Hobbies:"",
  fatherStatus:"",motherStatus:"",
  city:"",country:"",address:"",
  religon:"",education:"",profession:"",
  nationality:"",description:"",Siblings:undefined,
  height:"",bodyWeight:"",complexion:""
});

  const OnChange=(e)=>{
    setProfile({...profile,[e.target.name]:e.target.value}) 
  }
  const arrManager=(setState,index)=>{
    setState(prevList => {
      const updatedList = [...prevList];
     updatedList.splice(index, 1);
    return updatedList;
  })
}
const arrayAdder=(setState,value,setInput,input,specific)=>{
  value.length>2 && setState(prevVal => [...prevVal,value]);
  specific==="Hobbies"?value.length>2 &&setInput({...input,Hobbies:""}):
  value.length>2 &&setInput({...input,Interests:""})
}
const {detailUpdate}=useContext(context);
const onSubmit=async(e)=>{
  e.preventDefault();
  const details={
    Interests:InterestArr,
    Hobbies:HobbiesArr,
    location:{
      city:profile.city,
      country:profile.country,
      address:profile.address
    },
    familyBackground:{
      fatherStatus:profile.fatherStatus,
      motherStatus:profile.motherStatus
    },
    religon:profile.religon,
    profession:profile.profession,
    education:profile.education,
    nationality:profile.nationality,
    description:profile.description,
    Siblings:profile.Siblings,
    height:profile.height,
    bodyWeight:profile.bodyWeight,
    complexion:profile.complexion
  }
  try {
    
    let res=await detailUpdate(details);
    if(res.msg){
      toast.success(res.msg)
    }
  } catch (error) {
    return toast.error("Server Error")
  }
  
}
useEffect(() => {
  if(largeObject!==null){
    setProfile({
      ...profile,
      fatherStatus:largeObject?.familyBackground.fatherStatus,
      motherStatus:largeObject?.familyBackground.motherStatus,
      Siblings:largeObject?.Siblings,
      education:largeObject?.education,
      address:largeObject?.location.address,
      city:largeObject?.location.city,
      country:largeObject?.location.country,
      complexion:largeObject?.complexion,
      description:largeObject?.description,
      height:largeObject?.height,
      bodyWeight:largeObject?.bodyWeight,
      profession:largeObject?.profession,
      nationality:largeObject?.nationality,
      religon:largeObject?.religon,
    }
    )
    setInterestArr(largeObject?.Interests)
    setHobbiesArr(largeObject?.Hobbies)
  }
}, [])
  return (
    <>   
     <div>
      <Toaster/>
    </div>
    <form className='mx-16 mt-16' onSubmit={onSubmit}>
  <div className="relative w-full mb-6 group">
  <div className='flex'>
    <input
      type="text"
      name="Hobbies"
      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
      placeholder=" "
      value={profile.Hobbies}
      onChange={OnChange}
    />
    <button className='bg-green-400 text-black p-2 ml-1'  onClick={()=>arrayAdder(setHobbiesArr,profile.Hobbies,setProfile,profile,"Hobbies")}
     type='button'>Add</button>
    <label
      htmlFor="Hobbies"
      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >Hobbies</label>
  </div>
      {HobbiesArr.length===0&&<span className="text-xs text-red-500">Please Add One By One</span>}
          <div className='text-sm text-gray-800 mt-2'>
          <ul>
      {HobbiesArr.map((val,index)=>{
        return <div key={index} className='flex'>
        <li  className='mr-4'>{val}</li>
        <ImCross className='mt-1' size={10} onClick={()=>arrManager(setHobbiesArr,index)}          
        />
        </div>  
      }   
      )} 
          </ul>

          </div>
  </div>

  <div className="relative z-0 w-full mb-6 group">
  <div className='flex'>
    <input
      type="text"
      name="Interests"
      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
      placeholder=" "
      value={profile.Interests}
      onChange={OnChange}
    />
    <button className='bg-green-400 text-black p-2 ml-1'  onClick={()=>arrayAdder(setInterestArr,profile.Interests,setProfile,profile,"Interests")} type='button'>Add</button>
    <label
      htmlFor="Interests"
      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >Interests</label>
  </div>
      {InterestArr.length===0&&<span className="text-xs text-red-500">Please Add One By One</span>}
          <div className='text-sm text-gray-800 mt-2'>
          <ul>
      {InterestArr.map((val,index)=>{
        return <div key={index} className='flex'>
        <li className='mr-4'>{val}</li>
        <ImCross className='mt-1' size={10} onClick={()=>arrManager(setInterestArr,index)}
                  
                />
        </div>  
      }   
      )}
          </ul>

          </div>
  </div>
  <div className="relative z-0 w-full mb-6 group">
    <input
      type="text"
      name="education"
      id="education"
      value={profile.education}
      onChange={OnChange}
      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
      placeholder=" "
      required
    />
    <label
      htmlFor="education"
      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >Education</label>
  </div>
  <div className="relative z-0 w-full mb-6 group">
    <input
      type="text"
      name="religon"
      id="religon"
      value={profile.religon}
      onChange={OnChange}
      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
      placeholder=" "
      required
    />
    <label
      htmlFor="religon"
      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >Religon</label>
  </div>
  <div className="grid md:grid-cols-2 md:gap-6">
    <div className="relative z-0 w-full mb-6 group">
      <input
        type="text"
        name="profession"
        id="profession"
        value={profile.profession}
        onChange={OnChange}
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
        placeholder=" "
        required
      />
      <label
        htmlFor="profession"
        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >Profession</label>
    </div>
    <div className="relative z-0 w-full mb-6 group">
      <input
        type="text"
        name="nationality"
        value={profile.nationality}
        onChange={OnChange}
        id="nationality"
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
        placeholder=" "
        required
      />
      <label
        htmlFor="nationality"
        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >Nationality</label>
    </div>
  </div>
  <div className="grid md:grid-cols-2 md:gap-6">
    <div className="relative z-0 w-full mb-6 group">
      <input
        type="text"
        name="height"
        id="height"
        value={profile.height}
        onChange={OnChange}
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
        placeholder=" "
        required
      />
      <label
        htmlFor="height"
        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >Height in ft</label>
    </div>
    <div className="relative z-0 w-full mb-6 group">
      <input
        type="text"
        name="bodyWeight"
        id="bodyWeight"
        value={profile.bodyWeight}
        onChange={OnChange}
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
        placeholder=" "
        required
      />
      <label
        htmlFor="bodyWeight"
        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >Weight in Kg</label>
    </div>
  </div>
      <div className='grid md:grid-cols-2 md:gap-6'>
      <div className="relative z-0 w-full mb-6 group">
      <input
        type="text"
        name="complexion"
        id="complexion"
        value={profile.complexion}
        onChange={OnChange}
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
        placeholder=" "
        required
      />
      <label
        htmlFor="complexion"
        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >Complexion (Fair , Dull etc.) </label>
    </div>
    <div className="relative z-0 w-full mb-6 group">
      <input
        type="number"
        name="Siblings"
        id="Siblings"
        value={profile.Siblings}
        onChange={OnChange}
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
        placeholder=" "
        required
      />
      <label
        htmlFor="Siblings"
        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >Siblings </label>
    </div>
      </div>


      <div className='grid md:grid-cols-2 md:gap-6'>
      <div className="relative z-0 w-full mb-6 group">
      <input
        type="text"
        name="fatherStatus"
        id="fatherStatus"
        value={profile.fatherStatus}
        onChange={OnChange}
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
        placeholder=" "
        required
      />
      <label
        htmlFor="fatherStatus"
        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >Fateher Status (Alive, Deceased etc) </label>
    </div>
    <div className="relative z-0 w-full mb-6 group">
      <input
        type="text"
        name="motherStatus"
        id="motherStatus"
        value={profile.motherStatus}
        onChange={OnChange}
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
        placeholder=" "
        required
      />
      <label
        htmlFor="motherStatus"
        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >Mother Status ( Alive Deceased, .etc) </label>
    </div>
      </div>
      <div className="relative z-0 w-full mb-6 group">
    <input
      type="text"
      name="address"
      id="address"
      value={profile.address}
      onChange={OnChange}
      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
      placeholder=" "
      required
    />
    <label
      htmlFor="address"
      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >Address</label>
  </div>
      <div className='grid md:grid-cols-2 md:gap-6'>
      <div className="relative z-0 w-full mb-6 group">
      <input
        type="text"
        name="city"
        id="city"
        value={profile.city}
        onChange={OnChange}
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
        placeholder=" "
        required
      />
      <label
        htmlFor="city"
        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >City</label>
    </div>
    <div className="relative z-0 w-full mb-6 group">
      <input
        type="text"
        name="country"
        id="country"
        value={profile.country}
        onChange={OnChange}
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
        placeholder=" "
        required
      />
      <label
        htmlFor="country"
        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >Country </label>
    </div>
      </div>
      <div className="relative z-0 w-full mb-6 group">
    <textarea
    rows={5}
      type="text"
      name="description"
      id="description"
      value={profile.description}
      onChange={OnChange}
      className="resize-none block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
      placeholder=" "
      required
    />
    <label
      htmlFor="description"
      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >About Me</label>
  </div>



  <button
    type="submit"
    className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
  >
    Submit
  </button>
</form>
</>
  )
}

export default CompleteProfile;