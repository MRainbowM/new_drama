'use client'
import styles from './SliderList.module.scss'
import React, { useRef, useState } from 'react';
import SliderItem from '../SliderItem/SliderItem';
import SliderLeftContainer from '../SliderLeftContainer/SliderLeftContainer';

export default function SliderList() {

    const [activeItem, setActiveItem] = useState(0)

    return (
        <div className={styles.root}>
            <SliderLeftContainer
                activeItem={activeItem}
            />
            <div className={styles.right}>

                <SliderItem
                    onView={() => {
                        setActiveItem(0)
                    }}
                    color='yellow'
                    title='ресторан «премьера»'
                />

                <SliderItem
                    onView={() => {
                        setActiveItem(1)
                    }}
                    color='blue'
                    title='аренда'
                />
                <SliderItem
                    onView={() => {
                        setActiveItem(2)
                    }}
                    color='green'
                    title='qwewq'
                />

            </div>
        </div>
    );

}