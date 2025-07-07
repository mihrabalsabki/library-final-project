
const homePage = document.getElementById('go-home');
const homeSection = document.getElementById('Home');

const managementPage = document.getElementById('go-management');
const managementSection = document.getElementById('Management');



//Pages Routers
homePage.addEventListener('click',function(){
    managementSection.style.display = "none";
    homeSection.style.display = "block";
});

managementPage.addEventListener('click',function(){
    homeSection.style.display = "none";
    managementSection.style.display = "block";
});




//Add new book functionality
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get form values
    const booksSection = document.getElementById('books-section');
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const year = document.getElementById('year').value;
    const type = document.getElementById('type').value;
    const cover = document.getElementById('cover').files[0];
    const coverUrl = cover ? URL.createObjectURL(cover) : 'images/default-cover.jpg'; // Default cover if none provided

    // pdf file handling (optional)
    const pdfFile = document.getElementById('pdf').files[0];
    const pdfUrl = URL.createObjectURL(pdfFile);
    



    


    // Create a new row in the table
    const tableBody = document.querySelector('.table tbody');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${tableBody.children.length + 1}</td>
        <td>
            <img src="${coverUrl}" alt="Book Cover" class="book-cover">
        </td>
        <td>${title}</td>
        <td>${author}</td>
        <td>${year}</td>
        <td>${type}</td>
        <td class="text-center">
            <button class="btn btn-danger">
                <i class="bi bi-trash"></i> 
            </button>

            <button class="btn btn-primary edit-btn">
                <i class="bi bi-pencil"></i> 
            </button>
            <a href="${pdfUrl}" download="${title}.pdf" class="btn btn-success download">
                <i class="bi bi-download"></i>
            </a>
        </td>
    `;


    booksSection.insertAdjacentHTML('beforeend',`
        <div class="col-2">
            <div class="book-card">
                <img src="${coverUrl}" alt="Book Cover" class="book-cover">
                <h4>${title}</h4>
                <p>Author: ${author}</p>
                <p>Year: ${year}</p>
                <p>Type: ${type}</p>
                <div class="actions">
                    <a href="${pdfUrl}" download="download" class="btn btn-success download" >
                        <i class="bi bi-download"></i>
                        Download PDF
                    </a>
                </div>
            </div>
        </div>
    `);

    // Append the new row to the table body
    tableBody.appendChild(newRow);

    // Clear the form fields
    this.reset();
});


// delete book functtionality
document.querySelector('.table').addEventListener('click', function(event) {
    if (event.target.classList.contains('btn-danger')) {
        // Confirm deletion
        if (confirm('Are you sure you want to delete this book?')) {
            const row = event.target.closest('tr');
            row.remove(); // Remove the row from the table
        }
    }
});

// Edit book functionality
document.querySelector('.table').addEventListener('click', function(event) {
    if (event.target.classList.contains('edit-btn')) {
        const row = event.target.closest('tr');
        const cells = row.querySelectorAll('td');

        // Get current values
        const coverImg = cells[1].querySelector('img');
        const title = cells[2].textContent;
        const author = cells[3].textContent;
        const year = cells[4].textContent;
        const type = cells[5].textContent;
        const coverUrl = coverImg.src;




        // Prompt user for new values
        const newTitle = prompt('Edit Title:', title);
        const newAuthor = prompt('Edit Author:', author);
        const newYear = prompt('Edit Year:', year);
        const newType = prompt('Edit Type:', type);
        const newCover = prompt('Edit Cover URL (leave blank for default):', coverUrl);
        const newCoverUrl = newCover ? newCover : 'images/default-cover.jpg'; // Default cover if none provided

        // Update the cover image if a new URL is provided
        if (newCoverUrl) {
            coverImg.src = newCoverUrl;
        }

        // Update the row with new values
        if (newTitle && newAuthor && newYear && newType) {
            cells[1].querySelector('img').src = newCoverUrl; // Update cover image
            cells[2].textContent = newTitle;
            cells[3].textContent = newAuthor;
            cells[4].textContent = newYear;
            cells[5].textContent = newType;

        }
    }
});







// Search functionality by title auther year type
document.querySelector('.search-text').addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const rows = document.querySelectorAll('.table tbody tr');

    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const title = cells[1].textContent.toLowerCase();
        const author = cells[2].textContent.toLowerCase();
        const year = cells[3].textContent.toLowerCase();
        const type = cells[4].textContent.toLowerCase();

        // Check if the search term matches any cell
        if (title.includes(searchTerm) || author.includes(searchTerm) || year.includes(searchTerm) || type.includes(searchTerm)) {
            row.style.display = ''; // Show the row
        } else {
            row.style.display = 'none'; // Hide the row
        }
    });
});



