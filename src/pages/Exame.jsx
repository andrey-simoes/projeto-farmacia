import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ModalDelete } from '../components/ModalDelete/ModalDelete';
import axios from 'axios';
import FilteredMultiSelect from 'react-filtered-multiselect';


import './exame.css';


export const Exame = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [exameItem, setExameItem] = useState([]);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [nomeOrientacao, setNomeOrientacao] = useState([]);
    const [addTitleText, setAddTitleText] = useState('');
    const [addDescText, setAddDescText] = useState('');
    const [addRequisitos, setAddRequisitos] = useState([]);
    const [tags, setTags] = useState([]);
    const [selectedShips, setSelectedShips] = useState([]);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const getExame = async () => {
            const response = await axios.get(`https://unisales-exames-hml.herokuapp.com/exames/${params.id}`);
            setExameItem(response.data);
        };
        getExame();

    }, [params.id]);


    useEffect(() => {
        const autenticate = localStorage.getItem('token');
        if (autenticate !== null) {
            return
        } else {
            navigate('/')
        }
    }, [])



    const axiosInstance = axios.create({
        baseURL: 'https://unisales-exames-hml.herokuapp.com/'
    });

    const api = {
        editExame: async (data) => {
            let response = await axiosInstance.put(`exames/${params.id}`, data);

        }
    }



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

    

    const submit = async (event) => {
        event.preventDefault();

        if (exameItem.nome !== '' && exameItem.descricao !== '' && selectedShips.length > 0 && tags.length > 0) {

            let sinonimos = [];
            let orientacoes = [];

            tags.forEach((tag, index) => {
                sinonimos.push({
                    id: index,
                    nome: tag
                })
            });
            selectedShips.forEach((options, index) => {
                orientacoes.push({
                    idTipo: options.id,
                    descricao: selectedShips[index].descricao
                })
            });
            const data = {
                "id": params.id,
                "nome": exameItem.nome,
                "descricao": addDescText,
                "sinonimos": sinonimos,
                "orientacoes": orientacoes
            };

            api.editExame(data);

            if (submit) {
                alert('Exame Editado com Sucesso');
            }
            else {
                alert('teste else')
            }

        } else {
            alert('Preencha todos os campos');
        }
    }

    const handleBackPanel = () => {
        navigate('/painel');
    }

    const toggleProjectForm = () => {
        setShowProjectForm(!showProjectForm);
    }


    // console.log(JSON.stringify(exameItem))
    // console.log(exameItem.orientacoes[0].tipo.nome)
    // console.log(selectedShips[0].tipo.nome)

    return (
        <div className="containerExame">
            <div className="containerExameInfo">
                <div className="headExame">
                    <h1 className="titleExame">Informações do Exame</h1>
                    <button className="btnEditExame" onClick={toggleProjectForm}>
                        {!showProjectForm ? 'Editar Exame' : 'Fechar'}
                    </button>
                </div>
                {!showProjectForm ? (
                    <div></div>
                ) : (
                    <div>
                        <form
                            method='PUT'
                            onSubmit={e => submit(e)}
                        >
                            <div className='inputs'>
                                <label htmlFor="titulo" className='label'>Nome do Exame</label>
                                <input
                                    type="text"
                                    value={exameItem.nome}
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
                                                    <textarea id={index} cols="30" rows="5" onBlur={e => {
                                                        const selecionadas = [...selectedShips];
                                                        const newSelectedShips = [selecionadas[index], selectedShips[index].descricao = e.target.value]
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
                                >Editar Exame
                                </button>
                            </div>
                        </form>
                    </div>
                )}
                <div className="containerExameInfo"></div>
                <div className="idExame">
                    <p>ID do Exame:</p><h3>{params.id}</h3>
                </div>
                <div className="nomeExame">
                    <p>Nome do Exame:</p><h3>{exameItem.nome}</h3>
                </div>
                <div className="descExame">
                    <p>Descrição do Exame:</p><h3>{exameItem.descricao}</h3>
                </div>
                <div className="descExame">
                    <p>Sinonimos do Exame:</p>
                    <ul className="list-item">
                        {exameItem && exameItem.sinonimos?.map((item, index) => {
                            return (
                                <li key={index}>
                                    <span className="descSinonimo">{item.nome}</span>
                                </li>
                            )
                        })
                        }
                    </ul>
                </div>
                <div className="descOrientacao">
                    <p className="orientacaoExame">Orientações do Exame:</p>
                    <ul className="list-item">
                        {exameItem && exameItem.orientacoes?.map((item, index) => {
                            return (
                                <li key={index}>
                                    <span className="tituloOrientacao">{exameItem.orientacoes[index].tipo.nome}</span>
                                    <span className="textoOrientacao">{item.descricao}</span>
                                </li>
                            )
                        })
                        }
                    </ul>
                </div>
            </div>
            <div className="buttonsModalDelete">
                <ModalDelete />
                <button className="btnVoltar" onClick={handleBackPanel}>Voltar</button>
            </div>
        </div>
    )
}