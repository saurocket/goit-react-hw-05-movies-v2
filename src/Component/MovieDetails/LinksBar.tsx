import React from "react";
import {Link, useLocation} from "react-router-dom";

export const LinksBar:React.FC<{id:string}> = ({id})  => {
    const {state} = useLocation<{pathname:string | undefined, search: string | undefined}>()
    const pathname = state?.pathname || '/'
    const search = state?.search || ''
    return (
        <div>
           <h3>Additional Information</h3>
            <ul>
                <li>
                    <Link to={{
                        pathname: `/movies/${id}/cast`,
                        state: {search,pathname}
                    }}>Cast</Link>
                </li>
                <li>
                    <Link to={{
                        pathname: `/movies/${id}/reviews`,
                        state: {search,pathname}
                    }}>Reviews</Link>
                </li>
            </ul>
        </div>
    )
}