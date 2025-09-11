const express = require('express');
const cors = require('cors');
const axios = require('axios'); // Usaremos axios para hacer la solicitud a Google Apps Script

const app = express();
const port = process.env.PORT || 3000;

// Middleware para habilitar CORS
app.use(cors());
app.use(express.json());

// Ruta para manejar el formulario de registro
app.post('/submit-form', async (req, res) => {
  try {
    // URL de tu script de Google Apps Script (REEMPLÁZALA CON TU URL REAL)
    const scriptURL = 'REEMPLAZA_CON_LA_URL_DE_TU_SCRIPT_DE_APPS_SCRIPT';
    
    // Obtenemos los datos del cuerpo de la solicitud (enviados por el formulario)
    const formData = req.body;
    
    // Hacemos la solicitud POST al script de Google Apps Script
    const response = await axios.post(scriptURL, formData, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    // Verificamos si la solicitud fue exitosa
    if (response.data && response.data.status === 'success') {
      res.status(200).json({ status: 'success', message: 'Datos enviados a Google Sheets' });
    } else {
      console.error('Error al enviar los datos a Google Sheets:', response.data.message);
      res.status(500).json({ status: 'error', message: 'Error en el script de Google' });
    }
  } catch (error) {
    console.error('Error en el servidor al procesar la solicitud:', error.message);
    res.status(500).json({ status: 'error', message: 'Error de conexión con Google' });
  }
});

app.get('/', (req, res) => {
  res.send('Servidor del formulario en ejecución.');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
