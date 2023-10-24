import { useState, useEffect } from "react";


export const useScroll = ()=>{
const [scrollY, setScrollY] = useState<number>(1)

useEffect(()=>{

setScrollY(+(1-(window.scrollY*100/window.screen.height)/100).toFixed(1))


    const handleScroll = ()=>{
        
        const height = window.screen.height
        const scroll = window.scrollY
        const percent =+(1-(scroll*100/height)/100).toFixed(1)

       if(percent < 0) {setScrollY(0)}
        setScrollY(()=>percent)
        console.log(percent)
    }


    document.addEventListener('scroll',handleScroll)

    return ()=>document.removeEventListener('scroll',handleScroll)

},[])


return {scrollY}


}