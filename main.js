document.addEventListener("DOMContentLoaded", function() {

    const submitForm = document.getElementById("inputBook");

    submitForm.addEventListener("submit", function (event) {
        event.preventDefault();
        addMyBook();
    });

    if(isStorageExist()) {
        loadDataFromStorage();
    }
});

const submitSearch = document.getElementById("searchBook");

submitSearch.addEventListener("submit", function(event) {
   event.preventDefault();
    bookSearch();
});

document.addEventListener("ondatasaved", function() {
    console.log("Data berhasil disimpan");
});

document.addEventListener("ondataloaded", function() {
    refreshDataFromBooks();
});