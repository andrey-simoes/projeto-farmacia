import React from 'react';
import Modal from 'react-modal';
import { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";


import './styles.css';


Modal.setAppElement('#root');


export const ModalDelete = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const params = useParams();
    const navigate = useNavigate();

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
            with: '300px',
            height: '300px'

        },
    };

    const handleDeleteExame = async () => {
        axios.delete(`https://unisales-exames-hml.herokuapp.com/exames/${params.id}`)
            .then(alert('Exame excluido com sucesso'))
            .then(navigate(-1));
    }


    return (
        <div>
            <button
                onClick={handleOpenModal}
                className="btnDelete"

            >Deletar Exame</button>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={handleCloseModal}
                style={customStyles}
            >
            <div>
                <h3 className='modalDeleteTitle'>Tem certeza que deseja deletar o exame?</h3>
                <p className='descDeleteModal'>Essa ação será irreversível.</p>
                <div>
                <button
                        onClick={handleDeleteExame}
                        className="btnDelete"

                >Sim</button>
                <button className='btnStopDelete' onClick={handleCloseModal}>Não</button>
                </div>
            </div>

            </Modal>
        </div>
    )

}