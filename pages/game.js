import styles from '../styles/Game.module.scss'
import { useRouter } from 'next/router'
import React, { useState, useRef } from 'react'
const chroma = require('chroma-js')

export default function Game() {
    const router = useRouter()
    const {firstColor, secondColor} = router.query;
    const [dragId, setDragId] = useState();
    const [count, setCount] = useState(0);
    const tints = useRef(null);
    let idColor = 0;
    const colorsScale = chroma.scale([firstColor, secondColor]).mode('lch').colors(9);
    let palette = [];
    let finalPalette = [];
    let nonMoveabledBlocks = [];
    let moveabledBlocks = [];

    for (let i=0; i<54; i++) {
        if ((i%6 === 0) || (i === 5) || (i%6 === 5)) {
            nonMoveabledBlocks.push(i);
        } else {
            moveabledBlocks.push(i);
        }
    }

    colorsScale.map(color => {
        for (let i=0; i<6; i++) {
            let rand = Math.floor(Math.random()*moveabledBlocks.length)
            let order;

            if (nonMoveabledBlocks.includes(idColor)) {
                order = idColor
            } else {
                order = moveabledBlocks.splice(rand, 1)
            }

            let obj = {
                id: idColor,
                order: order,
                color: chroma(color).brighten(0.4 * i).hex()
            };
            palette.push(obj)
            idColor++
        };
    });

    colorsScale.map(color => {
        for (let i=0; i<6; i++) {
            let obj = {
                id: idColor,
                order: idColor,
                color: chroma(color).brighten(0.4 * i).hex()
            };
            finalPalette.push(obj)
            idColor++
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
      };

      const handleDrangEnd = () => {
        let ids = [];
        boxes.map(el => (
            ids.push(parseInt(el.id))
        ))
        if (isSorted(ids)) {
            alert('BRAAVOOOO');
        };
      }

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
                        onDragEnd={handleDrangEnd}
                        style={{ backgroundColor: box.color}}
                    ></div>
                ))}
            </div>
            <span>{count}</span>
        </main>
    )
}