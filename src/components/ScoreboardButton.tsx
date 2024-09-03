import { Button } from "@mui/material";


export default function ScoreboardButton({
    onScoreboardClick
}: {
    onScoreboardClick: () => void
}){
    return(
        <Button variant="contained" onClick={onScoreboardClick}
        style={{
            background:'#9ccc65',
            fontSize: '20px',
            fontWeight: 'bold',
        }}>
            Scoreboard
        </Button>
    )
}