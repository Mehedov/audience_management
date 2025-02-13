import { FC } from 'react'
import { CardTitle } from './ui/card'

type TSearchComputersInfoProps = {
    renderFilterComps: JSX.Element[]
}

export const SearchComputersInfo: FC<TSearchComputersInfoProps> = ({
    renderFilterComps,
}) => {
    return (
        <div className="p-6 dark:border-neutral-900 border-l-[1px]">
            <CardTitle className="mb-4">Информация об компьютерах</CardTitle>
            <div className="max-h-[500px] scrollable-container overflow-y-auto overflow-x-hidden">
                {renderFilterComps}
            </div>
        </div>
    )
}
