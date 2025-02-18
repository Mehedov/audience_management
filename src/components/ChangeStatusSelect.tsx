import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { STATUSES } from '@/constants.ts'

export function ChangeStatusSelect({ status }: { status: string }) {
    return (
        <Select>
            <SelectTrigger className="w-[130px]">
                <SelectValue placeholder={status} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem
                        className=" text-[#06AB46]"
                        value={STATUSES.work}
                    >
                        {STATUSES.work}
                    </SelectItem>
                    <SelectItem
                        className="text-[hsl(var(--destructive))]"
                        value={STATUSES.notWork}
                    >
                        {STATUSES.notWork}
                    </SelectItem>
                    <SelectItem
                        className="text-[#f0aa48]"
                        value={STATUSES.process}
                    >
                        {STATUSES.process}
                    </SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
