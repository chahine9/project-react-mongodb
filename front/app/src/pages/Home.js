import React from 'react';
import AsideMenu from '../components/AsideMenu';
import Footer from '../components/footer';
import HedaerBloc from '../components/Header';

export default class HomePage extends React.Component {


  constructor(props){
    super(props);
  }

  checkUserAuth(){
    if (localStorage.getItem('token') == null) {
      this.props.history.push('/auth');
    }
  }
  componentDidMount(){
    this.checkUserAuth();
  }

  render(){
    return(
      <div className="App">

        <HedaerBloc />


        <AsideMenu />

        { /* End Sidebar*/}

        <main id="main" className="main"> 
        <div class="pagetitle">
      <h1>Welcome back</h1>
       
    </div> 

 
        </main>{ /* End #main */}

        { /* ======= Footer ======= */}
        <Footer />

        { /* End Footer */}

        <a href="#" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a>
      </div>
  
    );
  }
 

}

 
