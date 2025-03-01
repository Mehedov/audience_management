import { setComputersItem } from '@/redux/slices/computer/slice'
import { useAppDispatch, useAppSelector } from '@/redux/store'

import useSuccessMessage from '@/hooks/useSuccessMessage'
import { selectorComputerItems } from '@/redux/slices/computer/selections'
import { findComputerById } from '@/utils/find.utils'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Input } from '../Input'
import { Textarea } from '../Textarea'
import { Button } from '../ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '../ui/card'
import { Label } from '../ui/label'
import { TabsContent } from '../ui/tabs'
import { ValidationComponent } from '../ValidationComponent'

type TProblemMessageValues = {
    id: string
    message: string
}

export const ControlProblemMessage = () => {
    const dispatch = useAppDispatch()
    const { showSuccessMessage, triggerSuccessMessage } = useSuccessMessage()

    const computers = useAppSelector(selectorComputerItems)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitSuccessful },
        setError,
    } = useForm<TProblemMessageValues>({
        defaultValues: {
            id: '',
            message: '',
        },
    })

    const onSendingMessage: SubmitHandler<TProblemMessageValues> = (
        data,
        event
    ) => {
        event?.preventDefault()
        triggerSuccessMessage(() => {
            findComputerById(data.id, computers, setError)

            dispatch(
                setComputersItem({
                    id: data.id,
                    message: data.message,
                })
            )
        })
    }

    return (
        <TabsContent value="Компьютер">
            <Card>
                <CardHeader>
                    <CardTitle>Компьютер</CardTitle>
                    <CardDescription>
                        Введите сообщение об проблеме и номер компьютера чтобы
                        отправить запрос на ее решение
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit(onSendingMessage)}>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="current">Номер компьютера</Label>
                            <Input name="id" register={register} required />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <div className="grid w-full gap-5">
                            <Textarea
                                name="message"
                                register={register}
                                required
                                className="h-[50px]"
                                placeholder="Опишите свою проблему"
                            />

                            {showSuccessMessage ? (
                                <ValidationComponent
                                    errors={errors}
                                    isSubmitSuccessful={isSubmitSuccessful}
                                    showSuccessMessage={showSuccessMessage}
                                />
                            ) : null}
                            <Button>Отправить</Button>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </TabsContent>
    )
}
