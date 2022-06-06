import axios from 'axios';
import './login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';






export const Login = () => {

    const navigate = useNavigate();

    const axiosInstance = axios.create({
        baseURL: 'https://unisales-exames-hml.herokuapp.com/'
    });


    const api = {
        getToken: async (data) => {
            const response = await axiosInstance.post('/auth/login', data)
            const token = response.data;
            const keyToken = JSON.stringify(token.token);
            localStorage.setItem('token', keyToken);
            navigate('/painel');
        }
    }

    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');

    const handleUser = (event) => {
        setUsuario(event.target.value)
    }

    const handleSenha = (event) => {
        setSenha(event.target.value)
    }

    const submit = async (event) => {
        event.preventDefault();

        if (usuario !== '' && senha !== '') {
            const data = {
                "nomeUsuario": usuario,
                "senha": senha,
            };
            api.getToken(data);

            if (submit) {
                alert('Login com Sucesso');
            }
            else {
            }
        } else {
            alert('Preencha todos os campos');
        }
    }

    return (
        <div className='master'>
        <div className='sideLogin'>
            <h1>Bem-vindos ao Projeto TADS</h1>
            <h2>Este projeto tem o intuito de realizar cadastros de exames e suas orientações para as turmas de Farmácia e Biomedicina.</h2>
        </div>
        <div className='mainLogin'>
            <h2>Faça seu Login</h2>
            <p>Caso você não possua acesso,</p><p>entre em contato com o professor,</p><p> responsável pela sua turma.</p>
            <form
                method='POST'
                onSubmit={e => submit(e)}
            >
                <div className='inputs'>
                    <label className='labelLogin' htmlFor="username">Usuário:</label>

                    <input 
                    className='inputLogin' 
                    type="text"
                    id='usuario'
                    name='usuario' 
                    value={usuario} 
                    onChange={handleUser} />
                </div>

                <div className='inputs'>
                    <label className='labelLogin' htmlFor="pass">Senha:</label>
                    <input 
                    className='inputLogin' 
                    type="password" 
                    autoComplete='on' 
                    id='pass' 
                    name='senha' 
                    value={senha} 
                    onChange={handleSenha} />
                </div>

                <div className='botaoLogin'>
                    <button
                        type='submit'
                        className='btnLogin'
                    >Login
                    </button>
                </div>
            </form>
        </div>
        </div>
    )
}