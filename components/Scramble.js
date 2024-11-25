import { useScramble } from "use-scramble";

const Scramble = () => {
    // hook returns a ref
    const { ref } = useScramble({
        text: "Matrix",
        ignore: [" ", "_"],
        scramble: 10,
        speed: 0.3,
        step: 0.1
    });

    // apply the ref to a node
    return <div className="scramble" ref={ref} />
}

export default Scramble;