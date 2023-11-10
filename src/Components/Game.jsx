import React from 'react';
import Droppable from './Droppable';
import {DndContext} from '@dnd-kit/core';
import { useInventory } from '../Database/Inventory';
import './Game.css'; 

export function Game() {
  const { slots, moveItemFromTo } = useInventory();

  function chunks(array, size) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }

  return (
    <DndContext onDragEnd={moveItemFromTo}>

      <div className='backpack'>
        {chunks(slots.filter(slot => slot.type === "backpack"), 5).map((rowSlots, rowIndex) => (
          <div className='backpack-row' key={rowIndex}>
            {rowSlots.map((slot) => (
              <Droppable data={'backpack'} key={slot.id} id={slot.id} slot={slot}></Droppable>
            ))}
          </div>
        ))}
      </div>
    
      <div className='inventory'>
        {chunks(slots.filter(slot => !slot.type.includes('backpack') && !slot.type.includes('ring') && slot.type !== "boots"), 3).map((rowSlots, rowIndex) => (
          <div className='inventory-row' key={rowIndex}>
            {rowSlots.map((slot) => (
              <Droppable data={'inventory'} key={slot.id} id={slot.id} slot={slot}></Droppable>
            ))}
          </div>
        ))}

        <div className='inventory-boots boots-row'>
          {slots.filter(slot => slot.type === 'boots').map((slot) => (
            <Droppable data={'inventory'} key={slot.id} id={slot.id} slot={slot}></Droppable>
          ))}
        </div>
      
        {slots.filter(slot => slot.type.includes('ring')).length > 0 && (
          <div className='inventory-row ring-row'>
            {slots.filter(slot => slot.type.includes('ring')).map((slot) => (
              <Droppable data={'inventory'} key={slot.id} id={slot.id} slot={slot}></Droppable>
            ))}
          </div>
        )}
      </div>

    </DndContext>
  );
}

export default Game;