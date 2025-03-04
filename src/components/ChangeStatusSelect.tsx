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
import { COLORS, COMPUTER_STATUSES } from '@/constants'
import { cn } from '@/lib/utils'
import { Check, ChevronsUpDown } from 'lucide-react'
import { Dispatch, SetStateAction, useState } from 'react'

const statuses = [
    {
        value: COMPUTER_STATUSES.work,
        label: COMPUTER_STATUSES.work,
        color: COLORS.green,
    },
    {
        value: COMPUTER_STATUSES.notWork,
        label: COMPUTER_STATUSES.notWork,
        color: COLORS.red,
    },
    {
        value: COMPUTER_STATUSES.process,
        label: COMPUTER_STATUSES.process,
        color: COLORS.yellow,
    },
]

type TChangeStatusSelectProps = {
    status: string
    currentStatus: string
    setCurrentStatus: Dispatch<SetStateAction<string>>
}

export const ChangeStatusSelect = ({
    status,
    currentStatus,
    setCurrentStatus,
}: TChangeStatusSelectProps) => {
    const [open, setOpen] = useState(false)

    const statusColor = statuses.find(
        (status) => status.value === (currentStatus || status)
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
                        style={{
                            color: `${
                                statusColor
                                    ? statusColor.color
                                    : COMPUTER_STATUSES.process
                            }`,
                        }}
                        className="text-purple-700 font-bold"
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
                                    style={{ color: `${status.color}` }}
                                    onSelect={(currentValue) => {
                                        setCurrentStatus(
                                            currentValue === currentStatus
                                                ? currentStatus
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
