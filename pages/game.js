import styles from '../styles/Game.module.scss'
import { useRouter } from 'next/router'
import React, { useState, useRef } from 'react'
const chroma = require('chroma-js');

export default function Game() {
    const router = useRouter()
    const {firstColor, secondColor} = router.query;
    const [dragId, setDragId] = useState();
    const [count, setCount] = useState(0);
    const tints = useRef(null);
    let idColor = 0;

    const colorsScale = chroma.scale([firstColor, secondColor]).mode('lch').colors(9);
    let palette = [];

    colorsScale.map(color=> {
        for (let i=0; i<6; i++) {
            let obj = {
                id: idColor,
                order: idColor,
                color: chroma(color).brighten(0.4 * i).hex()
            };
            palette.push(obj);
            idColor++;
        };
    });
    const [boxes, setBoxes] = useState(palette);

    const isSorted = arr => arr.every((v,i,a) => !i || a[i-1] <= v);

    const handleDrag = (ev) => {
        setDragId(ev.currentTarget.id);
    };

    const handleDrop = (ev) => {
        const dragBox = boxes.find((box) => box.id == dragId);
        const dropBox = boxes.find((box) => box.id == ev.currentTarget.id);

        const dragBoxOrder = dragBox.order;
        const dropBoxOrder = dropBox.order;

        const newBoxState = boxes.map((box) => {
          if (box.id == dragId) {
            box.order = dropBoxOrder;
          }
          if (box.id == ev.currentTarget.id) {
            box.order = dragBoxOrder;
          }
          return box;
        });
    
        setBoxes(newBoxState);
        setCount(count + 1);

        let children = Array.prototype.slice.call(tints.current.children);
        let ids = [];
        children.map(child => (
            ids.push(parseInt(child.id))
        ))
        if (isSorted(ids)) {
            alert('BRAAVOOOO');
        };
      };

    return (
        <main>
            <h1>Lets go</h1>
            <p>First color: {firstColor}</p>
            <p>Second color: {secondColor}</p>
            <div ref={tints} className={styles.puzzleWrapper}>
                {boxes
                .sort((a, b) => a.order - b.order)
                .map(box => (
                    <div
                        key={box.id}
                        id={box.id}
                        className={styles.tint}
                        draggable={true}
                        onDragOver={(ev) => ev.preventDefault()}
                        onDragStart={handleDrag}
                        onDrop={handleDrop}
                        style={{ backgroundColor: box.color}}
                    >{box.order}</div>
                ))}
            </div>
            <span>{count}</span>
        </main>
    )
}