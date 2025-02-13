import { createSlice } from '@reduxjs/toolkit'

export interface IComputerData {
    id: string
    status: string
    auditorium: string
    message?: {
        author: string
        text: string
    }
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
                    const message = {
                        author: action.payload.author,
                        text: action.payload.text,
                    }
                    computer.status = 'Не рабочий'
                    return Object.assign(computer, { message })
                }
            })
        },
    },
})

export const { setComputers, setComputersItem } = computersSlice.actions
export default computersSlice.reducer
