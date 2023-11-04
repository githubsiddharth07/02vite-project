import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [length, setLength]=useState(8);
  const [password, setPassword]=useState("");
  const [isNumber, setIsNumber]=useState(false);
  const [isChar, setIsChar]=useState(false);
  const fun=()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(isNumber) str+="1234567890";
    if(isChar) str+="[$&+,:;=?@#|'<>.-^*()%!]";
    for(let i=0;i<length;i++){
      let ch=str.charAt(Math.floor(Math.random()*str.length+1));
      pass+=ch;
    }
    setPassword(pass);
  }
  const passwordGenerator=useCallback(fun, [isNumber, isChar, length, setPassword]);
  useEffect(()=>passwordGenerator(), [isNumber, isChar, length, setPassword])

  const passwordRef=useRef(null)

  const copyToClipboard=useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 99);
    window.navigator.clipboard.writeText(password)
  }, [password])

  return(
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className='text-white text-center my-3'>Password generator</h1>
    <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            ref={passwordRef}
            readOnly
        />
        <button
        onClick={copyToClipboard}
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
        >Copy</button>
        
    </div>
    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input 
        type="range"
        min={4}
        max={100}
        value={length}
        className='cursor-pointer'
        id='myRange'
        onChange={(e)=> setLength(e.target.value)}
          />
          <label htmlFor='myRange'>Length: {length}</label>
      </div>
      <div className="flex items-center gap-x-1">
      <input
          type="checkbox"
          id="numberInput"
          defaultChecked={isNumber}
          onChange={()=> setIsNumber((prev)=> !prev)}
      />
      <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={isChar}
              id="charInput"
              onChange={()=> setIsChar((prev)=> !prev)}
          />
          <label htmlFor="charInput">Characters</label>
      </div>
    </div>
    </div>
  )
}

export default App
