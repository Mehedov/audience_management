import { ChangeStatusSelect } from '@/components/ChangeStatusSelect.tsx'
import { FC } from 'react'
import { TComputersInProblem } from './DataProblems'

type TDataProblemsItemProps = TComputersInProblem

const DataProblemsItem: FC<TDataProblemsItemProps> = ({
    message,
    id,
    auditorium,
    status,
}) => {
    return (
        <div className="flex items-center gap-5 dark:border-neutral-700 border-b-[1px] p-3 ">
            <div className="w-[18%] flex items-center gap-1">
                <div>№{id}</div>
                <span>ауд. {auditorium}</span>
            </div>
            <div className="w-[60%] break-words">{message}</div>
            <div className="w-[12%]">
                <ChangeStatusSelect status={status} />
            </div>
        </div>
    )
}

export default DataProblemsItem
