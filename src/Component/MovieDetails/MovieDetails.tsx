import {Route, useHistory, useLocation, useParams} from "react-router-dom"
import React, {useEffect, useState} from "react";
import {useHttp} from "../../hooks/useHttp";
import {moviesAPI} from "../../API/API";
import {ContentDetails} from "./ContentDetails";
import {LinksBar} from "./LinksBar";
import {usePreloader} from "../../hooks/usePreloader";
import {Spinner} from "../Spinner";



const AddCasts = React.lazy(() => import("../Casts/Casts"))
const AddReviews = React.lazy(() => import("../Revews/Revews"))

export type DataType = {
    title: string
    poster_path: string,
    overview: string
    genres: Array<{ id: string, name: string }>
}

const MovieDetails = () => {
    const {state} = useLocation<{pathname:string | undefined, search: string | undefined}>()
    const pathname = state?.pathname || '/'
    const history = useHistory()
    const {id} = useParams<{ id: string }>()
    const {loading, request} = useHttp()
    const {image,checkStatus}  = usePreloader()
    const [data, setData] = useState<DataType | null>(null)
    useEffect(() => {
        const getDaitails = async () => {
            const {title, poster_path, overview, genres} = await request(moviesAPI.getDetailsById(id)).then(res => res.data)
            setData({title, poster_path, overview, genres})
        }
        getDaitails()
    }, [id, request])

    useEffect(() => {
        checkStatus(loading,data)
    },[loading,data, checkStatus])


    return (
        <section>
            <button
                onClick={() => history.push(pathname, {search: state?.search}) }
            >go back</button>
            {data && <ContentDetails
                {...data}
            />}
            {data && <LinksBar id={id}/>}
            {image && <img src={image} alt='404'/>}
            <hr/>
            <Route path='/movies/:id/cast'>
                <React.Suspense fallback={<Spinner/>}>
                    <AddCasts/>
                </React.Suspense>
            </Route>
            <Route path='/movies/:id/reviews'>
                <React.Suspense fallback={<Spinner/>}>
                    <AddReviews/>
                </React.Suspense>
            </Route>
        </section>

    )
}
export default MovieDetails