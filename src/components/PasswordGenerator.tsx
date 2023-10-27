import { useState, useEffect, useCallback, useRef } from "react";

export default function PasswordGenerator() {
    const [password, setPassword] = useState("Bangladesh");
    const [length, setLength] = useState(8);
    const [numberAllowed, setNumberAllowed] = useState(false);
    const [specialCharAllowed, setSpecialCharAllowed] = useState(false);
    const randomPasswordGenerator = useCallback(()=>{
        const charSet: string =
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const specialCharSet: string = "!@#$%^&*()-_+=[]{}|;:,.<>?";
        const numSet: string = "0123456789";

        // Fill the remaining password with random characters
        let allCharacters: string = charSet;
        if (numberAllowed) {
            allCharacters += numSet;
        }
        if (specialCharAllowed) {
            allCharacters += specialCharSet;
        }

        let newPassword: string = "";
        for (let i = 0; i < length; i++) {
            newPassword +=
                allCharacters[Math.floor(Math.random() * allCharacters.length)];
        }
        // Shuffle the password to randomize the order
        newPassword = newPassword
            .split("")
            .sort(() => Math.random() - 0.5)
            .join("");

        setPassword(newPassword);
    }, [length, numberAllowed, specialCharAllowed, setPassword]);
    const passwordRef = useRef(null);
    const copyPasswordToClipboard = useCallback(() => {
        passwordRef.current?.select();
        window.navigator.clipboard.writeText(password);
    }, [password]);

    useEffect(()=>{
        randomPasswordGenerator();
    }, [length, numberAllowed, specialCharAllowed, randomPasswordGenerator]);

    return (
        <div className="container mx-auto bg-gray-800 m-4 p-4 text-white text-center rounded-lg">
            <h1 className="text-3xl mb-4">Password Generator</h1>
            <div className="text-4xl">
                <input
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={password}
                    className="w-96 h-16 p-4 text-center text-orange-600 font-bold font-mono"
                    readOnly
                    ref={passwordRef}
                />
                <button
                    type="button"
                    className="outline-none bg-blue-700 text-white text-3xl px-4 h-16 hover:bg-blue-800"
                    onClick={copyPasswordToClipboard}
                >
                    Copy
                </button>
            </div>
            <div className="mt-4 flex justify-center space-x-3">
                <input
                    type="range"
                    name="passwordLength"
                    id="passwordLength"
                    value={length}
                    min={8}
                    max={16}
                    onChange={(e) => setLength(e.target.value)}
                />
                <label htmlFor="passwordLength">Length ({length})</label>
                <input
                    type="checkbox"
                    name="numberAllowed"
                    id="numberAllowed"
                    value={numberAllowed}
                    onClick={(e) => setNumberAllowed(e.target.checked)}
                />
                <label htmlFor="numberAllowed">Number</label>
                <input
                    type="checkbox"
                    name="charAllowed"
                    id="charAllowed"
                    value={specialCharAllowed}
                    onClick={(e) => setSpecialCharAllowed(e.target.checked)}
                />
                <label htmlFor="charAllowed">Special Character</label>
            </div>
        </div>
    );
}
