import React, { useRef } from 'react'
import Card from './Card'
import "../CSS/Custom.css"
import qirab from "../images/qirab.jpeg"
import usman from "../images/usman.jpeg"
import umair from "../images/umair.jpeg"
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs'
const AllCards = () => {
  const arr =
    [{ name: "Qirab", img: qirab, desc: "I was single and they helped me alot finding my perfect match" },
    { name: "Usman", img: usman, desc: "I was single and they helped me alot finding my perfect match" },
    { name: "Umair", img: umair, desc: "I was single and they helped me alot finding my perfect match" }]
  const ScrollRef = useRef()
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
  return (
    <div ref={ScrollRef} className='flex overflow-auto hero' style={
      { msOverflowStyle: "none", scrollbarWidth: "none" }
    }>
      {
        arr.map((el, i) => {
          return <Card key={i} name={el.name} img={el.img} desc={el.desc} />
        })
      }
      
      <div onClick={() => handleScroll("left")} style={{ display: "flex", cursor: "pointer", position: "absolute", left: 0, alignSelf: "center", marginLeft: "5px" }}>
        <BsFillArrowLeftCircleFill className={`${
        arr.length < 4 ? "custom:hidden" : ""
              }`} size={25} />
      </div>
      <div onClick={() => handleScroll("right")} style={{ display: "flex", cursor: "pointer", position: "absolute", right: 0, alignSelf: "center", marginRight: "5px" }}>
        <BsFillArrowRightCircleFill className={`${
        arr.length < 4 ? "custom:hidden" : ""
              } `} size={25} />
      </div>
    </div>
  )
}

export default AllCards