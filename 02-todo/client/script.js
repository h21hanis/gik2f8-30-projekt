lista.Anställd.addEventListener('keyup', (e) => validateField(e.target));
lista.Anställd.addEventListener('blur', (e) => validateField(e.target));
lista.Personnummer.addEventListener('input', (e) => validateField(e.target));
lista.Personnummer.addEventListener('blur', (e) => validateField(e.target));
lista.Telefonnummer.addEventListener('input', (e) => validateField(e.target));
lista.Telefonnummer.addEventListener('blur', (e) => validateField(e.target));

lista.addEventListener('submit', onSubmit);
const the_listElement = document.getElementById('the_list');

let AnställdValid = true;
let PersonnummerValid = true;
let TelefonnummerValid = true;


const api = new Api('http://localhost:5000/tasks');

function validateField(field) {
  const { name, value } = field;
  let = validationMessage = '';
  switch (name) {
    case 'Anställd': {
      if (value.length < 2) {
        AnställdValid = false;
        validationMessage = "'Namn och afternamn' måste innehålla minst 2 tecken.";
      } else if (value.length > 100) {
        AnställdValid = false;
        validationMessage =
          "Fältet 'Namn och efternamn' får inte innehålla mer än 100 tecken.";
      } else {
        AnställdValid = true;
      }
      break;
    }
    case 'Personnummer': {
      if (value.length < 12) {
        PersonnummerValid = false;
        validationMessage = "'personnumemer' måste innehålla 12 tecken.";
      } else {
        PersonnummerValid = true;
      }
      break;
    }
    case 'Telefonnummer': {
      if (value.length < 10) {
        TelefonnummerValid = false;
        validationMessage = "'Telefonnummer' måste innehålla minst 10 tecken.";
      } else if (value.length > 20) {
        TelefonnummerValid = false;
        validationMessage =
          "'Telefonnummer' får inte innehålla mer än 20 tecken.";
      } else {
        TelefonnummerValid = true;
      }
      break;
    }
  }
  
  field.previousElementSibling.innerText = validationMessage;field.previousElementSibling.classList.remove('hidden');
}



function onSubmit(e) {
  e.preventDefault();

  if (AnställdValid && PersonnummerValid && TelefonnummerValid) {
    console.log('Submit');
    saveAnställd();
  }
}


function saveAnställd() {
  const Anställd = {Anställd: lista.Anställd.value,Personnummer: lista.Personnummer.value,Telefonnummer: lista.Telefonnummer.value,
  };
   
api.create(Anställd).then((Anställd) => {
  
  if (Anställd) {
      renderList();
    }
  });

  lista.Anställd.value="" ;lista.Personnummer.value="" ;lista.Personnummer.value="";
}

function renderList() {
  console.log('rendering');
  api.getAll().then((Anställds) => {
    the_listElement.innerHTML = '';

    if (Anställds && Anställds.length > 0) {
      Anställds.forEach((Anställd) => {
        the_listElement.insertAdjacentHTML('beforeend', renderAnställd(Anställd));
      });
    }
  });
}

function deleteAnställd(id) {
  api.remove(id).then(() => {
    renderList();
  });
}

renderList();

function renderAnställd({ id, Anställd, Personnummer, Telefonnummer}) {
  let html = `
  <section class="flex gap-10 xl:w-4/5 h-1/5  xl:mx-auto bg-white/50 p-5 rounded-lg">
    <li class="mx-2"><b>ID</b><br> ${id}</li>
    <li class="mx-2"><b>Namn</b><br> ${Anställd}</li>
    <li class="mx-2"><b>personnumer</b><br> ${Personnummer}</li>
    <li class="mx-2"><b>telefonnummer</b><br> ${Telefonnummer}</li>
    </div>
    <div>
    <button onclick="deleteAnställd(${id})" class="bg-yellow-500 hover:bg-yellow-400 px-4">Ta bort</button>
  </div></section>`
  ;
  return html;
  }