import { useState, useEffect } from "react"

export default function Theme() {

    const [color1, setColor1] = useState<string>(localStorage.getItem("color1") || "slate-500");

    const colors = [
        "red-500",
        "orange-500",
        "amber-500",
        "yellow-500",
        "lime-500",
        "green-500",
        "emerald-500",
        "teal-500",
        "cyan-500",
        "sky-500",
        "blue-500",
        "indigo-500",
        "violet-500",
        "purple-500",
        "fuchsia-500",
        "pink-500",
        "rose-500",
        "slate-500",
        "gray-500",
        "zinc-500",
        "neutral-500",
        "stone-500",
        "black",
        "white",
    ];

    useEffect(() => {
        localStorage.setItem("color1", `${color1}`)
    }, [color1])

    return (
        <>
            <div className={`p-6 bg-${color1}`}>
                <section className="mb-3">
                    <p className="text-xl mb-3">Primary Color</p>
                    <div className="flex flex-wrap gap-2 ">
                        {colors.map((color) => (
                            <div
                                key={color}
                                className={`w-6 h-6 rounded border bg-${color} cursor-pointer`}
                                onClick={() => setColor1(color)}
                            ></div>
                        ))}
                        

                    </div>
                    <button>Set Default</button>
                </section>
                <section className="mb-3">
                    <p className="text-xl mb-3">Secundary Color</p>
                    <div className="flex flex-wrap gap-2 ">
                        {colors.map((color) => (
                            <div
                                key={color}
                                className={`w-6 h-6 rounded border bg-${color} cursor-pointer`}
                                onClick={() => setColor1(color)}
                            ></div>
                        ))}


                    </div>
                </section>
                <button>
                    Add Background Image
                </button>
            </div>
        </>
    )
}