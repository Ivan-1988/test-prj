import React, {ChangeEvent, MouseEvent, useEffect} from 'react';
import './App.css';
import axios from "axios";
import Table from "./Components/Table";
import style from "./Components/Table.module.css";
import {setArrow, setFindCar, setSelectedCar, setState} from './store/reducer';
import {AppRootState} from "./store/store";
import {useDispatch, useSelector} from "react-redux";

export type GetData = {
    cars: Array<CarType>
    tariffs_list: Array<string>
}

export type CarType = {
    mark: string
    model: string
    tariffs: TariffsType
}

export type TariffsType = {
    [key: string]: { year: number }
}

function AppWithRedux() {

    const dispatch = useDispatch();
    useEffect(() => {
        axios.get<GetData>('https://city-mobil.ru/api/cars').then(
            response => {
                dispatch(setState(response.data.cars));
            }
        )
    }, [])

    let cars = useSelector<AppRootState, Array<CarType>>(state => state.cars.cars);
    let selectedCar = useSelector<AppRootState, string>(state => state.cars.selectedCar);
    let arrow = useSelector<AppRootState, boolean>(state => state.cars.arrow);
    let findCar = useSelector<AppRootState, string>(state => state.cars.findCar);
    const columnName = useSelector<AppRootState, Array<string>>(state => state.cars.columnName);

    function func(car: CarType, year: number, event: MouseEvent<HTMLTableHeaderCellElement>) {
        dispatch(setSelectedCar(`Выбран автомобиль ${car.mark} ${car.model} ${year} года выпуска`));
    }

    let changeArrow = () => {
        if (arrow) {
            dispatch(setArrow(!arrow));
            dispatch(setState(cars.sort((car1, car2) => car1.mark > car2.mark ? -1 : 1)));
        } else {
            dispatch(setArrow(!arrow));
            dispatch(setState(cars.sort((car1, car2) => car1.mark < car2.mark ? -1 : 1)));
        }

    }

    let changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setFindCar(e.currentTarget.value));
    }

    return (
        <>
            <div className={style.header}>
                <p>header</p>
            </div>
            <div className={style.content}>
                <div className={style.sidebar}>
                    <p>sidebar</p>
                </div>
                <div className={style.tableContent}>
                    <input
                        value={findCar}
                        type="text"
                        onChange={changeHandler}
                        placeholder={" 🔍 Поиск..."}
                        className={style.input}
                    />
                    <Table
                        cars={cars}
                        columnName={columnName}
                        selectCarHandler={func}
                        sortHandler={changeArrow}
                        arrow={arrow}
                        findCar={findCar}/>
                    <div className={style.car}>
                        <span>{selectedCar}</span>
                    </div>
                </div>
            </div>
            <div className={style.footer}>
                <p>footer</p>
            </div>

        </>
    );
}

export default AppWithRedux;
