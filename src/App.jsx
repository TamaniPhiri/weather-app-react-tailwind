import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const APIkey = "db5595bf66ed081a4a8bc0aff8227211";

function App() {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("Zambia");
  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APIkey}`;
    axios.get(url).then((res) => {
      setData(res.data);
    });
  }, [location]);
  console.log(data);

  if (!data) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <div className="w-32 h-32 rounded-full border-8 border-t-teal-600 animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <p>hello</p>
    </>
  );
}

export default App;
