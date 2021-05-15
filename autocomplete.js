const createAutoComplete = ({ root, renderOption, onOptionSelect, inputValue, fetchData }) => {
    root.innerHTML = `
    <label><b>Search:</b></label>
    <input class="input mt-2">
    <div class="columns ml-1">
    <div class="column dropdown container pt-0">
        <div class="dropdown-menu">
            <div class="dropdown-content results"></div>
        </div>
    </div>
    </div>
    `;

    // Selecting input field

    const input = root.querySelector('input');
    const dropdown = root.querySelector('.dropdown');
    const resultsWrapper = root.querySelector('.results');

    // Fetching data on user input

    const onInput = async event => {
        const items = await fetchData(event.target.value);
        if (!items.length) {
            dropdown.classList.remove('is-active')
            return;
        }
        resultsWrapper.innerHTML = '';
        dropdown.classList.add('is-active');
        for (let item of items) {
            const option = document.createElement('a');

            option.classList.add('dropdown-item')
            option.innerHTML = renderOption(item);
            option.addEventListener('click', () => {
                dropdown.classList.remove('is-active');
                input.value = inputValue(item);
                onOptionSelect(item);
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
};