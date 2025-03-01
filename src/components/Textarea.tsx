import { cn } from '@/lib/utils'
import { TFormValues } from '@/types/form.types'
import { FC } from 'react'

export const Textarea: FC<TFormValues<any>> = ({
    name,
    register,
    className,
    ...rest
}) => {
    return (
        <textarea
            className={cn(
                'flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
                className
            )}
            {...register(name as string, {
                required: 'Это поле обязательна для заполнения',
            })}
            {...rest}
        />
    )
}
