import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { selectorComputerItems } from '@/redux/slices/computer/selections'
import { IComputerData, setComputers } from '@/redux/slices/computer/slice'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { FormEvent, useRef, useState } from 'react'
import {ValidationComponent} from '../ValidationComponent'

export const AddingComputer = () => {
    const dispatch = useAppDispatch()
    const computers = useAppSelector(selectorComputerItems)
    const [isError, setIsError] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [computer, setComputer] = useState<IComputerData>({
        id: '',
        status: '',
        auditorium: '',
    })
    const errorMessage = useRef('')

    const newComputerAdd = (event: FormEvent, newComputer: IComputerData) => {
        event.preventDefault()
        const thereId = computers.find((obj) => obj.id === computer.id)
        if (newComputer && !thereId) {
            dispatch(setComputers([...computers, newComputer]))
            setComputer({
                id: '',
                status: '',
                auditorium: '',
            })
            setIsSuccess(true)
        } else {
            errorMessage.current = 'Такой компьютер уже есть.'
            setIsError(true)
        }
        return setTimeout(() => {
            setIsSuccess(false)
        }, 1000)
    }

    const validateProblemMessage = () => {
        if (
            computer.id === '' ||
            computer.status === '' ||
            computer.auditorium === ''
        ) {
            errorMessage.current = 'Все поля должны быть заполнены.'
            setIsError(true)
        }
        return setTimeout(() => {
            setIsError(false)
        }, 1000)
    }

    return (
        <Card className="md:w-[50%] w-full">
            <CardHeader>
                <CardTitle>Добавление компьютера</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={(e) => newComputerAdd(e, computer)}>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="id">Номер компьютера</Label>
                            <Input
                                value={computer.id}
                                onChange={(e) =>
                                    setComputer({
                                        ...computer,
                                        id: e.target.value,
                                    })
                                }
                                required
                                id="id"
                                maxLength={4}
                                type="text"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="status">
                                Статус компьютера(Рабочий, не рабочий, в
                                процессе)
                            </Label>
                            <Input
                                value={computer.status}
                                onChange={(e) =>
                                    setComputer({
                                        ...computer,
                                        status: e.target.value,
                                    })
                                }
                                required
                                id="status"
                                type="text"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="auditorium">Номер аудитории</Label>
                            <Input
                                value={computer.auditorium}
                                onChange={(e) =>
                                    setComputer((prev) => ({
                                        ...prev,
                                        auditorium: e.target.value,
                                    }))
                                }
                                required
                                id="auditorium"
                                type="text"
                            />
                        </div>
                        <ValidationComponent
                            isError={isError}
                            isSuccess={isSuccess}
                            textSuccess="Компьютер добавлен."
                            textError={errorMessage.current}
                        />
                    </CardContent>
                    <CardFooter>
                        <Button onClick={validateProblemMessage}>
                            Добавить
                        </Button>
                    </CardFooter>
                </form>
            </CardContent>
        </Card>
    )
}

