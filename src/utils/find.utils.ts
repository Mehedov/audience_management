import { IComputerData } from '@/redux/slices/computer/slice'
import { UseFormSetError } from 'react-hook-form'

export const findComputerById = (
    id: string,
    computers: IComputerData[],
    setError?: UseFormSetError<{ id: string }>
) => {
    const find = computers.find((comp) => comp.id === id)
    if (find) {
        return find
    } else {
        if (setError) {
            setError('id', { type: 'manual', message: 'Компьютер не найден' })
            id.length > 4 &&
                setError('id', {
                    type: 'manual',
                    message: 'Максимальное допустимое значение 4 символа',
                })
        }
    }
}
