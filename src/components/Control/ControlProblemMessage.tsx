import { setComputersItem } from '@/redux/slices/computer/slice'
import { useAppDispatch } from '@/redux/store'
import { FC, FormEvent } from 'react'
import { TSearchTabsForm } from '../Control/Control'
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { ValidationComponent } from '../ValidationComponent'
import { TabsContent } from '../ui/tabs'

// Форма для сообщение об ошибке

type TProblemMessageForm = TSearchTabsForm & {
    textError: string
    textSuccess: string
}

export const ControlProblemMessage: FC<TProblemMessageForm> = ({
    setProblemMessage,
    problemMessage,
    isError,
    isSuccess,
    textError,
    textSuccess,
    setIsSuccess,
    validateProblemMessage,
}) => {
    const dispatch = useAppDispatch()

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
                                textError={textError}
                                textSuccess={textSuccess}
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
