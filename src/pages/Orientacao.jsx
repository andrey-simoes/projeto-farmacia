import react from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './orientacao.css';



export const Orientacao = () => {
    const [addNome, setAddNome] = useState('');


    const handleAddNome = (e) => {
        setAddNome(e.target.value);
    }

    const axiosInstance = axios.create({
        baseURL: 'https://unisales-exames-hml.herokuapp.com/'
    });

    const api = {
        addNewRequisito: async (data) => {
            let response = await axiosInstance.post('tiposOrientacao', data);
        }
    }

    const submit = async (event) => {
        event.preventDefault();


        if (addNome.length !== "") {


            const data = {
                "id": null,
                "nome": addNome,
            };

            const sendData = await api.addNewRequisito(data);

            if (submit) {
                alert("Tipo de orientação adicionada com sucesso!");
            }

        } else {
            alert('Preencha todos os campos');
        }
    }
    
    const navigate = useNavigate();
    const handleBackPanel = () => {
        navigate(-1);
    }

    useEffect(() => {
        const autenticate = localStorage.getItem('token');
        if (autenticate !== null) {
            return
        } else {
            navigate('/')
        }
    }, [])

    return (
        <div className='container-orientacao'>
            <form
                method='POST'
                onSubmit={e => submit(e)}
            >

                <div className='inputs'>
                    <h2 className='tituloRequisito'>Adicionar Orientação</h2>
                    <label htmlFor="titulo" className='label'>Nome da Orientação</label>
                    <input
                        type="text"
                        name="titulo"
                        className='titulo-orientacao'
                        placeholder='Digite o nome da Orientação'
                        value={addNome}
                        onChange={handleAddNome}
                    />
                </div>
                <button
                    className='addRequisito'
                    type='submit'

                >Adicionar</button>
                <button className='closeModal' onClick={handleBackPanel}>Voltar</button>

            </form>
        </div>
    )

}