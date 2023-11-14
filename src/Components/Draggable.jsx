import {useDraggable} from '@dnd-kit/core';
import React, { useState } from 'react';
import ItemCard from './ItemCard';
import { useInventory } from '../Database/Inventory';


export function Draggable(props) {
    const item = props.obj.item;
    const {isDragging, attributes, listeners, setNodeRef, transform} = useDraggable({
        id: props.id,
        data: props.data,
    }); 

    const { doubleClick, isItemEquipped } = useInventory();
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);
    
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

    function EquippedItem(item) {
        return (
            <div className="equipped-item">
                {isDragging ? 
                <img src={`Images/InventorySlots/${item.type}.png`} className="base-image" alt={`${item.type} slot`} />
                :
                <img src={`Images/InventorySlots/empty.png`} className="base-image" alt={`${item.type} slot`} />
                }
                <img src={item.imageUrl} alt={item.name} className="overlay-image" ref={setNodeRef} style={style} {...listeners} {...attributes} />
            </div>
        );
    }

    function NotEquippedItem(item) {
        return (
            <div className="equipped-item">
                <img src={`Images/InventorySlots/empty.png`} className="base-image" alt={`${item.type} slot`} />
                <img src={item.imageUrl} alt={item.name} className="overlay-image" ref={setNodeRef} style={style} {...listeners} {...attributes} />
            </div>
        );
    }

    if (item === null){
        return (
            <img src={item.imageUrl}></img>
        );
    }

    return (
        <div className="image-container" onMouseEnter={() => handleMouseEnter()} onMouseLeave={() => handleMouseLeave()} onDoubleClick={() => doubleClick(props.obj)}>
            {isItemEquipped(item.id) ? NotEquippedItem(item) : EquippedItem(item)}
            {props.children}
        </div>
    )  
}

export default Draggable;


//<ItemCard isHovering={isHovered} item={props.obj.item}/>
