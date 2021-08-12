import {useCallback, useState} from "react";

export const useHttp = () => {
    const [loading, setLoading] = useState<boolean>()
    const [error, setError] = useState()

    const request =  useCallback(async (api)=> {
        setLoading(true)
        try {
            const response = await api
            // @ts-ignore
            if(!response.status === 200){
                setError(response.message || 'something went wrong')
                throw new Error(response.message || 'something went wrong')
            }
            return response
        }catch (e) {
                setError(e.message)
            throw e
        }
        finally {
            setLoading(false)
        }

    },[])
    return {request, loading, error, setError}
}
