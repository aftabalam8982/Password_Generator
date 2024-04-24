import React, { useCallback, useEffect, useRef, useState } from "react";

const PasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [isNumAllow, setIsNumAllow] = useState(false);
  const [isCharAllow, setIsCharAllow] = useState(false);

  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let passwords = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (isNumAllow) str += "0123456789";
    if (isCharAllow) str += '`!#$%&*({",/?';
    for (let i = 0; i <= length; i++) {
      const char = Math.floor(Math.random() * str.length + 1);
      passwords += str.charAt(char);
    }
    setPassword(passwords);
  }, [length, isNumAllow, isCharAllow, setPassword]);

  const handleClick = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 99);
    navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    generatePassword();
  }, [length, isNumAllow, isCharAllow, generatePassword]);

  return (
    <div className='bg-gray-400 text-center py-8 flex flex-col justify-center'>
      <h1 className='text-4xl'>Password Generator</h1>
      <div className='p-4 '>
        <input
          readOnly
          type='text'
          value={password}
          ref={passwordRef}
          className='px-2 py-1 w-80 outline-none pointer-events-none'
        />
        <button
          onClick={handleClick}
          className='bg-blue-600 text-white font-bold px-2 py-1 rounded-r-lg'
        >
          Copy
        </button>
      </div>
      <div className='flex justify-center text-center gap-1 text-blue-700'>
        <input
          type='range'
          className='cursor-pointer'
          max={99}
          min={0}
          value={length}
          onChange={(e) => setLength(e.target.value)}
        />
        <label htmlFor='forRange' className='font-bold text-center px-1'>
          Length: {length}
        </label>
        <input
          type='checkbox'
          className='size-5 cursor-pointer'
          onClick={() => setIsNumAllow((prev) => !prev)}
        />
        <label htmlFor='forNumber' className='font-bold '>
          Numbers
        </label>
        <input
          type='checkbox'
          className='size-5 cursor-pointer '
          onClick={() => setIsCharAllow((prev) => !prev)}
        />
        <label htmlFor='forNumber' className='font-bold'>
          Characters
        </label>
      </div>
    </div>
  );
};

export default PasswordGenerator;
