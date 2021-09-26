export const takeAway = document.querySelector(".takeAway");
export const categories = document.querySelector(".categories");
export const orderSelection = document.querySelector(".orderSelection");
export const tableOrder = document.querySelector(".tableOrder");
export const carOrder = document.querySelector(".carOrder");
export let reserveTableBtn = document.querySelector(".reserveTable");
export let orderNowBtn = document.querySelector(".orderNow");
export const assignTables = document.querySelector(".tables");
export const car = document.querySelector(".car");
export let backBtnArr = [
  {
    vname: categories,
    value: "block",
    command: "add",
    class: "animation",
  },
  {
    vname: orderSelection,
    value: "none",
    command: "add",
    class: "animation",
  },
  {
    vname: reserveTableBtn,
    value: "none",
    command: "remove",
    class: "reserveActive",
  },
  {
    vname: orderNowBtn,
    value: "block",
    command: "",
    class: "",
  },
  {
    vname: tableOrder,
    value: "none",
    command: "",
    class: "",
  },
  {
    vname: carOrder,
    value: "none",
    command: "",
    class: "",
  },
  {
    vname: car,
    value: "",
    command: "remove",
    class: "active",
  },
  {
    vname: takeAway,
    value: "",
    command: "remove",
    class: "active",
  },
  {
    vname: assignTables,
    value: "",
    command: "remove",
    class: "active",
  },
];
