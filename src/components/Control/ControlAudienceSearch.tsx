import { selectorComputerItems } from '@/redux/slices/computer/selections'
import { IComputerData } from '@/redux/slices/computer/slice'
import { useAppSelector } from '@/redux/store'
import { filterByAuditorium } from '@/utils/filter.utils'
import { FC, FormEvent, useMemo, useState } from 'react'
import { ComputerItem } from '../ComputerItem'
import { SearchComputersInfo } from '../SearchComputersInfo'
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
import { ValidationComponent } from '../ValidationComponent'
import { TControlValidateElements } from './Control'

type TControlAudienceSearchProps = TControlValidateElements

export const ControlAudienceSearch: FC<TControlAudienceSearchProps> = ({
    isError,
    isSuccess,
    textError,
    textSuccess,
    setIsError,
    setIsSuccess,
}) => {
    const computers = useAppSelector(selectorComputerItems)
    const [numberAud, setNumberAud] = useState('')
    const [interComputers, setInterComputers] = useState<IComputerData[]>()

    const renderFilterComps = useMemo(() => {
        if (interComputers) {
            return interComputers.map((obj) => (
                <ComputerItem key={obj.id} {...obj} />
            ))
        }
        return []
    }, [interComputers])

    const validateSearchAuditories = () => {
        if (!numberAud) {
            setIsError(true)
            textError.current = 'Введите номер аудитории.'
        }

        return setTimeout(() => {
            setIsError(false)
        }, 2000)
    }

    const onSearchAuditories = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const auditoryNumber = numberAud
        filterByAuditorium(
            auditoryNumber,
            computers,
            setInterComputers,
            setIsError,
            textError
        )
        setIsSuccess(true)

        return setTimeout(() => {
            setIsSuccess(false)
        }, 2000)
    }

    return (
        <TabsContent value="Аудитория">
            <Card className="flex flex-col md:flex-row">
                <div>
                    <CardHeader>
                        <CardTitle>Аудитория</CardTitle>
                        <CardDescription>
                            Введите номер аудитории чтобы посмотреть информацию
                            об компьютерах
                        </CardDescription>
                    </CardHeader>
                    <form onSubmit={(e) => onSearchAuditories(e)}>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="name">Аудитория</Label>
                                <Input
                                    maxLength={3}
                                    value={numberAud}
                                    onChange={(e) =>
                                        setNumberAud(e.target.value)
                                    }
                                    id="name"
                                    required
                                />
                            </div>
                            <ValidationComponent
                                isError={isError}
                                isSuccess={isSuccess}
                                textSuccess="Аудитория найдена."
                                textError={textError.current}
                            />
                        </CardContent>

                        <CardFooter>
                            <Button onClick={validateSearchAuditories}>
                                Посмотреть
                            </Button>
                        </CardFooter>
                    </form>
                </div>
                {interComputers ? (
                    <SearchComputersInfo
                        renderFilterComps={renderFilterComps}
                    />
                ) : null}
            </Card>
        </TabsContent>
    )
}
