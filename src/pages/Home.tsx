import { Control } from '../components/Control/Control'
import { selectorComputerItems } from '../redux/slices/computer/selections'
import { useAppSelector } from '../redux/store'

const Home = () => {
    const computers = useAppSelector(selectorComputerItems)

    return (
        <div className="w-full p-5 m-auto flex justify-center items-center">
            <div className="mt-15">
                <Control computers={computers} />
            </div>
        </div>
    )
}

export default Home
