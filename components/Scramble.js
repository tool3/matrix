import { useScramble } from "use-scramble";

const Scramble = () => {
    const { ref } = useScramble({
        text: "MATRIX",
        scramble: 10,
        speed: 0.3,
        step: 0.1
    });

    return <div className="scramble" ref={ref} />
}

export default Scramble;