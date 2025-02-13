import { ComputerMapItem } from '@/components/ComputerMapItem'
import { SelectAuditories } from '@/components/SelectAuditories'
import { selectorComputerItems } from '@/redux/slices/computer/selections'
import { IComputerData } from '@/redux/slices/computer/slice'
import { useAppSelector } from '@/redux/store'
import { filterByAuditorium } from '@/utils/filter.utils'
import { FC, useEffect, useMemo, useState } from 'react'

const Map: FC = () => {
    const computers = useAppSelector(selectorComputerItems)
    const [interMapComputers, setInterMapComputers] =
        useState<IComputerData[]>()
    const [aud, setAud] = useState('228')

    useEffect(() => {
        filterByAuditorium(aud, computers, setInterMapComputers)
    }, [computers, aud])

    const renderFilterComps = useMemo(() => {
        if (interMapComputers) {
            return interMapComputers
                .slice(1)
                .map((obj) => <ComputerMapItem key={obj.id} {...obj} />)
        }
        return []
    }, [interMapComputers])

    if (!interMapComputers) {
        return <div>Нету компов</div>
    }

    return (
        <div className="w-full p-10 m-auto">
            <div className="flex items-center justify-between mb-10">
                <div className="w-[20%]">
                    <div className="font-medium">
                        Аудитория {aud ? aud : '228'}
                    </div>
                </div>
                <div>
                    <SelectAuditories aud={aud} setAud={setAud} />
                </div>
            </div>
            <div className="w-[700px] m-auto">
                <div className="mb-10">
                    <ComputerMapItem {...interMapComputers[0]} />
                </div>
                <div className="flex flex-wrap gap-12">{renderFilterComps}</div>
            </div>
        </div>
    )
}

export default Map
