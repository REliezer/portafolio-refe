// tailwind/animations.js
module.exports = {
    animation: {
        fade: "fadeIn 1000ms both",
        fadeUp: "fadeInUp 1000ms both",
        fadeDown: "fadeInDown 1000ms both",
        fadeRight: "fadeInRight 1000ms both",
        fadeLeft: "fadeInLeft 1000ms both",
        scale: "scaleOut 1000ms both",
        twinkle: "twinkle 5s infinite ease-in-out",
        cycleBg: "cycleBg 60s ease infinite",
        updown: "updown 3s linear infinite",
        blinkCursor: "blink-cursor 0.8s infinite",
    },
    keyframes: {
        fadeIn: {
            "0%": { opacity: 0 },
            "100%": { opacity: 1 },
        },
        fadeInUp: {
            "0%": { opacity: 0, transform: "translateY(2rem)" },
            "100%": { opacity: 1, transform: "translateY(0)" },
        },
        fadeInDown: {
            "0%": { opacity: 0, transform: "translateY(-2rem)" },
            "100%": { opacity: 1, transform: "translateY(0)" },
        },
        fadeInRight: {
            "0%": { opacity: 0, transform: "translateX(-2rem)" },
            "100%": { opacity: 1, transform: "translateX(0)" },
        },
        fadeInLeft: {
            "0%": { opacity: 0, transform: "translateX(2rem)" },
            "100%": { opacity: 1, transform: "translateX(0)" },
        },
        scaleOut: {
            "0%": { opacity: 0, transform: "scale(0.5)" },
            "100%": { opacity: 1, transform: "scale(1)" },
        },
        // Star Background
        twinkle: {
            "0%, 20%, 100%": { opacity: 1 },
            "10%": { opacity: 0.25 },
        },
        // Cycle Background
        cycleBg: {
            "0%, 100%": { backgroundPosition: "0% 50%" },
            "50%": { backgroundPosition: "100% 50%" },
        },
        // Up and Down Animation
        updown: {
            "0%, 100%": { transform: "translateY(-20px)" },
            "50%": { transform: "translateY(20px)" },
        },
        // Cursor Blink Animation
        blinkCursor: {
            "0%, 100%": { opacity: 0 },
            "50%": { opacity: 1 },
        },
    },
};
