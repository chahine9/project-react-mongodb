import React from 'react';
import AsideMenu from '../components/AsideMenu';
import Footer from '../components/footer';
import HedaerBloc from '../components/Header';

export default class AddNewClient extends React.Component {


  constructor(props){
    super(props);
    this.state = {
        firstname:'',
        lastname:'',
        email:'',
        phone:'',
        cin:'',
        address:'',

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


  createUser(){
      // CALL API 
    
      this.setState({
        errMSG:'',
        succMSG:'',
          
      })
      var myHeaders = new Headers();
        myHeaders.append("Authorization", localStorage.getItem('token') );
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({"firstname":this.state.firstname,"lastname":this.state.lastname,"email":this.state.email,"phone":this.state.phone,"address":this.state.address,"cin":this.state.cin});

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("http://localhost:8080/api/clients/add", requestOptions)
        .then(response => response.json())
        .then(result =>{
            if (result.success === true) {
                 this.setState({
                     succMSG: result.message
                 })

                 setTimeout(() => {
                     this.props.history.push('/clients');
                 }, 2000);
            } else {
                this.setState({
                    errMSG: result.message
                })
            }
        })
        .catch(error => {
            this.setState({
                errMSG: 'Network error.'
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
                    <h3>Add new client</h3>


                    <form onSubmit={ (e)=> { e.preventDefault(); this.createUser();  } } >
                            <div className="form-group mb-3">
                                <label htmlFor="">First name</label>
                                <input type="text" className='form-control' value={ this.state.firstname } onChange = { (e)=>{ this.setState({ firstname: e.target.value }) } } />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="">last name</label>
                                <input type="text" className='form-control' value={ this.state.lastname } onChange = { (e)=>{ this.setState({ lastname: e.target.value }) } } />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="">Email</label>
                                <input type="text" className='form-control' value={ this.state.email } onChange = { (e)=>{ this.setState({ email: e.target.value }) } } />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="">Phone</label>
                                <input type="text" className='form-control' value={ this.state.phone } onChange = { (e)=>{ this.setState({ phone: e.target.value }) } } />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="">CIN</label>
                                <input type="text" className='form-control' value={ this.state.cin } onChange = { (e)=>{ this.setState({ cin: e.target.value }) } } />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="">Address</label>
                                <input type="text" className='form-control' value={ this.state.address } onChange = { (e)=>{ this.setState({ address: e.target.value }) } } />
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

 
