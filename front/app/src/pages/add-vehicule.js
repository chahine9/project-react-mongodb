import React from 'react';
import { Link } from 'react-router-dom';
import AsideMenu from '../components/AsideMenu';
import Footer from '../components/footer';
import HedaerBloc from '../components/Header';

export default class AddNewVehicule extends React.Component {


  constructor(props){
    super(props);
    this.state = {
        idClient:props.match.params.id,
        mark:'',
        model:'',
        color:'',
        registration:'',
        dmepc: '',
        mark:'', 

        errMSG:'',
        succMSG:'',
        
        
    }
  }

  checkUserAuth(){
    if (localStorage.getItem('token') == null) {
      this.props.history.push('/auth');
    }
  }
  componentDidMount(){
    this.checkUserAuth();
  }


    createVehicule(){
      // CALL API 
    
      this.setState({
        errMSG:'',
        succMSG:'',
          
      })


       var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", localStorage.getItem('token'));

        var raw = JSON.stringify({"mark":this.state.mark,"model":this.state.model,"dmepc":this.state.dmepc,"registration":this.state.registration,"color":this.state.color,"owner":this.state.idClient});

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("http://localhost:8080/api/client/add-vehicule", requestOptions)
        .then(response => response.json())
        .then(result =>{
            if (result.success === true) {
                this.props.history.push('/clients/vehicules/'+this.state.idClient)
            } else {
                this.setState({
                    errorMSG: result.error
                })
            }
        })
        .catch(error => {
            this.setState({
                errorMSG: 'Network error'
            })
        });

     
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


            <div className="card">
                <div className="card-body">
                    <h3>Add new vehicule</h3>
 

                    <form onSubmit={ (e)=> { e.preventDefault(); this.createVehicule();  } } >
                            <div className="form-group mb-3">
                                <label htmlFor="">Mark</label>
                                <input type="text" className='form-control' value={ this.state.mark } onChange = { (e)=>{ this.setState({ mark: e.target.value }) } } />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="">Model</label>
                                <input type="text" className='form-control' value={ this.state.model } onChange = { (e)=>{ this.setState({ model: e.target.value }) } } />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="">Color</label>
                                <input type="color" className='form-control' value={ this.state.color } onChange = { (e)=>{ this.setState({ color: e.target.value }) } } />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="">Registration plate</label>
                                <input type="text" className='form-control' value={ this.state.registration } onChange = { (e)=>{ this.setState({ registration: e.target.value }) } } />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="">Dmepc</label>
                                <input type="date" className='form-control' value={ this.state.dmepc } onChange = { (e)=>{ this.setState({ dmepc: e.target.value }) } } />
                            </div>
                              

                            <div className="form-group mb-3">
                            <Link  className='btn btn-secondary' style={ { marginRight: 15 } } to={ '/clients/vehicules/'+this.state.idClient } >back to vehicules list</Link> 

                               <button type='submit' className='btn btn-success'>Save</button>
                            </div>


                            {
                                this.state.errMSG !== '' ?
                                <div className='alert alert-danger'>{ this.state.errMSG }</div>
                                :
                                <div></div>
                            }
                             {
                                this.state.succMSG !== '' ?
                                <div className='alert alert-success'>{ this.state.succMSG }</div>
                                :
                                <div></div>
                            }
                

                    </form>


                </div>
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

 
