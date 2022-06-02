import './styles.css';

export const VerticalMenu = () => {
    return (
        <div className="menu">
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
    )
}