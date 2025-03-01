import { selectorComputerItems } from '@/redux/slices/computer/selections'
import { IComputerData } from '@/redux/slices/computer/slice'
import { useAppSelector } from '@/redux/store'
import { filterByAuditorium } from '@/utils/filter.utils'
import { FC, useMemo, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ComputerItem } from '../ComputerItem'
import { Input } from '../Input'
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
import { TabsContent } from '../ui/tabs'
import { ValidationComponent } from '../ValidationComponent'
import { TControlValidateElements } from './Control'

type TControlAudienceSearchProps = TControlValidateElements

export type IFormValues = {
    aud: string
}

export const ControlAudienceSearch: FC<TControlAudienceSearchProps> = ({
    isError,
    isSuccess,
    textError,
    setIsError,
    setIsSuccess,
}) => {
    const computers = useAppSelector(selectorComputerItems)
    const [interComputers, setInterComputers] = useState<IComputerData[]>()

    const { register, handleSubmit } = useForm<IFormValues>({
        defaultValues: {
            aud: '',
        },
    })

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
        }, 1000)
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
                    <form onSubmit={handleSubmit(onSearchAuditories)}>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                {/* <Label htmlFor="aud">Аудитория</Label> */}
                                {/* <Input
                                    {...register('aud', {
                                        required: true,
                                        maxLength: 3,
                                    })}
                                    value={numberAud}
                                    onChange={(e) =>
                                        setNumberAud(e.target.value)
                                    }
                                    id="aud"
                                    required
                                /> */}
                                <Input
                                    register={register}
                                    required
                                    name='aud'
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
                            <Button>Посмотреть</Button>
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
