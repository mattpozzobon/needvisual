import {useDraggable} from '@dnd-kit/core';
import React, { useState } from 'react';
import ItemCard from './ItemCard';

export function Draggable(props) {
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: props.id,
        data: props.data
    }); 

    const [isHovered, setIsHovered] = useState(false);

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

    const handleDoubleClick = () => {
        if (props.onDoubleClick) {
          props.onDoubleClick(props.id);
        }
    };

    const handleMouseEnter = (obj) => {
        setIsHovered(true);
    }
      
    const handleMouseLeave = () => {
        //setIsHovered(false);
    }
    
    if (props.obj.item === null){
        return (
            <img src={props.obj.imageUrl} alt={props.obj.name} ref={setNodeRef} style={style} onDoubleClick={handleDoubleClick} {...listeners} {...attributes}>
            {props.children}
            </img>
        );
    }
    
    else {
        
        if (props.obj.item){
            return (
                <div className="image-container" onMouseEnter={() => handleMouseEnter(props.obj.item)} onMouseLeave={handleMouseLeave}>
                    <img src="Images/InventorySlots/empty.png" className="base-image"></img>
                    <img src={props.obj.item.imageUrl} alt={props.obj.item.name} className="overlay-image" ref={setNodeRef} style={style} onDoubleClick={handleDoubleClick} {...listeners} {...attributes}></img>
                    {props.children}
                
                </div>
            )
        }

        return (
            <div className="image-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <img src={props.obj.imageUrl} alt={props.obj.name} ref={setNodeRef} style={style} onDoubleClick={handleDoubleClick} {...listeners} {...attributes}>
                    {props.children}
                </img>
            </div>
            
            );
    }
  }


export default Draggable;

//<ItemCard isHovering={isHovered} item={props.obj.item}/>
