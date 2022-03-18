const dateFormat = (date) => {
      const month = date.toLocaleString('default', { month: 'long' });
      let formattedDate = `${month} ${date.getDate()}, ${date.getFullYear()} `;
      let formattedTime = `${date.toLocaleTimeString()}`;
      return `${formattedTime} ${formattedDate}`
      
   }
module.exports = {
   dateFormat
}