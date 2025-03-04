import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'
import { FC, memo } from 'react'
import { TValidationWrapperProps } from './ToastWrapper'

type TValidation = TValidationWrapperProps

type TAlertProps = {
    text?: string
}

export const ToastDestructive = memo(({ text }: TAlertProps) => {
    return (
        <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Ошибка</AlertTitle>
            <AlertDescription>{text}</AlertDescription>
        </Alert>
    )
})

export const ToastSuccess = memo(({ text }: TAlertProps) => {
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
})

export const Toast: FC<TValidation> = memo(
    ({ errors, isSubmitSuccessful, showSuccessMessage }) => {
        if (errors.auditorium?.message) {
            return <ToastDestructive text={errors.auditorium.message.toString()} />
        }
        if (errors.status?.message) {
            return <ToastDestructive text={errors.status.message.toString()} />
        }
        if (errors.id?.message) {
            return <ToastDestructive text={errors.id.message.toString()} />
        }

        if (showSuccessMessage && isSubmitSuccessful) {
            return <ToastSuccess />
        }

        return null
    }
)
