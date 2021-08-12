import {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {moviesAPI} from "../../API/API";
import {dataFilter} from "../../assets/dataFilter";
import {useHttp} from "../../hooks/useHttp";
import {usePreloader} from "../../hooks/usePreloader";

export const HomePage = () => {
    const {request, loading} = useHttp()
    const [data, setData] = useState<null | Array<{ id: number, title: string }>>(null)
    const {image, checkStatus} = usePreloader()

    const {pathname} = useLocation<{pathname: string}>()



    useEffect(() => {
        const getTrends = async () => {
            const response = await request(moviesAPI.getTrands(1)).then(res => res.data.results)
            setData(dataFilter(response))
        }
        getTrends()
    }, [request])

    useEffect(() => {
        checkStatus(loading, data)
    }, [loading, data, checkStatus])

    return (
        <section>
            <h2>Trending today</h2>
            {data && <ul>
                {data.map(item => {
                    return (
                        <li key={item.id}>
                            <Link to={{
                                pathname: `/movies/${item.id}`,
                                state: {pathname}
                            }}>
                                {item.title ? item.title : 'noname'}
                            </Link>
                        </li>
                    )
                })}
            </ul>
            }
            {image && <img src={image} alt='404'/>}
        </section>
    )

}
