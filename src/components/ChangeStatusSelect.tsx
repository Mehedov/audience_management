import { Button } from '@/components/ui/button'
import {
    Command,
    CommandGroup,
    CommandItem,
    CommandList,
} from '@/components/ui/command'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { COLORS, STATUSES } from '@/constants'
import { cn } from '@/lib/utils'
import { Check, ChevronsUpDown } from 'lucide-react'
import { Dispatch, useState } from 'react'

const statuses = [
    {
        value: STATUSES.work,
        label: STATUSES.work,
        color: COLORS.green,
    },
    {
        value: STATUSES.notWork,
        label: STATUSES.notWork,
        color: COLORS.red,
    },
    {
        value: STATUSES.process,
        label: STATUSES.process,
        color: COLORS.yellow,
    },
]

type TChangeStatusSelectProps = {
    status: string
    currentStatus: string
    setCurrentStatus: Dispatch<React.SetStateAction<string>>
}

export const ChangeStatusSelect = ({
    status,
    currentStatus,
    setCurrentStatus,
}: TChangeStatusSelectProps) => {
    const [open, setOpen] = useState(false)

    const statusColor = statuses.find(
        (currentStatus) => currentStatus.value === status
    )

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[130px] justify-between"
                >
                    <span
                        className={cn(
                            `text-[${statusColor ? statusColor.color : ''}]`
                        )}
                    >
                        {currentStatus !== '' ? currentStatus : status}
                    </span>

                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandList>
                        <CommandGroup>
                            {statuses.map((status) => (
                                <CommandItem
                                    key={status.value}
                                    value={status.value}
                                    className={cn(`text-[${status.color}]`)}
                                    onSelect={(currentValue) => {
                                        setCurrentStatus(
                                            currentValue === currentStatus
                                                ? ''
                                                : currentValue
                                        )
                                        setOpen(false)
                                    }}
                                >
                                    {status.label}
                                    <Check
                                        className={cn(
                                            'ml-auto',
                                            currentStatus === status.value
                                                ? 'opacity-100'
                                                : 'opacity-0'
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
