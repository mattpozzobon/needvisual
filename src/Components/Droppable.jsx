import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import Draggable from './Draggable';
import './Game.css'; 
import { useInventory } from '../Database/Inventory';

export function Droppable(props) {
  const { doubleClick } = useInventory();
  const slot = props.slot;

  const {isOver, setNodeRef} = useDroppable({
    id: props.id,
    data: props.data
  });

  function draggableItem(obj) {
    return <Draggable data={obj} obj={obj} key={obj.id} id={obj.id} onDoubleClick={() => doubleClick(obj)}></Draggable>;
  }

  const style = {
    backgroundColor: isOver ? 'red' : undefined
  };


  return (
    <div className="slotSquare" ref={setNodeRef} style={style}>
      {slot.item === null ? <img src={slot.imageUrl} alt={`Slot ${slot.id}`} /> : draggableItem(slot)}
      {props.children}
    </div>
  );
}

export default Droppable;
