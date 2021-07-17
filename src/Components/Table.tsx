import React, {MouseEvent, useEffect} from 'react';
import {CarType} from '../App';
import style from "./Table.module.css";

type PropsType = {
    cars: Array<CarType>
    columnName: Array<string>
    selectCarHandler: (car: CarType, year: number, event: MouseEvent<HTMLTableHeaderCellElement>) => void
    sortHandler: () => void
    arrow: boolean
    findCar: string
}

export function Table(props: PropsType) {
    //debugger;
    let carsForTable = [];
    for (let carObj of props.cars) {
        carsForTable.push({...carObj, markandmodel: `${carObj.mark} ${carObj.model}`})
    }

    if (props.findCar) {
        carsForTable = carsForTable.filter(car => car.markandmodel.includes(props.findCar));
    }

    let idKey = 0;
    const rows = carsForTable.map((item, index) => {
        let row = [];

        for (let str of props.columnName) {
            row.push(Object.keys(item.tariffs).includes(str) ?
                <td key={++idKey + index}
                    onClick={event => props.selectCarHandler(item, item.tariffs[str].year, event)}>
                    {item.tariffs[str].year}
                </td> :
                <td key={++idKey + index}> - </td>)
        }
        return <tr key={index}>
            <td key={++idKey + index}>{item.mark} {item.model}</td>
            {row.map(r => r)}
        </tr>
    })

    let rowHeader = props.columnName.map(c => <th>{c}</th>)

    return <div>
        <table className={style.table}>
            <thead>
            <tr>
                <th onClick={props.sortHandler}>Марка и Модель {props.arrow ? <span>&#8615;</span> :
                    <span>&#8613;</span>}</th>
                {rowHeader}
            </tr>
            </thead>
            {rows}
        </table>
    </div>
}

export default Table;