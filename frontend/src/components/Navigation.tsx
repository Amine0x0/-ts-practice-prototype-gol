import { motion } from 'motion/react'

const navItems = [
    { label: 'Research_', href: '#research' },
    { label: 'POC_', href: '#poc' },
    { label: 'Brain_', href: '#brain' },
]

const containerVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2,
        },
    },
}

const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: 'easeOut' },
    },
}

export function Navigation() {
    return (
        <motion.nav
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-black px-3 py-2  overflow-hidden"
        >
            <ul className="flex flex-row items-center justify-center gap-20 font-mono text-lg tracking-wider">
                {navItems.map((item) => (
                    <motion.li key={item.label} variants={itemVariants}>
                        <motion.a
                            href={item.href}
                            initial="rest"
                            whileHover="hover"
                            whileTap={{ scale: 0.95 }}
                            className="relative inline-block px-6 py-3 font-medium text-white group focus:outline-none"
                        >
                        <svg
                                className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
                                preserveAspectRatio="none"
                            >
                                <motion.rect
                                    x="0"
                                    y="0"
                                    width="100%"
                                    height="100%"
                                    rx="0"
                                    ry="0"
                                    fill="transparent"
                                    stroke="#d7ff00"
                                    strokeWidth="2"
                                    strokeDasharray="600"
                                    variants={{
                                        rest: {
                                            strokeDashoffset: 600,
                                            transition: { duration: 0.4, ease: 'easeInOut' }
                                        },
                                        hover: {
                                            strokeDashoffset: 0,
                                            transition: { duration: 1.2, ease: 'linear', repeat: 1 }
                                        }
                                    }}
                                />
                            </svg>

                            <motion.div
                                className="absolute inset-0 bg-[#d7ff00]"
                                variants={{
                                    rest: { opacity: 0, scale: 0.95 },
                                    hover: { opacity: 1, scale: 1 }
                                }}
                                transition={{ duration: 0.2, ease: 'easeOut' }}
                            />

                            <motion.span
                                variants={{
                                    rest: { color: '#ffffff' },
                                    hover: { color: '#000000' }
                                }}
                                transition={{ duration: 0.2 }}
                                className="relative z-10"
                            >
                                {item.label}
                            </motion.span>
                        </motion.a>
                    </motion.li>
                ))}
            </ul>
        </motion.nav>
    )
}