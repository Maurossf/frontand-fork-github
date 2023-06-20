// import "./styles.css";
import { useState, useEffect } from "react";

export default function ConsultaUsuários() {
  const [data, setData] = useState([]);

  useEffect(() => {
    let url = "";

    const fetchdata = async () => {
      const response = await fetch(url);
      const data = await response.json();
      setData(data);
    };

    setData([]);
  }, []);

  return (
    <div>
      <h1>Consulta Usuários</h1>
      {data.map((element) => {
        return <p>element</p>;
      })}
    </div>
  );
}
