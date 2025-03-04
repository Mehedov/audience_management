import { FETCH_STATUSES } from '@/constants'
import { fetchComputersItems } from '@/service/computer.service'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IComputerData {
    id: string
    status: string
    auditorium: string
    message?: string
}

interface IStateTypes {
    computers: IComputerData[]
    status: string
}

export const fetchComputers = createAsyncThunk(
    'computers/fetchComputersStatus',
    async (url: string) => {
        const response = await fetchComputersItems(url)
        return response
    }
)

const initialState: IStateTypes = {
    computers: [],
    status: FETCH_STATUSES.PENDING,
}

const computersSlice = createSlice({
    name: 'computers',
    initialState,
    reducers: {
        setComputers(state, action: PayloadAction<IComputerData[]>) {
            state.computers = action.payload
        },
        setComputersItem(
            state,
            action: PayloadAction<{ id: string; message: string }>
        ) {
            state.computers.map((computer) => {
                if (computer.id !== action.payload.id) return state.computers

                if (computer.id === action.payload.id) {
                    const message = action.payload.message
                    computer.status = 'В процессе'
                    return Object.assign(computer, { message })
                }
            })
        },
        setComputerStatus(
            state,
            action: PayloadAction<{ id: string; status: string }>
        ) {
            state.computers.map((computer) => {
                if (computer.id !== action.payload.id) return state.computers
                if (
                    computer.id === action.payload.id &&
                    action.payload.status
                ) {
                    computer.status = action.payload.status
                }
            })
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            fetchComputers.fulfilled,
            (state, action: PayloadAction<IComputerData[]>) => {
                state.computers = action.payload
                state.status = FETCH_STATUSES.FULFILLED
            }
        )
        builder.addCase(fetchComputers.pending, (state) => {
            state.computers = []
            state.status = FETCH_STATUSES.PENDING
        })
        builder.addCase(fetchComputers.rejected, (state) => {
            state.computers = []
            state.status = FETCH_STATUSES.REJECTED
        })
    },
})

export const { setComputers, setComputersItem, setComputerStatus } =
    computersSlice.actions
export default computersSlice.reducer
