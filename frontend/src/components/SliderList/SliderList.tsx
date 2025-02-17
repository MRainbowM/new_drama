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
    // Видимый элемент списка
    const [activeItem, setActiveItem] = useState(0);

    return (
        <div className={styles.root}>
            <SliderLeftContainer
                activeItem={activeItem}
                data={data}
            />
            <div className={styles.right}>
                {data.map((item, index) => (
                    <SliderItem
                        key={item.id}
                        onView={() => {
                            setActiveItem(index)
                        }}
                        data={item}
                        isActive={index == activeItem}
                    />
                ))}
            </div>
        </div>
    );
}