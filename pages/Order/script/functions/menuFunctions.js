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
export function menuFn(menu1, id1, menu2, id2, menu3, id3, menu4, id4) {
    menuSelection(menu1, id1);
    menuSelection(menu2, id2);
    menuSelection(menu3, id3);
    selectedMenu(menu4, id4);
}