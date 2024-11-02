import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const getSucursales = async () => {
  try {
    const response = await axios.get(`${API_URL}/sucursales`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener las sucursales:', error);
    throw error;
  }
};

export const updateSucursal = async (formData) => {
  try {
    await axios.put('http://localhost:5000/sucursales/' + formData.CODIGO_SUC, formData);
    alert(`Sucursal ubicada en ${formData.DIRECCION} actuzalizada`);
  } catch (error) {
    console.error('Error al agregar la sucursal:', error);

    alert('Hubo un problema al actualizar la sucursal');
  }
};

export const deleteSucursal = async (formData) => {
  try {
    await axios.delete('http://localhost:5000/sucursales/' + formData.CODIGO_SUC);
    alert(`Sucursal ubicada en ${formData.DIRECCION} eliminada`);
  } catch (error) {
    console.error('Error al agregar la sucursal:', error);

    alert('Hubo un problema al eliminar la sucursal');
  }
};

export const createSucursal = async (formData) => {
  try {
    await axios.post('http://localhost:5000/sucursales/', formData);
    alert(`Sucursal ubicada en ${formData.DIRECCION} creada`);
  } catch (error) {
    console.error('Error al agregar la sucursal:', error);

    alert('Hubo un problema al agregar la sucursal');
  }
};

// turistas

export const getTuristas = async () => {
  try {
    const response = await axios.get(`${API_URL}/turistas`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener turistas:', error);
    throw error;
  }
};

export const updateTurista = async (formData) => {
  try {
    await axios.put('http://localhost:5000/turistas/' + formData.CODIGO_TURISTA, formData);
    alert(`Turista ${formData.NOMBRE1} actuzalizado`);
  } catch (error) {
    console.error('Error al actualizar a el turista:', error);

    alert('Hubo un problema al actualizar a el turista');
  }
};

export const deleteTurista = async (formData) => {
  try {
    await axios.delete('http://localhost:5000/turistas/' + formData.CODIGO_TURISTA);
    alert(`Turista  ${formData.NOMBRE1} eliminado`);
  } catch (error) {
    console.error('Error al eliminar a el turista:', error);

    alert('Hubo un problema al eliminar el turista');
  }
};

export const createTurista = async (formData) => {
  try {
    await axios.post('http://localhost:5000/turistas/', formData);
    alert(`Sucursal ubicada en ${formData.NOMBRE1} creada`);
  } catch (error) {
    console.error('Error al crear a el turista:', error);

    alert('Hubo un problema al agregar la turista');
  }
};
// hotels

export const getHoteles = async () => {
  try {
    const response = await axios.get(`${API_URL}/hoteles`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener hoteles:', error);
    throw error;
  }
};

export const updateHotel = async (formData) => {
  try {
    await axios.put('http://localhost:5000/hoteles/' + formData.CODIGO_HOTEL, formData);
    alert(`Hotel ${formData.NOMBRE} actuzalizado`);
  } catch (error) {
    console.error('Error al actualizar a el hotel:', error);

    alert('Hubo un problema al actualizar a el hotel');
  }
};

export const deleteHotel = async (formData) => {
  try {
    await axios.delete('http://localhost:5000/hoteles/' + formData.CODIGO_HOTEL);
    alert(`Hotel  ${formData.NOMBRE} eliminado`);
  } catch (error) {
    console.error('Error al eliminar a el hotel:', error);

    alert('Hubo un problema al eliminar el hotel');
  }
};

export const createHotel = async (formData) => {
  try {
    await axios.post('http://localhost:5000/hoteles/', formData);
    alert(`Hotel ${formData.NOMBRE} creado`);
  } catch (error) {
    console.error('Error al crear a el hotel:', error);

    alert('Hubo un problema al agregar la hotel');
  }
};

// vuelos

export const getVuelos = async () => {
  try {
    const response = await axios.get(`${API_URL}/vuelos`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener vuelos:', error);
    throw error;
  }
};

export const updateVuelo = async (formData) => {
  try {
    await axios.put('http://localhost:5000/vuelos/' + formData.NUM_VUELO, formData);
    alert(`Vuelo de ${formData.ORIGEN} a ${formData.DESTINO} actuzalizado`);
  } catch (error) {
    console.error('Error al actualizar a el vuelo:', error);

    alert('Hubo un problema al actualizar a el vuelo');
  }
};

export const deleteVuelo = async (formData) => {
  try {
    await axios.delete('http://localhost:5000/vuelos/' + formData.NUM_VUELO);
    alert(`Vuelo  de ${formData.ORIGEN} a ${formData.DESTINO} eliminado`);
  } catch (error) {
    console.error('Error al eliminar a el vuelo:', error);

    alert('Hubo un problema al eliminar el vuelo');
  }
};

export const createVuelo = async (formData) => {
  try {
    await axios.post('http://localhost:5000/vuelos/', formData);
    alert(`Vuelo de ${formData.ORIGEN} a ${formData.DESTINO} creado`);
  } catch (error) {
    console.error('Error al crear a el vuelo:', error);

    alert('Hubo un problema al agregar el vuelo');
  }
};

// clases

export const getClases = async () => {
  try {
    const response = await axios.get(`${API_URL}/clases`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener clases:', error);
    throw error;
  }
};

// hospedajes

export const getHospedajes = async () => {
  try {
    const response = await axios.get(`${API_URL}/hospedajes`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener hospedajes:', error);
    throw error;
  }
};

// turista vuelos
export const getTuristaVuelos = async (CODIGO_TURISTA) => {
  try {
    const response = await axios.get(`${API_URL}/turista-vuelo/${CODIGO_TURISTA}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener clases:', error);
    throw error;
  }
};

export const addTuristaVuelos = async (data) => {
  try {
    await axios.post(`${API_URL}/turista-vuelo/`, data);

    alert(`Vuelo agendado`);
  } catch (error) {
    console.error('Error al crear a el vuelo:', error);

    console.error('Error al agendar:', error);
  }
};

export const deleteTuristaVuelos = async ({TURISTA,VUELO}) => {
  try {
    await axios.delete(`${API_URL}/turista-vuelo/${TURISTA}/${VUELO}/`);

    alert(`Vuelo agendado`);
  } catch (error) {
    console.error('Error al crear a el vuelo:', error);

    console.error('Error al agendar:', error);
  }
};


// turista vuelos
export const getTuristaHotels = async (CODIGO_TURISTA) => {
  try {
    const response = await axios.get(`${API_URL}/turista-hotel/${CODIGO_TURISTA}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener clases:', error);
    throw error;
  }
};

export const addTuristaHotels = async (data) => {
  try {
    await axios.post(`${API_URL}/turista-hotel/`, data);

    alert(`Hotel agendado`);
  } catch (error) {
    console.error('Error al crear a el hotel:', error);

    console.error('Error al agendar:', error);
  }
};

export const deleteTuristaHotels = async ({TURISTA,VUELO}) => {
  try {
    await axios.delete(`${API_URL}/turista-hotel/${TURISTA}/${VUELO}/`);

    alert(`Vuelo agendado`);
  } catch (error) {
    console.error('Error al crear a el hotel:', error);

    console.error('Error al agendar:', error);
  }
};
