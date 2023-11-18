


let accessToken;



async function showData() {

    const data = await fetch('/customer_list')
        .then(response => response.json())
        .then(result => { return result })
        .catch(error => console.log({error}));


    if (data) {
        createTable(data);
    }

}
showData();
function createTable(data) {
    // Create a table element
    const table = document.createElement('table');
    table.classList.add('table', 'table-bordered', 'table-striped');
    // Create table header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    // Extract column headers from the first object in the data array
    const headers = Object.keys(data[0]);
    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    const actionsTh = document.createElement('th');
    actionsTh.textContent = 'Actions';
    headerRow.appendChild(actionsTh);

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table body
    const tbody = document.createElement('tbody');
    data.forEach(rowData => {
        const row = document.createElement('tr');
        headers.forEach(header => {
            const cell = document.createElement('td');
            cell.textContent = rowData[header];
            row.appendChild(cell);
        });
        // Add update and delete buttons for each row
        const actions = document.createElement('td');
        const updateButton = document.createElement('button');
        updateButton.classList.add('btn', 'btn-primary', 'mr-2');
        updateButton.innerHTML = '<i class="fa fa-edit"></i>';
        updateButton.style.margin = "0px 5px 0px 5px";
        updateButton.title = "Update";

        // Add click event listener for update button
        updateButton.addEventListener('click', async () => {
            // Implement update functionality here

            var formData = rowData;

            // Get the form element
            var form = document.getElementById('dynamicForm');
            form.style.textAlign = "center";
            dynamicForm.innerHTML = '';

            // Loop through the properties of the object and create form fields
            var pairCount = 0;

            // var button = document.createElement('button');
            // button.textContent = 'update';
            // button.type='submit';

            // Loop through the properties of the object and create form fields
            for (var key in formData) {
                if (formData.hasOwnProperty(key)) {
                    // Create a label element
                    var label = document.createElement('label');
                    label.style.margin = "1px";
                    label.textContent = key;

                    // Create an input element
                    var input = document.createElement('input');
                    if(key === 'uuid') {
                        input.readOnly = true;
                    }
                    input.type = 'text';
                    input.name = key;
                    input.id = key;
                    
                    input.value = formData[key];

                    

                    // Create a container div for each label-input pair
                    var container = document.createElement('div');
                    container.style.margin = "10px";
                    container.style.display = "inline-block";
                    container.style.textAlign = "center";
                    container.style.height = "30px";
                    container.style.width = "265px";
                    container.classList.add('label-input-pair'); // You can style this class for better appearance

                    // Append label and input to the container
                    container.appendChild(label);
                    container.appendChild(input);

                    // Append the container to the form
                    form.appendChild(container);

                    pairCount++;

                    // Add a line break after every two pairs
                    if (pairCount % 2 === 0) {
                        form.appendChild(document.createElement('br'));
                    }
                }

            }
            var button = document.createElement('button');
            button.textContent = 'Update';
            button.classList.add("btn","btn-primary");
            button.type = 'submit';
        
            // Append the button to the form
            form.appendChild(button);



        });
        actions.appendChild(updateButton);
        row.appendChild(actions);


        const deleteButton = document.createElement('button');
        deleteButton.classList.add('btn', 'btn-primary', 'mr-2');
        deleteButton.innerHTML = '<i class="fa fa-trash"></i>';
        deleteButton.title = "Delete";


        // Add click event listener for delete button
        deleteButton.addEventListener('click', async () => {
            // Implement delete functionality here

            let uuid = rowData.uuid;

            var requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ uuid: uuid }),
                redirect: 'follow'

            };
            await fetch('/deleteCustomer', requestOptions)
                .then(response => response.text())
                .then(result => { return result })
                .catch(error => console.log({error}))

            location.reload();
        });
        actions.appendChild(deleteButton);
        row.appendChild(actions);


        tbody.appendChild(row);
    });

    table.appendChild(tbody);

    // Append the table to the body of the document
    document.body.appendChild(table);
}




