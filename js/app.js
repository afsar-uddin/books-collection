// data fetch
const searchBook = async () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

    searchField.value = '';

    try {
        const url = `http://openlibrary.org/search.json?q=${searchText}`;
        const res = await fetch(url);
        const data = await res.json();
        displaySearchResults(data.docs)
    } catch (error) {
        console.log(error);
    }
}

// Display search results 
const displaySearchResults = booksInfo => {
    const searchResults = document.getElementById('search-results');
    const searchResultsCount = [];
    searchResults.textContent = ''


    // console.log(newOne.length)
    booksInfo.forEach(bookInfo => {
        const div = document.createElement('div');
        div.classList.add('single-book');

        div.innerHTML = `
            <h3>${bookInfo.title}</h3>
            <p>${bookInfo.author_name}</p>
            <p>${bookInfo.first_publish_year}</p>
            `;


        searchResults.appendChild(div);

        // search results push to declared empty array
        searchResultsCount.push(bookInfo)
        console.log(bookInfo)
    });

    // display search results
    const searchResultsQuantity = document.getElementById('searchResultsQuantity');

    const searchresultsLength = searchResultsCount.length;
    const h3 = document.createElement('h3');
    searchResultsQuantity.textContent = '';
    if (searchresultsLength === 0) {

        h3.innerText = 'no results found';
    } else {
        h3.innerText = searchResultsCount.length + ' results found';
    }
    searchResultsQuantity.appendChild(h3)


    // console.log(searchResultsCount)


    // console.log(booksInfo)
}