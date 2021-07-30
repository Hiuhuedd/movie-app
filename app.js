 $(document).ready(() => {
     $('#searchForm').on('submit', (e) => {
         let searchText = $('#searchText').val();
         getMovies(searchText)
         $(".background").addClass("bc");
         e.preventDefault()
     })
     $('#search').on('click', (e) => {
         let searchText = $('#searchText').val();
         getMovies(searchText)
         $(".background").addClass("bc");
         e.preventDefault()
     })
 });


 function getMovies(title) {
     let s = 'apikey=d1d5e2b0&s='
     axios.get(' http://www.omdbapi.com/?' + s + title)
         .then((response) => {
             let movies = response.data.Search
             console.log(movies);
             let output = ''
             movies.forEach((movie) => {
                 output += `
                 <div class="column col-md-3 col-sm-6">
                    <div class="well text-center mt-2">
                         <img src="${movie.Poster}" alt="">
                       <h5 class="mt-2 text-light"style="overflow:hidden; white-space:nowrap; text-overflow:ellipsis; font-size:20px;">${movie.Title}</h5>
                     
                      <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary mt-2" href="#">Movie detials</a>
                
       
                    </div>
                </div>
                 `;

             });
             const board = document.querySelector('#movies')
             board.innerHTML = output
         })
         .catch((err) => {
             console.log(err);
         })

 }

 function movieSelected(id) {
     sessionStorage.setItem('movieid', id);
     window.location = 'movie.html';
     return false
 }

 function getMovie() {
     let movieID = sessionStorage.getItem('movieid')
     let s = 'apikey=d1d5e2b0&i='
     axios.get(' http://www.omdbapi.com/?' + s + movieID)
         .then((response) => {
             console.log(response.data);
             const movieData = response.data;
             const output = ` 
             <div class="poster col-lg-3 col-md-4 col-sm-12 container">
                <img src="${movieData.Poster}" alt="" class="thumbnail">
            </div>
             <div class="details col-lg-8 col-md-7 col-sm-12">
              <h2 class="text-">${movieData.Title}</h2>
                <ul class="list-group">
                    <li class="list-group-item"> <strong>Featuring : </strong>${movieData.Actors}</li>
                    <li class="list-group-item"> <strong>Rated : </strong>${movieData.Rated}</li>
                    <li class="list-group-item"> <strong>Director : </strong>${movieData.Director}</li>
                    <li class="list-group-item"> <strong>Genre : </strong>${movieData.Genre}</li>
                    <li class="list-group-item"> <strong>Language : </strong>${movieData.Language}</li>
                    <li class="list-group-item"> <strong>Year : </strong>${movieData.Year}</li>
                    <li class="list-group-item"> <strong>Imdb Ratings : </strong>${movieData.imdbRatings}</li>
                   
                </ul>
            </div>
               <div class="row mt-3">
               <div class="well container">
                 <h3>Plot</h3>
                 <p>${movieData.Plot}</p>  
                  <hr>
    <a href="http://www.imdb.com/title/${movieData.imdbID}" class="btn btn-secondary" target="_blank">Movie Details</a>
    <a href="index.html" class="btn btn-warning">Back to search</a>
               </div>
               </div>

            `
             const movieDetails = document.querySelector('#movie');
             movieDetails.innerHTML = output

         })
         .catch((err) => {
             console.log(err);
         })
 }