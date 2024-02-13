






// let test = document.querySelector('.test');

// test.classList;

// test.innerHTML;

// test.innerText;

// test.className;

// test.getAttribute();



// let another = test.querySelector('.another');


// let myH1 = document.querySelector('.my-h1');

// let output = null;


// output = myH1.innerText.search('ipsum'); return index number;
// output = myH1.innerText.match(/lorem/g); // return an array;
// output = myH1.innerText.includes('lorem'); // return an array;

// console.log(output);

let searchInput = document.getElementById('search');

let val = null;

searchInput.addEventListener('keyup', function(e) {
    val = searchInput.value;

    let lis = document.querySelectorAll('#myList li');
   
    lis.forEach(item => {
        let liData = item.innerText.toLowerCase();

        let liMatch = liData.match(val.toLowerCase());

        if(val != '' && liMatch) {
            item.classList.remove('d-none')
        } else {
            item.classList.add('d-none')
        }
    })

});







