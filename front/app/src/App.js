import logo from './logo.svg';
import './App.css';
import Footer from './components/footer';
import AsideMenu from './components/AsideMenu';
import NavBar from './components/Navbar';
import HedaerBloc from './components/Header';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import HomePage from './pages/Home';
import AuthPage from './pages/Auth';
import CreateAccountPage from './pages/create-account';
import ClientsPage from './pages/clients';
import AddNewClient from './pages/add-client';
import ClientsVehiculesList from './pages/clients-vehicules';
import AddNewVehicule from './pages/add-vehicule';
import VehiculesDetailsPage from './pages/vehicule-details';
import AddNewInterventionPage from './pages/add-new-intervention';

export default class App extends React.Component {


  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div >

        <Router>
          <Switch>
            <Route path="/auth" component={ AuthPage } exact/>
            <Route path="/" component={ HomePage } />
            <Route path="/create-account" component={ CreateAccountPage } />
            <Route path="/clients" component={ ClientsPage } />
            <Route path="/clients/add" component={ AddNewClient } />
            <Route path="/clients/vehicules/:id" component={ ClientsVehiculesList } />
            
            <Route path="/clients/vehicules/add/:id" component={ AddNewVehicule } />
            <Route path="/clients/vehicules/details/:id" component={ VehiculesDetailsPage } />
            
            <Route path="/clients/vehicules/intervention/add/:vehicule" component={ AddNewInterventionPage } />
            
            
            

            
            
            

            
            
            
          </Switch>
        </Router>
      </div>

    );
  }


}


