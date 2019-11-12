

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
    return fetch(url).then(r => r.json());
}


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

function buttonAction(type) {
    return (e) => {
        e.preventDefault();
        const n = Number($('#number').val());
        Promise.all([fetchInfo(type, 'facts', n), fetchInfo(type, 'pics', n)]).then(
            displayResults
        ).catch(
            console.log
        );
    }
}



function displayResults([facts, pics]) {
    console.log(facts, pics);
    $('#results-list').empty();
    $('#js-error-message').empty();
    for (let i = 0; i < facts.length; i++) {
        $('#results-list').append(
            `<div class="result-container"><img src="${pics[i]}" alt="photo of a cute animal">
             <p class="js-fact">${facts[i]}</p></div>
            `
        )
    };
    $('form').addClass('hidden');
    $('.result').removeClass('hidden');
    $('.newSearch').removeClass('hidden');
}

function startAgain() {
    $('form').removeClass('hidden');
    $('.result').addClass('hidden');
    $('.newSearch').addClass('hidden');
}

function watchForm() {
    $('#dog').click(buttonAction('dog'));
    $('#cat').click(buttonAction('cat'));
    $('.newSearch').click(startAgain);
    $('.fa-paw').click(startAgain);
}

$(watchForm);