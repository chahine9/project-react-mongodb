import React from 'react';
import { Link } from 'react-router-dom';
import AsideMenu from '../components/AsideMenu';
import Footer from '../components/footer';
import HedaerBloc from '../components/Header';

export default class VehiculesDetailsPage extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            id:props.match.params.id,  
            errorMSG:'',
            interventions : [],
            data : null
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

        fetch("http://localhost:8080/api/client/vehicule/details?id="+this.state.id, requestOptions)
        .then(response => response.json())
        .then(result => {
            this.setState({
                data: result
            })
        })
        .catch(error => console.log('error', error));
         
    }


    getListInterventions(){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", localStorage.getItem('token'));

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch("http://localhost:8080/api/client/vehicule/details/interventions?vehicule="+this.state.id, requestOptions)
        .then(response => response.json())
        .then(result =>{
            console.log(result)

            this.setState({
                interventions : result
            })
        })
        .catch(error => console.log('error', error));
    }

    checkUserAuth() {
        if (localStorage.getItem('token') == null) {
            this.props.history.push('/auth');
        }
    }
    componentDidMount() {
        this.checkUserAuth();
        this.initDAta();
        this.getListInterventions();

    }

    render() {
        return (
            <div className="App">

                <HedaerBloc />


                <AsideMenu />

                { /* End Sidebar*/}

                <main id="main" className="main">
                    <div class="pagetitle">
                        <h1>Vechiules details</h1>

                    </div>



                    <section class="section">
                        <div class="row">
                            <div class="col-lg-12">

                                <div class="card mb-4">
                                    <div class="card-body">
                                        <div className="d-flex justify-content-between">
                                            <h5 class="card-title">Vechiules details</h5>

                                            <Link to={ '/clients/vehicules/add/'+this.state.idClient } className="btn btn-success add-btn" ><i className='bx bxs-plus-circle'></i> Add new</Link>
                                        </div>



                                       
                                    </div>
                                </div> 
                                
                            </div>



                            <div className="row">
                                             {
                                                 this.state.data !== null ? 
                                                 
                                                 <div className='col-sm-6 col-md-6'>
                                                <div className="card w-100">
                                                    <div className="card-body" >
                                                        <h3>{ this.state.data.registration }  <span className='vehicule-card' style={ { backgroundColor: this.state.data.color } }></span> </h3>
                                                        <p className='text-muted'>
                                                            { this.state.data.mark } { this.state.data.model }
                                                        </p>
                                                        <p className='text-muted'>
                                                            DMPC : { this.state.data.dmepc } 
                                                        </p>
                                                        

                                                        

                                                         
                                                    </div>
                                                </div>
                                            </div>
                                            :
                                            <div></div>
                                             }



                                             <div className="col-md-6 col-sm-6">
                                                 <div className="card">
                                                     <div className="card-body pt-3">
                                                         <div className="d-flex justify-content-between">
                                                            <h3>List of interventions</h3>

                                                            <Link to={ '/clients/vehicules/intervention/add/'+this.state.id } className="btn btn-warning  " ><i className='bx bxs-plus-circle'></i> Add new</Link>

                                                         </div>
                                                         <table className='table'>
                                                             <thead>
                                                                 <tr>
                                                                     <th>Code</th>
                                                                     <th>Description</th>
                                                                     <th>Price</th>
                                                                     
                                                                 </tr>
                                                             </thead>

                                                             <tbody>
                                                                 {
                                                                     this.state.interventions.map((i)=>{
                                                                         return(
                                                                             <tr>
                                                                                 <td>{i.operationID}</td>
                                                                                 <td>{i.description}</td>
                                                                                 <td>{i.price}$</td>

   
                                                                                 
                                                                             </tr>
                                                                         );
                                                                     })
                                                                 }
                                                             </tbody>
                                                         </table>
                                                     </div>
                                                 </div>
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


