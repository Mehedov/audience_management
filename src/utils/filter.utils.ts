import { IComputerData } from '@/redux/slices/computer/slice'

export const filterByAuditorium = (
    aud: string,
    computers: IComputerData[],
    callback: (newComputers: IComputerData[]) => void
) => {
    const newComputers = [...computers].filter((obj) => obj.auditorium === aud)
    callback(newComputers)
    return newComputers
}