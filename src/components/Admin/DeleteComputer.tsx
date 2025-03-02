import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import useSuccessMessage from '@/hooks/useSuccessMessage'
import { selectorComputerItems } from '@/redux/slices/computer/selections'
import { setComputers } from '@/redux/slices/computer/slice'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { findComputerById } from '@/utils/find.utils'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Input } from '../Input'
import ToastWrapper from '../Toast/ToastWrapper'

type TDeleteComputerValues = {
    id: string
}

export const DeleteComputer = () => {
    const dispatch = useAppDispatch()
    const computers = useAppSelector(selectorComputerItems)
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitSuccessful },
        setError,
    } = useForm<TDeleteComputerValues>({
        defaultValues: {
            id: '',
        },
    })
    const { showSuccessMessage, triggerSuccessMessage } = useSuccessMessage()

    const removeComputer: SubmitHandler<TDeleteComputerValues> = (
        data,
        event
    ) => {
        event?.preventDefault()
        triggerSuccessMessage(() => {
            const newComputers = computers.filter((obj) => obj.id !== data.id)
            findComputerById(data.id, computers, setError)
            newComputers && dispatch(setComputers(newComputers))
        })
    }

    return (
        <Card className="md:w-[50%] w-full">
            <CardHeader>
                <CardTitle>Удаление компьютера</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(removeComputer)}>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="id">Номер компьютера</Label>
                            <Input name="id" register={register} required />
                        </div>
                        <ToastWrapper
                            errors={errors}
                            isSubmitSuccessful={isSubmitSuccessful}
                            showSuccessMessage={showSuccessMessage}
                        />
                    </CardContent>
                    <CardFooter>
                        <Button>Удалить</Button>
                    </CardFooter>
                </form>
            </CardContent>
        </Card>
    )
}
