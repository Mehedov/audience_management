import { IComputerData } from '@/redux/slices/computer/slice'

export const sortByAuditories = (item: IComputerData[], order?: string) => {
    const sortedItem = [...item].sort((a, b) => {
        if (
            typeof a.auditorium !== 'number' ||
            typeof b.auditorium !== 'number'
        ) {
            throw new Error('Invalid auditorium value')
        }
        return order === 'desc'
            ? b.auditorium - a.auditorium
            : a.auditorium - b.auditorium
    })
    return sortedItem
}
