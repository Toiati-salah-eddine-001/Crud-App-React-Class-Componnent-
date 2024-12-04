import React from 'react';
import {BrowserRouter , Routes , Route,  Link, useParams} from 'react-router-dom'

export default class App2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listBook: []
        }
        this.addBook = this.addBook.bind(this) 
        this.removebook = this.removebook.bind(this) 
        this.Updatingbookelement = this.Updatingbookelement.bind(this) 
    }

    addBook(data){
        this.setState((prevState)=>({listBook:[...prevState.listBook,data]}));
    }
    removebook(id){
        const booknew = this.state.listBook.filter(book => book.id !== id);
        this.setState({listBook:booknew});
    }

    Updatingbookelement(data){
      this.setState((prevState)=>({listBook:prevState.listBook.map((items)=>{
        if(items.id === data.id){
          return { ...items, nom: data.newname, titre: data.newtitle };;
        }else{
          return items;
        }
      })}))
    }
    render() {
        return(

        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ListBook listBook={this.state.listBook} removebook={this.removebook} />} />
                <Route path="/form" element={<Form addBook={this.addBook}/>} />
                <Route path=":id/update" element={<Uodateelement listBook={this.state.listBook} Updatingbookelement={this.Updatingbookelement} />} />
              
            </Routes>
        </BrowserRouter>
        );
    }
}

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            nom:'',
            titre:''
        }
        this.handeladdname = this.handeladdname.bind(this);
        this.handeladdtitla = this.handeladdtitla.bind(this);
        this.handelsubmit = this.handelsubmit.bind(this);

    }
    handeladdname(e) {
        this.setState({ nom: e.target.value });
      }
      handeladdtitla(e) {
        this.setState({ titre: e.target.value });
      }

      handelsubmit(e) {
        e.preventDefault();
        const { nom, titre}=this.state;
        const id = Date.now();
        const databook ={id,nom, titre};
        this.props.addBook(databook);
        this.setState({nom:'',titre:''});
      }
    render() {
        return (
            <>
            <Link to={'/'} className='btn btn-primry'> Rje3 Rje3 hhhhh </Link>
            <form className="w-75 mx-auto mt-3 " onSubmit={this.handelsubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Name of othore
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={this.state.nom}
              onChange={this.handeladdname}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Title of book
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              value={this.state.titre}
              onChange={this.handeladdtitla}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        </>
        );
    }
}

class ListBook extends React.Component {
    constructor(props){
        super(props);
       this.hndelremover=this.hndelremover.bind(this);
    }

    hndelremover(id){
        this.props.removebook(id);
    }
    render(){
        return(
            <>
            <Link to={'/form'} className='btn btn-primary'> Formi lia hhhhh </Link>
        <table className="table w-75 mx-auto mt-3">
          <thead>
            <tr>
              <th scope="col" className="text-center">Name</th>
              <th scope="col" className="text-center">Title</th>
              <th scope="col" className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
          {
            this.props.listBook.length? this.props.listBook.map((info,key)=>{
                const {nom,titre,id} = info;
                return(                
                    <tr key={key}>
                    <td className="text-center">{nom}</td>
                    <td className="text-center">{titre}</td>
                    <td className="text-center">
                    <Link to={`/${id}/update`} className="btn btn-warning me-3" >Update</Link>
                    <button className="btn btn-danger" onClick={()=>this.hndelremover(id)}>Remove</button>
                    </td>
                    </tr>
            )

            }): 
            <tr>
                <td className="text-center text-dark" colSpan="3">Sat dkhel chi haja 😎 </td>
            </tr>
            
          }
          </tbody>
        </table>
        </>
        )
    }
}

 export const Uodateelement =({listBook,Updatingbookelement})=>{
  const {id}=useParams();
  return <Update id={id} listBook={listBook} Updatingbookelement={Updatingbookelement} />
}

class Update extends React.Component {
    constructor(props) {
        super(props);
        this.state={
          dataaffcies:{},
          newname:'',
          newtitle:'',
        }
        this.handeladdnewname = this.handeladdnewname.bind(this);
        this.handeladdnewtitle = this.handeladdnewtitle.bind(this);
        this.handelsubmit = this.handelsubmit.bind(this);
    }
    
    componentDidMount(){
      const {id,listBook}=this.props;
      const book = listBook.find(((items)=>items.id === Number(id)));
      if(book){

        this.setState({dataaffcies:book,
          newname:book.nom,
          newtitle:book.titre,
        })
      }
      console.log(this.state.dataaffcies)
    }
  
    handeladdnewname(e){
      this.setState({newname:e.target.value});
    }
    handeladdnewtitle(e){
      this.setState({newtitle:e.target.value});
    }

    handelsubmit(e){
      e.preventDefault();
      const {id,Updatingbookelement}=this.props;
      
      const {newname,newtitle}=this.state;
      const nawbook={id:Number(id),newname,newtitle};
      Updatingbookelement(nawbook);
      this.setState({newname:'',newtitle:''});
    }

    render() {
      const {nom,titre} = this.state.dataaffcies;
      const {newname,newtitle} = this.state;
        return (
          <>
          <Link to={'/'}>Home</Link>
          <form className="w-75 mx-auto mt-3 " onSubmit={this.handelsubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Name of othore
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={ newname}
              onChange={this.handeladdnewname}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Title of book
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              value={newtitle }
              onChange={this.handeladdnewtitle}
            />
          </div>
          <button type="submit" className="btn btn-warning">
            Update
          </button>
        </form>
        </>
        );
    }
}
