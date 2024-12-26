'use client'
import styles from './SliderList.module.scss'
import React, { useState } from 'react';
import SliderItem from '../SliderItem/SliderItem';
import SliderLeftContainer from '../SliderLeftContainer/SliderLeftContainer';
import { components } from '../../api/schema'

interface SliderListProps {
    data: components['schemas']['InfoBlockOutSchema'][]
}

export default function SliderList(
    { data }: SliderListProps
) {

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