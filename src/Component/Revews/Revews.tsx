import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useHttp} from "../../hooks/useHttp";
import {moviesAPI} from "../../API/API";
import {Spinner} from '../Spinner'


type ReviewsType = [
    {
        id: string
        author: string
        content: string
    }
]


const Reviews = () => {

    const [data, setData] = useState<ReviewsType | null>(null)
    const {id} = useParams<{ id: string }>()
    const {loading, request} = useHttp()

    useEffect(() => {
        const getReviews = async () => {
            const response = await request(moviesAPI.getReviewsById(id)).then(res => res.data.results)
            setData(response)

        }
        getReviews()
    }, [id, request])


    return (
        <section>
            {loading && <Spinner/>}
            {data && data.length > 0 ?
            <ul>
                {data.map(({id,author,content}) => {
                    return <li key={id}>
                        <h4>
                            {author}
                        </h4>
                        <p>
                            {content}
                        </p>
                        <hr/>
                    </li>
                })}
            </ul>
            :
            <h3>Sorry, bun there are not reviews yet</h3>
            }

        </section>
    )
}

export default Reviews