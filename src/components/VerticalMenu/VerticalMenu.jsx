import { useState } from 'react';
import './styles.css';



export const VerticalMenu = () => {

    const [showDash, setShowDash] = useState(true);

    
    const handleToggleDash = () => {
        setShowDash(!showDash);
    }

    return (
        <div className="menu">
            <button className='btnMenu' onClick={handleToggleDash}>{!showDash ? 'Fechar Menu' : 'Menu'}</button>
            {!showDash ? 
            <div className='painel'>
            <h1 className='titlePanel'>Projeto TADS</h1>
            <a href="/cadastro" >
                <li className="menuItem"><i className="fi fi-rr-edit"></i> Cadastro de Exames</li>
            </a>
            <a href="/orientacao" >
                <li className="menuItem"><i className="fi fi-rr-edit"></i> Cadastro de Orientações</li>
            </a>

            <a href="/" >
                <li className="menuItem logout"><i className="fi fi-rr-sign-out"></i> Logout</li>
            </a>
            </div>
            : ''
        }
        </div>
    )
}