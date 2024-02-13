
let btn = document.getElementById('submit-btn');


let tokenData = [];
tokenHandler();
editLiHandler();

let updateLiId = null;


btn.addEventListener('click', function(e){
  e.preventDefault();

  let activeInputValues = {};

  let formData = new FormData(document.getElementById('token-form'));
  formData.forEach((value, property) => {
    activeInputValues[property] = value;
  })

  
  if(!updateLiId) {
    tokenData.push({
      ...activeInputValues,
      id: tokenData.length + 1
    });
  } else {

    // Update previous value;
    tokenData = tokenData.map((item) => {
      if(item.id == updateLiId) {
        return {
          ...activeInputValues,
          id: updateLiId
        }
      } else {
        return item;
      }
    })

  }

  tokenHandler();
  updateLiId = null;

  document.getElementById('token-form').reset();
})


// Create Li Element;
function myLiElement(id, name, phone) {
  return `<li data-id="${id}" class="token-li">
            <div class="left">
              <p>${name}</p>
              <span>${phone}</span>
            </div>
            <div class="right">
              <a href="#">Token No: ${id}</a>
            </div>
          </li>`;
}


function tokenHandler(){

  let ulElements = [
    {
      status: 'active',
      ul: document.getElementById('active-ul'),
      liElements: [],
      totalSpan: document.getElementById('total-active'),
    },
    {
      status: 'complete',
      ul: document.getElementById('complete-ul'),
      liElements: [],
      totalSpan: document.getElementById('total-complete'),
    },
    {
      status: 'cancel',
      ul: document.getElementById('cancel-ul'),
      liElements: [],
      totalSpan: document.getElementById('total-cancel'),
    }
  ];

  ulElements.map(item => {
    tokenData.map(token => {
        if(token.status == item.status) {
          item.liElements.push(myLiElement(token.id, token.name, token.phone));
        }
    });
  });

  ulElements.forEach(item => {

    let liElements = function() {
      if(item.liElements.length == 0) {
        return `<li class="empty-error d-block">
                        <span class="d-block text-center">No Data Found</span>
                      </li>`
      } else {
        return item.liElements.join('');
      }
    }

    item.ul.innerHTML = liElements();
    item.totalSpan.innerHTML = item.liElements.length;
  })

  document.getElementById('total-token').innerHTML = tokenData.length <= 9 ? "0" + tokenData.length : tokenData.length;

}


function editLiHandler() {
  // Edit li;
  // let lis = document.querySelectorAll('.token-area li');

  // console.log(lis);

  // lis.forEach(item => {
  //   item.addEventListener('click', function(e) {
  //     e.preventDefault();

  //     let dataId = e.target.getAttribute('data-id');

  //     console.log(dataId);
  //     console.log(e.target);
  //   })
  // })

  let tokenPackage = document.querySelector('.token-package');
  tokenPackage.addEventListener('click', function(e) {
    e.preventDefault();

    let li = e.target.closest('.token-li');
    
    if(li) {
      let dataId = li.getAttribute('data-id');
      // let dataId = e.target.getAttribute('data-id');
      

      let editLi = tokenData.find(item => {
        return item.id == dataId;
      })

      // console.log(editLi);

      // Push data to form;
      // document.querySelector('[name="name"]').value = editLi.name;
      // document.querySelector('[name="phone"]').value = editLi.phone;
      // document.querySelector('[name="status"]').value = editLi.status;

      for(let p in editLi) {
        if(document.querySelector(`[name="${p}"]`)) {
          document.querySelector(`[name="${p}"]`).value = editLi[p];
        }
      }

      updateLiId = dataId;

    }

  })


}


