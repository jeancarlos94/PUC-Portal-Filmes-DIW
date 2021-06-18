const API_KEY = 'api_key=445dfed8aec6b19bf8e9e17ecaf0af16';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by-popularity.desc&' + API_KEY + '&language=pt-BR';
const IMG_URL = 'https://image.tmdb.org/t/p/w500/';
const SEARCH_URL = BASE_URL + '/search/movie?' + API_KEY + '&language=pt-BR';

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const tagsEl = document.getElementById('tags');

getMovies(API_URL);

function getMovies(url){
    fetch(url).then(res => res.json()).then(data =>{
        if(data.results.length !== 0){
            showMovies(data.results);
        }else{
            main.innerHTML = `<h1 class="no-results">Nenhum resultado encontrado</h1>`
        }
        
    })
}

function showMovies(data){
    main.innerHTML = ``;
    data.forEach(movie => {
        const {title, poster_path, vote_average, overview, release_date, id} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('col-sm-12', 'col-md-6', 'col-lg-4');
        
        movieEl.innerHTML = `
        <a class="movie" href="https://www.themoviedb.org/movie/${id}" target="_blank">
        <div class="card mb-4 box-shadow">
            <img class="card-img-top" src="${poster_path ? IMG_URL+poster_path : "https://via.placeholder.com/1080x1580"}" alt="${title}">
            <div class="card-body">
                <div id="qa">
                    <h3>${title}</h3>
                </div>             
                <p class="card-text"> ${getOverview(overview)} </p>              
            </div>

            <div id="infoextra">                  
                <span id="jc" class="d-flex align-items-center justify-content-center badge bg-${getColor(vote_average)}">Rating: ${vote_average}</span>
                
                <div class="d-flex justify-content-around align-items-center">
                    <div class="btn-group">
                        <button type="button" class="btn btn-sm btn-outline-warning">Detalhes</button>
                    </div>
                    <button type="button" class="btn btn-sm btn-outline-success">Estréia: ${ release_date.substring(10,8) + '/' + release_date.substring(5,7) + '/' + release_date.substring(0,4)}</button>
                </div>
            </div>
        </div>
        </a>        
        `  
         main.appendChild(movieEl);
    });
}

function getOverview(overview){
   if(overview){
      return overview;
   }else{
      return 'Nenhuma visão geral foi encontrada.';
   }
}


function getColor(vote){
    if(vote >= 8){
        return 'success'
    }else if(vote >= 5){
        return 'warning'
    }else{
        return 'danger'
    }
}

form.addEventListener('submit', (e) => {
   e.preventDefault();
   const searchTerm = search.value;
   
   if(searchTerm){
      console.log(searchTerm);
       getMovies(SEARCH_URL + '&query=' + searchTerm);
   }else{
       getMovies(API_URL)
   }
   search.value = '';
})