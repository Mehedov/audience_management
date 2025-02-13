'use client'

import { Button } from '@/components/ui/button'
import { PropsWithChildren } from 'react'
import { toast } from 'sonner'

type TSearchTabsButtonProps = {
    description: string
}

export function SearchTabsButton({
    description,
    children,
}: PropsWithChildren<TSearchTabsButtonProps>) {
    return (
        <Button
            variant="outline"
            onClick={() => {
                toast('Event has been created', {
                    description: description,
                    action: {
                        label: 'Undo',
                        onClick: () => console.log('Undo'),
                    },
                })
            }}
        >
            {children}
        </Button>
    )
}
