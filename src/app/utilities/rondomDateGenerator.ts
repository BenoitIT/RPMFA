export function getRandomDate(year:number):Date{
    const month = Math.floor(Math.random() * 12); 
    const day = Math.floor(Math.random() * (new Date(year, month + 1, 0).getDate())) + 1;
    const hours = Math.floor(Math.random() * 24);
    const minutes = Math.floor(Math.random() * 60);
    const seconds = Math.floor(Math.random() * 60);
    const milliseconds = Math.floor(Math.random() * 1000);
    const randomDate = new Date(year, month, day, hours, minutes, seconds, milliseconds);
    return randomDate;
  }
  
  