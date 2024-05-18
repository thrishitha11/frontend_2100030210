const data = [
    { name: 'John', age: 25, location: 'New York' },
    { name: 'Alice', age: 30, location: 'London' },
    { name: 'Bob', age: 35, location: 'Paris' },
];
function initTable() {
    const dataTable = document.getElementById('dataTable');
    const dataBody = document.getElementById('dataBody');
    dataBody.innerHTML = '';
    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${item.name}</td><td>${item.age}</td><td>${item.location}</td>`;
        dataBody.appendChild(row);
    });
    initPagination();
}
function initPagination() {
    const dataBody = document.getElementById('dataBody');
    const rowsPerPage = 5;
    const numPages = Math.ceil(dataBody.children.length / rowsPerPage);
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';
    for (let i = 1; i <= numPages; i++) {
        const link = document.createElement('span');
        link.classList.add('pagination-link');
        link.textContent = i;
        link.addEventListener('click', () => goToPage(i, rowsPerPage));
        pagination.appendChild(link);
    }
    goToPage(1, rowsPerPage);
}

function goToPage(pageNum, rowsPerPage) {
    const dataBody = document.getElementById('dataBody');
    const rows = dataBody.children;
    const startIdx = (pageNum - 1) * rowsPerPage;
    const endIdx = startIdx + rowsPerPage;
    for (let i = 0; i < rows.length; i++) {
        rows[i].style.display = 'none';
    }
    for (let i = startIdx; i < endIdx && i < rows.length; i++) {
        rows[i].style.display = '';
    }
    const paginationLinks = document.querySelectorAll('.pagination-link');
    paginationLinks.forEach(link => link.classList.remove('active'));
    paginationLinks[pageNum - 1].classList.add('active');
}
function sortTable(columnIdx) {
    const dataBody = document.getElementById('dataBody');
    const rows = Array.from(dataBody.children);

    rows.sort((a, b) => {
        const aData = a.children[columnIdx].textContent.trim();
        const bData = b.children[columnIdx].textContent.trim();
        return aData.localeCompare(bData);
    });

    dataBody.innerHTML = '';
    rows.forEach(row => dataBody.appendChild(row));
}
function filterTable() {
    const searchInput = document.getElementById('searchInput');
    const filter = searchInput.value.toLowerCase();
    const dataBody = document.getElementById('dataBody');
    const rows = dataBody.children;

    for (let i = 0; i < rows.length; i++) {
        const rowData = rows[i].textContent.toLowerCase();
        if (rowData.includes(filter)) {
            rows[i].style.display = '';
        } else {
            rows[i].style.display = 'none';
        }
    }
    goToPage(1, 5);
}
initTable();
