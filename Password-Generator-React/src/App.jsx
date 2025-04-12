import { useState, useCallback, useEffect, useRef } from 'react'



function App() {

  // const [color, setColor] = useState("olive")
  const [length, setLength] = useState(6)
  const [numbers, setNumbers] = useState(false);
  const [chars, setChars] = useState(false);
  const[password, setPassword] = useState("")
  const [copySuccess, setCopySuccess] = useState(false);

//useRef Hook
const passwordRef = useRef(null)


  const passwordGenerator = useCallback(() => {

    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";


    if(numbers) {
      str = str + "0123456789";
    }
    if(chars) {
      str = str + "!@#$%&_";
    }

    for(let i=1; i<=length; i++) {
      let PassChars = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(PassChars);
    }
    setPassword(pass);


  }, [length,numbers,chars,password])

  const copyPasswordToClipBoard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password).then(() => {
      setCopySuccess(true);
      setTimeout(() => {
setCopySuccess(false);
      }, 2000);
    });
  }, [password] )

  useEffect(() => {
    passwordGenerator()
  

  },[length ,numbers, chars, 
    setPassword])
  

  return (
<>
<div id='container' className='text-purple-600  px-10 bg-gray-700  ml-100 pb-15 '>

<div id='content'>
  <h1>Password Generator</h1>
  <input type="text" 
  className='bg-amber-50 w-100 my-5 pl-3.5'
  placeholder='Password' 
  value={password} 
  readOnly ref={passwordRef}></input>


<button onClick={copyPasswordToClipBoard} className='bg-blue-500' >Copy</button>


    </div>


<div className='flex text-sm gap-x-2'>
  <div className=' flex items-center gap-x-1'>

<input type='range' 
min={6} 
max={100} 
value={length} 
className='cursor-pointer' onChange={(evt) => {setLength(evt.target.value)}} >
</input>

<label>Length: {length}</label>
</div>

<div id='checkBox1' className='flex items-center gap-x-1'>

<input id='numberInput' 
type='checkbox' 
defaultChecked={numbers} 
onChange={() =>  {
  setNumbers((prev) => !prev);

}}></input>

<label>Numbers</label>
</div>

<div id='checkBox2' className='flex items-center gap-x-1'>
  <input
   type='checkbox' 
   defaultChecked={chars} 
   onChange={() => {
    setChars((prev) => !prev)
  }}></input>

<label>characters</label>

</div>






</div>


</div> 

    </>




    //  <div style={{backgroundColor: color}}>
    //    <div className='p-4'>
    //  <div>
    //     <button className="bg-red-600">Red</button>
    //    <button className='bg-green-700'>Green</button>
    //     <button className='bg-blue-600'>Blue</button>
    //   </div>
    //   </div>
    //  </div> 

    
    
  )
}

export default App
