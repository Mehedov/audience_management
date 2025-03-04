import { IComputerData } from '@/redux/slices/computer/slice'
import { UseFormSetError } from 'react-hook-form'

export const findComputerById = (
    id: string,
    computers: IComputerData[],
    setError?: UseFormSetError<{ id: string }>
) => {
    const find = computers.find((comp) => comp.id === id)
    if (find) {
        return true
    } else {
        if (setError) {
            setError('id', { type: 'manual', message: 'Компьютер не найден' })
            id.length > 4 &&
                setError('id', {
                    type: 'manual',
                    message: 'Максимальное допустимое значение 4 символа',
                })
                return false
        }
        return false
    }
}
export const findAudience = (
    aud: string,
    computers: IComputerData[],
    setError: UseFormSetError<{ auditorium: string }>
) => {
    const find = computers.find((comp) => comp.auditorium === aud)
    if (find) {
        return true
    } else {
        setError('auditorium', {
            type: 'manual',
            message: 'Аудитория не найдена',
        })
        return false
    }
}
