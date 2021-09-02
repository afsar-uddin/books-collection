// toggle pre-loader 
const togglePreLoader = style => {
    document.getElementById('pre-loader').style.display = style;
}

// toggle for search reslts
const toggleSearchResults = showHide => {
    document.getElementById('search-results').style.display = showHide;
}

// search data url fetch
const searchBook = async () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    togglePreLoader('block');
    toggleSearchResults('none');

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
    searchResults.textContent = '';

    booksInfo?.forEach(bookInfo => {
        const div = document.createElement('div');
        div.classList.add('single-book');

        div.innerHTML = `
            <img  src="https://covers.openlibrary.org/b/id/${bookInfo.cover_i ? bookInfo.cover_i : '240727'}-M.jpg" />
            <h3>${bookInfo.title}</h3>
            <p><strong>Author:</strong> ${bookInfo.author_name ? bookInfo.author_name : ''}</p>
            <p><strong>Publisher:</strong> ${bookInfo.publisher ? bookInfo.publisher : ''}</p>
            <p><strong>First Publish</strong> ${bookInfo.first_publish_year ? bookInfo.first_publish_year : ''}</p>
            `;
        searchResults.appendChild(div);

        // search results push to declared empty array
        searchResultsCount.push(bookInfo);
        togglePreLoader('none');
        toggleSearchResults('grid');
    });

    // display search results quantity
    const searchResultsQuantity = document.getElementById('searchResultsQuantity');
    const searchresultsLength = searchResultsCount.length;
    const h3 = document.createElement('h3');
    searchResultsQuantity.textContent = '';

    if (searchresultsLength === 0) {
        h3.innerText = 'no results found';
        togglePreLoader('none');
    } else {
        h3.innerText = searchResultsCount.length + ' results found';
    }
    searchResultsQuantity.appendChild(h3);
}