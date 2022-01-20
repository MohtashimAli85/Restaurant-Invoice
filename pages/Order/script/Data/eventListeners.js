
export const menuOne = document.querySelector(".menu1"),
    menuTwo = document.querySelector(".menu2"),
    menuThree = document.querySelector(".menu3"),
    menuFour = document.querySelector(".menu4");
export const amenuOne = document.querySelector(".amenu1"),
    amenuTwo = document.querySelector(".amenu2"),
    amenuThree = document.querySelector(".amenu3"),
    amenuFour = document.querySelector(".amenu4");
export const addCrud = document.querySelector(".crud .add"), updateCrud = document.querySelector(".crud .update"),
    delCrud = document.querySelector(".crud .delete");
export let muttonDB = [], chickenDB = [], drinksDB = [], sideOrderDB = [];
export let menuListenerArr = [
    {
        Vname: menuOne,
        args: [menuTwo, "#menu2", menuThree, "#menu3", menuFour, "#menu4", menuOne, "#menu1"],
        menuName: "mutton",
        menuArr: muttonDB
    },
    {
        Vname: menuTwo,
        args: [menuOne, "#menu1", menuThree, "#menu3", menuFour, "#menu4", menuTwo, "#menu2"],
        menuName: "chicken",
        menuArr: chickenDB
    },
    {
        Vname: menuThree,
        args: [menuOne, "#menu1", menuTwo, "#menu2", menuFour, "#menu4", menuThree, "#menu3"],
        menuName: "drinks",
        menuArr: drinksDB
    },
    {
        Vname: menuFour,
        args: [menuOne, "#menu1", menuTwo, "#menu2", menuThree, "#menu3", menuFour, "#menu4"],
        menuName: "sideOrder",
        menuArr: sideOrderDB
    }
];

export let adminMenuListenerArr = [
    {
        Vname: amenuOne,
        args: [amenuTwo, "#adminMenu2", amenuThree, "#adminMenu3", amenuFour, "#adminMenu4", amenuOne, "#adminMenu1"],
        menuName: "mutton",
        menuArr: muttonDB
    },
    {
        Vname: amenuTwo,
        args: [amenuOne, "#adminMenu1", amenuThree, "#adminMenu3", amenuFour, "#adminMenu4", amenuTwo, "#adminMenu2"],
        menuName: "chicken",
        menuArr: chickenDB
    },
    {
        Vname: amenuThree,
        args: [amenuOne, "#adminMenu1", amenuTwo, "#adminMenu2", amenuFour, "#adminMenu4", amenuThree, "#adminMenu3"],
        menuName: "drinks",
        menuArr: drinksDB
    },
    {
        Vname: amenuFour,
        args: [amenuOne, "#adminMenu1", amenuTwo, "#adminMenu2", amenuThree, "#adminMenu3", amenuFour, "#adminMenu4"],
        menuName: "sideOrder",
        menuArr: sideOrderDB
    }
];
export let adminCRUDList = [
    {
        Vname: addCrud,
        args: [updateCrud, 'update', delCrud, 'delete', addCrud, 'add']
    },
    {
        Vname: updateCrud,
        args: [delCrud, 'delete', addCrud, 'add', updateCrud, 'update']
    },
    {
        Vname: delCrud,
        args: [updateCrud, 'update', addCrud, 'add', delCrud, 'delete']
    }
]
