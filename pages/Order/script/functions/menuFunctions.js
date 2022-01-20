// import { addCrud } from '../Data/eventListeners.js';
let addOperation = document.querySelector('.operation-add');
let categories = document.querySelector('.categories');
export function menuSelection(menu, id) {
    if (menu.classList.contains("active")) {
        document.querySelector(`${id}`).style.display = "none";
        menu.classList.remove("active");
    }
}

export function selectedMenu(menu, id) {
    document.querySelector(id).style.display = "block";
    document.querySelector(id).classList.add("menuAnimation");
    menu.classList.add("active");
}
export function crudSelection(menu) {
    if (menu.classList.contains("active")) {
        menu.classList.remove("active");
    }
    categories.classList.remove("crud-active");
    categories.classList.remove("update-active");
    addOperation.classList.remove('crud-active');


}
export function selectedCRUD(menu, id) {
    menu.classList.add("active");
    categories.classList.add("crud-active");
    if (id == 'add') {
        addOperation.classList.add('crud-active');
    } else if (id == 'update') {
        categories.classList.add('update-active')
    } else {
    }
}
export function crudfn(crud1, id1, crud2, id2, crud3, id3) {
    crudSelection(crud1, id1);
    crudSelection(crud2, id2);
    selectedCRUD(crud3, id3);
}
export function menuFn(menu1, id1, menu2, id2, menu3, id3, menu4, id4) {

    menuSelection(menu1, id1);
    menuSelection(menu2, id2);
    menuSelection(menu3, id3);
    selectedMenu(menu4, id4);


}
