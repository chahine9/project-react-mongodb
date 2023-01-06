import React from 'react';
import { Link } from 'react-router-dom';
import AsideMenu from '../components/AsideMenu';
import Footer from '../components/footer';
import HedaerBloc from '../components/Header';

export default class ClientsVehiculesList extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            idClient: props.match.params.id,
            vehicules : [],
            errorMSG:''
        }
       
    }


    initDAta(){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", localStorage.getItem('token'));
        
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
        
        fetch("http://localhost:8080/api/client/vehicules?owner="+this.state.idClient, requestOptions)
          .then(response => response.json())
          .then(result => this.setState({
            vehicules: result
          }))
          .catch(error => this.setState({
              errorMSG:'Network error'
          }));
    }

    checkUserAuth() {
        if (localStorage.getItem('token') == null) {
            this.props.history.push('/auth');
        }
    }
    componentDidMount() {
        this.checkUserAuth();
        this.initDAta();

    }

    render() {
        return (
            <div className="App">

                <HedaerBloc />


                <AsideMenu />

                { /* End Sidebar*/}

                <main id="main" className="main">
                    <div class="pagetitle">
                        <h1>Vechiules</h1>

                    </div>



                    <section class="section">
                        <div class="row">
                            <div class="col-lg-12">

                                <div class="card mb-4">
                                    <div class="card-body">
                                        <div className="d-flex justify-content-between">
                                            <h5 class="card-title">Vechiules list</h5>

                                            <Link to={ '/clients/vehicules/add/'+this.state.idClient } className="btn btn-success add-btn" ><i className='bx bxs-plus-circle'></i> Add new</Link>
                                        </div>
                                    </div>
                                </div>


                               <div className="row">
                               {
                                    this.state.vehicules.map((v)=>{
                                        return(
                                            <div className='col-sm-6 col-md-4'>
                                                <div className="card w-100">
                                                    <div className="card-body" >
                                                        <h3>{ v.registration }  <span className='vehicule-card' style={ { backgroundColor: v.color } }></span> </h3>
                                                        <p className='text-muted'>
                                                            { v.mark } { v.model }
                                                        </p>

                                                        <Link to={ '/clients/vehicules/details/'+v._id }>more details</Link>
                                                    </div>
                                                </div>
                                            </div>

                                        );
                                    })
                                }
                               </div>

                            </div>
                        </div>
                    </section>


                </main>{ /* End #main */}

                { /* ======= Footer ======= */}
                <Footer />

                { /* End Footer */}

                <a href="#" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a>
            </div>

        );
    }


}


