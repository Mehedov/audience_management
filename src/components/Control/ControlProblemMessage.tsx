import { selectorComputerItems } from '@/redux/slices/computer/selections'
import { setComputersItem } from '@/redux/slices/computer/slice'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { FC, FormEvent, useState } from 'react'

import { findComputerById } from '@/utils/find.utils'
import { Button } from '../ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { TabsContent } from '../ui/tabs'
import { Textarea } from '../ui/textarea'
import { ValidationComponent } from '../ValidationComponent'
import { TControlValidateElements } from './Control'

type ControlProblemMessageProps = TControlValidateElements

type TProblemMessage = {
    id: string
    author: string
    text: string
}

export const ControlProblemMessage: FC<ControlProblemMessageProps> = ({
    isError,
    setIsError,
    isSuccess,
    textError,
    textSuccess,
    setIsSuccess,
}) => {
    const dispatch = useAppDispatch()

    const computers = useAppSelector(selectorComputerItems)
    const [problemMessage, setProblemMessage] = useState<TProblemMessage>({
        id: '',
        author: '',
        text: '',
    })

    const validateProblemMessage = () => {
        const thereIdComputer = findComputerById(problemMessage.id, computers)

        const isEmptyField =
            !problemMessage.id || !problemMessage.author || !problemMessage.text

        if (isEmptyField) {
            setIsError(true)
            textError.current = 'Все поля должны быть заполнены.'
        } else if (!thereIdComputer) {
            textError.current = 'Номер компьютера не найден'
            setIsError(true)
        }

        return setTimeout(() => {
            setIsError(false)
        }, 2000)
    }

    const onSendingMessage = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(
            setComputersItem({
                id: problemMessage.id,
                author: problemMessage.author,
                text: problemMessage.text,
            })
        )
        setIsSuccess(true)
        setProblemMessage({
            id: '',
            author: '',
            text: '',
        })
        return setTimeout(() => {
            setIsSuccess(false)
        }, 2000)
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
                <form onSubmit={(e) => onSendingMessage(e)}>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="current">Номер компьютера</Label>
                            <Input
                                onChange={(e) =>
                                    setProblemMessage((prev) => ({
                                        ...prev,
                                        id: e.target.value,
                                    }))
                                }
                                id="current"
                                value={problemMessage.id}
                                type="text"
                                required
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="current">
                                Введите свое имя (фамилия, инициалы)
                            </Label>
                            <Input
                                id="current"
                                onChange={(e) =>
                                    setProblemMessage((prev) => ({
                                        ...prev,
                                        author: e.target.value,
                                    }))
                                }
                                value={problemMessage.author}
                                type="text"
                                required
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <div className="grid w-full gap-5">
                            <Textarea
                                required
                                onChange={(e) =>
                                    setProblemMessage((prev) => ({
                                        ...prev,
                                        text: e.target.value,
                                    }))
                                }
                                value={problemMessage.text}
                                className="h-[50px]"
                                placeholder="Опишите свою проблему"
                            />

                            <ValidationComponent
                                isError={isError}
                                isSuccess={isSuccess}
                                textError={textError.current}
                                textSuccess={textSuccess.current}
                            />
                            <Button onClick={validateProblemMessage}>
                                Отправить
                            </Button>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </TabsContent>
    )
}
