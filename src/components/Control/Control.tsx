import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MutableRefObject, useRef, useState } from 'react'
import { ControlAudienceSearch } from './ControlAudienceSearch'
import { ControlProblemMessage } from './ControlProblemMessage'

export type TControlValidateElements = {
    isError: boolean
    setIsError: React.Dispatch<React.SetStateAction<boolean>>
    setIsSuccess: React.Dispatch<React.SetStateAction<boolean>>
    isSuccess: boolean
    textError: MutableRefObject<string>
    textSuccess: MutableRefObject<string>
}

export function Control() {
    const [isError, setIsError] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const textError = useRef('Все поля должны быть заполнены.')
    const textSuccess = useRef('Ваше сообщение отправлено.')

    return (
        <Tabs defaultValue="Аудитория" className="max-[600">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="Аудитория">Аудитория</TabsTrigger>
                <TabsTrigger value="Компьютер">Компьютер</TabsTrigger>
            </TabsList>
            <ControlAudienceSearch
                isError={isError}
                setIsError={setIsError}
                setIsSuccess={setIsSuccess}
                isSuccess={isSuccess}
                textError={textError}
                textSuccess={textSuccess}
            />
            <ControlProblemMessage
                isError={isError}
                setIsError={setIsError}
                setIsSuccess={setIsSuccess}
                isSuccess={isSuccess}
                textError={textError}
                textSuccess={textSuccess}
            />
        </Tabs>
    )
}
