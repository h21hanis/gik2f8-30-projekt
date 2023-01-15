list.Anställd.addEventListener('keyup', (e) => validateField(e.target));
list.Anställd.addEventListener('blur', (e) => validateField(e.target));

list.Personnummer.addEventListener('input', (e) => validateField(e.target));
list.Personnummer.addEventListener('blur', (e) => validateField(e.target));

list.Telefonnummer.addEventListener('input', (e) => validateField(e.target));
list.Telefonnummer.addEventListener('blur', (e) => validateField(e.target));

list.addEventListener('submit', onSubmit);
const packingListElement = document.getElementById('packingList');

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
        validationMessage = "Fältet 'Namn' måste innehålla minst 2 tecken.";
      } else if (value.length > 100) {
        AnställdValid = false;
        validationMessage =
          "Fältet 'Namn' får inte innehålla mer än 100 tecken.";
      } else {
        AnställdValid = true;
      }
      break;
    }
    case 'Personnummer': {
      if (value.length > 12) {
        PersonnummerValid = false;
        validationMessage = "'personnummer' måste innehålla 12 tecken till exemple 20010521XXXX.";
      } else {
        PersonnummerValid = true;
      }
      break;
    }
    case 'Telefonnummer': {
      if (value.length < 2) {
        TelefonnummerValid = false;
        validationMessage = "Fältet 'Telefonnummer' måste innehålla minst 2 tecken.";
      } else if (value.length > 20) {
        TelefonnummerValid = false;
        validationMessage =
          "Fältet 'Telefonnummer' får inte innehålla mer än 20 tecken.";
      } else {
        TelefonnummerValid = true;
      }
      break;
    }
  }
  
  field.previousElementSibling.innerText = validationMessage;
  field.previousElementSibling.classList.remove('hidden');
}



function onSubmit(e) {
  e.preventDefault();

  if (AnställdValid && PersonnummerValid && TelefonnummerValid) {
    console.log('Submit');
    saveAnställd();
  }
}


function saveAnställd() {
  const Anställd = {
    Anställd: list.Anställd.value,
    Personnummer: list.Personnummer.value,
    Telefonnummer: list.v.value,
  };
   
api.create(Anställd).then((Anställd) => {
  
  if (Anställd) {
      renderList();
    }
  });

  list.Anställd.value="" ;
  list.Personnummer.value="" ;
  list.Telefonnummer.value="";
}

function renderList() {
  console.log('rendering');
  api.getAll().then((Anställd) => {
    packingListElement.innerHTML = '';

    if (Anställd && Anställd.length > 0) {
      Anställd.forEach((Anställd) => {
        packingListElement.insertAdjacentHTML('beforeend', renderAnställd(Anställd));
      });
    }
  });
}


function renderAnställd({ id, Anställd, Personnummer, Telefonnummer}) {
let html = `
<li class="flex select-none mt-2 pt-4 border-b bg-white/90 rounded-lg">
  <div class="flex justify-between w-5/6">
    <p class="mb-6 ml-8 mr-30 w-1/3">${Anställd}</p><p class=" mb-6 ml-8 w-1/3">${Personnummer}</p> <p class="mb-6 ml-8 w-1/3">${Telefonnummer}</p>
  </div>
  <div>
  <button onclick="deleteAnställd(${id})" class="inline-block ml-10 rounded-md bg-yellow-500 hover:bg-yellow-400 px-4 py-1">Ta bort</button>
</div>`;
return html;
}


function deleteAnställd(id) {
  api.remove(id).then(() => {
    renderList();
  });
}


renderList();