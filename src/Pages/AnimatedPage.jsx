import {motion} from "framer-motion";

const animations = {
    animate: {
        background: ["rgba(0,0,0,0)", "rgba(0,0,0,1)", "rgba(0,0,0,0)"],
        transition: { duration: 1, ease: "linear"},
    },
}

const AnimatedPage = ({children}) => {
    return (
        <motion.div variants={animations} animate="animate">
            {children}
        </motion.div>
    );
}

export default AnimatedPage