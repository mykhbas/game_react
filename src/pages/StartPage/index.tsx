import { Box, Button, FormControl, Grid, TextField, Typography } from "@mui/material"
import { useEffect, useMemo } from "react"
import { useState } from "react"
import { useMain } from "../../contexts/MainContext"
import Logo from '../../assets/full-logo.png';
import ChannelDropdown from "../../components/ChannelDropdown";
import { FIRST_OPTION_VALUE_DROPDOWN } from './../../components/ChannelDropdown';
import { getAllListChannel } from "../../api/appScore";
import { useNavigate } from "react-router-dom";
import BackgroundMusic from "../../components/BackgroundMusic";

const StartPage = () => {
    const { setUser, setChannel, joinGame } = useMain()
    const navigate = useNavigate()
    // const [startPage, setStartPage] = useState<boolean>(false)
    const bgSong = useMemo(() => {
        return 'https://youtu.be/fmHOqoDeiDg?si=aG2wKTBpd5XH09Ki'
    }, [])

    useEffect(() => {
        // TO DO.
        const GetAllListsChannel = async () => {
            try {
                const data = await getAllListChannel()
                setAppNameLists(() => [...data])
                // Call getAllListChannel() for get all channel list.
                // And save those to state
            } catch (e) {
                alert('Error na')
                console.log(e)
                // If error, show error message.
            }
        }
        GetAllListsChannel()


        // When page is rendered.
        // Call getAllListChannel() for get all channel list.
        // And save those to state
    }, [])

    const [channelName, setchannelName] = useState<string>(FIRST_OPTION_VALUE_DROPDOWN)
    const [newChannelName, setnewChannelName] = useState<string>("")
    const [playerName, setPlayerName] = useState<string>("")
    const [appNameLists, setAppNameLists] = useState<string[]>([])
    const onStartBtnClick = () => {

        // TO DO.
        if ((channelName && channelName !== FIRST_OPTION_VALUE_DROPDOWN) && (playerName && playerName.trim() !== "")) {
            setUser(playerName)
            joinGame(channelName)
            setChannel(channelName)
            navigate('/game')
        } else {
            alert("เช็คดูดีๆ")
        }
        // console.log(playerName)
        // Logic for when user click on start button
        // if channel name is not null and is not "Select..."
        // set name to User state (from global state [context])
        // Call joinGame(channelName) for join channel game
        // set channel name  to Channel state (from global state [context])
        // finally, navigate to game page

        // if channel name is null or is "Select..."
        // Alert warning message.
    }

    useEffect(() => {
        console.log(playerName)
    }, [playerName])
    return (
        <Box  >
            <BackgroundMusic songUrl={bgSong} />
            <Grid container justifyContent={"center"}>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12} sx={{ marginBottom: '0px' }}>
                    <Box component="img"  src={Logo} sx={{marginTop: '0px'}}></Box>
                </Grid>
                <Grid container item xl={12} lg={12} md={12} sm={12} xs={12} p={2} justifyContent="center">
                    {/*<Typography variant="h1"
                        style={{
                            color: '#4e342e',
                            fontWeight: 'bold',
                            fontFamily: 'monospace',
                            textTransform: 'uppercase',
                            fontSize: '75px',
                            // Apply slight curve

                        }}>
                        Select Channel
                    </Typography>*/}

                    <svg width="500" height="150" viewBox="0 0 500 200">
                        <defs>

                            <path id="halfCircle" d="M 50, 190 A 180, 115 0 0, 1 450, 200" />
                        </defs>
                        <text fill="#0d5320" fontSize="45" fontWeight="bold" fontFamily="monospace">

                            <textPath href="#halfCircle" startOffset="50%" textAnchor="middle">
                                Select Channel
                            </textPath>
                        </text>
                    </svg>

                    <Grid sx={{ backgroundColor: '#fff', p: 5 ,borderRadius: '40px'}} >
                        {/*TO DO: Create dropdown for show channel list */}
                        <ChannelDropdown
                            appNameLists={appNameLists}
                            channelName={channelName}
                            onChange={(val: string) => {
                                setchannelName(val)
                            }}

                        />
                        <FormControl fullWidth sx={{ mt: 1 }}>
                            {/* Create textfield for input channel name that need to create new. */}
                            <TextField
                                label="create new channel"
                                variant="outlined"
                                fullWidth
                                onChange={(event) => {
                                    setnewChannelName(event.target.value)
                                }}
                            ></TextField>
                        </FormControl>

                        {/* TO DO: Create button for create new channel */}

                        <Button variant="outlined"
                            style={{
                                borderColor: 'brown',
                                color: 'brown'
                            }} sx={{ mt: "15px" }} onClick={() => {
                                if (newChannelName !== "") {
                                    setAppNameLists(p => {
                                        if (p.includes(newChannelName)) {
                                            return p
                                        } else {
                                            return [newChannelName, ...p]
                                        }
                                    });
                                    setchannelName(newChannelName)
                                    alert("Create new channel")
                                } else {
                                    alert("Please input channel name")
                                }
                            }}>Create new channel</Button>

                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} p={0}>
                            <FormControl fullWidth sx={{ mt: 5 }}>
                                <TextField
                                    label="player name"
                                    variant="outlined"
                                    fullWidth
                                    onChange={(event) => {
                                        setPlayerName(event.target.value)
                                    }}
                                ></TextField>
                                {/* TO DO: Create textfield for inpurt player name */}
                            </FormControl>
                        </Grid>
                        <Grid container item xs={12} pt={1} p={1} justifyContent="center">
                            <Grid item xs={12} sm={4}>
                                {/* TO DO: Create button for play game */}
                                <Button variant="contained" style={{
                                    background: '#ffd54f',
                                    color: 'brown',
                                    fontSize: '20px',
                                    fontWeight: 'bold',
                                    marginTop: '10px'

                                }}
                                    fullWidth onClick={onStartBtnClick}>Start !</Button>
                            </Grid>
                        </Grid>
                    </Grid>


                </Grid>
            </Grid>
        </Box>
    )
}

export default StartPage