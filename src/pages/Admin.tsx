import { AddingComputer } from '@/components/Admin/AddingComputer'
import { DataProblems } from '@/components/Admin/DataProblems'
import { Component } from '@/components/CountProblem/CountProblem'
import {DeleteComputer} from '@/components/Admin/DeleteComputer'

const Admin = () => {
    return (
        <div className="max-w-[1200px] m-auto p-5 space-y-5">
            <div className="flex w-full items-center gap-10 flex-col md:flex-row justify-between space-x-5">
                <DataProblems />
                <Component />
            </div>
            <div className='flex gap-10 items-center'>
                <AddingComputer />
                <DeleteComputer/>
            </div>
        </div>
    )
}

export default Admin
