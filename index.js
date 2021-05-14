// fetchData function using Axios

const fetchData = async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: 'af88c15',
            s: searchTerm
        }
    });

    console.log(response.data)
};

// Selecting input field

const input = document.querySelector('input');

// Delayed search inquiry / DEBOUNCING AN INPUT

let timeoutId;

const onInput = event => {
    if (timeoutId) {
        clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
        fetchData(event.target.value);
    }, 1000);
};

// Listening for input changes.

input.addEventListener('input', onInput);
