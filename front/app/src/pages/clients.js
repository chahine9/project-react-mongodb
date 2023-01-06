import React from 'react';
import { Link } from 'react-router-dom';
import AsideMenu from '../components/AsideMenu';
import Footer from '../components/footer';
import HedaerBloc from '../components/Header';

export default class ClientsPage extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            filter:'',
            clients : []
        }
       
    }


    initDAta(){
        var myHeaders = new Headers();
        myHeaders.append("Authorization", localStorage.getItem('token') );
        myHeaders.append("Content-Type", "application/json");
 
        var requestOptions = {
        method: 'GET',
        headers: myHeaders, 
        redirect: 'follow'
        };

        fetch("http://localhost:8080/api/clients/list", requestOptions)
        .then(response => response.json())
        .then(result =>{
             this.setState({
                 clients: result
             })
        })
        .catch(error => {
           localStorage.clear();
           this.props.history.push('/auth');
        });
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
                        <h1>Clients</h1>

                    </div>


                    <div class="pagetitle">
                        <div className='form-group'>
                            <input type="search" className='form-control' onChange={ (e)=>{ this.setState({ filter: e.target.value}) } } />
                        </div>
                    </div>
                    



                    <section class="section">
                        <div class="row">
                            <div class="col-lg-12">

                                <div class="card">
                                    <div class="card-body">
                                        <div className="d-flex justify-content-between">
                                            <h5 class="card-title">Clients list</h5>

                                            <Link to={ '/clients/add' } className="btn btn-success add-btn" ><i className='bx bxs-plus-circle'></i> Add new</Link>
                                        </div>
                                        <p>this is list of our clients.</p>


                                        <div className="datatable table-responsive">
                                        <table className='table'>
                                            <tr>
                                                <th>firstname</th>
                                                <th>lastname</th>
                                                <th>email</th>
                                                <th>phone</th>
                                                <th>cin</th>
                                                <th>address</th>
                                                <th>Actions</th>
                                                
                                                
                                            </tr>

                                            <tbody>
                                                {
                                                    this.state.clients.filter( (c)=> 
                                                    (c.cin.indexOf( this.state.filter ) != -1)
                                                    ||
                                                    (c.firstname.indexOf( this.state.filter ) != -1)
                                                    ).map( (c)=>{
                                                        return ( 
                                                        <tr>
                                                            <td>{ c.firstname }</td>
                                                            <td>{ c.lastname }</td>
                                                            <td>{ c.email }</td>
                                                            <td>{ c.phone }</td>
                                                            <td>{ c.cin }</td>
                                                            <td>{ c.address }</td>
                                                            <td>
                                                                <Link to={ '/clients/vehicules/'+c._id }> vehicules list </Link>
                                                            </td>
                                                            
                                                        </tr> );
                                                    } )
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


