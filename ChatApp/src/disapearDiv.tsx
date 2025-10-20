import { useState, useEffect } from "react";


type DisappearingDivProps = {
    text: string;
};

export default function DisappearingDiv({ text }: DisappearingDivProps) {
    const [visible, setVisible] = useState(true);
    const [opacity, setOpacity] = useState(100)

    useEffect(() => {
        function changeOpacity() {
            setOpacity((prevOpacity) => {
                if (prevOpacity <= 0) {
                    setVisible(false);
                    return 0;
                }
                const newOpacity = prevOpacity - 1;
                return newOpacity;
            });
        }

        const timer = setTimeout(function fade() {
            changeOpacity();
            if (opacity > 0) {
                setTimeout(fade, 15);
            }
        }, 100);

        return () => clearTimeout(timer);
    }, [opacity]);


    if (!visible) return null;

    return (

        <div className={`fixed top-0 left-0 w-full h-full flex justify-center items-center text-white `} style={{ opacity: opacity / 100 }}>
            <div className="w-full max-w-sm p-6 bg-[#36393f] text-white rounded-xl shadow-2xl border border-gray-700 flex items-center justify-center text-center ">
                {text}
            </div>
        </div>
    );
}