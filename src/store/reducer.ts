import {CarType} from "../App";

const SET_STATE = 'SET_STATE';
const SET_SELECTED_CAR = 'SET_SELECTED_CAR';
const SET_ARROW = 'SET_ARROW';
const SET_FIND_CAR = 'SET_FIND_CAR';

export type initialStateType = {
    cars: Array<CarType>
    selectedCar: string
    arrow: boolean
    findCar: string
    columnName: Array<string>
}

let initialState = {
    cars: [],
    selectedCar: '',
    arrow: true,
    findCar: '',
    columnName: ['Эконом', 'Комфорт', 'Комфорт+', 'Минивен', 'Бизнес'],
}

export type ActionsTypes = setStateACType | setSelectedCarACType | setArrowACType |setFindCarACType

export const reduser = (state: initialStateType = initialState, action: ActionsTypes): initialStateType => {
    //debugger;
    switch (action.type) {
        case SET_STATE: {
            return {
                ...state,
                cars: [...action.cars]
            }
        }
        case SET_SELECTED_CAR: {
            return{
                ...state,
                selectedCar: action.selectedCar
            }
        }
        case SET_ARROW: {
            return {
                ...state,
                arrow: action.arrow
            }
        }
        case SET_FIND_CAR: {
            return {
                ...state,
                findCar: action.findCar
            }
        }
        default:
            return state;
    }
}


type setStateACType = ReturnType<typeof setState>
type setSelectedCarACType = ReturnType<typeof setSelectedCar>
type setArrowACType = ReturnType<typeof setArrow>
type setFindCarACType = ReturnType<typeof setFindCar>

export const setState = (cars: Array<CarType>) => ({type: SET_STATE, cars} as const)
export const setSelectedCar = (selectedCar: string) => ({type: SET_SELECTED_CAR, selectedCar} as const)
export const setArrow = (arrow: boolean) => ({type: SET_ARROW, arrow} as const)
export const setFindCar = (findCar: string) => ({type: SET_FIND_CAR, findCar} as const)