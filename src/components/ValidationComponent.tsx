import { FC } from 'react'
import { AlertDestructive } from './Alert/AlertDestructive'
import { AlertSuccess } from './Alert/AlertSuccess'

type ValidationComponent = {
    isError: boolean
    isSuccess: boolean
    textSuccess: string
    textError: string
}

export const ValidationComponent: FC<ValidationComponent> = ({
    isError,
    isSuccess,
    textSuccess,
    textError,
}) => {
    if (isError) {
        return <AlertDestructive text={textError} />
    }
    if (isSuccess) {
        return <AlertSuccess text={textSuccess} />
    }
}

