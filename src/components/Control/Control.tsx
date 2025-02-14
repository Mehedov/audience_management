import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { IComputerData } from '@/redux/slices/computer/slice'
import { useRef, useState } from 'react'
import { ControlAudienceSearch } from './ControlAudienceSearch'
import { ControlProblemMessage } from './ControlProblemMessage'

type SearchTabsProps = {
    computers: IComputerData[]
}

type TProblemMessage = {
    id: string
    author: string
    text: string
}

export type TSearchTabsForm = {
    problemMessage: TProblemMessage
    setProblemMessage: React.Dispatch<React.SetStateAction<TProblemMessage>>
    isError: boolean
    setIsError: React.Dispatch<React.SetStateAction<boolean>>
    setIsSuccess: React.Dispatch<React.SetStateAction<boolean>>
    isSuccess: boolean
    validateProblemMessage: () => NodeJS.Timeout
}

export function Control({ computers }: SearchTabsProps) {
    const [problemMessage, setProblemMessage] = useState<TProblemMessage>({
        id: '',
        author: '',
        text: '',
    })
    const [isError, setIsError] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const textError = useRef('Все поля должны быть заполнены.')
    const textSuccess = useRef('Ваше сообщение отправлено.')

    const validateProblemMessage = () => {
        const thereIdComputer = computers.find(
            (obj) => obj.id === problemMessage.id
        )

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

    return (
        <Tabs defaultValue="Аудитория" className="max-[600">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="Аудитория">Аудитория</TabsTrigger>
                <TabsTrigger value="Компьютер">Компьютер</TabsTrigger>
            </TabsList>
            <ControlAudienceSearch />
            <ControlProblemMessage
                problemMessage={problemMessage}
                setProblemMessage={setProblemMessage}
                isError={isError}
                setIsError={setIsError}
                setIsSuccess={setIsSuccess}
                isSuccess={isSuccess}
                validateProblemMessage={validateProblemMessage}
                textError={textError.current}
                textSuccess={textSuccess.current}
            />
        </Tabs>
    )
}
