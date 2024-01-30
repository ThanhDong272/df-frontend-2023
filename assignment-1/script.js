let books = [
  {
    bookName: "Refactoring",
    author: "Martin Fowler",
    topic: "Programming",
  },
  {
    bookName: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    topic: "Database",
  },
  {
    bookName: "The Phoenix Project",
    author: "Gene Kim",
    topic: "Devops",
  },
];

const tableBody = document.getElementById("table-body");
const modalCreate = document.getElementById("modalCreateBook");
const modalDelete = document.getElementById("modalDeleteBook");
const btnCreateBookModal = document.getElementById("createBookModal");
const getBookName = document.getElementById("bookName");
const btnCancelDeleteBook = document.getElementById("cancelDeleteBook");
const btnCloseDelete = document.getElementById("closeDelete");
const btnCloseCreate = document.getElementById("closeCreate");
// Handle Change Select Value
const selectOptions = document.getElementById("topicDropdown");
// Handle Create Book
const btnCreateBook = document.getElementById("createBook");
// Handle Delete Book
const btnDeleteBook = document.getElementById("deleteBook");

const renderListBooks = (books) => {
  books.forEach((item) => {
    const row = document.createElement("tr");
    row.classList.add("table-child");
    const bookNameCell = document.createElement("td");
    const authorNameCell = document.createElement("td");
    const topicCell = document.createElement("td");
    const deleteCell = document.createElement("td");
    const deleteButton = document.createElement("button");

    bookNameCell.textContent = item.bookName;
    authorNameCell.textContent = item.author;
    topicCell.textContent = item.topic;
    deleteButton.id = `${item.bookName}`;
    deleteButton.type = "button";
    deleteButton.className = "btn-delete";
    deleteButton.textContent = "Delete";
    deleteCell.appendChild(deleteButton);

    row.appendChild(bookNameCell);
    row.appendChild(authorNameCell);
    row.appendChild(topicCell);
    row.appendChild(deleteCell);

    tableBody.appendChild(row);
  });
};

const renderActionRow = () => {
  tableBody.querySelectorAll("[id]").forEach((element) => {
    element.addEventListener("click", () => {
      console.log("Clicked element with ID:", element.id);

      getBookName.textContent = element.id;

      modalDelete.style.display = "block";
    });
  });
};

renderListBooks(books);
renderActionRow();

// When the user clicks the button, open the modal
btnCreateBookModal.onclick = () => {
  document.getElementById("inputName").value = "";
  document.getElementById("inputAuthor").value = "";

  modalCreate.style.display = "block";
};

window.onclick = (event) => {
  if (event.target == modalCreate) {
    modalCreate.style.display = "none";
  } else if (event.target == modalDelete) {
    modalDelete.style.display = "none";
  }
};

btnCancelDeleteBook.onclick = (event) => {
  modalDelete.style.display = "none";
};

btnCloseDelete.onclick = (event) => {
  modalDelete.style.display = "none";
};

btnCloseCreate.onclick = (event) => {
  modalCreate.style.display = "none";
};

const onChangeSelect = () => {
  const valueSelected = selectOptions.value;
  const textSelected = selectOptions.options[selectOptions.selectedIndex].text;
  console.log(valueSelected, textSelected);
};

selectOptions.onchange = onChangeSelect;
onChangeSelect();

btnCreateBook.onclick = (event) => {
  const valueName = document.getElementById("inputName").value;
  const valueAuthor = document.getElementById("inputAuthor").value;
  const valueSelected = selectOptions.value;

  if (valueName === "") {
    alert("Name must be filled out");
  } else if (valueAuthor === "") {
    alert("Author must be filled out");
  } else if (valueName !== "" && valueAuthor !== "") {
    const payload = {
      bookName: valueName,
      author: valueAuthor,
      topic: valueSelected,
    };

    const newListBook = [...books, payload];

    console.log("NEW LIST BOOKS: ", newListBook);

    const tableBody = document.getElementById("table-body");
    tableBody.innerHTML = "";

    renderListBooks(newListBook);

    renderActionRow();

    modalCreate.style.display = "none";
  }
};

btnDeleteBook.onclick = (event) => {
  const newListBook = books.filter(
    (item) => item.bookName !== getBookName.textContent
  );

  console.log("NEW LIST BOOK: ", newListBook);

  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = "";

  books = newListBook;

  renderListBooks(books);

  renderActionRow();

  modalDelete.style.display = "none";
};

// Handle Search Book
const handleChangeSearch = () => {
  const inputValue = document.getElementById("searchBook").value;

  const newListBook = books.filter((item) =>
    item.bookName.toLowerCase().includes(inputValue)
  );

  console.log("FILTER LIST BOOK: ", newListBook);

  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = "";

  renderListBooks(newListBook);

  renderActionRow();
};
