const dogUrl = 'https://dog.ceo/api/breeds/image/random';
const catUrl = 'https://aws.random.cat/meow';
const catFactsUrl = 'http://catfact.ninja/fact';
const dogFactsUrl = 'http://dog-api.kinduff.com/api/facts';


function fetchCat() {
    return fetch(catUrl).then(r => r.json());
}

function fetchCatFact() {
    return fetch(catFactsUrl).then(r => r.json());
}


function fetchCatPics(n) {
    Promise.all(new Array(n).fill(null).map(fetchCat))
    .then(
        results => {
            for (const r of results) {
                const catPics = new Array().push(`${r.file}`);
            }
        }
    );
    return catPics;
}

function fetchCatFacts(n) {
    Promise.all(new Array(n).fill(null).map(fetchCatFact))
        .then(
            results => {
                for (const r of results) {
                    const catFacts = new Array().push(`${r.fact}`);
                }
            }
        );
    return catFacts;
}

function displayCatResults(n) {
    $('#results').empty();
    $('#js-error-message').empty();
    for (let i = 0; i < n; i++) {
        $('#results').append(
            `<div><img src="${catPics[i]}" alt="photo of a cat">
             <p class="js-fact">${catFacts[i]}</p></div>
            `
        )
    };
    $('#results').removeClass('hidden');
}




function fetchDog() {
    return fetch(dogUrl).then(r => r.json());
}
function fetchDogFact() {
    return fetch(dogFactsUrl).then(r => r.json());
}

function fetchDogPics(n) {
    Promise.all(new Array(n).fill(null).map(fetchDog)).then(
        results => {
            for (const r of results) {
                const dogPics = new Array().push(`${r.message}`);
            }
        }
    );
    return dogPics;
}

function fetchDogFacts(n) {
    Promise.all(new Array(n).fill(null).map(fetchDogFact)).then(
        results => {
            for (const r of results) {
                const dogFacts = new Array().push(`${r.facts}`);
            }
        }
    );
    return dogFacts;
}

function displayDogResults(n) {
    $('#results').empty();
    $('#js-error-message').empty();
    for (let i = 0; i < n; i++) {
        $('#results').append(
            `<div><img src="${dogPics[i]}" alt="photo of a cat">
             <p class="js-fact">${dogFacts[i]}</p></div>
            `
        )
    };
    $('#results').removeClass('hidden');
}

function watchForm() {
    

    $('form').submit(event => {
        event.preventDefault();
        const num = $('#number').val();
        if (button[value] === "cat") {
            displayCatResults(num)
        } else if (button[value] === "dog"){
            displayDogResults(num)
        }
    });
}

$(watchForm);