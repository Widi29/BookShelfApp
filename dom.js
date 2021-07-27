const INCOMPLETE_LIST_BOOK = "incompleteBookshelfList";
const COMPLETED_LIST_BOOK = "completeBookshelfList";
const BOOK_ITEMID = "itemId";

function addMyBook() {
    const incompleteListBook = document.getElementById(INCOMPLETE_LIST_BOOK);
    const completedListBook = document.getElementById(COMPLETED_LIST_BOOK);

    const title = document.getElementById("inputBookTitle").value;
    const author = document.getElementById("inputBookAuthor").value;
    const year = document.getElementById("inputBookYear").value;
    const checkbox = document.getElementById("inputBookIsComplete");

    if (checkbox.checked == true) {
        isCompleted = true;
    } else {
        isCompleted = false;
    }

    const bookShelf = makeMyBook(title, author, year, isCompleted);
    const bookObject = composeBookObject(title, author, year, isCompleted);

    bookShelf[BOOK_ITEMID] = bookObject.id;
    books.push(bookObject);

    if (isCompleted) {
        completedListBook.append(bookShelf);
    } else {
        incompleteListBook.append(bookShelf);
    }

    updateDataToStorage();
}

function makeMyBook(titles, authors, years, isCompleted) {

    const bookTitle = document.createElement("h3");
    bookTitle.innerText =  titles;

    const bookAuthors = document.createElement("p");
    bookAuthors.innerText = "Penulis :";
    bookAuthors.classList.add("book_author");

    const bookAuthor = authors;
    const bAuthors = document.createElement("p");
    bAuthors.classList.add("book_author");
    bAuthors.innerText = bookAuthor;

    const authorContainer = document.createElement("div");
    authorContainer.append(bookAuthors, bAuthors);

    const bookYears = document.createElement("p");
    bookYears.innerText = "Tahun : ";
    bookYears.classList.add("book_year");

    const bookYear = years;
    const bYears = document.createElement("p");
    bYears.classList.add("book_year");
    bYears.innerText = bookYear;

    const yearContainer = document.createElement("div");
    yearContainer.append(bookYears, bYears);

    const textContainer = document.createElement("article");
    textContainer.classList.add("book_item");
    textContainer.setAttribute("id", "displayMyBook");
    textContainer.append(bookTitle, authorContainer, yearContainer);

    const action = document.createElement("div");
    action.classList.add("action");

    if (isCompleted) {
        action.append(
            createUndoButton(),
            createTrashButton()
            );
    } else {
        action.append(
            createCompleteButton(),
            createTrashButton()
            );
    }

    textContainer.append(action);

    return textContainer;
}

function createButton(buttonTypeClass, eventListener, textButton) {

    const button = document.createElement("button");

    button.classList.add(buttonTypeClass);
    button.innerText = textButton;

    button.addEventListener("click", function (event) {
        eventListener(event);
    });

    return button;
}

function createCompleteButton() {

    return createButton(
        "green", 
        function(event) {
            addBookToCompleted(event.target.parentElement.parentElement);
        },
        "Selesai"
    );
}

function createUndoButton() {

    return createButton(
        "green2", 
        function(event) {
            undoBookToCompleted(event.target.parentElement.parentElement);
        },
        "Belum Selesai"
    );
}

function createTrashButton() {

    return createButton(
        "red", 
        function(event) {removeBookFromCompleted(event.target.parentElement.parentElement);},
        "Hapus"
        );
}

function addBookToCompleted(taskElement) {

    const titleBook = taskElement.querySelector(".book_item > h3").innerText;
    const authorBook = taskElement.querySelector(".book_author").innerHTML;
    const yearBook = taskElement.querySelector(".book_year").innerHTML;

    const newBook = makeMyBook(titleBook, authorBook, yearBook, true);

    const book = findBook(taskElement[BOOK_ITEMID]);
    book.isCompleted = true;
    newBook[BOOK_ITEMID] = book.id;

    const completedListBook = document.getElementById(COMPLETED_LIST_BOOK);
    completedListBook.append(newBook);
    
    taskElement.remove();

    updateDataToStorage();
}

function undoBookToCompleted(taskElement) {

    const titleBook = taskElement.querySelector(".book_item > h3").innerText;
    const authorBook = taskElement.querySelector(".book_author").innerHTML;
    const yearBook = taskElement.querySelector(".book_year").innerHTML;

    const newBook = makeMyBook(titleBook, authorBook, yearBook, false);

    const book = findBook(taskElement[BOOK_ITEMID]);
    book.isCompleted = false;
    newBook[BOOK_ITEMID] = book.id;

    const unCompletedListBook = document.getElementById(INCOMPLETE_LIST_BOOK);
    unCompletedListBook.append(newBook);
    
    taskElement.remove();

    updateDataToStorage();
}

function removeBookFromCompleted(taskElement) {

    const bookPosition = findBookIndex(taskElement[BOOK_ITEMID]);
    books.splice(bookPosition, 1);

    const booksTitles = taskElement.querySelector(".book_item > h3").innerText;

    if (confirm("Apakah Anda yakin ingin menghapus buku " + '"' + booksTitles + '"' + "?")) {
        taskElement.remove();
        updateDataToStorage();
    }
}

function refreshDataFromBooks() {

    const listUncompleted = document.getElementById(INCOMPLETE_LIST_BOOK);
    const listCompleted = document.getElementById(COMPLETED_LIST_BOOK);

    for (book of books) {
        const newBook = makeMyBook(book.title, book.author, book.year, book.isCompleted)
        newBook[BOOK_ITEMID] = book.id;

        if (book.isCompleted) {
            listCompleted.append(newBook);
        } else {
            listUncompleted.append(newBook);
        }
    }
}

function bookSearch() {

    const searchInput = document.getElementById("searchBookTitle").value.toUpperCase();
    const titleList = document.querySelectorAll("article");

    let index = 0;
    for (judul of titleList) {
        let titles = judul.querySelector("h3").innerText.toUpperCase();

        if (titles.indexOf(searchInput) > -1) {
            titleList[index].removeAttribute("hidden");
        } else {
            titleList[index].setAttribute("hidden", "hidden");
        }

        index++;
    }
}