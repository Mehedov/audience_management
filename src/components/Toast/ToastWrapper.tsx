import { FC } from 'react'
import { FieldErrors } from 'react-hook-form'
import { Toast } from './Toast'

export type TValidationWrapperProps = {
    errors: FieldErrors
    isSubmitSuccessful: boolean
    showSuccessMessage: boolean
}

const ToastWrapper: FC<TValidationWrapperProps> = ({
    errors,
    isSubmitSuccessful,
    showSuccessMessage,
}) => {
    return showSuccessMessage ? (
        <Toast
            errors={errors}
            isSubmitSuccessful={isSubmitSuccessful}
            showSuccessMessage={showSuccessMessage}
        />
    ) : null
}

export default ToastWrapper
