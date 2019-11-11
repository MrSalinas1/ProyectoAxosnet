import React, { Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Recibos from './components/Recibos';
import Agregar from './components/Agregar';
import Modificar from './components/Modificar';



const Routes = () => {
    return (
        <Fragment>
            <Switch>
                <Route path="/recibos" exact component={Recibos}/>
                <Route path="/agregar" exact component={Agregar}/>
                <Route path="/modificar/:id" exact component={Modificar}/>
                <Redirect to="/recibos" />
            </Switch>
        </Fragment>
    )
}


export default Routes;