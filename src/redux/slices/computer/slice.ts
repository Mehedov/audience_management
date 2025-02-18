import { createSlice } from '@reduxjs/toolkit'

// Убрал message как обьект сделал стринговым значением ибо поле author не нужно

export interface IComputerData {
    id: string
    status: string
    auditorium: string
    message?: string
}

interface IStateTypes {
    computers: IComputerData[]
}

const initialState: IStateTypes = {
    computers: [],
}

const computersSlice = createSlice({
    name: 'computers',
    initialState,
    reducers: {
        setComputers(state, action) {
            state.computers = action.payload
        },
        setComputersItem(state, action) {
            state.computers.map((computer) => {
                if (computer.id !== action.payload.id) return state.computers

                if (computer.id === action.payload.id) {
                    const message = action.payload.message
                    computer.status = 'В процессе'
                    return Object.assign(computer, { message })
                }
            })
        },
        setComputerStatus(state, action) {
            state.computers.map(computer => {
                if (computer.id !== action.payload.id) return state.computers
                if (computer.id === action.payload.id && action.payload.status) {
                    computer.status = action.payload.status
                }
            })
        },
    },
})

export const { setComputers, setComputersItem } = computersSlice.actions
export default computersSlice.reducer
