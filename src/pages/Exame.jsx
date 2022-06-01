import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ModalDelete } from '../components/ModalDelete/ModalDelete';

import './exame.css';


export const Exame = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [exameItem, setExameItem] = useState([]);

    useEffect(() => {
        loadExame();
    }, [])

    const loadExame = async (id) => {
        try {
            let response = await fetch(`https://unisales-exames-hml.herokuapp.com/exames/${params.id}`);
            let json = await response.json();
            setExameItem(json);
        }
        catch {
            <div>Algo deu errado</div>
        }
    }

    const handleBackPanel = () => {
        navigate('/');
    }

    return(
        <div className="containerExame">
            <div>
                <h1 className="titleExame">Informações do Exame</h1>
                <div className="idExame">
                    <p>ID do Exame:</p><h3>{params.id}</h3>
                </div>
                <div className="nomeExame">
                    <p>Nome do Exame:</p><h3>{exameItem.nome}</h3>
                </div>
                <div className="descExame">
                    <p>Descrição do Exame:</p><h3>{exameItem.descricao}</h3>
                </div>
            </div>
            <div className="buttonsModalDelete">
                <ModalDelete />
                <button className="btnVoltar" onClick={handleBackPanel}>Voltar</button>
            </div>
        </div>
    )
}