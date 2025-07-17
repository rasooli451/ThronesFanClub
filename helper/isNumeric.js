



function isNumeric(value) {
  return typeof value === 'number' || 
         (typeof value === 'string' && value.trim() !== '' && !isNaN(value));
}






module.exports = isNumeric;