import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { DataProblems } from './Admin/DataProblems'
import { Component } from './CountProblem/CountProblem'

export function BottomDataPanel() {
    return (
        <Sheet key="bottom">
            <SheetTrigger asChild>
                <Button variant="outline">Отслеживание компьютеров</Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="w-full flex gap-10">
                <DataProblems />
                <Component />
            </SheetContent>
        </Sheet>
    )
}
