import { Children } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { handleDarkness, handleLightMode } from "../src/utils/toast";


//create context for theme
const ThemeContext  = createContext()

//custom hook to use the  theme context
export const useTheme = ()=> useContext(ThemeContext)

//Theme provider component to wrap around your app
export const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState('light');

    //On component mount, check for saved theme in local storage or systemdefault
    useEffect(()=>{
        const savedTheme = localStorage.getItem('theme');
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

        //set theme based on saved preference,or system default
        setTheme(savedTheme || systemTheme);

    },[])

    //Toggle theme between 'light' and 'dark'
    const toggleTheme = ()=>{
        const newTheme = theme === 'light' ? 'dark' : 'light';
        {
            newTheme==='dark' ? 
            handleDarkness({msg:`Say hello to dark mode`}) 
            : handleLightMode({msg:`Say hello to light mode`})
        }
        
        setTheme(newTheme)
        localStorage.setItem('theme',newTheme);//to persist them in local storage
    };

    //apply theme class to the document root
    useEffect(()=>{
        if(theme==='dark'){
            document.documentElement.classList.add('dark');
        }else
        {
            document.documentElement.classList.remove('dark')
        }
    },[theme])


    return (
        <ThemeContext.Provider value={{theme,toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )


}