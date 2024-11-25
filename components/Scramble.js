import { useScramble } from "use-scramble";

const Scramble = () => {
    const { ref } = useScramble({
        text: "Matrix",
        scramble: 20,
        speed: 0.3,
        step: 0.1
    });

    return <div className="scramble" ref={ref} />
}

export default Scramble;