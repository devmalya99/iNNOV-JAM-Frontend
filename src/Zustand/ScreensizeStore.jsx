
import {create} from "zustand";

const UseScreensizeStore = create((set)=>({
    isSmallScreen: window.innerWidth <768, //initialise with current screen size
    updateScreenSize : ()=> set({isSmallScreen: window.innerWidth <768})
    }))

    // Add event listener for screen resize
window.addEventListener("resize", () => {
    UseScreensizeStore.getState().updateScreenSize();
  });

  export default UseScreensizeStore