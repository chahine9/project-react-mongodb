import React from 'react';
import { Link } from 'react-router-dom';
import AsideMenu from '../components/AsideMenu';
import Footer from '../components/footer';
import HedaerBloc from '../components/Header';

export default class AddNewInterventionPage extends React.Component {


  constructor(props){
    super(props);
    this.state = {
        vehicule:props.match.params.vehicule,
         
        price: '',
         
        description: '',
        operationID: '',

        operations : [],
        errMSG:'',
        succMSG:'',
        
        
    }
  }

  checkUserAuth(){
    if (localStorage.getItem('token') == null) {
      this.props.history.push('/auth');
    }
  }

  getOperationsList(){
    


    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", localStorage.getItem('token'));
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    fetch("http://localhost:8080/api/operations/list", requestOptions)
      .then(response => response.json())
      .then(result => this.setState({
        operations: result
      }))
      .catch(error => this.setState({
          errorMSG:'Network error'
      }));
  }




  componentDidMount(){
    this.checkUserAuth();


    this.getOperationsList();
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

        var raw = JSON.stringify({"price":this.state.price,"vehicule":this.state.vehicule,"description":this.state.description,"operationID":this.state.operationID});

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("http://localhost:8080/api/client/vehicule/intervention/add", requestOptions)
        .then(response => response.json())
        .then(result =>{
            console.log(result);

            if (result.success === true) {
                this.props.history.push('/clients/vehicules/details/'+this.state.vehicule)
            } else {
                this.setState({
                    errorMSG: result.error
                })
            }

        })
        .catch(error => console.log('error', error));



       

     
    }

  render(){
    return(
      <div className="App">

        <HedaerBloc />


        <AsideMenu />

        { /* End Sidebar*/}

        <main id="main" className="main"> 
             


            <div className="card">
                <div className="card-body">
                    <h3>Add new intervention</h3>
 

                    <form onSubmit={ (e)=> { e.preventDefault(); this.createVehicule();  } } >
                            <div className="form-group mb-3">
                                <label htmlFor="">Price</label>
                                <input type="number" className='form-control' value={ this.state.price } onChange = { (e)=>{ this.setState({ price: e.target.value }) } } />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="">operation</label>
                                <select   className='form-control' value={ this.state.operationID } onChange = { (e)=>{ this.setState({ operationID: e.target.value }) } } >
                                    <option value={ '' }>please choose an operation</option>
                                    {
                                        this.state.operations.map((o)=>{
                                            return (
                                                <option value={ o.code }>{ o.title }</option>
                                            );
                                        })
                                    }
                                </select>
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="">description</label>
                                <textarea   className='form-control' value={ this.state.description } onChange = { (e)=>{ this.setState({ description: e.target.value }) } } ></textarea>
                            </div>
                             

                            <div className="form-group mb-3">
              
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

 
