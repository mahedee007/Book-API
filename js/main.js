// spinner function
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}


// searchbook function
const searchBook = () => {
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value;
    searchInput.value = '';
    if(searchText === ''){
        alert('please enter a book name')
        
    }else{
        const url = `http://openlibrary.org/search.json?q=${searchText}`
        fetch(url)
        .then(res => res.json())
        .then(data => searchResult(data))

        toggleSpinner('block');
    }
    
    
}
const searchResult = books => {

    const showResult = document.getElementById('search-result');
    showResult.textContent = '';

//display total number of books
    if (books.numFound === 0) {
        toggleSpinner('none');
        //display total number of books
        const totalNum = document.getElementById('total-num');
        totalNum.textContent = '';
        const h3 = document.createElement('h3');
        h3.innerText = `No result found!`;
        totalNum.appendChild(h3);
    }

    else {
        //display total number of books
        const totalNum = document.getElementById('total-num');
        totalNum.textContent = '';
        const h3 = document.createElement('h3');
        h3.innerText = `About ${books.numFound} results found `;
        totalNum.appendChild(h3);}

// Foreach Loop

    books.docs?.forEach(book => {
        const div = document.createElement('div');
        div.classList.add = ('col');
        div.innerHTML = `
        <div class="card h-100">
                <img height="300px" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg"  class="card-img-top" alt="...">
                <div class="card-body">
                  <h5>Title: ${book.title}</h5>
                  <h5>Author Name: ${book.author_name? book.author_name:'N/A'}</h5>
                  <h5>Publishers: ${book.publisher? book.publisher:'N/A'}</h5>
                  <h5>Published Year: ${book.first_publish_year}</h5>
                  
                </div>`
                showResult.appendChild(div);
        
    });
    
   toggleSpinner('none');
}