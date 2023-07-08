import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Memepage = (props) => {
  const {file:MemeId} = useParams();
  const [source, setSource] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/v1/${MemeId}`, {
        responseType: "arraybuffer",
      })
      .then((result) => {  
          setError("");
          const base64 = btoa(
            new Uint8Array(result.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );
          setSource("data:;base64," + base64);
        
      }).catch( err =>{
        setError("Meme is not found") 
      });
  }, []);
  return (
    <div className="d-flex justify-content-center align-items-center" style={{"height":"100vh"}}>
      <img src={source}></img>
      <div style={{"color":"red"}}>{error}</div>
    </div>
  );
};

export default Memepage;
