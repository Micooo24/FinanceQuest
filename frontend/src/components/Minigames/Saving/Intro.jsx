    import { useState, useEffect } from "react";
    import { Box, Typography, Button } from "@mui/material";
    import { motion, AnimatePresence } from "framer-motion";
    import { useNavigate } from "react-router-dom";
    import Gameplay from './JobCarousel'; // Adjust the import path as necessary

    function IntroBudget() {
    const [startGame, setStartGame] = useState(false);
    const [showNarration, setShowNarration] = useState(false);
    const [narrationIndex, setNarrationIndex] = useState(0);
    const [stopNarration, setStopNarration] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);
    const [showGameplay, setShowGameplay] = useState(false);
    const [buttonsFadeOut, setButtonsFadeOut] = useState(false);
    const navigate = useNavigate();

    const narrationTexts = [
        "You have 5,000 pesos to survive the month.",
        "Unexpected expenses will arise.",
        "You have to make choices to survive.",
        "Finding a job is an option. But is it enough?",
        "You can quit anytime.",
        "But are you prepared for the reality ahead?"
    ];

    const handleStartGame = () => {
        setStartGame(true);
        setTimeout(() => {
        setShowNarration(true);
        }, 1500);
    };

    const handleButtonClick = (action) => {
        setStopNarration(true);
        setFadeOut(true);
        setButtonsFadeOut(true);
        setTimeout(() => {
        if (action === 'job') {
            setShowNarration(false);
            setShowGameplay(true);
        } else if (action === 'quit') {
            navigate('/menu');
        }
        }, 1200);
    };

    useEffect(() => {
        if (showNarration && !stopNarration) {
        const interval = setInterval(() => {
            setFadeOut(true);
            setTimeout(() => {
            setNarrationIndex((prevIndex) => {
                if (prevIndex === narrationTexts.length - 1) {
                return prevIndex; // Stop incrementing on the last narration
                }
                return prevIndex + 1;
            });
            setFadeOut(false);
            }, 1200);
        }, 3000);
        return () => clearInterval(interval);
        }
    }, [showNarration, stopNarration]);

    return (
        <Box
        sx={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            background: "linear-gradient(180deg, #000, #111)",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            overflow: "hidden",
            color: "#F5E8D9",
            px: 2,
        }}
        >
        <Box
            component="img"
            src="/assets/bg.jpg"
            alt="Game Background"
            sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.3,
            filter: "blur(5px)",
            zIndex: -1,
            }}
        />

        <AnimatePresence>
            {!startGame && !showNarration && (
            <motion.div
            key="intro"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.3 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
        >
                <Typography
                variant="h2"
                sx={{ maxWidth: "850px", fontWeight: "bold", fontFamily: "'Roboto', sans-serif" }}
                >
                Millions of Filipinos struggle with Debt, Job Insecurity, and Daily Survival. 
                But that could never happen to you, right?
                </Typography>

                <Typography
                variant="h1"
                sx={{
                    fontWeight: "bold",
                    color: "#00cac9",
                    mt: 2,
                    fontFamily: "'Lilita One'",
                }}
                >
                PROVE IT
                </Typography>

                <Button
                variant="contained"
                sx={{
                    mt: 3,
                    backgroundColor: "#5e3967",
                    color: "white",
                    fontWeight: "bold",
                    px: 5,
                    py: 2,
                    fontSize: "1.2rem",
                    fontFamily: "'Lilita One', sans-serif",
                    "&:hover": { backgroundColor: "#351742" },
                }}
                onClick={handleStartGame}
                >
                ACCEPT THE QUEST
                </Button>
            </motion.div>
            )}
        </AnimatePresence>

        {showNarration && (
            <Box sx={{ minHeight: "100px", display: "flex", alignItems: "center" }}>
            <AnimatePresence>
                {!stopNarration && (
                <motion.div
                    key={`narration-${narrationIndex}`}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{
                    opacity: fadeOut && narrationIndex !== narrationTexts.length - 1 ? 0 : 1, 
                    scale: fadeOut && narrationIndex !== narrationTexts.length - 1 ? 5 : 1, 
                    }}
                    exit={
                        narrationIndex === narrationTexts.length - 1
                        ? { opacity: fadeOut ? 0 : 1, scale: fadeOut ? 10 : 1 } // Zoom in more before fading out
                        : { opacity: 0, scale: 5 }
                    }
                    transition={{ duration: 1, ease: "easeInOut" }}
                >
                    <Typography
                    variant="h4"
                    sx={{ fontWeight: "bold", color: "#d1c7ae", maxWidth: "750px", textAlign: "center" }}
                    >
                    {narrationTexts[narrationIndex]}
                    </Typography>
                </motion.div>
                )}
            </AnimatePresence>
            </Box>
        )}

        {showNarration && (
            <Box mt={4}>
            <AnimatePresence>
                {!buttonsFadeOut && (
                <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: buttonsFadeOut ? 0 : 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                >
                    <Button sx={{ color: "#00cac9", fontWeight: "bold", fontSize: "1.2rem" }} onClick={() => handleButtonClick('job')}>
                    GET A JOB
                    </Button>
                    <Typography component="span" sx={{ mx: 2, color: "#fff" }}>
                    OR
                    </Typography>
                    <Button sx={{ color: "#00cac9", fontWeight: "bold", fontSize: "1.2rem" }} onClick={() => handleButtonClick('quit')}>
                    QUIT
                    </Button>
                </motion.div>
                )}
            </AnimatePresence>
            </Box>
        )}

        {showGameplay && <Gameplay />}
        </Box>
    );
    }

    export default IntroBudget;
