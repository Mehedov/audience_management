import applySvg from '@/assets/icons/apply.svg'
import saveSvg from '@/assets/icons/save.svg'
import { ChangeStatusSelect } from '@/components/ChangeStatusSelect.tsx'
import { setComputerStatus } from '@/redux/slices/computer/slice'
import { useAppDispatch } from '@/redux/store'
import { FC, useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { TComputersInProblem } from './DataProblems'

type TDataProblemsItemProps = TComputersInProblem

const DataProblemsItem: FC<TDataProblemsItemProps> = ({
    message,
    id,
    auditorium,
    status,
}) => {
    const dispatch = useAppDispatch()
    const [currentStatus, setCurrentStatus] = useState('')
    const [apply, setApply] = useState(false)

    const changeStatus = () => {
        if (id && currentStatus) {
            dispatch(setComputerStatus({ id, status: currentStatus }))
            setApply(status === currentStatus)
        }
    }

    useEffect(() => {
        setApply(status === currentStatus)
    }, [status, currentStatus])

    return (
        <div className="flex items-center gap-5 dark:border-neutral-700 border-b-[1px] p-3 ">
            <div className="w-[18%] flex items-center gap-1">
                <div>
                    № <b>{id}</b>
                </div>
                <span>
                    ауд. <b>{auditorium}</b>
                </span>
            </div>
            <div className="w-[50%] break-words">
                <b>{message}</b>
            </div>
            <div className="w-[22%] flex items-center justify-between">
                <div className="mr-3">
                    <ChangeStatusSelect
                        currentStatus={currentStatus}
                        setCurrentStatus={setCurrentStatus}
                        status={status}
                    />
                </div>
                <div>
                    <Button
                        className="flex justify-center items-center"
                        variant="outline"
                        onClick={changeStatus}
                    >
                        {apply ? (
                            <img src={applySvg} width={20} />
                        ) : (
                            <img src={saveSvg} width={25} className="w-6" />
                        )}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default DataProblemsItem
