"use strict"

//form validate
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById('form');
  form.addEventListener('submit', formSend);

  async function formSend(e) {

    let error = formValidate(form);

    if (error > 0) {
      e.preventDefault();
    }
  }


  function formValidate(form) {
    let error = 0;
    let formReq = document.querySelectorAll('._req');

    for (let index = 0; index < formReq.length; index++) {
      const input = formReq[index];
      formRemoveError(input);

      if (input.classList.contains('_email')) {
        if (!checkEmail(input)) {
          error++;
          formAddError(input);
        }
      } else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
        error++;
        formAddError(input);
      } else {
        if (input.value === '') {
          error++;
          formAddError(input);
        }
      }
    }
  }

  function formAddError(input) {
    input.parentElement.classList.add('_error');
    input.classList.add('_error');
  }

  function formRemoveError(input) {
    input.parentElement.classList.remove('_error');
    input.classList.remove('_error');
  }

  function checkEmail(input) {
    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

    if (EMAIL_REGEXP.test(input.value) == false) {
      return 0;
    } else {
      return 1;
    }
  }
});


//лимит по длинне
const input = document.querySelector('.input');
const textLimit = input.getAttribute('maxlength');
const textCount = document.getElementById('textCounter');
textCount.innerHTML = `${textLimit} word left`;
input.addEventListener('keydown', keydown);
input.addEventListener('keyup', keyup);
function keydown(event) {
  if (event.repeat) {
    keyup();
  }
}
function keyup() {
  const textKol = textLimit - input.value.length;
  textCount.innerHTML = `${textKol} word left`;
}


const selects = document.querySelectorAll('select');
if (selects.length > 0) {
    for (let index = 0; index < selects.length; index++) {
        const select = selects[index];

        function indexes(select) {
            const arr = [];

            for (let i = 0; i < select.options.length; i++) {
                let e = select.options[i];
                arr.push(e.text);
            }

            return arr;
        }

        //indexes(select);

        const result = indexes(select);
        //console.log(result.length);
        createSelect(result);

        function createSelect(result) {
            let newSelect = document.createElement('div');
            newSelect.classList.add('_select');
            select.insertAdjacentElement('afterend', newSelect);

            let newSelectBody = document.createElement('div');
            newSelectBody.classList.add('_select__body');
            newSelect.insertAdjacentElement('afterbegin', newSelectBody);

            let newSelectSelected = document.createElement('span');
            newSelectSelected.classList.add('_select__selected');
            newSelectSelected.innerHTML = `This week`;
            
            if(select.classList.contains('req')){
                newSelectSelected.classList.add('_req');
            }
            newSelect.insertAdjacentElement('beforeend', newSelectSelected);

            for (let i = 0; i < result.length; i++) {
                let newSelectOption = document.createElement('div');
                newSelectOption.classList.add('_select__option');
                newSelectOption.setAttribute("data-value", result.length - i);
                newSelectOption.innerHTML = `${result[result.length - (i + 1)]}`;
                newSelectBody.insertAdjacentElement('afterbegin', newSelectOption);

                if (newSelectOption.classList.contains('_selected')) {
                    newSelectOption.classList.remove('_selected');
                }

                newSelectOption.addEventListener("click", function (e) {
                    newSelectSelected.innerHTML = `${result[result.length - (i + 1)]}`;
                    newSelectSelected.classList.add('_choosed');
                });
            }

            newSelect.addEventListener("click", function (e) {
                newSelect.classList.toggle('_select_active');
                newSelectBody.classList.toggle('_active');
            });

            return newSelectBody;
        }
    }
}
document.addEventListener("click", function (e) {
    const selects = document.querySelectorAll('._select_active');
    if (selects.length > 0) {
        for (let i = 0; i < selects.length; i++) {
            if (!e.target.closest('._select_active')) {
                const select = selects[i];
                select.classList.remove('_select_active');
                select.childNodes[0].classList.remove('_active');
            }
        }
    }
});