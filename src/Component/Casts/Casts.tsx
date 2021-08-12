import { useParams } from "react-router-dom"
import {useEffect, useState} from "react";
import {useHttp} from "../../hooks/useHttp";
import {moviesAPI} from "../../API/API";
import {usePreloader} from "../../hooks/usePreloader";
import castImage from "../../assets/casts.jpg"

type CastsType = [
    {
        id:string
        name: string
        character: string
        profile_path: string | null
    }
]



 const Casts:React.FC = () => {
    const [data, setData] = useState<CastsType>()

    const {id} = useParams<{id:string}>()

    const {loading,request} = useHttp()
    const {checkStatus,image} = usePreloader()
    useEffect(() => {
        const getCast = async () => {
            const response = await request(moviesAPI.getCastsById(id)).then(res => res.data.cast)
            setData(response)
        }
        getCast()
    },[id, request])

    useEffect(() => {
        checkStatus(loading,data)
    },[loading, data, checkStatus])


    return (
        <section>
           <ul>
               {data && data.length > 0 && data.map(({name,id,character,profile_path}) => {
                   return (
                       <li key={id}>
                           <h4>{name}</h4>
                            <div>
                                <img src={profile_path ? `https://image.tmdb.org/t/p/original${profile_path}`
                                    : castImage}
                                     width={100}
                                     alt={name}
                                />
                            </div>
                           <p>
                               <strong>Character</strong> - {character}
                           </p>
                           <hr/>
                       </li>
                   )
               })}
           </ul>


            {image && <img src={image} alt='404'/>}
        </section>
    )
}
export default Casts