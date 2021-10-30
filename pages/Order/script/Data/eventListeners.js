
export const menuOne = document.querySelector(".menu1"),
    menuTwo = document.querySelector(".menu2"),
    menuThree = document.querySelector(".menu3"),
    menuFour = document.querySelector(".menu4");
export const amenuOne = document.querySelector(".amenu1"),
    amenuTwo = document.querySelector(".amenu2"),
    amenuThree = document.querySelector(".amenu3"),
    amenuFour = document.querySelector(".amenu4");
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

export let adminMenuListenerArr = [
    {
        Vname: amenuOne,
        args: [amenuTwo, "#adminMenu2", amenuThree, "#adminMenu3", amenuFour, "#adminMenu4", amenuOne, "#adminMenu1"]
    },
    {
        Vname: amenuTwo,
        args: [amenuOne, "#adminMenu1", amenuThree, "#adminMenu3", amenuFour, "#adminMenu4", amenuTwo, "#adminMenu2"]
    },
    {
        Vname: amenuThree,
        args: [amenuOne, "#adminMenu1", amenuTwo, "#adminMenu2", amenuFour, "#adminMenu4", amenuThree, "#adminMenu3"]
    },
    {
        Vname: amenuFour,
        args: [amenuOne, "#adminMenu1", amenuTwo, "#adminMenu2", amenuThree, "#adminMenu3", amenuFour, "#adminMenu4"]
    }
]
