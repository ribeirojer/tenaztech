import logger from '../logger';
require('dotenv').config()

const ceptCertoApiKey = process.env.CEP_CERT_KEY || 'sua-chave';

export const trackOrder = async (trackingCode: string) => {
  try {
    const response = await fetch(`https://www.cepcerto.com/ws/encomenda-json-completo/${trackingCode}/${ceptCertoApiKey}`);
    const data = await response.json()

    if (data.error) {
      throw new Error(data.error);
    }

    return data;
  } catch (error: any) {
    logger.error(`Failed to track order: ${error.message}`);
    throw new Error('Failed to track order');
  }
};
