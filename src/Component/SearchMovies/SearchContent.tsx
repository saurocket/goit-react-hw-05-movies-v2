import {SearchMovies} from "./SearchMovies";
import {FormEvent,useEffect, useState} from "react";
import {Link, useHistory, useLocation} from "react-router-dom";
import {useHttp} from "../../hooks/useHttp";
import {moviesAPI} from "../../API/API";
import {usePreloader} from "../../hooks/usePreloader";
import qs from 'query-string'


export const SearchContent = () => {
    const [data, setData] = useState<null | Array<{ id: number, title: string }>>(null)
    const [sub, setSub] = useState<null | string>(null)
    const [value, setValue] = useState('')


    const {pathname, search, state} = useLocation<{pathname: string, search: undefined |  string}>()

     useEffect(() => {
         if(search){
             // @ts-ignore
             const query = Object.values<string>(qs.parse(search))[0]
             setValue(query)
             setSub(query)
             history.push({search: `query=${query}`})
            return
         }
        if (state?.search !== undefined && state.search){
            setValue(state.search)
            setSub((state.search))
            history.push({search: `query=${state.search}`})
            return;
        }
    },[])



    const history = useHistory()
    const searchQuery = Object.values(qs.parse(search))[0]
    const {request, loading} = useHttp()
    const {image,checkStatus} = usePreloader()

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (value.length === 0) {
            return
        }
        history.push({
            search: `query=${value}`
        })
        setSub(value)
    }

    useEffect(() => {
        if (sub === null || sub.length === 0) {
            return
        }
        const getData = async () => {
            const response = await request(moviesAPI.getSearchMovies(sub, 1)).then(res => res.data.results)
            setData(response)
        }
        getData()
    }, [sub, request])

    useEffect(() => {
        checkStatus(loading,data, 'search')
    },[loading,data, checkStatus])



    return <section>
        <SearchMovies
            value={value}
            setValue={setValue}
            onSubmit={onSubmit}
            loading={loading}
        />
        {data?.length !== 0 && data && data.map(item => {
            return (
                <li key={item.id}>
                    <Link to={{
                        pathname: `/movies/${item.id}`,
                        state: {pathname, search: searchQuery}
                    }}>
                        {item.title ? item.title : 'noname'}
                    </Link>
                </li>
            )
        })}
        {image && <img src={image} alt='404'/>}
    </section>
}
