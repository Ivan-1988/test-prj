import React, {ChangeEvent, MouseEvent, useEffect, useState} from 'react';

import './App.css';
import axios from "axios";
import Table from "./Components/Table";

type GetData = {
    cars: Array<CarType>
    tariffs_list: Array<string>
}

export type CarType = {
    mark: string
    model: string
    tariffs: TariffsType
}

type TariffsType = {
    [key: string]: {year: number}
/*    [key: string]?: {year: number}
    ['Комфорт+']?: {year: number}
    ['Минивен']?: {year: number}
    ['Бизнес']?: {year: number}
    ['Стандарт']?: {year: number}
    ['Лайт']?: {year: number}*/
}

function App() {

    let [cars, setCars] = useState<Array<CarType>>([])
    //let [tariffs, setTariffs] = useState<Array<string>>([])
    //debugger;
    useEffect(() => {
        axios.get<GetData>('https://city-mobil.ru/api/cars').then(
            response => {
                setCars(response.data.cars);
                //setTariffs(response.data.tariffs_list);
            }
        )
    },[])



/*    let [cars, setCars] = useState<Array<CarType>>([{
        ["mark"]: "Acura",
        ["model"]: "ILX",
        ["tariffs"]: {
            ["Комфорт"]: {
                ["year"]: 2015
            },
            ["Стандарт"]: {
                ["year"]: 2014
            }
        }
    },
        {
            ["mark"]: "Acura",
            ["model"]: "MDX",
            ["tariffs"]: {
                ["Комфорт"]: {
                    ["year"]: 2015
                },
                ["Стандарт"]: {
                    ["year"]: 2014
                }
            }
        },
        {
            ["mark"]: "Acura",
            ["model"]: "TLX",
            ["tariffs"]: {
                ["Комфорт"]: {
                    ["year"]: 2015
                },
                ["Эконом"]: {
                    ["year"]: 2014
                }
            }
        },
        {
            ["mark"]: "BMW",
            ["model"]: "3 серия",
            ["tariffs"]: {
                ["Комфорт"]: {
                    ["year"]: 2010
                },
                ["Комфорт+"]: {
                    ["year"]: 2012
                },
                ["Стандарт"]: {
                    ["year"]: 2004
                },
                ["Эконом"]: {
                    ["year"]: 2004
                }
            }
        },
        {
            ["mark"]: "Brilliance",
            ["model"]: "V3",
            ["tariffs"]: {
                ["Стандарт"]: {
                    ["year"]: 2014
                },
                ["Эконом"]: {
                    ["year"]: 2014
                }
            }
        }])*/



    let [selectedCar, setSelectedCar] = useState('')
    /*const  cars: Array<CarType> = [{
            ["mark"]: "Acura",
            ["model"]: "ILX",
            ["tariffs"]: {
                ["Комфорт"]: {
                    ["year"]: 2015
                },
                ["Стандарт"]: {
                    ["year"]: 2014
                }
            }
        },
        {
            ["mark"]: "Acura",
            ["model"]: "MDX",
            ["tariffs"]: {
                ["Комфорт"]: {
                    ["year"]: 2015
                },
                ["Стандарт"]: {
                    ["year"]: 2014
                }
            }
        },
        {
            ["mark"]: "Acura",
            ["model"]: "TLX",
            ["tariffs"]: {
                ["Комфорт"]: {
                    ["year"]: 2015
                },
                ["Эконом"]: {
                    ["year"]: 2014
                }
            }
        },
        {
            ["mark"]: "BMW",
            ["model"]: "3 серия",
            ["tariffs"]: {
                ["Комфорт"]: {
                    ["year"]: 2010
                },
                ["Комфорт+"]: {
                    ["year"]: 2012
                },
                ["Стандарт"]: {
                    ["year"]: 2004
                },
                ["Эконом"]: {
                    ["year"]: 2004
                }
            }
        }]*/

    const columnName: Array<string> = [ 'Эконом', 'Комфорт', 'Комфорт+', 'Минивен', 'Бизнес'];

    function func (car: CarType, year: number, event: MouseEvent<HTMLTableHeaderCellElement>) {
        setSelectedCar(`${car.mark} ${year}`)
    }

    let [arrow, setArrow] = useState(true)
    let changeArrow = () => {
        let carsCopy = [...cars]

        if (arrow){
            setArrow(!arrow);
            setCars(carsCopy.sort((car1, car2)=> car1.mark > car2.mark ? -1 : 1))
        } else{
            setArrow(!arrow);
            setCars(carsCopy.sort((car1, car2)=> car1.mark < car2.mark ? -1 : 1))
        }

    }

    //-----------------------------------------------
    let [findCar, setFindCar] = useState<string>('')

    let changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setFindCar(e.currentTarget.value);
        console.log(findCar);
    }


/*    let carFindHandler = () => {
        let carsCopy = [...cars]
        const result = carsCopy.filter(car => car.mark.includes(findCar));
        setCars(result);
        setFindCar('')
    }*/
//----------------------------

/*    let carsForTable
if (findCar){
    carsForTable = cars;
} else{
    carsForTable = cars.filter(car => car.mark.includes(findCar));
}*/




  return (
    /*  <table>

      </table>*/
/*      <div>
          {columnName.map(t => <div>{t}</div>)}
      </div>*/
     /* <table>


          <tr><th onClick={chageArrow}>Марка и Модель {arrow ? <span>&#129043;</span> : <span>&#129045;</span>}</th>
              {rowHeader}</tr>

      </table>*/

      <>

          <input value={findCar} onChange={changeHandler} type="text"/> {/*<button onClick={carFindHandler}>Найти</button>*/}
          <Table
              cars={cars}
              columnName={columnName}
              selectCarHandler={func}
              sortHandler={changeArrow}
              arrow={arrow}
              findCar={findCar}/>
{/*      <table>
          <tr><th onClick={chageArrow}>Марка и Модель {arrow ? <span>&#129043;</span> : <span>&#129045;</span>}</th>
              {rowHeader}</tr>
          {rows}
      </table>*/}
      <div>
          {selectedCar}
      </div>
    </>
  );
}

export default App;
