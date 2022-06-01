import { Link } from 'react-router-dom';
import './styles.css';



export const ExameItem = ({ id, title}) => {

    return (
        <Link to={`/exames/${id}`} className="exame">
            {title}
        </Link>
        
    );
}