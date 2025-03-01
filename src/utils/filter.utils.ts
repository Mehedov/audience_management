import { TAudienceSearchValues } from '@/components/Control/ControlAudienceSearch'
import { IComputerData } from '@/redux/slices/computer/slice'
import { UseFormSetError } from 'react-hook-form'

export const filterByAuditorium = (
    aud: string,
    computers: IComputerData[],
    callback: (newComputers: IComputerData[]) => void,
    setError: UseFormSetError<TAudienceSearchValues>
) => {
    const newComputers = [...computers].filter((obj) => obj.auditorium === aud)
    if (newComputers.length) {
        callback(newComputers)
        return newComputers
    } else {
        setError('aud', { type: 'manual', message: 'Аудитория не найдена' })
        if (aud.length > 4) {
            setError('aud', {
                type: 'manual',
                message: 'Максимальное допустимое значение 4 символа',
            })
        }
    }
}
