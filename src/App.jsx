import { useCallback, useEffect, useState, useRef } from 'react'
// import './App.css'

function App() {
  //1-> select vaiable which shows in input
  const [length, setLength] = useState(8)
  const[numberAllowed,setnumberAllowed]=useState(false);
  const[charAllowed,setCharAllowed]=useState(false)
  const[password,setPassword]=useState("")
//USEREF HOOK->can take reference of any element and can manupulation with that
const passwordRef=useRef(null)
//2-> password generator input variable ko le rha tha
  const passwordGenerator=useCallback(()=>{//optimize it using usecallback use dfor memoize
  let pass=""
  let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  if(numberAllowed) str +="0123456789"// if no allow then add no
  if(charAllowed) str +="!@#$%^&*-_+=[]{}~`"// if char allow then add char
  //randomaly generate password
  for(let i=1;i<=length;i++){
    let char=Math.floor(Math.random()*str.length+1)
    pass +=str.charAt(char)
  }// finally set password because state update like this
  setPassword(pass)
},[length,numberAllowed,charAllowed,setPassword])
 const copyPasswordToClipboard=useCallback(()=>{
  passwordRef.current?.select()// change password reference ki current value ko change kr do
  passwordRef.current?.setSelectionRange(0,10);
  window.navigator.clipboard.writeText(password)
 },
 [password])
 //userEffect hook-> jb bhi page load hota h to first time pr call hota h
 useEffect(()=>{
  passwordGenerator()
 },[length,numberAllowed,charAllowed,passwordGenerator]) //if any dependency variable will be change then again it will be rerun.
return (
    <>
  <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700'>
   <h1 className='text-white text-center my-3'>Password generator</h1>
    <div className='flex shadow rounded-lg overflow-hidden mb-4'>
      <input type="text"
      value={password}
      className='outline-none w-full py-1 px-3'
      placeholder='Password'
      readOnly
      //last is copytoclipboard
      ref={passwordRef} />
      <button onClick={copyPasswordToClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' >Copy</button>
    </div>
    <div className='flex text-sm gap-x-2'>
      <div className='flex-items-center gap-x-1'>
        <input type="range"
        min={6}
        max={100}
        value={length}
        className='cursor-pointer'
        onChange={(e)=>{setLength(e.target.value)}} />
        <label>Length:{length}</label>
      </div>
      <div className='flex-items-center gap-x-1'>
       <input type="checkbox"
       defaultChecked={numberAllowed}
       id='numberInput' 
        onChange={()=>{
          setnumberAllowed((prev)=>!prev);
        }}
       />
       <label htmlFor="numberInput">Numbers</label>
   </div>
   <div className='flex-items-center gap-x-1'>
       <input type="checkbox"
       defaultChecked={charAllowed}
       id='numberInput' 
        onChange={()=>{
          setCharAllowed((prev)=>!prev);
        }}
       />
       <label htmlFor="numberInput">Characters</label>
   </div>
    </div>
    </div>       
   
    </>
  )
}

export default App
