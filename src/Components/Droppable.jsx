import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import Draggable from './Draggable';
import './Game.css'; 
import { useInventory } from '../Database/Inventory';

export function Droppable(props) {
  const slot = props.slot;
  const { getSlotInformation } = useInventory();

  const {active, over, isOver, setNodeRef} = useDroppable({
    id: props.id,
    data: props.data
  });

  function draggableItem(obj) {
    return <Draggable data={obj} obj={obj} key={obj.id} id={obj.id} />;
  }

  function getColour() {
    if (active?.id && over?.id) {
      const slotDrag = getSlotInformation(active.id);
      const slotOver = getSlotInformation(over.id);

      if (slotOver.id === slotDrag.id) {
        return ""; 
      } 

      if (slotOver.type === "backpack" && slotOver.item === null) {
          return "green"; 
      } 
      else if (slotOver.type === "backpack" && slotOver.item !== null){
          return "yellow"; 
      }
      else if (slotOver.type === slotDrag.item.type || slotOver.type.includes("ring")){
        if (slotOver.item === null) return "green"; 
        if (slotOver.item != null) return "yellow"; 
      }
    }
    return "red"; 
  }

  const style = {
    backgroundColor: isOver ? getColour() : undefined
  };




  return (
    <div className="slotSquare" ref={setNodeRef} style={style}>
      {slot.item === null ? <img src={slot.imageUrl} alt={`Slot ${slot.id}`} /> : draggableItem(slot)}
      {props.children}
    </div>
  );
}

export default Droppable;
