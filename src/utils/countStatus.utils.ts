import { COLORS } from '@/constants'
import { IComputerData } from '@/redux/slices/computer/slice'

export const countStatusUtils = (computer: IComputerData[]) => {
    const countWorkStatus = [...computer].filter(
        (obj) => obj.status === 'Рабочий'
    ).length
    const countNotWorkStatus = [...computer].filter(
        (obj) => obj.status === 'Не рабочий'
    ).length
    const countProcessStatus = [...computer].filter(
        (obj) => obj.status === 'В процессе'
    ).length

    return [
        {
            browser: 'Рабочие',
            visitors: countWorkStatus,
            fill: COLORS.green,
        },
        {
            browser: 'Не работают',
            visitors: countNotWorkStatus,
            fill: COLORS.red,
        },
        {
            browser: 'В процессе',
            visitors: countProcessStatus,
            fill: COLORS.yellow,
        },
    ]
}
