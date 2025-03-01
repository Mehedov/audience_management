import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MutableRefObject } from 'react'
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
    return (
        <Tabs defaultValue="Аудитория" className="max-[600">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="Аудитория">Аудитория</TabsTrigger>
                <TabsTrigger value="Компьютер">Компьютер</TabsTrigger>
            </TabsList>
            <ControlAudienceSearch />
            <ControlProblemMessage />
        </Tabs>
    )
}
