import { lazy, useEffect } from 'react'
import { Route, Routes } from 'react-router'
import { routesConfig } from './config/routes.config'
import { MainLayout } from './layout/MainLayout'
import { fetchComputers } from './redux/slices/computer/slice'
import { useAppDispatch } from './redux/store'

const Home = lazy(() => import('./pages/Home'))
const Admin = lazy(() => import('./pages/Admin'))
const Map = lazy(() => import('./pages/Map'))

export function App() {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchComputers(import.meta.env.REACT_BASE_URL))
    }, [dispatch])

    return (
        <div className="max-w-1400px w-[1000px] mt-[100px] dark:border-neutral-700 border-[1px] rounded-lg">
            <Routes>
                <Route path={routesConfig.home} element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path="*" element={<Home />} />
                    <Route path={routesConfig.admin} element={<Admin />} />
                    <Route path={routesConfig.map} element={<Map />} />
                </Route>
            </Routes>
        </div>
    )
}
