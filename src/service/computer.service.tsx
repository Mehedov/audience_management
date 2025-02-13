import axios, { AxiosError } from 'axios'

export const fetchComputers = async () => {
    try {
        const { data } = await axios.get(import.meta.env.REACT_BASE_URL)
        return data
    } catch (e) {
        // throw new Error((e as Error).message)
        if (e instanceof AxiosError) {
            return e.response
        }
    }
}
