'use client'

import { Check, ChevronsUpDown } from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Dispatch, SetStateAction } from 'react'

const auditories = [
    {
        value: '228',
        label: '228',
    },
    {
        value: '218',
        label: '218',
    },
    {
        value: '227',
        label: '227',
    },
]

type TSelectAuditoriesProps = {
	aud: string,
	setAud: Dispatch<SetStateAction<string>>
}

export function SelectAuditories({aud, setAud}:TSelectAuditoriesProps) {
    const [open, setOpen] = React.useState(false)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {aud
                        ? auditories.find(
                              (auditories) => auditories.value === aud
                          )?.label
                        : 'Выберите аудиторию'}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput
                        placeholder="Поиск аудитории..."
                        className="h-9"
                    />
                    <CommandList>
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                            {auditories.map((auditories) => (
                                <CommandItem
                                    key={auditories.value}
                                    value={auditories.value}
                                    onSelect={(currentValue) => {
                                        setAud(
                                            currentValue === aud
                                                ? ''
                                                : currentValue
                                        )
                                        setOpen(false)
                                    }}
                                >
                                    {auditories.label}
                                    <Check
                                        className={cn(
                                            'ml-auto',
                                            aud === auditories.value
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
