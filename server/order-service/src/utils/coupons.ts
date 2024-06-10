export const generateCouponCode = (): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; // Caracteres permitidos para o código do cupom
    const codeLength = 8; // Comprimento do código do cupom
  
    let couponCode = '';
  
    for (let i = 0; i < codeLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      couponCode += characters.charAt(randomIndex);
    }
  
    return couponCode;
  }


// Função auxiliar para gerar a data de expiração do cupom
export const getExpirationDate = (days: number = 30): Date => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + days);
  return expirationDate;
};