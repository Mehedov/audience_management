import { Button } from '@/components/ui/button'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { IComputerData } from '@/redux/slices/computer/slice'
import { useState } from 'react'

type TComputerMapItemProps = Omit<IComputerData, 'auditorium'>

const enum statuses {
    'Рабочий' = 'success',
    'Не рабочий' = 'destructive',
    'В процессе' = 'process',
}

export function ComputerMapItem({ ...props }: TComputerMapItemProps) {
    const [open, setOpen] = useState(false)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    // eslint-disable-next-line
                    //    @ts-ignore

                    variant={statuses[props.status]}
                    className="w-[100px] p-7 flex justify-center items-center text-sm"
                >
                    <div>
                        <div>{props.status}</div>
                        <div className="font-bold">№{props.id}</div>
                    </div>
                </Button>
            </PopoverTrigger>
            {props.message ? (
                <PopoverContent className="p-0" side="right" align="start">
                    <div className="p-3">{props.message}</div>
                </PopoverContent>
            ) : null}
        </Popover>
    )
}
