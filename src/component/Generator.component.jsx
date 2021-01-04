import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { numbers, upperCaseLetters, lowerCaseLetters, specialCharacters } from './characters';
import './Styles.css';
 import 'react-toastify/dist/ReactToastify.css';
import { COPY_SUCCESS } from '../message';

function Generator() {
    const [password, setPassword] = useState('');
    const [includeNumbers, setIncludeNumbers] = useState(false);
    const [includeSymbols, setIncludeSymbols] = useState(false);
    const [includeLowerCase, setIncludeLowerCase] = useState(false);
    const [includeUpperCase, setIncludeUpperCase] = useState(false);
    const [passwordLength, setPasswordLength] = useState(20);

    const handleGeneratePassword = (e) => {

        if(!includeUpperCase && !includeLowerCase && !includeNumbers && !includeSymbols){
            notify('You must Select atleast One option.', true)
        }

        let characterList = '';

        if (includeLowerCase) {
            characterList = characterList + lowerCaseLetters;
        }
        if (includeUpperCase) {
            characterList = characterList + upperCaseLetters;
        }
        if (includeNumbers) {
            characterList = characterList + numbers;
        }
        if (includeSymbols) {
            characterList = characterList + specialCharacters;
        }

        setPassword(createPassword(characterList));
    };

    const createPassword = (characterList) => {
        let password = '';
        const characterListLength = characterList.length;

        for (let i = 0; i < passwordLength; i++){
            const characterIndex = Math.round(Math.random()*characterListLength);
            password = password + characterList.charAt(characterIndex);
        }

        return password;
    };

    const copyToClipboard = () => {
        const newTextArea = document.createElement('textarea');
        newTextArea.innerText = password;
        document.body.appendChild(newTextArea);
        newTextArea.select();
        document.execCommand('copy');
        newTextArea.remove();
    };

    const notify = (message, hasError = false) => {
        if(hasError){
            toast.error(message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            toast(message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
     
    };

    const handleCopyPassword = (e) => {
        if (password === ''){
            notify('Nothing to Copy', true)
        } else {
            copyToClipboard();
            notify(COPY_SUCCESS);
        }
    };
    
    return (
        <div className='app__container'>
            <div className='generator'>
                <h2 className='generator__header'>
                    Password Generator
                </h2>
                <div className='generator__password'>
                    <h3>{password}</h3>
                    <button onClick={handleCopyPassword} className='copy__btn'>
                        <i className='far fa-clipboard'></i>
                    </button>
                </div>
                <div className='form__group'>
                    <label htmlFor='password-strength'>Password Length</label>
                    <input
                        defaultValue={passwordLength} 
                        onChange={(e) => setPasswordLength(e.target.value)}
                        type='number' 
                        id='password-strength' 
                        name='password-strength' 
                        max='20' 
                        min='10'
                    />       
                </div>
                <div className='form__group'>
                    <label htmlFor='uppercase-letter'> Include Uppercase Letter</label>
                    <input 
                        checked={includeUpperCase}
                        onChange={(e) => setIncludeUpperCase(e.target.checked)}
                        type='checkbox' 
                        id='uppercase-letter' 
                        name='uppercase-letter' 
                    />       
                </div>
                <div className='form__group'>
                    <label htmlFor='lowercase-letter'> Include Lowercase Letter</label>
                    <input 
                        checked={includeLowerCase}
                        onChange={(e) => setIncludeLowerCase(e.target.checked)}
                        type='checkbox' 
                        id='lowercase-letter' 
                        name='lowercase-letter' 
                    />       
                </div>
                <div className='form__group'>
                    <label htmlFor='include-numbers'> Include Numbers</label>
                    <input 
                        checked={includeNumbers}
                        onChange={(e) => setIncludeNumbers(e.target.checked)}
                        type='checkbox' 
                        id='include-numbers' 
                        name='include-numbers' 
                    />       
                </div>
                <div className='form__group'>
                    <label htmlFor='include-symbols'> Include Symbols</label>
                    <input 
                        checked={includeSymbols}
                        onChange={(e) => setIncludeSymbols(e.target.checked)}
                        type='checkbox' 
                        id='include-symbols' 
                        name='include-symbols' 
                    />       
                </div>
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />

                <button onClick={handleGeneratePassword} className='generator__btn'>Generate Password</button>
            </div>
        </div>
    )
}

export default Generator;