import { useEffect, useMemo, useState } from "react"
import { Box, Button, Grid, Typography } from "@mui/material"
import DataTable from "./Table"
import { useNavigate } from "react-router-dom"
import ChannelDropdown, { FIRST_OPTION_VALUE_DROPDOWN } from "../../components/ChannelDropdown"
import { getAllListChannel, getScoreByAppName } from "../../api/appScore"
import { useMain } from "../../contexts/MainContext"
import BackgroundMusic from "../../components/BackgroundMusic"

interface IScoreList{[key: string]: number}

export default function ScorePage(){
    const navigate = useNavigate()
    const { joinGame, scoreList: wsScoreList } = useMain()
    const [appNameLists, setAppNameLists] = useState<string[]>([])
    const [channelId, setChannelId] = useState<string | null>(FIRST_OPTION_VALUE_DROPDOWN)
    const [scoreList, setScoreList] = useState<IScoreList>({})
    const bgSong = useMemo(() => {
        return 'https://youtu.be/HQClbjhAugg?si=GXPV2s7wqHfV3gfL'
    },[])

    useEffect(() => {
        async function GetAllListChannel() {
            try {
                const data = await getAllListChannel()
                setAppNameLists(() => [...data])
            } catch (error) {
                console.error(error)
                alert("Error")
            }
        }

        GetAllListChannel()
    }, [])

    useEffect(() => {
        console.log('scorelist : ', wsScoreList)
        setScoreList(wsScoreList)
    }, [wsScoreList])

    const onSelectChannel = async(channelIdSelected: string) => {
        if(channelIdSelected !== FIRST_OPTION_VALUE_DROPDOWN){
        setChannelId(channelIdSelected)
        // getLatestScoreFromServer(channelIdSelected)
        try {
            const res = await getScoreByAppName(channelIdSelected)
            setScoreList(res)
            joinGame(channelIdSelected)
        } catch (error) {
            console.error(error)
            alert(`Can't get score from server.`)
        }
       }
    }

    return(
        <Box
            // sx={{
            // background: 'green',// Change this to your desired background color
            // padding: 'px'
        >
            {/* แก้ */}
            <BackgroundMusic songUrl={bgSong} />
            <Grid container> 
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}
                >
                    <Typography variant="h1"
                    style={{
                        color: '#4e342e',
                        fontWeight: 'bold',
                        fontFamily: 'monospace',
                        textTransform: 'uppercase',
                        fontSize: '75px',
                    }}
                    >
                        Scoreboard
                    </Typography>
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12} p={1}
                    style={{
                        background: 'white',
                        borderRadius: '10px',
                        marginBottom: '10px',
                    }}
                >
                    <ChannelDropdown
                        appNameLists={appNameLists}
                        channelName={channelId || ""}
                        onChange={(val) => onSelectChannel(val)}
                    />
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}
                    style={{
                        backgroundColor: 'white',
                        borderRadius: '10px',
                    }}
                >
                    <DataTable
                        data={scoreList}
                        
                    />
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12} p={1}>
                    <Button
                        variant="contained"
                        style={{
                            background:'#ffd54f',
                            color:'brown',
                            fontSize: '20px',
                            fontWeight: 'bold',
                            marginTop: '10px'

                        }}
                        onClick={() => {
                            navigate('/')
                        }}
                    >
                        Back to Home
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}