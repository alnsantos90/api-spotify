import React, { useEffect, useState } from 'react';
import { Container, Jumbotron } from 'react-bootstrap';
import axios from 'axios';

import { useClima } from '../../Context/ClimaContext';
import { useLoading } from '../../Context/Caregando';

import Loading from '../../Components/Loading';
import PlayClima from '../PlayClima';

function Clima() {
  const api = '7e52c77f358070811e61a920b4fe80e1';
  const lat = localStorage.getItem('lat');
  const lon = localStorage.getItem('lon');
  const { temperatura, setTemperatura } = useClima();
  const { carregando, setCarregando } = useLoading();

  useEffect(() => {
    setCarregando(true);
    getClima();
  }, []);

  async function getClima() {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api}`,
      );
      const { temp, temp_min, temp_max } = response.data.main;
      const newTemp = temp.toFixed(0);
      const newTempMin = temp_min.toFixed(1);
      const newTempMax = temp_max.toFixed(1);
      await setTemperatura({
        country: response.data.sys.country,
        name: response.data.name,
        temp: newTemp,
        temp_min: newTempMin,
        temp_max: newTempMax,
      });
      setCarregando(false);
    } catch (error) {}
  }

  return (
    <>
      {carregando && <Loading />}
      {!carregando && temperatura.temp && (
        <Jumbotron fluid>
          <Container>
            <Container className="d-flex justify-content-center mt-3">
              <h4>{temperatura.name}</h4>
              <h4 className="ml-2">{temperatura.country}</h4>
            </Container>
            <Container className="d-flex justify-content-center flex-nowrap">
              <h3 className="graus">{temperatura.temp}</h3>
              <h4>O</h4>
            </Container>
            <Container className="d-flex justify-content-between">
              <p>Mín: {temperatura.temp_min}°C</p>
              <p>Máx: {temperatura.temp_max}°C</p>
            </Container>
          </Container>
        </Jumbotron>
      )}
      <PlayClima title="Tocando pelo clima" />
    </>
  );
}

export default Clima;
