import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import IconClouds from "./assets/icons/Clouds";
import IconCloudHaze2 from "./assets/icons/Haze";
import IconCloudRain from "./assets/icons/Rain";
import IconSun from "./assets/icons/Clear";
import IconCloudDrizzle from "./assets/icons/Drizzle";
import IconSnow2 from "./assets/icons/Snow";
import IconThunderstormOutline from "./assets/icons/Thunderstorm";

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

  if (!data) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <div className="w-32 h-32 rounded-full border-8 border-t-teal-600 animate-spin"></div>
      </div>
    );
  }

  let icon;
  console.log(data.weather[0].main);

  switch(data.weather[0].main){
    case 'Clouds':
      icon = <IconClouds/>;
      break
    case 'Haze':
      icon =<IconCloudHaze2/>;
      break
    case 'Rain':
      icon=<IconCloudRain/>;
      break
    case 'Clear':
      icon=<IconSun/>;
      break
    case 'Drizzle':
      icon= <IconCloudDrizzle/>;
      break
    case 'Snow':
      icon=<IconSnow2/>
      break
    case 'Thunderstorm':
      icon=<IconThunderstormOutline/>
      break
  }

  return (
    <div className="w-full px-4 lg:px-0 bg-cover bg-no-repeat min-h-screen bg-center flex flex-col items-center justify-center">
      {/* Form */}
      <form action="">form</form>
      {/* Card */}
      <div className="w-full max-w-md bg-black/25 py-12 px-6 rounded-3xl backdrop-blur-sm">
        <div>
          <div>card top</div>
          <div>body</div>
          <div>bottom</div>
        </div>
      </div>
    </div>
  );
}

export default App;
