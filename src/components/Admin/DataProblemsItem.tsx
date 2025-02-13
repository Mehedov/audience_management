import { FC } from 'react'
import { TComputersInProblem } from './DataProblems'

type TDataProblemsItemProps = Omit<TComputersInProblem, 'status'>

const DataProblemsItem: FC<TDataProblemsItemProps> = ({
    message,
    id,
    auditorium,
}) => {
    return (
        <div className="flex items-center dark:border-neutral-700 border-b-[1px] p-3">
            <div className="w-[33%]">{message.author}</div>
            <div className="w-[33%] flex items-center gap-1">
                <div>№{id}</div>
                <span>ауд. {auditorium}</span>
            </div>
            <div className="w-[33%]">{message.text}</div>
        </div>
    )
}

export default DataProblemsItem
