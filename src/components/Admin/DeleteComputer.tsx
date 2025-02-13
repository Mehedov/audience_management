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
import { setComputers } from '@/redux/slices/computer/slice'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { FormEvent, useRef, useState } from 'react'
import { ValidationComponent } from '../ValidationComponent'

export const DeleteComputer = () => {
    const dispatch = useAppDispatch()
    const computers = useAppSelector(selectorComputerItems)
    const [isError, setIsError] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [id, setId] = useState('')
    const errorMessage = useRef('')


    const removeComputer = (event: FormEvent, id:string) => {
        event.preventDefault()
        const newComputers = computers.filter((obj) => obj.id !== id)
		const isComputer = computers.find((obj) => obj.id === id)
        if (newComputers && isComputer) {
            dispatch(setComputers(newComputers))
            setIsSuccess(true)
        } else {
            errorMessage.current = 'Данный компьютер не найден.'
            setIsError(true)
        }
        return setTimeout(() => {
            setIsSuccess(false)
        }, 1000)
    }

    const validateProblemMessage = () => {
        if (
            id === ''
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
                <CardTitle>Удаление компьютера</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={(e) => removeComputer(e, id)}>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="id">Номер компьютера</Label>
                            <Input
                                value={id}
                                onChange={(e) =>
                                    setId(e.target.value)
                                }
                                required
                                id="id"
                                maxLength={4}
                                type="text"
                            />
                        </div>
                        <ValidationComponent
                            isError={isError}
                            isSuccess={isSuccess}
                            textSuccess="Компьютер удален."
                            textError={errorMessage.current}
                        />
                    </CardContent>
                    <CardFooter>
                        <Button onClick={validateProblemMessage}>
                            Удалить
                        </Button>
                    </CardFooter>
                </form>
            </CardContent>
        </Card>
    )
}
