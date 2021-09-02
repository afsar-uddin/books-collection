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
    searchResults.textContent = '';

    booksInfo?.forEach(bookInfo => {
        const div = document.createElement('div');
        div.classList.add('single-book');

        div.innerHTML = `
            <div onload=coverPhotos(${bookInfo.cover_i})>
                <h3>${bookInfo.title}</h3>
                <p>${bookInfo.author_name ? bookInfo.author_name : ''}</p>
                <p>${bookInfo.first_publish_year ? bookInfo.first_publish_year : ''}</p>
            </div>
            `;
        searchResults.appendChild(div);

        // search results push to declared empty array
        searchResultsCount.push(bookInfo)
    });

    const coverPhotos = async cover_i => {
        const url = `https://covers.openlibrary.org/b/id/${cover_i}-L.jpg`
        const res = await fetch(url);
        const data = await res.json();
        console.log(res)
    }
    coverPhotos();

    // display search results quantity
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