import { IComputerData } from '@/redux/slices/computer/slice'

export const findComputerById = (id: string, computers: IComputerData[]) => {
    if (id && computers) {
        return computers.find((comp) => comp.id === id)
    }
}
