import axios, { AxiosError } from 'axios'

export const fetchComputersItems = async (url:string) => {
    try {
        const { data } = await axios.get(url)
        return data
    } catch (e) {
        // throw new Error((e as Error).message)
        if (e instanceof AxiosError) {
            return e.response
        }
    }
}
