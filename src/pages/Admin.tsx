import { AddingComputer } from '@/components/Admin/AddingComputer'
import { DataProblems } from '@/components/Admin/DataProblems'
import { DeleteComputer } from '@/components/Admin/DeleteComputer'
import { Component } from '@/components/CountProblem/CountProblem'

const Admin = () => {
    return (
        <div className="max-w-[1200px] m-auto p-5 space-y-5">
            <div className="flex justify-center">
                <DataProblems />
            </div>
            <div className="flex w-full items-center gap-5 flex-col md:flex-row justify-between space-x-5">
                <DeleteComputer />
                <AddingComputer />
            </div>
            <div className="flex gap-10 items-center">
                <Component />
            </div>
        </div>
    )
}

export default Admin
