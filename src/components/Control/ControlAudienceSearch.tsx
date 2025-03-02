import useSuccessMessage from '@/hooks/useSuccessMessage'
import { selectorComputerItems } from '@/redux/slices/computer/selections'
import { IComputerData } from '@/redux/slices/computer/slice'
import { useAppSelector } from '@/redux/store'
import { filterByAuditorium } from '@/utils/filter.utils'
import { useMemo, useState } from 'react'
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
import ToastWrapper from '../Toast/ToastWrapper'

export type TAudienceSearchValues = {
    aud: string
}

export const ControlAudienceSearch = () => {
    const computers = useAppSelector(selectorComputerItems)
    const [interComputers, setInterComputers] = useState<IComputerData[]>()
    const { showSuccessMessage, triggerSuccessMessage } = useSuccessMessage()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitSuccessful },
        setError,
    } = useForm<TAudienceSearchValues>({
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

    const onSearchAuditories: SubmitHandler<TAudienceSearchValues> = (
        data,
        event
    ) => {
        event?.preventDefault()
        triggerSuccessMessage(() => {
            const auditoryNumber = data.aud
            filterByAuditorium(
                auditoryNumber,
                computers,
                setInterComputers,
                setError
            )
        })
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
                            <div className="space-y-3">
                                <Input
                                    register={register}
                                    required
                                    name="aud"
                                />
                            </div>
                            <ToastWrapper
                                errors={errors}
                                isSubmitSuccessful={isSubmitSuccessful}
                                showSuccessMessage={showSuccessMessage}
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
