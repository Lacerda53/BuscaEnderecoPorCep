import React, { useState } from 'react';
import { Cep } from './Models/Cep.model';
import InputMask from 'react-input-mask';

const App: React.FC = () => {
  const [result, setResult] = useState<Cep>();
  const [query, setQuery] = useState("");
  const [erro, seterro] = useState("");

  function loadCep() {
    if (query != "") {
      fetch(`https://viacep.com.br/ws/${query}/json`).then(response => response.json()).then(data => {
        const resu: Cep = { logradouro: data.logradouro, localidade: data.localidade, uf: data.uf }
        setResult(resu);
        seterro("");
      }).catch(function (error) { seterro("Cep errado") })
    }
    else {
      seterro("O campo deve ser preenchido com o endereço");
    }
  }
  return (
    <div>
      <div style={{ alignItems: "center", padding: "15px", width: "100%", textAlign: "center", backgroundImage: "linear-gradient(to right, #FF512F 0%, #F09819  51%, #FF512F  100%)", height: "100px" }}>
        <h1 style={{ fontSize: "45px", fontWeight: "bold", fontFamily: "Arial", color: "white" }}>Buscar Endereço via CEP</h1>
      </div>
      <br />
      <br />
      <br />
      <div style={{ display: "flex", flexDirection: "column", width: "40%", margin: "auto" }}>
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <InputMask mask="99999-999" style={{ width: "350px", height: "50px", paddingLeft: "10px", fontSize: "17px", borderRadius: "10px", border: "1px solid #757575" }} placeholder="Insira o cep" value={query} onChange={(e) => setQuery(e.currentTarget.value)} />
          <button style={{ cursor: "pointer", margin: "10px", textTransform: "uppercase", backgroundSize: "200% auto", boxShadow: "0 0 20px #eee", padding: "15px 45px", borderColor: "transparent", backgroundImage: "linear-gradient(to right, #FF512F 0%, #F09819  51%, #FF512F  100%)", color: "white", borderRadius: "10px" }} onClick={loadCep}>Buscar</button>
        </div>
        <br />
        <div style={{color: "#757575", fontSize: "27px", fontWeight:"bold"}}>
          {result?.logradouro}
          <br/>
          {result?.localidade}
          <br/>
          {result?.uf}
        </div>
        {erro !== "" ? <span style={{ color: "red" }}>{erro}</span> : null}
      </div>
    </div>
  );
}

export default App;