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

// Delayed search inquiry function / DEBOUNCING AN INPUT

const debounce = (callback, delay = 1000) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            callback.apply(null, args);
        }, delay);
    };
};

// Fetching data on user input

const onInput = event => {
    fetchData(event.target.value);
};

// Listening for input changes.

input.addEventListener('input', debounce(onInput, 500));
