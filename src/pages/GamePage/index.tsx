import { Box, Grid, Typography } from "@mui/material";
import { useMain } from "../../contexts/MainContext";
import { useEffect, useState } from "react";
import GamLogo from '../../assets/game-logo.png';
import Game from "./GameLogic";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Eating from '../../assets/eating.png';
import { Score } from "@mui/icons-material";

const FlashingText = ({ begin, second, third, last, text }: { begin: string, second: string, third: string, last: string, text: string }) => {
    return (
        <Box>
            <Typography
                sx={{
                    fontSize: 32,
                    fontWeight: 'bold',
                    animation: 'flash 2s infinite',
                    '@keyframes flash': {
                        '0%': { color: begin },
                        '33%': { color: second },
                        '66%': { color: third },
                        '100%': { color: last }
                    }
                }}
            >
                {text}
            </Typography>
        </Box>
    );
};

const GamePage = () => {
    const { scoreList, user, channel } = useMain();
    const [highestScore, setHighestScore] = useState<number>(0);
    const navigate = useNavigate();
    const level = 10;
    const stage = 3;
    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user, navigate]);

    useEffect(() => {
        if (scoreList) {
            const scores = Object.values(scoreList);
            const maxValue = Math.max(...scores);
            if (maxValue > highestScore) {
                toast(`The highest score is now ${maxValue}`);
            }
        }
    }, [scoreList, highestScore]);
    return (
        <Box>
            <Grid container>
                <Grid item xs={12}>
                    <Box
                        sx={{
                            backgroundColor: '#FFC300',
                            borderRadius: 3,
                            padding: 2,
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
                            marginBottom: '16px',
                            alignItems: 'center',
                            gap: 1
                        }}>
                        <Box component="img" sx={{ height: 60 }} src={Eating}></Box>
                        <Box sx={{ display: 'flex' }}>
                            <FlashingText begin="#1a027e" second="#01579b" third="#006064" last="#001d40" text="Transform" />
                        </Box>
                        <Typography sx={{ fontSize: 25 }} fontWeight={'bold'} color={'#513b1c'}>Monkey</Typography>
                    </Box>
                </Grid>
                <Box
                    sx={{
                        width: '100%',
                        height: 'auto',
                        backgroundColor: '#FFC300',
                        borderRadius: 3,
                        padding: 2,
                        display: 'flex',
                        flexDirection: 'row', // Set to row to make elements horizontal
                        justifyContent: 'space-between',
                        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
                        alignItems: 'top',
                        
                    }}
                >
                    {/* left */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginRight: 2 ,marginTop:5}}>
                        <Box component="img" sx={{ height: 100 }} src={GamLogo}></Box>
                        
                        <Typography sx={{ color: 'black', fontSize: 15 }}>Player: {user}</Typography>
                        <Typography sx={{ color: 'black', fontSize: 15 }}>Channel: {channel}</Typography>
                        {/* <h2>score : {Game.get}</h2> */}
                        
                    </Box>

                    {/* Game content */}
                    <Box
                        sx={{
                            flexGrow: 1,
                            backgroundColor: '#fff',
                            borderRadius: 2,
                            marginY: 2,
                            padding: '24px',
                            marginX: 2,
                        }}
                    >
                        <Game levels={level} stages={stage} onSubmitScores={(score) => {
                            if (score > highestScore) {
                                setHighestScore(score);
                            }
                        }} />
                    </Box>

                </Box>
            </Grid>
        </Box>
    );
};

export default GamePage;
