import {motion} from "framer-motion";

const animations = {
    animate: {
        background: ["rgba(0,0,0,0)", "rgba(0,0,0,1)", "rgba(0,0,0,0)"],
    },
}

const AnimatedPage = ({children}) => {
    return (
        <motion.div variants={animations} animate="animate" transition={{duration: 1}}>
            {children}
        </motion.div>
    );
}

export default AnimatedPage