import React,{useState} from 'react'

const PreTag = () => {
    const [state, setstate] = useState(<body><b>hello</b><p>hhhh</p></body>);
  return (
    <div>
            {state}
    </div>
  )
}

export default PreTag