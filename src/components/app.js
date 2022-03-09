import React, {useEffect} from 'react';
import { useRoutes } from 'hookrouter';
import Navbar from './pages/navigation/navBar';
import routes from './pages/navigation/routes';
import '../style/main.scss';

export default function App() {
  const routeResult = useRoutes(routes);

    return (
      <div className='app'>
        <NavBar logout ={logout} login={login}/>
        {routesResult}
      </div>
    );
  }
