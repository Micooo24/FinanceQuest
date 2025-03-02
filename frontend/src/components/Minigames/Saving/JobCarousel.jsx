import React, { useState } from "react";
import { Box, Typography, IconButton, Button } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ProgressBar from "./ProgressBar";
import FirstWeek from "./FirstWeek"; 
import MiniBudget from "./MainGame";

const jobs = [
    {
        title: "FACTORY WORKER",
        category: "CONTRACTUAL",
        description: "₱3,000/week (Contractual, no benefits)",
        paydisplay: "₱3,000/week",
        pay: 3000,
        hours: "Contractual",
        incomeTax: 0,
        sss: 203,
        pagibig: 46,
        philhealth: 113,
        totalDeductions: 362,
    },
    {
        title: "CALL CENTER AGENT",
        category: "NIGHT SHIFTS",
        description: "₱4,500/week (Night shifts, high stress)",
        paydisplay: "₱4,500/week",
        pay: 4500,
        hours: "Night shifts",
        incomeTax: 138,
        sss: 208,
        pagibig: 46,
        philhealth: 137,
        totalDeductions: 529,
    },
    {
        title: "HOUSE HELPER",
        category: "FULL-TIME",
        description: "₱5,000/week (Full-time, no day-offs)",
        paydisplay: "₱5,000/week",
        pay: 5000,
        hours: "Full-time",
        incomeTax: 38,
        sss: 208,
        pagibig: 46,
        philhealth: 125,
        totalDeductions: 417,
    },
    {
        title: "OVERSEAS FILIPINO WORKER (OFW)",
        category: "REMOTELY",
        description: "₱7,500/week (BUT has remittances to send)",
        paydisplay: "₱7,500/week",
        pay: 7500,
        hours: "Flexible",
        incomeTax: 538,
        sss: 208,
        pagibig: 46,
        philhealth: 187,
        totalDeductions: 979,
    },
];

function JobCarousel() {
    const [index, setIndex] = useState(0);
    const [selectedJob, setSelectedJob] = useState(null);
    const [showFirstWeek, setShowFirstWeek] = useState(false); 
    const [showMiniBudget, setshowMiniBudget] = useState(false); 
    const [day, setDay] = useState(1);
    
    const handleNextDay = () => {
        setDay((prevDay) => prevDay + 1);
    };

    const nextJob = () => setIndex((prev) => (prev + 1) % jobs.length);
    const prevJob = () => setIndex((prev) => (prev - 1 + jobs.length) % jobs.length);

    const handleJobSelect = () => {
        setSelectedJob(jobs[index]);
    };

    const handleContinue = () => {
        setshowMiniBudget(true); // Display the FirstWeek component
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                position: "relative",
            }}
        >
            {/* Day Tracker */}
            <ProgressBar day={day} />

            <AnimatePresence mode="wait">
                {showMiniBudget ? (
                    // Transition to FirstWeek component after clicking "Continue"
                    <motion.div
                        key="mini-budget"
                        transition={{ duration: 0.5 }}
                    >
                        <MiniBudget selectedJob={selectedJob} />
                    </motion.div>
                ) : selectedJob ? (
                    <motion.div
                        key="pay-summary"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 1.2, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: 3,
                            }}
                        >
                            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
                                TIME IS YOUR CURRENCY
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 4, textAlign: "center" }}>
                                You're trading hours for pesos—some days, the clock never stops, but can you keep up?
                            </Typography>

                            <Box sx={{ textAlign: "center", mb: 4 }}>
                                <Typography variant="h4" sx={{ color: "#00cac9" }}>
                                    ₱{selectedJob.pay * 4} <span style={{ fontSize: "14px", marginLeft: "5px" }}>MONTHLY PAY BEFORE TAXES</span>
                                </Typography>
                                <span style={{ fontSize: "20px", marginLeft: "5px", color: "red" }}>Weekly Tax Overview: ₱{selectedJob.totalDeductions}</span>
                                <Typography variant="h6" sx={{ color: "red" }}>
                                    (-₱{selectedJob.philhealth}) <span style={{ fontSize: "14px", marginLeft: "5px", color: "red" }}>Philippine Health Insurance Corporation (PhilHealth)</span>
                                </Typography>
                                <Typography variant="h6" sx={{ color: "red" }}>
                                    (-₱{selectedJob.pagibig}) <span style={{ fontSize: "14px", marginLeft: "5px", color: "red" }}>Home Development Mutual Fund (Pag-IBIG)</span>
                                </Typography>
                                <Typography variant="h6" sx={{ color: "red" }}>
                                    (-₱{selectedJob.sss}) <span style={{ fontSize: "14px", marginLeft: "5px", color: "red" }}>Social Security System (SSS)</span>
                                </Typography>
                                <Typography variant="h6" sx={{ color: "red" }}>
                                    (-₱{selectedJob.incomeTax}) <span style={{ fontSize: "14px", marginLeft: "5px", color: "red" }}>Philippine Income Tax</span>
                                </Typography>
                            </Box>

                            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#00cac9", textAlign: "center" }}>
                                WEEKLY PAY
                            </Typography>
                            <Typography variant="h3" sx={{ fontWeight: "bold", color: "#00cac9", mb: 3 }}>
                                ₱{selectedJob.pay}
                            </Typography>

                            <Typography variant="h6" sx={{ fontWeight: "bold", color: "red", textAlign: "center" }}>
                                MONTHLY TAX
                            </Typography>   
                            <Typography variant="h3" sx={{ fontWeight: "bold", color: "red", mb: 3 }}>
                                ₱{selectedJob.totalDeductions * 4}
                            </Typography>

                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: "#5e3967",
                                    color: "white",
                                    "&:hover": { backgroundColor: "#351742" },
                                    padding: "10px 30px",
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                }}
                                onClick={handleContinue} // Redirect to FirstWeek on "Continue"
                            >
                                CONTINUE
                            </Button>
                        </Box>
                    </motion.div>
                ) : (
                    <motion.div
                        key="job-selection"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 1.2, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold" }}>
                            WALANG IMPOSIBLE SA MASIPAG!
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 4 }}>
                            Choose a job to start earning money for your family.
                        </Typography>

                        <Box sx={{ position: "relative", width: "90%", height: "300px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <IconButton
                                onClick={prevJob}
                                sx={{
                                    position: "absolute",
                                    left: -150,
                                    color: "#00cac9",
                                    border: "2px solid #00cac9",
                                    borderRadius: "50%",
                                    width: "50px",
                                    height: "50px",
                                }}
                            >
                                <ArrowBackIosIcon fontSize="Medium" />
                            </IconButton>

                            <Box sx={{ display: "flex", alignItems: "center", overflow: "hidden", width: "100%", justifyContent: "center" }}>
                                <AnimatePresence mode="wait">
                                    {jobs.map((job, i) => {
                                        const isActive = i === index;
                                        const isLeft = i === (index - 1 + jobs.length) % jobs.length;
                                        const isRight = i === (index + 1) % jobs.length;

                                        return (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{
                                                    opacity: isActive ? 1 : 0.5,
                                                    scale: isActive ? 1 : 0.9,
                                                    x: isLeft ? -150 : isRight ? 150 : 0,
                                                }}
                                                exit={{ opacity: 0, scale: 1.2 }}
                                                transition={{ duration: 0.5 }}
                                                style={{
                                                    position: "absolute",
                                                    width: "300px",
                                                    height: "300px",
                                                    zIndex: isActive ? 10 : 5,
                                                    cursor: "pointer",
                                                    textAlign: "center",
                                                }}
                                                onClick={handleJobSelect}
                                            >
                                                <Box
                                                    sx={{
                                                        background: "#F5E8D9",
                                                        padding: 3,
                                                        borderRadius: "10px",
                                                        boxShadow: "0px 5px 15px rgba(0,0,0,0.3)",
                                                        width: "100%",
                                                        height: "100%",
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        "&:hover": { background: "#E0D0C0" },
                                                    }}
                                                >
                                                    <Typography variant="caption" sx={{ fontWeight: "bold", color: "Black" }}>
                                                        {job.category}
                                                    </Typography>
                                                    <Typography variant="h5" sx={{ fontWeight: "bold", mt: 1, color: "Black" }}>
                                                        {job.title}
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ mt: 1, color: "Black" }}>{job.description}</Typography>
                                                    <Typography variant="h6" sx={{ fontWeight: "bold", mt: 2, color: "Black" }}>{job.paydisplay}</Typography>
                                                    <Typography variant="body2" sx={{ mt: 1, color: "Black" }}>{job.hours}</Typography>
                                                </Box>
                                            </motion.div>
                                        );
                                    })}
                                </AnimatePresence>
                            </Box>

                            <IconButton
                                onClick={nextJob}
                                sx={{
                                    position: "absolute",
                                    right: -200,
                                    color: "#00cac9",
                                    border: "2px solid #00cac9",
                                    borderRadius: "50%",
                                    width: "50px",
                                    height: "50px",
                                }}
                            >
                                <ArrowForwardIosIcon fontSize="Medium" />
                            </IconButton>
                        </Box>
                    </motion.div>
                )}
            </AnimatePresence>
        </Box>
    );
}

export default JobCarousel;