import { FieldValues, UseFormRegister } from 'react-hook-form'

export type TFormValues<T extends FieldValues> = {
    name: keyof T
    register: UseFormRegister<T>
    [x: string]: any
}
