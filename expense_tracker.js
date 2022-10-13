

function changeRowIndexes(numExpenses){
    const table = document.querySelector(".expense-table");
    for (let i = 0; i < numExpenses; i++){
        table.rows[i].cells[0].innerHTML = (i + 1).toString();
    }
    return numExpenses;
}

function tableAddRow(table, numExpenses, expenseName, amount, date){
    let cell0;
    let cell1
    let cell2;
    let cell3;
    let cell4;

    let tableRow = table.insertRow(numExpenses);
    cell0 = tableRow.insertCell(0);
    cell1 = tableRow.insertCell(1);
    cell2 = tableRow.insertCell(2);
    cell3 = tableRow.insertCell(3);
    cell4 = tableRow.insertCell(4);
    //expenseList.appendChild(table);
    //console.log("Name: "+ expenseName.value + "\n");
    //console.log("Name: "+ date.value + "\n");
    //console.log("Name: "+ amount.value + "\n");
    cell0.innerHTML = (numExpenses + 1).toString();
    cell1.innerHTML = expenseName.value;
    cell2.innerHTML = amount.value;
    cell3.innerHTML = date.value;
    cell4.innerHTML = "<button class='delete'><i class='fa fa-close' style=\"font-size:48px\"></button>";
    tableRow.setAttribute("draggable", "true");
    tableRow.classList.add("draggable");

    return table;
}

window.addEventListener('load', () =>{
    const expenseInput = document.getElementById("new-expense-form");
    const expenseList = document.getElementById("expenses");//query selector because no id attribute,but class attribute
    const expenseName = document.getElementById("For");
    const amount = document.getElementById("Amount");
    const date = document.getElementById("date");

    let numExpenses = 0;

    let table = document.createElement("table");
    table.classList.add("expense-table");

    expenseList.appendChild(table);

    expenseInput.addEventListener('submit', (e) => {
        e.preventDefault();
        table = tableAddRow(table, numExpenses, expenseName, amount, date);
        numExpenses++;
        const deleteButtons = document.querySelectorAll(".delete");
        console.log(deleteButtons);
        deleteButtons.forEach(deleteButton => {
            /*
            deleteButton.addEventListener("click", function deleteHandler(e) {
                // do something
                console.log("DELETE" + e.target);
                td = e.target.parentNode.parentNode;//select event cell
                tr = td.parentNode;//parent row of cell
                if (tr.parentNode != null) {
                    tr.parentNode.removeChild(tr);
                    numExpenses--;
                    numExpenses = changeRowIndexes(numExpenses);
                }
                deleteButton.removeEventListener("click", deleteHandler, true);
            }, true);
            */

            deleteButton.addEventListener('click', (e) => {
                console.log("DELETE" + e.target);
                let td = e.target.parentNode.parentNode;//select event cell
                let tr = td.parentNode;//parent row of cell
                if (tr.parentNode != null) {
                    tr.parentNode.removeChild(tr);
                    numExpenses--;
                    numExpenses = changeRowIndexes(numExpenses);
                }
            });
        });

        /*Drag and drop start*/
        const container =  document.querySelector(".expense-table");
        const draggables = document.querySelectorAll(".draggable");
        let afterElement;

        draggables.forEach(draggable => {
            //console.log("dragstart0000\n");
            draggable.addEventListener('dragstart', (e) => {
                console.log("dragstart\n");
                draggable.classList.add("dragging");
            });

            draggable.addEventListener('dragend', (e) => {
                console.log("dragstop\n");
                //swap elements returned from drop function
                if (afterElement == null){
                    container.appendChild(draggable);
                    console.log("append\n");
                }else {
                    //container.insertBefore(draggable, afterElement);
                    console.log("insertBefore\n");
                    const temp = afterElement;
                    afterElement = draggable;
                    draggable = temp;
                }
                draggable.classList.remove("dragging");
            });
        });


        container.addEventListener('dragover', (e) => {
            e.preventDefault();
            afterElement = drop(container, e.clientY);
        });


        function  drop(container, y){
            const nonDragElements = [...container.querySelectorAll(".draggable:not(.dragging)")];//create and array
            return nonDragElements.reduce((closest, child) => {
                const box =  child.getBoundingClientRect();
                const offset = y - box.top - box.height / 2;
                console.log(offset);

                if (offset < 0 && offset > closest.offset){//closest.offset = negative infinity
                    //console.log("returned\n");
                    return {offset:offset , element: child};//offset:offset is current offset child current element
                }
                else {
                    //console.log("iterating");
                    return closest;
                }
            }, {offset: Number.NEGATIVE_INFINITY}).element;
        }
        /*Drag and drop end*/
    });
});




