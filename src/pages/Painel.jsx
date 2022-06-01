import React from 'react';
import './painel.css';
import { useEffect, useState } from "react";
import { ExameItem } from '../components/ExameItem/ExameItem';
import { VerticalMenu } from '../components/VerticalMenu/VerticalMenu';



// const axiosInstance = axios.create({
//     baseURL: 'https://unisales-exames-hml.herokuapp.com/'
// });



export const Painel = () => {

    const [exame, setExames] = useState([]);

    useEffect(() => {
        loadExames();
    }, [])

    const loadExames = async () => {
        try {
            let response = await fetch('https://unisales-exames-hml.herokuapp.com/exames');
            let json = await response.json();
            setExames(json);
        }
        catch {
            <div>Algo deu errado</div>
        }
    }



    return (
        <div className='containerPanel'>
            <VerticalMenu />
            <div className="main">
                <div className='titleDiv'>
                    <h2 className='subtitlePanel'>Dashboard</h2>
                    <p className='textPanel'>Aqui é onde será feito todo o controle dos exames, tais como CADASTRO, EDIÇÃO e EXCLUSÃO</p>
                </div>
                <div className='graphics'>
                    <h3 className='titleGraphics'>Gráficos</h3>
                    <div className='qtdExames'>{exame.length}</div>
                    <p className='legGraph'>Exames Cadastrados</p>
                </div>
                <div className='lastExames'>
                    <h3 className='titleLastExames'>Últimos Exames Adicionados</h3>
                    {exame &&
                        <div className="card">
                            {exame.map((item, index) => (
                                <ExameItem
                                    key={index}
                                    id={item.id}
                                    title={item.nome}
                                />
                            ))}
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}