import { CircularProgress } from "@mui/material";
import { useMemo } from "react";

const Timer: React.FC<{time: number}> = ({ time }) => {
    const progress = useMemo(() => {
        const seconds = Math.floor((time % 60000) / 1000);
        let x = (2 % 60) * (100 / 60)
        if (seconds < 3){
            x = (seconds % 60) * (100 / 60);
        }
        

        return x
    },[time])

    

    return (
        <div style={{ textAlign: 'center', margin: '20px' }}>
            <div style={{ position: 'relative', display: 'inline-flex' }}>
            
                <CircularProgress
                    variant="determinate"
                    value={100}
                    size={100}
                    thickness={4}
                    style={{ color: '#f0f0f0', zIndex: 1,}}
                />
                
                <CircularProgress
                    variant="determinate"
                    value={progress*30}
                    size={100}
                    thickness={4}
                    style={{ position: 'absolute', top: 0, left: 0 , zIndex: 3}}
                />
                

                
            </div>
        </div>
    );
};

export default Timer;