import React from "react";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { nom: "", titre: "", listbook: [] };
    this.handeladdname = this.handeladdname.bind(this);
    this.handeladdtitla = this.handeladdtitla.bind(this);
    this.handelsubmit = this.handelsubmit.bind(this);
    this.handelremovebiik = this.handelremovebiik.bind(this);
  }

  handeladdname(e) {
    this.setState({ nom: e.target.value });
  }
  handeladdtitla(e) {
    this.setState({ titre: e.target.value });
  }
  handelsubmit(e) {
    e.preventDefault();
    const { nom, titre } = this.state;
    const id=Date.now();
    this.setState((prevState) => ({
      listbook: [...prevState.listbook, {id, nom, titre }],
      nom: "",
      titre: "",
    }));
  }
  handelremovebiik(id) {
    const ListeNouve = this.state.listbook.filter(book => book.id !== id);
    // console.log(ListeNouve);
    this.setState({ listbook: ListeNouve });
 }

  render() {
    return (
      <>
        <h1 className="bg-success p-3 text-center mb-3">
          {" "}
          The Liste Of TOP book{" "}
        </h1>
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

        {/* ============== affichage ================ */}

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
            this.state.listbook.length? this.state.listbook.map((info,key)=>{
                const {nom,titre,id} = info;
                return(                
                    <tr>
                    <td className="text-center">{nom}</td>
                    <td className="text-center">{titre}</td>
                    <td className="text-center">
                    <button className="btn btn-warning me-3" >Update</button>
                    <button className="btn btn-danger" onClick={()=>this.handelremovebiik(id)}>Remove</button>
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
    );
  }
}

