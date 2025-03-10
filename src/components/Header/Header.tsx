import { routesConfig } from '@/config/routes.config'
import { House, Map, UserCog } from 'lucide-react'
import { Link } from 'react-router'
import { ModeToggle } from '../mode-toggle'
import { useTheme } from '../theme-provider'

export const Header = () => {
    const { theme } = useTheme()
    console.log(theme)
    return (
        <header className="px-10 py-4 border-b-[1px] dark:border-neutral-700">
            <div className="m-auto flex items-center justify-between">
                <nav>
                    <ul className="flex items-center gap-4 text-lg">
                        <li>
                            <Link
                                to={routesConfig.home}
                                className="dark:text-neutral-400 flex gap-2 items-center"
                            >
                                <House size={25} />
                                Главная
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={routesConfig.admin}
                                className="dark:text-neutral-400 flex gap-2 items-center"
                            >
                                <UserCog size={25} />
                                Админ
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={routesConfig.map}
                                className="dark:text-neutral-400 flex gap-2 items-center"
                            >
                                <Map size={25} />
                                Карта
                            </Link>
                        </li>
                    </ul>
                </nav>
                <ModeToggle />
            </div>
        </header>
    )
}
