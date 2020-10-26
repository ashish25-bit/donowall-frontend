import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const sliderVariant = {
    initial: {
        y: '-100vh'
    },
    final: {
        y: 0,
        transition: {
            type: 'tween',
            duration: 0.5,
            ease: 'easeInOut'
        }
    },
    exit: {
        y: "-100vh",
        duration: 2,
    }
};

const Slider = ({ isOpen }) => {
    return (
        <AnimatePresence>
            { isOpen && <motion.div 
                className='slider'
                variants={sliderVariant}
                initial="initial"
                animate="final"
                exit='exit'
                ></motion.div>
            }
        </AnimatePresence>
    )
}

export default Slider;
