/**
 * Formatea un número como moneda en Dólares ($ USD)
 * @param {number} amount - Monto numérico
 * @returns {string} Formateado ($0.00)
 */
export function formatCurrency(amount) {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return '$0.00';
  }
  return `$${amount.toFixed(2)}`;
}
