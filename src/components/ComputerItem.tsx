import { IComputerData } from '@/redux/slices/computer/slice'
import { FC } from 'react'
import { Badge } from './ui/badge'

type TComputerProblemItemProps = Omit<IComputerData, 'message'>

const enum statuses {
    'Рабочий' = 'success',
    'Не рабочий' = 'destructive',
    'В процессе' = 'process',
}

export const ComputerItem: FC<TComputerProblemItemProps> = ({
    id,
    status,
    auditorium,
}) => {
    return (
        <div className="w-[300px] flex items-center dark:border-neutral-700 border-b-[1px] p-3">
            <div className="w-[250px]">
                {/* eslint-disable-next-line */}
                {/* @ts-expect-error */}
                <Badge variant={statuses[status]}>{status}</Badge>
            </div>

            <div className="w-[250px] flex items-center gap-1">
                <div>№{id}</div>
                {auditorium ? <span>ауд. {auditorium}</span> : null}
            </div>
        </div>
    )
}

