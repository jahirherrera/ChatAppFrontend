import type { starsName } from "../type"


export default function FiveStars({ amount, usernameFrom, usernameTo }: starsName) {
    const starCount = Number(amount) || 0;
    return (
        <>
            <div className="flex flex-col justify-center items-center">
                <p className="m-4 text-2xl text-[var(--text)]">@{usernameFrom}</p>

                <div className="flex gap-1">
                {[...Array(5)].map((_, i) => {
                    
                    const isFilled = i < starCount;

                    return (
                        <svg
                            key={i}
                            width="26"
                            height="26"
                            viewBox="0 0 24 24"
                            className={isFilled ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"}    
                            fill={isFilled ? "currentColor" : "none"}
                            stroke="var(--text)"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 
                                     9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                    );
                })}
            </div>
            </div>
        </>
    )
}