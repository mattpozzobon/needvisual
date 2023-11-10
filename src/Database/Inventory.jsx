import { v4 as uuidv4 } from 'uuid';
import React, { createContext, useContext, useState } from 'react';

function getItemName(name){
    const modifiedString = name.replace(/\s+/g, '');
    return `Images/Items/${modifiedString}.gif`
}

function getItemPosition(updatedEquipment, itemID) {
  const objectInArray1 = updatedEquipment.find((item) => item.id === itemID);
  return updatedEquipment.indexOf(objectInArray1)
}


const Items = [
  { id: uuidv4(), name: "Leather Armor",      type: "armor",    equiped: false,   imageUrl: getItemName("Leather Armor")},
  { id: uuidv4(), name: "Plate Helmet",       type: "helmet",   equiped: false,   imageUrl: getItemName("Plate Helmet")},
  { id: uuidv4(), name: "Leather Helmet",     type: "helmet",   equiped: false,   imageUrl: getItemName("Leather Helmet")},
  { id: uuidv4(), name: "Life Ring",          type: "ring",     equiped: false,   imageUrl: getItemName("Life Ring")},
  { id: uuidv4(), name: "Power Ring",         type: "ring",     equiped: false,   imageUrl: getItemName("Power Ring")},
  { id: uuidv4(), name: "Plate Armor",        type: "armor",    equiped: false,   imageUrl: getItemName("Plate Armor")}
]

const MySlots = () => {
    const list = [
      { id: uuidv4(), type: "necklace",     item: null,                 imageUrl: "Images/InventorySlots/necklace.png" },
      { id: uuidv4(), type: "helmet",       item: Items[1],             imageUrl: "Images/InventorySlots/helmet.png" },
      { id: uuidv4(), type: "bag",          item: null,                 imageUrl: "Images/InventorySlots/backpack.png" },
      { id: uuidv4(), type: "left-hand",    item: null,                 imageUrl: "Images/InventorySlots/lefthand.png" },
      { id: uuidv4(), type: "armor",        item: null,                 imageUrl: "Images/InventorySlots/armor.png" },
      { id: uuidv4(), type: "right-hand",   item: null,                 imageUrl: "Images/InventorySlots/righthand.png" },
      { id: uuidv4(), type: "legs",         item: null,                 imageUrl: "Images/InventorySlots/legs.png" },
      { id: uuidv4(), type: "boots",        item: null,                 imageUrl: "Images/InventorySlots/boots.png" },
      { id: uuidv4(), type: "ring1",        item: null,                 imageUrl: "Images/InventorySlots/ring.png" },
      { id: uuidv4(), type: "ring2",        item: null,                 imageUrl: "Images/InventorySlots/ring.png" },
      { id: uuidv4(), type: "ring3",        item: null,                 imageUrl: "Images/InventorySlots/ring.png" },
      { id: uuidv4(), type: "ring4",        item: null,                 imageUrl: "Images/InventorySlots/ring.png" },
      { id: uuidv4(), type: "ring5",        item: null,                 imageUrl: "Images/InventorySlots/ring.png" },
      { id: uuidv4(), type: "backpack",     item: null,                 imageUrl: "Images/InventorySlots/empty.png" },
      { id: uuidv4(), type: "backpack",     item: Items[0],             imageUrl: "Images/InventorySlots/empty.png" },
      { id: uuidv4(), type: "backpack",     item: Items[3],             imageUrl: "Images/InventorySlots/empty.png" },
      { id: uuidv4(), type: "backpack",     item: Items[3],             imageUrl: "Images/InventorySlots/empty.png" },
      { id: uuidv4(), type: "backpack",     item: Items[4],             imageUrl: "Images/InventorySlots/empty.png" },
      { id: uuidv4(), type: "backpack",     item: Items[4],             imageUrl: "Images/InventorySlots/empty.png" },
      { id: uuidv4(), type: "backpack",     item: null,             imageUrl: "Images/InventorySlots/empty.png" },
      { id: uuidv4(), type: "backpack",     item: Items[2],             imageUrl: "Images/InventorySlots/empty.png" }
    ];

    for(let i = 0; i < 12; i++){
      list.push({id: uuidv4(), type: "backpack",   item: null,    imageUrl: "Images/InventorySlots/empty.png" })
    }

    return list;
}


const InventoryContext = createContext();

export function useInventory() {
  return useContext(InventoryContext);
}

export function InventoryProvider({ children }) {
  const [slots, setSlots] = useState(MySlots);




  function doubleClick(event){
    const slotFromPos = getItemPosition(slots,event.id);
    const fromType = slots[slotFromPos].item.type;
    const slotToPos = slots.indexOf((slots.find((slot) => slot.type === fromType || (fromType === "ring" && slot.type.includes("ring")))));
    doMagic(slotFromPos, slotToPos)
  }


  function moveItemFromTo(event) {
    if (event?.collisions?.length === 0) {
      return;
    }
    const slotFromPos = getItemPosition(slots, event.active.data.current.id);
    const slotToPos = getItemPosition(slots, event.over.id);
    doMagic(slotFromPos, slotToPos)
  }


  function doMagic(slotFromPos, slotToPos){
    const tempSlots = slots;

    const from = tempSlots[slotFromPos];
    const to = tempSlots[slotToPos];

    if (to.item === null && to.type === "backpack"){
      to.item = from.item;
      from.item = null;
    }
    else if (to.item !== null && to.type === "backpack"){
      if (from.type === "backpack" || from.item.type === to.item.type){
        const item = to.item;
        to.item = from.item;
        from.item = item;
      }
    }
    else if (to.item === null && to.type !== "backpack"){
      if (to.type === from.item.type || (to.type.includes("ring") && from.item.type === "ring")){
        to.item = from.item;
        from.item = null;
      }
    }
    else if (to.item !== null && to.type !== "backpack"){
      if (to.type === from.item.type || (to.type.includes("ring") && from.item.type === "ring")){
        const item = to.item;
        to.item = from.item;
        from.item = item;
      }
    }

    setSlots(tempSlots);
  }

  return (
      <InventoryContext.Provider value={{ slots, moveItemFromTo, doubleClick}}>
          {children}
      </InventoryContext.Provider>
  );
}



