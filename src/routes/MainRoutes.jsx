import { useRoutes } from 'react-router-dom';
import { Exames } from '../pages/Exames';
import { Painel } from '../pages/Painel';
import { Exame } from '../pages/Exame';

export const MainRoutes = () => {
    return useRoutes([
        { path: '/', element: <Painel /> },
        { path: '/cadastro', element: <Exames /> },
        { path: '/exames/:id', element: <Exame /> }
    ]);
}