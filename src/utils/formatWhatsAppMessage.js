import { COMPANY_INFO } from '../config/constants';
import { formatCurrency } from './formatCurrency';

/**
 * Genera el enlace de WhatsApp pre-llenado con el desglose del pedido de la tienda web.
 */
export function formatWhatsAppMessage(cartItems, customerInfo = {}, cartTotal = 0) {
  let message = `¡Hola *${COMPANY_INFO.name}*! 🛒\n`;
  message += `Deseo realizar el siguiente pedido desde su tienda web:\n\n`;
  message += `📋 *DETALLE DEL PEDIDO:*\n`;

  cartItems.forEach((item, index) => {
    const itemSubtotal = item.price * item.quantity;
    message += `${index + 1}. *${item.name}* (${item.quantity} ${item.unit || 'und'})\n`;
    message += `   Subtotal: ${formatCurrency(itemSubtotal)}\n`;
  });

  message += `\n💰 *TOTAL A PAGAR:* *${formatCurrency(cartTotal)}*\n\n`;

  if (customerInfo.name) {
    message += `👤 *DATOS DEL CLIENTE:*\n`;
    message += `- Nombre: ${customerInfo.name}\n`;
    if (customerInfo.phone) message += `- Teléfono: ${customerInfo.phone}\n`;
    if (customerInfo.address) message += `- Dirección (Barinas): ${customerInfo.address}\n`;
    if (customerInfo.paymentMethod) message += `- Método de Pago: ${customerInfo.paymentMethod}\n`;
    if (customerInfo.notes) message += `- Notas: ${customerInfo.notes}\n`;
  }

  message += `\n¡Quedo a la espera de su respuesta para completar la entrega! 🚚`;

  const encodedMessage = encodeURIComponent(message);
  const cleanNumber = COMPANY_INFO.whatsappNumber.replace(/[^0-9]/g, '');
  
  return `https://api.whatsapp.com/send?phone=${cleanNumber}&text=${encodedMessage}`;
}
