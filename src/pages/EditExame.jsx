import { useEffect, useState } from 'react';
import React from 'react';
import '../App.css';
import FilteredMultiSelect from 'react-filtered-multiselect';
import axios from 'axios';
import { Popup } from '../components/Modal/Modal';
import { useNavigate, useParams } from 'react-router-dom';

const axiosInstance = axios.create({
    baseURL: 'https://unisales-exames-hml.herokuapp.com/'
});






export const EditExames = () => {

    const [addTitleText, setAddTitleText] = useState('');
    const [addDescText, setAddDescText] = useState('');
    const [addRequisitos, setAddRequisitos] = useState([]);
    const [tags, setTags] = useState([]);
    const [selectedShips, setSelectedShips] = useState([]);
    const [options, setOptions] = useState([]);

    const navigate = useNavigate();
    const params = useParams();

    const api = {
        addNewExame: async (data) => {
            let response = await axiosInstance.post(`exames/${params.id}`, data);
        }
    }

    useEffect(() => {
        const autenticate = localStorage.getItem('token');

    }, [])

    useEffect(() => async () => {

        const response = await fetch('https://unisales-exames-hml.herokuapp.com/tiposOrientacao');
        const data = await response.json();
        return setOptions(data);

    }, []);

    const handleAddTitleChange = (e) => {
        setAddTitleText(e.target.value);
    }

    const handleAddDescChange = (e) => {
        setAddDescText(e.target.value);
    }

    const handleAddRequisitosChange = (e) => {
        setAddRequisitos(e.target.value);
    }

    const handleDeselect = (index) => {
        let selectedTips = selectedShips.slice();
        selectedTips.splice(index, 1);
        setSelectedShips(selectedTips);
    }

    const handleSelectionChange = (selectedShips) => {
        setSelectedShips(selectedShips)
    }

    const removeTags = (indexToRemove) => {
        setTags(tags.filter((_, index) => index !== indexToRemove))
    };

    const addTags = (event) => {
        if (event.target.value !== "") {
            setTags([...tags, event.target.value]);
            return event.target.value = "";
        }
    };

    const handledAddSinonimos = (sinonimos) => {
        setTags(sinonimos);
    }

    const handleBackPanel = () => {
        navigate('/painel');
    }


    const submit = async (event) => {
        event.preventDefault();

        if (addTitleText !== '' && addDescText !== '' && selectedShips.length > 0 && tags.length > 0) {

            let sinonimos = [];
            let orientacoes = [];

            tags.forEach((tag) => {
                sinonimos.push({
                    id: null,
                    nome: tag
                })
            });
            selectedShips.forEach((options, index) => {
                orientacoes.push({
                    idTipo: options.id,
                    idExame: null,
                    descricao: selectedShips[index].descricao
                })
            });

            const data = {
                "id": null,
                "nome": addTitleText,
                "descricao": addDescText,
                "sinonimos": sinonimos,
                "orientacoes": orientacoes
            };

            const sendData = await api.addNewExame(data);

            if (submit) {
                setAddTitleText('');
                setAddDescText('');
                setSelectedShips([]);
                setTags([]);
                alert('Exame Cadastrado com Sucesso');

            }
            else{
                alert('teste else')
            }

        } else {
            alert('Preencha todos os campos');
        }
    }



    return (
        <div className="container">
            <h1>Adição de Exames</h1>
            <button className='backPanel' onClick={handleBackPanel}>Voltar</button>
            <Popup />

            <form
                method='POST'
                onSubmit={e => submit(e)}
            >
                <div className='inputs'>
                    <label htmlFor="titulo" className='label'>Nome do Exame</label>
                    <input
                        type="text"
                        value={addTitleText}
                        onChange={handleAddTitleChange}
                        name="titulo"
                        className='titulo-exame'
                        placeholder='Digite o nome do Exame' />
                </div>
                <div className='inputs'>
                    <label htmlFor="descricao" className='label'>Descrição do Exame</label>
                    <textarea
                        name='descricao'
                        value={addDescText}
                        onChange={handleAddDescChange}
                        className='desc-exame'
                        placeholder='Digite a descrição do Exame' />
                </div>
                <div>
                    <span className='label'>Sinônimos</span>
                    <div className='tags-input'>
                        <input
                            name='sinonimos'
                            type="text"
                            placeholder="Pressione enter para adicionar sinônimos"
                            onKeyPress={e => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    addTags(e)
                                }
                            }}
                        />
                        <ul>
                            {
                                tags.length !== 0 && tags.map((tag, index) =>
                                    <li className="tag" key={index}>
                                        <span key={index} >{tag}</span>
                                        <i className='material-icons tag-close-icon' onClick={() => removeTags(index)}>close</i>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </div>
                <div>
                    <span className='label'>Selecionar Orientações</span>
                    <div className="seletor">
                        <FilteredMultiSelect
                            onChange={handleSelectionChange}
                            options={options}
                            selectedOptions={selectedShips}
                            textProp="nome"
                            valueProp="id"
                            buttonText="Adicionar"
                            classNames={{
                                filter: 'form-control-add',
                                select: 'form-select-add',
                                button: 'btn-add',
                                buttonActive: 'btn-add-active'
                            }}
                            placeholder="Pesquisar.."
                        />
                    </div>
                </div>

                <div>
                    <span className='label'>Orientações Selecionadas</span>
                    <div className="removedor">
                        <FilteredMultiSelect
                            buttonText="Remover"
                            classNames={{
                                filter: 'form-control',
                                select: 'form-select',
                                button: 'btn-remove',
                                buttonActive: 'btn-remove-active'
                            }}
                            onChange={handleDeselect}
                            options={selectedShips}
                            textProp="nome"
                            valueProp="id"
                            placeholder="Pesquisar.."
                            value={addRequisitos}
                        />
                    </div>
                </div>

                <div>
                    <div>
                        {selectedShips.length > 0 ?
                            selectedShips.map((values, index) => {
                                return (
                                    <div className='descOrientacao' key={index}>
                                        <label htmlFor={index}>Insira uma descrição para {values.nome}</label>
                                        <textarea id={index} cols="30" rows="10" onBlur={e => {
                                            const selecionadas = [...selectedShips];
                                            const newSelectedShips = [selecionadas[index], selectedShips[index].descricao = e.target.value]
                                            console.log(newSelectedShips)
                                        }}>
                                        </textarea>

                                    </div>

                                )
                            })
                            : ''
                        }
                    </div>
                </div>


                <div className='botao'>
                    <button
                        type='submit'
                        className='add-exame'
                    >Adicionar Exame
                    </button>
                </div>
            </form>
        </div>

    )
}

