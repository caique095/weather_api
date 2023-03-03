// React
import { useState, useEffect } from 'react';

// Axios
import axios from 'axios';

// CSS
import './App.css';

//AOS
import Aos from "aos";
import "aos/dist/aos.css";

// Component
import Loader from './Loader/Loader';

function App() {
  const [city, setCity] = useState('');
  const [weatherForecast, setWeatherForecast] = useState(null)
  const [isLoading, setIsLoading] = useState(false);
  const [erro, setErro] = useState(null)

  useEffect(() => {
    Aos.init({ duration: 1000 });
}, []);


  const handleChange = (e) => {
    setCity(e.target.value)
  }

  const handleSearch = () => {
    setIsLoading(true)
    axios.get(`https://api.weatherapi.com/v1/current.json?key=99cf1786d28a411e902163354230103&q=${city}&lang=pt`)
    .then(resposta => {
    setWeatherForecast(resposta.data)
    
    console.log(resposta.data)
    setIsLoading(false)
  })
    .catch(erro => {
      console.log(erro)
      alert('Desculpe, houve algum problema.')
      setIsLoading(false)
    })
  }



  return (
    <main className='main'>
      <article>
        <h1 className='main-title' data-aos="zoom-in">
          Weather <span className="main-title_span">Forecast</span><span className="main-title_span-dot">.</span>
        </h1>
        <p className="main-text" data-aos="fade-up">
          Não deixe o tempo te pegar desprevenido!
        </p>

      </article>

      <article>

      <div class="search">
        <input 
          type="text" 
          className="search__input" 
          placeholder="Pesquise a cidade" 
          onChange={handleChange}
          value={city}  
          data-aos="fade-up"
          data-aos-anchor-placement="center-bottom"
          data-aos-duration="1500"
          >   
        </input>

        <button className="search__button" onClick={handleSearch}
                  data-aos="fade-up"
                  data-aos-anchor-placement="center-bottom"
                  data-aos-duration="1500"
        >
          <svg className="search__icon" aria-hidden="true" viewBox="0 0 24 24">
              <g>
                  <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
              </g>
          </svg>
        </button>
      </div>
      </article>

      

      {weatherForecast ? (
         <section className="weatherForecast"  data-aos="fade-up">
           <h1 
             className="temperature-title">
             {weatherForecast.location.name}
             <span className="temperature-span">, {weatherForecast.location.country}</span>
           </h1>
           <div className="temperature">
             <img 
               src={weatherForecast.current.condition.icon}  
               height="70" 
             />
             <h1 className="temperature-txt">{weatherForecast.current.temp_c}ºC</h1>
           </div>
           <div>
             <p>Sensação Térmica de {weatherForecast.current.feelslike_c}ºC</p>
           </div>
           <div>
             <h3>Hoje está: {weatherForecast.current.condition.text} </h3>
           </div>
         </section>
        ) : null}

      {isLoading && <Loader />}

    </main>
  );
}

export default App;

