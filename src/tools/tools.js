//Auxiliary functions

export const setSortDates = (arrDateItems) => {
  arrDateItems.sort((a, b) => Date.parse(a['date']) - Date.parse(b['date']));

  return arrDateItems;
};

export const formatDate = itemKey => {
  return itemKey
    .split('T')[0]
    .split('T')[0]
    .split('-')
    .reverse()
    .join('/');
};

//PARA OBTENER EL FORMATO DE DÍA ESPECÍFICO    **** PARA USAR EN ELEMENTO DONDE SE MOSTRARÁ LA HORA *****
export const setFormatHour = (itemKey) => {
  return itemKey.split('T')[1].substring(0, 5);
}

//OBTENEMOS LA FECHA EN FORMATO DESADO    **** PARA USAR EN ELEMENTO DONDE SE MOSTRARÁ LA FECHA *****
export const dayWeek = isoDate => {

  let days = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sábado"];
  let months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  let takeDate = formatDate(isoDate);
  let date = new Date(takeDate);

  let dateNum = date.getDate();
  let month_name = date.getMonth();

  return days[date.getDay()] + " " + dateNum + " de " + months[month_name];

};

//--------------------------------- PREPARE DYNAMICVTITLES AND DYNAMIC DATA --------------------------------

export const setDataTitle = data => {
  let titles = [];

  for (let i = 0; i < Object.keys(data).length; i++) {
    let titleObject = new Object();

    titleObject.title = dayWeek(Object.keys(data)[i]);
    titleObject.data = data[Object.keys(data)[i]];

    titles.push(titleObject);

  }
  return titles;
};

//-------------------------------------------------- PRINCIPAL ----------------------------------------------

export const prepareData = data => {

  //SEPARAMOS HORA DE DATE Y CREAMOS CAMPO NUEVO PARA USAR COMO KEY PARA AGRUPAR FECHAS
  data.map(item => {
    if (item.date) {
      item.fecha = item.date.split('T')[0].split("-").reverse().join("-");
    }
  });

  const newData = data.reduce((arr, itemArray) => {

    //AGRUPAMOS POR FECHA
    (itemArray.fecha in arr) ? arr[itemArray.fecha].push(itemArray) : arr[itemArray.fecha] = [itemArray];
    return arr;

  }, {});

  return newData;
}
