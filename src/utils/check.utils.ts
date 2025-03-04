import { COMPUTER_STATUSES } from '@/constants'
import { UseFormSetError } from 'react-hook-form'

export const checkStatusCorrect = (
    status: string,
    setError: UseFormSetError<{ status: string }>
) => {
    if (Object.values(COMPUTER_STATUSES).includes(status)) {
        return true
    }

    setError('status', {
        type: 'manual',
        message: 'Некорректный статус',
    })
    return false
}
