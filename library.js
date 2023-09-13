const myLibrary = [];
const myForm = document.getElementById('myform');
const books = document.querySelector('.book-container');
const readCheckbox = document.getElementById('readCheckbox');

myForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const titleInput = document.getElementById('title').value;
    const authorInput = document.getElementById('author').value;
    const pageInput = document.getElementById('pages').value;
    const readValue = readCheckbox.checked ? 'Read' : 'Not read';
    
    myForm.reset();

    addBookToLibrary(titleInput, authorInput, pageInput, readValue);
});

document.addEventListener('DOMContentLoaded', () => {
    readCheckbox.checked = false;
    readCheckbox.value = 'Not read';
  });

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages.`
}

function addBookToLibrary(title, author, page, read) {
  
    let inputArr = [title, author, page, read];

    inputArr = inputArr.map(input => {
        let words = input.split(' ');
        for (let i = 0; i < words.length; i++) {
            words[i] = words[i][0].toUpperCase() + words[i].substring(1);
        }
        return words.join(' ');
    });
    

    if (inputArr.every(input => input.trim() !== '')) {
        
        const newBook = new Book (inputArr[0],inputArr[1],inputArr[2],inputArr[3]);

        const exists = myLibrary.some(bookProp =>  
            bookProp.title === newBook.title &&
            bookProp.author === newBook.author 
        );

        if (!exists) {
            myLibrary.push(newBook);
            console.log(`Book ${newBook.info()} has been added to your library`);
        } else {
            console.log('Book already exists in your library');
        }


    } else if (inputArr === '' || inputArr === undefined){
        return 
    }
    else {console.log('Invalid input.')}

}

function displayBooks(libraryArr) {
    libraryArr.forEach(book => {
     
      const bookIdentifier = `${book.title}_${book.author}`;
      
      
      const bookExists = Array.from(books.children).some(bookDiv => {
        return bookDiv.dataset.identifier === bookIdentifier;
      });
  
      if (!bookExists) {
        const bookDiv = document.createElement('div');
        bookDiv.className = 'my-book';
        bookDiv.textContent = book.info();
        
        
        bookDiv.dataset.identifier = bookIdentifier;
  
        books.appendChild(bookDiv);

        const btnContainer = document.createElement('div');
        btnContainer.className = 'btnContainer';
        bookDiv.appendChild(btnContainer);

  
        const readBtn = document.createElement('button');
        readBtn.textContent = book.read;
        readBtn.className = book.read === 'Read' ? 'readBtn' : 'readBtn-notRead';
        btnContainer.appendChild(readBtn);


        const deleteBtn = document.createElement('button');
        deleteBtn.textContent ='Delete';
        deleteBtn.className = 'deleteBtn';
        btnContainer.appendChild(deleteBtn);

        deleteBtn.addEventListener('click', (event) => {
            let userConfirm = prompt('Your are about to delete this book from your library, do you wish to proceed?', 'Yes');
            if (userConfirm === 'Yes') {
                const bookIndex = myLibrary.findIndex(bookInLibrary => bookInLibrary.title === book.title && bookInLibrary.author === book.author);
                if (bookIndex !== -1) {
                    myLibrary.splice(bookIndex, 1); 
                }
                bookDiv.remove(); 
            }
        });
        
        
        readBtn.addEventListener('click', (event) => {
          book.read = book.read === 'Read' ? 'Not Read' : 'Read';
          readBtn.textContent = book.read;
          readBtn.className = book.read === 'Read' ? 'readBtn' : 'readBtn-notRead';
        });
      }
    });
  }
  
myForm.addEventListener('submit', (event) => {
    event.preventDefault();
   displayBooks(myLibrary);
});
