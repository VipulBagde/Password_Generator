import { useState, useCallback, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copySuccess, setCopySuccess] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%&";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
      .then(() => {
        setCopySuccess("Text copied to clipboard!");
        setTimeout(() => setCopySuccess(""), 2000);
      })
      .catch(() => {
        setCopySuccess("Failed to copy!");
      });
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="container mx-auto p-8 rounded-xl shadow-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"
    >
      <motion.h1
        className="text-center text-white text-4xl font-bold mb-6"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 50 }}
      >
        Password Generator
      </motion.h1>
      
      <motion.div
        className="flex items-center mb-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg shadow-inner overflow-hidden"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <input
          type="text"
          value={password}
          readOnly
          ref={passwordRef}
          className="flex-grow p-4 text-xl font-semibold text-gray-100 bg-transparent outline-none"
        />
        <motion.button
          onClick={copyPasswordToClipboard}
          className="bg-gradient-to-r from-blue-500 to-teal-400 text-white px-6 py-4 font-bold"
          whileHover={{ scale: 1.1, backgroundColor: "#2563eb" }}
          whileTap={{ scale: 0.9 }}
        >
          Copy
        </motion.button>
      </motion.div>

      {copySuccess && (
        <motion.p
          className="text-center text-green-300 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {copySuccess}
        </motion.p>
      )}

      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-white font-semibold text-lg">Length: {length}</label>
          <motion.input
            type="range"
            min={6}
            max={100}
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="cursor-pointer w-full ml-4"
            whileHover={{ scale: 1.1 }}
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="text-white font-semibold text-lg">Include Numbers</label>
          <motion.input
            type="checkbox"
            checked={numberAllowed}
            onChange={() => setNumberAllowed(!numberAllowed)}
            className="form-checkbox h-6 w-6 text-blue-600 cursor-pointer"
            whileHover={{ scale: 1.1 }}
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="text-white font-semibold text-lg">Include Characters</label>
          <motion.input
            type="checkbox"
            checked={charAllowed}
            onChange={() => setCharAllowed(!charAllowed)}
            className="form-checkbox h-6 w-6 text-blue-600 cursor-pointer"
            whileHover={{ scale: 1.1 }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default App;
