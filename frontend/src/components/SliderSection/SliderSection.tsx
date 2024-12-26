'use client'
import SliderItem from '../SliderItem/SliderItem';
import styles from './SliderSection.module.scss'
import React, { useRef, useState } from 'react';

import SliderLeftContainer from '../SliderLeftContainer/SliderLeftContainer';

export default function SliderSection() {

    const [activeItem, setActiveItem] = useState(0)


    return (

        <section className={styles.root}>
            <div className={styles.container}>
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
        </section>
        // <div className={styles.root}>
        //     <Parallax 
        //         pages={3}
        //         style={{ width: 'calc(100% - var(--container-margin-lr) * 2);' }}
        //     >
        //         <ParallaxLayer sticky={{ start: 0, end: 2 }}  >
        //             <div className={styles.left}>
        //                 <p>I'm a sticky layer</p>
        //                 {activeItem}
        //             </div>
        //         </ParallaxLayer>

        //         <ParallaxLayer offset={0} speed={0} >
        //             <SliderItem
        //                 onView={() => {
        //                     setActiveItem(0)
        //                 }}
        //                 color='yellow'
        //                 title='ресторан «премьера»'
        //             />
        //         </ParallaxLayer>

        //         <ParallaxLayer offset={1} speed={0} >
        //             <SliderItem
        //                 onView={() => {
        //                     setActiveItem(1)
        //                 }}
        //                 color='blue'
        //                 title='аренда'
        //             />
        //         </ParallaxLayer>

        //         <ParallaxLayer offset={2} speed={0} >
        //             <SliderItem
        //                 onView={() => {
        //                     setActiveItem(2)
        //                 }}
        //                 color='green'
        //                 title='qwewq'
        //             />
        //         </ParallaxLayer>
        //     </Parallax>
        // </div>

    );
}