// fetchData function using Axios

const fetchData = async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: 'af88c15',
            s: searchTerm
        }
    });
    if (response.data.Error) {
        return [];
    }
    return response.data.Search;
};

// Selecting input field

const root = document.querySelector('.autocomplete');
root.innerHTML = `
<label><b>Search For a Movie:</b></label>
<input class="input"/>
<div class="dropdown container">
    <div class="dropdown-menu">
        <div class="dropdown-content results"></div>
    </div>
</div>
`;

const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.results');

// Fetching data on user input

const onInput = async event => {
    const movies = await fetchData(event.target.value);
    if (!movies.length) {
        dropdown.classList.remove('is-active')
        return;
    }
    resultsWrapper.innerHTML = '';
    dropdown.classList.add('is-active');
    for (let movie of movies) {
        const option = document.createElement('a');
        const imgSrc = (movie.Poster === 'N/A' ? '' : movie.Poster);
        option.classList.add('dropdown-item')
        option.innerHTML = `
        <img src=${imgSrc} />
        ${movie.Title}
        `;
        option.addEventListener('click', () => {
            dropdown.classList.remove('is-active');
            input.value = movie.Title;
        });
        resultsWrapper.appendChild(option);
    }
};

// Listening for input changes.

input.addEventListener('input', debounce(onInput, 1000));
document.addEventListener('click', event => {
    if (!root.contains(event.target)) {

    }
});
