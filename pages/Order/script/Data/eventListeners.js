
export const menuOne = document.querySelector(".menu1"),
    menuTwo = document.querySelector(".menu2"),
    menuThree = document.querySelector(".menu3"),
    menuFour = document.querySelector(".menu4");
export let menuListenerArr = [
    {
        Vname: menuOne,
        args: [menuTwo, "#menu2", menuThree, "#menu3", menuFour, "#menu4", menuOne, "#menu1"]
    },
    {
        Vname: menuTwo,
        args: [menuOne, "#menu1", menuThree, "#menu3", menuFour, "#menu4", menuTwo, "#menu2"]
    },
    {
        Vname: menuThree,
        args: [menuOne, "#menu1", menuTwo, "#menu2", menuFour, "#menu4", menuThree, "#menu3"]
    },
    {
        Vname: menuFour,
        args: [menuOne, "#menu1", menuTwo, "#menu2", menuThree, "#menu3", menuFour, "#menu4"]
    }
];
