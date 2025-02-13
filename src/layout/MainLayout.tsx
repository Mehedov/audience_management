import { Header } from '@/components/Header/Header'
import { Outlet } from 'react-router'

export const MainLayout = () => {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
        </>
    )
}
