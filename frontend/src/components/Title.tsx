import { motion } from 'motion/react'

export function Title() {
    const text = "vault";

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.12,
            },
        },
    };

    const letterVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    const cursorVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: [1, 0, 1],
            transition: {
                duration: 1.2,
                repeat: Infinity,
                ease: 'easeInOut',
            },
        },
    };

    return (
        <div id='top-section' className='flex flex-row justify-center items-center'>
        <motion.h1
            id="main-title"
            className="text-[80px] bg-black px-6 py-2 leading-none p-5 border-[#434343] border-1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
                {text.split('').map((char, index) => (
                    <motion.span key={index} variants={letterVariants}>
                        <b>{char}</b>
                    </motion.span>
                ))}

                <motion.span className="text-[#ff1f3d]" variants={cursorVariants}>
                    _
                </motion.span>
            </motion.h1>
        </div>
    )
}