import { AlertCircle } from 'lucide-react'
import { FC } from 'react'
import { FieldErrors } from 'react-hook-form'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

type TValidationComponent = {
    errors: FieldErrors
    isSubmitSuccessful: boolean
    showSuccessMessage: boolean
}

type TAlertProps = {
    text?: string
}

export const AlertDestructive = ({ text }: TAlertProps) => {
    return (
        <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Ошибка</AlertTitle>
            <AlertDescription>{text}</AlertDescription>
        </Alert>
    )
}

export const AlertSuccess = ({ text }: TAlertProps) => {
    return (
        <Alert variant="success" className="flex items-center gap-3">
            <div className="border-green-600 border-[1px] w-7 h-7 flex justify-center items-center rounded-full">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 12.75 6 6 9-13.5"
                    />
                </svg>
            </div>
            <div>
                <AlertTitle>Выполнено!</AlertTitle>
                <AlertDescription>{text}</AlertDescription>
            </div>
        </Alert>
    )
}

export const ValidationComponent: FC<TValidationComponent> = ({
    errors,
    isSubmitSuccessful,
    showSuccessMessage,
}) => {
    console.log(errors)
    if (errors.aud?.message) {
        return <AlertDestructive text={errors.aud.message.toString()} />
    }
    if (errors.id?.message) {
        return <AlertDestructive text={errors.id.message.toString()} />
    }

    if (showSuccessMessage && isSubmitSuccessful) {
        return <AlertSuccess />
    }
}
