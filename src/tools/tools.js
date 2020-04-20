//Auxiliary functions

export const ordena = (listado) => {

  listado.sort((a, b) => Date.parse(a['date']) - Date.parse(b['date']));

  return listado;
};

//PARA OBTENER EL FORMATO DE DÍA ESPECÍFICO    **** PARA USAR EN ELEMENTO DONDE SE MOSTRARÁ LA HORA *****
export const formatoHora = (itemKey) => {
  return itemKey.split('T')[1].substring(0, 5);
}

//OBTENEMOS LA FECHA EN FORMATO DESADO    **** PARA USAR EN ELEMENTO DONDE SE MOSTRARÁ LA FECHA *****
export const diaSemana = (titleFecha) => {

  let dias = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sábado"];
  let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  let fecha = titleFecha.split('T')[0].split('T')[0].split("-").reverse().join("/");
  let date = new Date(fecha);

  let fechaNum = date.getDate();
  let mes_name = date.getMonth();

  return dias[date.getDay()] + " " + fechaNum + " de " + meses[mes_name];

};

//--------------------------------- PREPARE DYNAMICVTITLES AND DYNAMIC DATA --------------------------------

export const setDatos = (data) => {
  let titles = [];
  for (let i = 0; i < Object.keys(data).length; i++) {
    let miObjeto = new Object();

    miObjeto.title = diaSemana(Object.keys(data)[i]);
    miObjeto.data = data[Object.keys(data)[i]];

    titles.push(miObjeto);

  }
  return titles;
};

//-------------------------------------------------- PRINCIPAL ----------------------------------------------

export const preparaDatos = (lista) => {

  // CLONAMOS EL ARRAY DE OBJETOS CON LOS DATOS    **** TRABAJAMOS CON ARRAY CLONADO PARA NO ALTERAR DATOS Y PODER RECURRIR A ELLOS DE NUEVO SIN NINGUNA LLAMADA AL SERVIDOR *****
  let objectClon = JSON.parse(JSON.stringify(lista));

  //SEPARAMOS HORA DE DATE Y CREAMOS CAMPO NUEVO PARA USAR COMO KEY PARA AGRUPAR FECHAS
  objectClon.map(item => {
    if (item.date) {
      item.fecha = item.date.split('T')[0].split("-").reverse().join("-");
    }
  });

  //ORDENAR POR DÍA Y FECHA
  ordena(objectClon);

  const newData = objectClon.reduce((arr, itemArray) => {

    //AGRUPAMOS POR FECHA
    (itemArray.fecha in arr) ? arr[itemArray.fecha].push(itemArray) : arr[itemArray.fecha] = [itemArray];
    return arr;

  }, {});

  return newData;
}
