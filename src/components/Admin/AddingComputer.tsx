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
import { IComputerData, setComputers } from '@/redux/slices/computer/slice'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { findComputerById } from '@/utils/find.utils'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Input } from '../Input'
import ToastWrapper from '../Toast/ToastWrapper'

type TAddingComputerValues = Omit<IComputerData, 'message'>

export const AddingComputer = () => {
    const dispatch = useAppDispatch()
    const computers = useAppSelector(selectorComputerItems)
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitSuccessful },
        setError,
    } = useForm<TAddingComputerValues>({
        defaultValues: {
            id: '',
            status: '',
            auditorium: '',
        },
    })
    const { showSuccessMessage, triggerSuccessMessage } = useSuccessMessage()

    const newComputerAdd: SubmitHandler<TAddingComputerValues> = (
        data,
        event
    ) => {
        event?.preventDefault()

        triggerSuccessMessage(() => {
            if (data.id.length > 4) {
                setError('id', {
                    type: 'manual',
                    message: 'Максимальное допустимое значение 4 символа',
                })
            }
            const there = findComputerById(data.id, computers)
            if (!there) {
                dispatch(setComputers([...computers, data]))
            } else {
                setError('id', {
                    type: 'manual',
                    message: 'Этот компьютер уже есть',
                })
            }
        })
    }

    return (
        <Card className="md:w-[50%] w-full">
            <CardHeader>
                <CardTitle>Добавление компьютера</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(newComputerAdd)}>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="id">Номер компьютера</Label>
                            <Input name="id" register={register} required />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="status">
                                Статус компьютера(Рабочий, не рабочий, в
                                процессе)
                            </Label>
                            <Input name="status" register={register} required />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="auditorium">Номер аудитории</Label>

                            <Input
                                name="auditorium"
                                register={register}
                                required
                            />
                        </div>
                        <ToastWrapper
                            errors={errors}
                            isSubmitSuccessful={isSubmitSuccessful}
                            showSuccessMessage={showSuccessMessage}
                        />
                    </CardContent>
                    <CardFooter>
                        <Button>Добавить</Button>
                    </CardFooter>
                </form>
            </CardContent>
        </Card>
    )
}
