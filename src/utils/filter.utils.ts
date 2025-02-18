import {IComputerData} from '@/redux/slices/computer/slice'
import {MutableRefObject} from 'react'

export const filterByAuditorium = (
    aud: string,
    computers: IComputerData[],
    callback: (newComputers: IComputerData[]) => void,
    error?: (value: boolean) => void,
    textError?: MutableRefObject<string>
) => {
    const newComputers = [...computers].filter((obj) => obj.auditorium === aud)
    if (newComputers.length) {
        callback(newComputers)
        return newComputers
    } else {
        if (error && textError) {
            error(true)
            textError.current = 'Аудитория не найдена.'
        }
        throw new Error('Аудитория не найдена.')
    }
}
