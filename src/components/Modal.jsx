import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { useState } from 'react';
import './styles.css';
import axios from 'axios';


Modal.setAppElement('#root');


export const Popup = () => {
    const [addDescReq, setAddDescReq] = useState('');
    const [addTituloReq, setAddTituloReq] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);



    const handleOpenModal = () => {
        setModalIsOpen(true);
    }
    const handleCloseModal = () => {
        setModalIsOpen(false);
    }
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',

        },
    };


    const handleAddDescReq = (e) => {
        setAddDescReq(e.target.value);
    }

    const handleAddTitulo = (e) => {
        setAddTituloReq(e.target.value);
    }

    const axiosInstance = axios.create({
        baseURL: 'https://unisales-exames-hml.herokuapp.com/'
    });

    const api = {
        addNewRequisito: async (data) => {
            let response = await axiosInstance.post('orientacoes', data);
        }
    }

    const submit = async (event) => {
        event.preventDefault();


        if (addDescReq.length !== "") {

            let tipo = [];

            console.log(addTituloReq)
            console.log(addDescReq)

            const data = {
                "idTipo": null,
                "idExame": null,
                "nomeTipo": addTituloReq,
                "descricao": addDescReq,
            };

            const sendData = await api.addNewRequisito(data);

            if (sendData) {
                alert("Exame adicionado com sucesso!");
            }

        } else {
            alert('Preencha todos os campos');
        }
    }


    return (
        <div>
            <button
                onClick={handleOpenModal}
                className="btnRequisito"

            >Adicionar Orientação</button>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={handleCloseModal}
                style={customStyles}
            >
                <form
                    method='PUT'
                    onSubmit={e => submit(e)}
                >

                <div className='inputs'>
                    <h2 className='tituloRequisito'>Adicionar Requisito</h2>
                    <label htmlFor="titulo" className='label'>Nome do Requisito</label>
                    <input
                        type="text"
                        name="titulo"
                        className='titulo-exame'
                        placeholder='Digite o nome do Requisito'
                        value={addTituloReq}
                        onChange={handleAddTitulo}
                    />
                </div>

                <div className='inputs'>
                    <label htmlFor="descricao" className='label'>Descrição do Requisito</label>
                    <textarea
                        name='descricao'
                        className='desc-exame'
                        value={addDescReq}
                        onChange={handleAddDescReq}
                        placeholder='Digite a descrição do Requisito' />
                </div>
                <button className='closeModal' onClick={handleCloseModal}>Voltar</button>
                <button 
                    className='addRequisito'
                    type='submit'

                >Adicionar Requisito</button>

            </form>
            </Modal>
        </div>
    )

}