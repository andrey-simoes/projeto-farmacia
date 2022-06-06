import { useRoutes } from 'react-router-dom';
import { Exames } from '../pages/Exames';
import { Painel } from '../pages/Painel';
import { Exame } from '../pages/Exame';
import { EditExames } from '../pages/EditExame';
import { Orientacao } from '../pages/Orientacao';
import { Login } from '../pages/Login';

export const MainRoutes = () => {
    return useRoutes([
        { path: '/painel', element: <Painel /> },
        { path: '/cadastro', element: <Exames /> },
        { path: '/exames/:id', element: <Exame /> },
        { path: '/edit/exames/:id', element: <EditExames /> },
        { path: '/orientacao', element: <Orientacao /> },
        { path: '/', element: <Login /> },

    ]);
}