import { AddingComputer } from '@/components/Admin/AddingComputer'
import { DeleteComputer } from '@/components/Admin/DeleteComputer'
import { BottomDataPanel } from '@/components/RightDataPanel'

const Admin = () => {
    return (
        <div className="max-w-[1200px] h-auto m-auto p-5 space-y-5 overflow-y-hidden scrollable-container">
            <div className="flex justify-center">
                <BottomDataPanel />
            </div>
            <div className="flex w-full items-center gap-5 flex-col md:flex-row justify-between space-x-5">
                <AddingComputer />
                <DeleteComputer />
            </div>
        </div>
    )
}

export default Admin
