
import page404 from '../assets/404.jpg'
import loadingImage from '../assets/preloader.svg'
import {useCallback, useState} from "react";

export const usePreloader = () => {
    const [image, setImage] = useState<null | string>()
    const checkStatus = useCallback(( loading: boolean | undefined, data: any, action = 'update') =>{
           if (action === 'search'){
               if (!data) return
               if (data.length === 0 && !loading)
                   setImage(page404)
               else if (loading)
                   setImage(loadingImage)
               else
                   setImage(null)
           }else{
               if (!data && !loading)
                   setImage(page404)
               else if (loading)
                   setImage(loadingImage)
               else
                   setImage(null)
           }
    },[])
    return {image, checkStatus}
}