import { selectorComputerItems } from '@/redux/slices/computer/selections'
import { IComputerData } from '@/redux/slices/computer/slice'
import { useAppSelector } from '@/redux/store'
import { useMemo } from 'react'
import DataProblemsItem from './DataProblemsItem'

export type TComputersInProblem = Required<IComputerData>

export const DataProblems = () => {
    const computers = useAppSelector(selectorComputerItems)

    const computersInProblem = useMemo(() => {
        if (computers) {
            return [...computers].filter(
                (computer) => computer.message !== undefined
            )
        }
    }, [computers])

    const renderComputer = useMemo(() => {
        if (computersInProblem) {
            return computersInProblem.map((computer) => {
                if (computer.message) {
                    return (
                        <DataProblemsItem
                            message={computer.message}
                            id={computer.id}
                            auditorium={computer.auditorium}
                        />
                    )
                }
            })
        }
    }, [computersInProblem])

    const renderComputersInProblem = computersInProblem!.length ? (
        renderComputer
    ) : (
        <div className="h-[200px] flex justify-center items-center">
            <div className="text-center text-xl dark:text-neutral-400">
                Пока заявок нету
            </div>
        </div>
    )

    return (
        <div className="md:w-[60%] w-full h-auto dark:border-neutral-700 border-[1px] rounded-md">
            <div className="w-full flex items-center dark:border-neutral-700 border-b-[1px] p-3">
                <div className="w-[33%] dark:text-neutral-400">
                    Преподаватель
                </div>
                <div className="w-[33%] dark:text-neutral-400">Компьютер</div>
                <div className="w-[33%] dark:text-neutral-400">Сообщение</div>
            </div>
            <div className="flex flex-col gap-2 overflow-y-hidden scrollable-container max-h-[271px] ">
                {renderComputersInProblem}
            </div>
        </div>
    )
}
