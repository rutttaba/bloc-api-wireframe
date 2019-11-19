// API urls and adapters to get relevant information
const store = {
    dog: {
        pics: {
            url: 'https://dog.ceo/api/breeds/image/random',
            adapter: (json) => json.message 
        },
        facts: {
            url: 'https://cors-anywhere.herokuapp.com/https://dog-api.kinduff.com/api/facts',
            adapter: (json) => json.facts[0]
        }
    },
    cat: {
        pics: {
            url: 'https://aws.random.cat/meow',
            adapter: (json) => json.file
        },
        facts: {
            url: 'https://catfact.ninja/fact',
            adapter: (json) => json.fact
        }
    }
}


function fetchJson(url) {
     return fetch(url).then(r => {
        if(r.ok) {
           return r.json();
        }
        throw new Error(r.statusText);
    })
    .catch(err => {
        console.log(err.message)
        $('#js-error-message').text(`Something went wrong: ${err.message}`); 
        $('.reset').removeClass('hidden');
    });     
}

// returns an array of facts/images of chosen animals. Array length is the number specified by the user
function fetchInfo(type, infoType, n) {
    return Promise.all(new Array(n).fill(null).map(() => fetchJson(store[type][infoType].url))).then(
        results => {
            const data = [];
            const f = store[type][infoType].adapter;
            console.log(type, infoType, f);
            for (const r of results) {
                data.push(f(r));
            }
            return Promise.resolve(data);
        }
    );
}

// gets the number of results wanted, calls fetch and display functions to show the results
function buttonAction(type) {
    return (e) => {
        e.preventDefault();
        let n = Number($('#number').val());
        if (n > 50) {
            n = 50
            alert('Sorry, I can only show you 50 results at a time. Enjoy!');
        } 
        Promise.all([fetchInfo(type, 'facts', n), fetchInfo(type, 'pics', n)]).then(
            displayResults
        );
    }
}



function displayResults([facts, pics]) {
    console.log(facts, pics);
    $('#results-list').empty();
    $('#js-error-message').empty();
    for (let i = 0; i < facts.length; i++) {
        $('#results-list').append(
            `<div class='result-container'>
            <div class='speech-bubble-ds'>
            <p class='js-fact'>${facts[i]}</p>
            <div class='speech-bubble-ds-arrow'></div>
            </div>
            <img src='${pics[i]}' alt='photo of a cute animal'>
             </div>
            `
        )
    };
    $('form').addClass('hidden');
    $('.result').removeClass('hidden');
    $('.newSearch').removeClass('hidden');
    $('.lg-intro').addClass('gone');
    $('.reset').addClass('hidden');
}




function startAgain() {
    $('form').removeClass('hidden');
    $('.result').addClass('hidden');
    $('.newSearch').addClass('hidden');
    $('#js-error-message').empty();
    $('.reset').addClass("hidden");
    $('.lg-intro').removeClass('gone');
    $('#number').val('6');
}

function watchForm() {
    $('#dog').click(buttonAction('dog'));
    $('#cat').click(buttonAction('cat'));
    $('.newSearch').click(startAgain);
    $('.fa-paw').click(startAgain);
    $('.reset').click(startAgain);
}

$(watchForm);