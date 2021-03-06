import React, {ChangeEvent, MouseEvent, useEffect, useState} from 'react';

import './App.css';
import axios from "axios";
import Table from "./Components/Table";
import style from "./Components/Table.module.css";

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

function App() {

    let [cars, setCars] = useState<Array<CarType>>([])
    useEffect(() => {
        axios.get<GetData>('https://city-mobil.ru/api/cars').then(
            response => {
                setCars(response.data.cars);
                //setTariffs(response.data.tariffs_list);
            }
        )
    }, [])

    let [selectedCar, setSelectedCar] = useState('')

    const columnName: Array<string> = ['Эконом', 'Комфорт', 'Комфорт+', 'Минивен', 'Бизнес'];

    function func(car: CarType, year: number, event: MouseEvent<HTMLTableHeaderCellElement>) {
        setSelectedCar(`Выбран автомобиль ${car.mark} ${car.model} ${year} года выпуска`)
    }

    let [arrow, setArrow] = useState(true)
    let changeArrow = () => {
        let carsCopy = [...cars]

        if (arrow) {
            setArrow(!arrow);
            setCars(carsCopy.sort((car1, car2) => car1.mark > car2.mark ? -1 : 1))
        } else {
            setArrow(!arrow);
            setCars(carsCopy.sort((car1, car2) => car1.mark < car2.mark ? -1 : 1))
        }

    }

    let [findCar, setFindCar] = useState<string>('')

    let changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setFindCar(e.currentTarget.value);
        console.log(findCar);
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
                    <input value={findCar} onChange={changeHandler}
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

export default App;
