let llistatCicles = [];

//CLASE CICLE
class Cicle {
  constructor() {
    this.numEdicions = 0;
    this.lastEditedDate = null;
    this.moduls = []; // Afegit
  }

  setNumEdicions() {
    this.numEdicions++;
    this.lastEditedDate = new Date();
  }

  toString() {
    const sortedModuls = this.moduls.sort((a, b) => a.number - b.number);
    const modulsString = sortedModuls
      .map((modul) => `\n  ${modul.number}. ${modul.name}`)
      .join("");

    return `Cicle - Edicions: ${this.numEdicions}, Última Edició: ${this.lastEditedDate}, Mòduls: ${modulsString}`;
  }

  addModul(modul) {
    this.moduls.push(modul);
  }

  calculateTotalHours() {
    let totalHours = 0;
    this.moduls.forEach((modul) => {
      totalHours += parseInt(modul.hours);
    });
    return totalHours;
  }
}

//CLASE MODUL
class Modul {
  constructor(num, nom, hores) {
    this.number = num;
    this.name = nom;
    this.hours = hores;
  }

  toString() {
    return `MP${this.num}. ${this.nom} (${this.hores}h)`;
  }
}

function editCicle(i) {
  // Recupera el id del círculo en la posición 'i'
  let idCicle = llistatCicles[i].id;

  // Actualiza los campos con los datos del círculo editado
  document.getElementById("cicle_nom").value = llistatCicles[i].nom;
  document.getElementById("cicle_categoria").value = llistatCicles[i].categoria;
  document.getElementById("cicle_alumnes").value = llistatCicles[i].numAlumnes;
  document.getElementById("cicle_abr").value = llistatCicles[i].abreviatura;

  // Actualiza el id del círculo que se está editando
  document.getElementById("editCicle").value = idCicle;
}

function afegirCicle() {
  let nom = document.getElementById("cicle_nom").value;
  let categoria = document.getElementById("cicle_categoria").value;
  let numAlumnes = document.getElementById("cicle_alumnes").value;
  let abreviatura = document.getElementById("cicle_abr").value;

  let idCicle = document.getElementById("editCicle").value;

  // Verifica si ya existe un círculo con el mismo id
  let existingCicle = llistatCicles.find((c) => c.id === idCicle);

  if (existingCicle) {
    // Si ya existe, actualiza los datos del círculo existente
    existingCicle.nom = nom;
    existingCicle.categoria = categoria;
    existingCicle.numAlumnes = numAlumnes;
    existingCicle.abreviatura = abreviatura;
  } else {
    // Si no existe, crea un nuevo círculo con un id único
    let cicle = new Cicle();
    cicle.id = generateUniqueId();
    cicle.nom = nom;
    cicle.categoria = categoria;
    cicle.numAlumnes = numAlumnes;
    cicle.abreviatura = abreviatura;
    llistatCicles.push(cicle);
  }

  // Actualitzem el selector
  actualitzarSelector();

  // Printem la llista
  printLlistat(llistatCicles);

  // Netegem els formularis
  netejarFormularis();

  document.getElementById("editCicle").value = -1;
}

// Función para generar un id único (puedes adaptarla según tus necesidades)
function generateUniqueId() {
  return "_" + Math.random().toString(36).substr(2, 9);
}

// Función para generar un id único (puedes adaptarla según tus necesidades)
function generateUniqueId() {
  return "_" + Math.random().toString(36).substr(2, 9);
}

function afegirModul() {
  let cicleIndex = document.getElementById("modul_cicle").value;
  let modul_nom = document.getElementById("modul_nom").value;
  let modul_num = document.getElementById("modul_num").value;
  let modul_hores = document.getElementById("modul_hores").value;

  if (cicleIndex !== "-1" && llistatCicles[cicleIndex] instanceof Cicle) {
    let modul = new Modul(modul_num, modul_nom, modul_hores);
    llistatCicles[cicleIndex].addModul(modul);

    // Printar la llista actualizada
    printLlistat(llistatCicles);

    // Netejar els formularis
    netejarFormularis();
  } else {
    alert("Selecciona un cicle abans d'afegir un mòdul.");
  }
}

//Funció per llistar els cicles
function printLlistat(llistat) {
  let str = "";
  llistat.forEach(function (element, index) {
    str += `<div class="block p-6 mb-3 w-full bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">${element.abreviatura.toUpperCase()}. ${
      element.nom
    }</h5>
                    <h6 class="text-gray-700">${element.categoria}</h6>
                    <p class="font-normal text-gray-700">Num d'alumnes: ${
                      element.numAlumnes
                    }</p>

                    <button type="button" onClick="removeCicle(${index})" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Eliminar</button>
                    <button type="button" onClick="editCicle(${index})" class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Editar</button>
                    <button type="button" onClick="calculHores(${index})" class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Càlcul hores</button>


                </div>`;
  });

  document.getElementById("llistat").innerHTML = str;
}

//Funció per actualitzar el selector de cicles cada vegada que afegim un cicle
function actualitzarSelector() {
  let select = document.getElementById("modul_cicle");
  select.innerHTML = "";
  llistatCicles.forEach(function (element, index) {
    let opt = document.createElement("option");
    opt.value = index;
    opt.text = element.nom;
    select.appendChild(opt);
  });
}

//Funció per eliminar un cicle
function removeCicle(i) {
  // Elimina el círculo en la posición 'i'
  llistatCicles.splice(i, 1);

  // Printa la lista actualizada
  printLlistat(llistatCicles);

  // Netejar els formularis
  netejarFormularis();
}

//Funció per netejar els formularis
function netejarFormularis() {
  var inputs = document.getElementsByTagName("input");
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }

  var selects = document.getElementsByTagName("select");
  for (let i = 0; i < selects.length; i++) {
    selects[i].value = 0;
  }
}

function calculHores(i) {
  // Calcula las horas totales del círculo en la posición 'i'
  let totalHores = llistatCicles[i].calculateTotalHours();

  // Muestra un alert con las horas del círculo
  alert(`Hores totals del cicle: ${totalHores}`);
}
