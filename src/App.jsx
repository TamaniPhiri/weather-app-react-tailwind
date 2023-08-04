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
import IconTemperatureCelsius from "./assets/icons/Temperature";
import IconEye from "./assets/icons/Eye";
import IconThermometerHalf from "./assets/icons/Thermometer";

const APIkey = "db5595bf66ed081a4a8bc0aff8227211";

function App() {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("Zambia");
  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`;
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

  switch (data.weather[0].main) {
    case "Clouds":
      icon = <IconClouds />;
      break;
    case "Haze":
      icon = <IconCloudHaze2 />;
      break;
    case "Rain":
      icon = <IconCloudRain />;
      break;
    case "Clear":
      icon = <IconSun />;
      break;
    case "Drizzle":
      icon = <IconCloudDrizzle />;
      break;
    case "Snow":
      icon = <IconSnow2 />;
      break;
    case "Thunderstorm":
      icon = <IconThunderstormOutline />;
      break;
  }

  const date = new Date();
  return (
    <div className="w-full px-4 lg:px-0 bg-cover bg-no-repeat min-h-screen bg-center flex flex-col items-center justify-center">
      {/* Form */}
      <form action="">form</form>
      {/* Card */}
      <div className="w-full max-w-md text-white bg-black/20 py-12 px-6 rounded-3xl backdrop-blur-sm">
        <div>
          <div className="flex gap-5 items-center">
            <div className="text-[87px]">{icon}</div>
            <div>
              <div className="text-2xl font-semibold">
                {data.name}, {data.sys.country}
              </div>
              <div>
                {date.getUTCDate()}/{date.getUTCMonth() + 1}/
                {date.getUTCFullYear()}
              </div>
            </div>
          </div>
          <div className="my-20">
            <div className="flex justify-center items-center">
              <div className="text-[144px] leading-none font-light">
                {parseInt(data.main.temp)}
              </div>
              <div className="text-4xl">
                <IconTemperatureCelsius />
              </div>
            </div>
            <div className="capitalize text-center">
              {data.weather[0].description}
            </div>
          </div>
          <div>
            <div className="flex w-full justify-between">
              <div className="flex w-1/2 items-center gap-3">
                <div className="text-[20px]">
                  <IconEye />
                </div>
                <div>
                  Visibility{" "}
                  <span className="ml-3">{data.visibility / 1000}km</span>
                </div>
              </div>
              <div className="flex w-1/2 items-center gap-3">
                <div className="text-[20px]">
                  <IconThermometerHalf />
                </div>
                <div>
                  Visibility{" "}
                  <span className="ml-3">{data.visibility / 1000}km</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
