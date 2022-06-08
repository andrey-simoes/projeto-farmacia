import React from 'react';
import Select from 'react-select';
import {useState, useEffect} from 'react';

import './style.css';

export const MultiSelect = () => {

    const [options, setOptions] = useState([]);

    const selectOption = options.map((item,index)=>{
        return { value: index, label: item.nome };
    })

    useEffect(() => async () => {

        const response = await fetch('https://unisales-exames-hml.herokuapp.com/tiposOrientacao');
        const data = await response.json();
        return setOptions(data);
    }, []);

    console.log(options.nome);

    return (
        <>
            <div>
                <Select isMulti options={selectOption} />
            </div>
            <div>{selectOption &&
                selectOption.map((values, index) => {
                    return (
                        <div className='descOrientacao' key={index}>
                            <label htmlFor={index}>Insira uma descrição para {values.nome}</label>
                            <textarea id={index} cols="30" rows="10" onBlur={e => {
                                const selecionadas = [...selectOption];
                                const newSelectedShips = [selecionadas[index], selectOption[index].descricao = e.target.value]
                            }}>
                            </textarea>
                        </div>

                    )
                })
                
            }</div>
        </>   
        )
}