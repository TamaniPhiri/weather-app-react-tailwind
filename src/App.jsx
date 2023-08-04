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
import IconBxWater from "./assets/icons/Water";
import IconWind from "./assets/icons/Wind";
import { motion, AnimatePresence } from "framer-motion";

const APIkey = "db5595bf66ed081a4a8bc0aff8227211";

function App() {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("Lusaka");
  const [inputValue, setInputValue] = useState("");
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    try {
      if (inputValue === "") {
        setAnimate(true);
        setTimeout(() => {
          setAnimate(false);
        }, 500);
      }
      if (inputValue !== "") {
        setLocation(inputValue);
      }
      const input = document.querySelector("input");
      input.value = "";
      e.preventDefault();
    } catch (error) {
      setErrorMsg("Something went wrong..");
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      setLoading(true);
      setErrorMsg("");
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`;
      axios
        .get(url)
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
          setErrorMsg(err.response.data.message);
          setTimeout(() => {
            setErrorMsg("");
          }, 3000);
        });
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setErrorMsg("Something went wrong");
    }
  }, [location]);

  if (!data) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <div className="w-32 h-32 rounded-full border-8 border-t-[#a75837] animate-spin"></div>
      </div>
    );
  }

  let icon;

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
    <div className="w-full px-4 py-20 relative lg:px-0 transition-all transform bg-cover bg-no-repeat min-h-screen bg-center flex flex-col items-center justify-center">
      <AnimatePresence>
        {errorMsg ? (
          <motion.div
            initial={{ opacity: 0, translateY: -30 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: -30 }}
            transition={{ duration: 0.2 }}
            className="fixed z-50 top-0 w-full items-center text-black"
          >
            <div className="flex capitalize w-full items-center rounded py-4 justify-center">
              <span className="max-w-mg rounded-md text-red-500 font-bold shadow bg-white/70 backdrop-blur-sm p-4">
                {errorMsg}!
              </span>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      {/* Form */}
      <form
        action=""
        className={`${
          animate ? " animate-shake" : ""
        } w-full mb-4 relative flex max-w-md`}
      >
        <div className="rounded-full text-white w-full bg-black/20 backdrop-blur-sm overflow-hidden border border-black/25 flex items-center">
          <input
            type="text"
            onChange={(e) => handleInput(e)}
            placeholder="Search by city or country"
            className="w-full h-full text-lg bg-transparent pl-4 my-3 focus:outline-none"
          />
          <button
            onClick={(e) => handleSubmit(e)}
            className="py-2 px-4 bg-[#f4966d] hover:bg-[#fe814b] text-black/70 group mr-2 rounded-full transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 group-hover:scale-105 group-hover:rotate-12 transition-all duration-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </div>
      </form>
      {/* Card */}
      <div className="w-full relative max-w-md min-h-[580px] transition-all text-white bg-black/20 py-12 px-6 rounded-3xl backdrop-blur-sm">
        {loading ? (
          <div className="flex h-[400px] flex-1 w-full items-center justify-center">
            <div className="w-32 h-32 rounded-full transition-all border-8 border-t-[#a75837] animate-spin"></div>
          </div>
        ) : (
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
            <div className="my-12">
              <div className="flex justify-center items-center">
                <div
                  className={`text-[144px] bg-clip-text bg-gradient-to-tr text-white ${
                    data.main.temp <= 20
                      ? "from-white to-blue-300 text-transparent"
                      : data.main.temp >= 35
                      ? "from-white to-orange-500 text-transparent"
                      : data.main.temp <= 10
                      ? "from-white to-blue-500 text-transparent"
                      : data.main.temp >= 30
                      ? "from-white to-orange-300 text-transparent"
                      : ""
                  } leading-none font-light`}
                >
                  {parseInt(data.main.temp)}
                </div>
                <div className="md:text-5xl text-4xl ml-2">
                  <IconTemperatureCelsius />
                </div>
              </div>
              <div className="capitalize mt-3 font-semibold text-center">
                {data.weather[0].description}
              </div>
            </div>
            <div>
              <div className="flex md:flex-row flex-col gap-4 w-full justify-between">
                <div className="flex md:w-1/2 items-center gap-3">
                  <div className="text-[20px]">
                    <IconEye />
                  </div>
                  <div>
                    Visibility{" "}
                    <span className="ml-3">{data.visibility / 1000} km</span>
                  </div>
                </div>
                <div className="flex md:w-1/2 items-center gap-3">
                  <div className="text-[20px]">
                    <IconThermometerHalf />
                  </div>
                  <div className="flex items-center">
                    Feels like{" "}
                    <span className="ml-3 mr-1">
                      {parseInt(data.main.feels_like)}
                    </span>
                    <IconTemperatureCelsius className="text-lg" />
                  </div>
                </div>
              </div>
              <div className="flex md:flex-row mt-4 flex-col gap-4 w-full justify-between">
                <div className="flex md:w-1/2 items-center gap-3">
                  <div className="text-[20px]">
                    <IconBxWater />
                  </div>
                  <div>
                    Humidity{" "}
                    <span className="ml-3">{data.main.humidity} %</span>
                  </div>
                </div>
                <div className="flex md:w-1/2 items-center gap-3">
                  <div className="text-[20px]">
                    <IconWind />
                  </div>
                  <div className="flex items-center">
                    Wind <span className="ml-3">{data.wind.speed} m/s</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
