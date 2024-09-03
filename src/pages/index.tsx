// import { Route, Routes, NavLink } from 'react-router-dom';
// import StartPage from './StartPage';
// import GamePage from './GamePage';
// import ScorePage from './ScorePage';
// import { Box, colors, Container } from '@mui/material';

// const MainPage = () => {
//     return (
//         <div>
//             {/* Top Navigation Bar */}
//             <Box
//                 sx={{
//                     typography: 'body1',
//                     '& > :not(style) ~ :not(style)': {
//                         ml: 2,
//                     },
//                 }}
//                 onClick={e => e.preventDefault()}
//             >
//                 <NavLink to={'/'} style={({ isActive }) => {
//                     return {
//                         fontWeight: isActive ? 'bold' : '',
//                         textDecoration: isActive ? 'underline' : 'none',
//                         color: isActive ? 'primary.main' : 'text.secondary'
//                     };
//                 }}>Home</NavLink>
//                 <NavLink to={'/score'} style={({ isActive }) => {
//                     return {
//                         fontWeight: isActive ? 'bold' : '',
//                         textDecoration: isActive ? 'underline' : 'none',
//                         color: isActive ? 'primary.main' : 'text.secondary'
//                     };
//                 }} >Score Board</NavLink>
//             </Box>

//             {/* Main Content Area */}
//             <Container maxWidth="md" sx={{ marginTop: 4, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//                 <Box
//                     sx={{
//                         width: '100%',
//                         padding: 4,
//                         borderRadius: 2,
//                         boxShadow: 3,
//                         backgroundColor: 'pink',
//                         textAlign: 'center',
//                     }}
//                 >
//                     <Routes>
//                         <Route path='/' element={<StartPage />} />
//                         <Route path='/game' element={<GamePage />} />
//                         <Route path='/score' element={<ScorePage />} />
//                     </Routes>
//                 </Box>

//             </Container>
//         </div>


//     )
// }

// export default MainPage
import { Route, Routes, NavLink, useLocation } from 'react-router-dom';
import StartPage from './StartPage';
import GamePage from './GamePage';
import ScorePage from './ScorePage';
import { Box, Container } from '@mui/material';

const MainPage = () => {
    const location = useLocation(); // ใช้ useLocation เพื่อเข้าถึงเส้นทางปัจจุบัน

    // ฟังก์ชันในการกำหนดสีพื้นหลังตามเส้นทางปัจจุบัน
    const getBackgroundColor = () => {
        switch (location.pathname) {
            case '/':
                return '#ece4d4';
            case '/game':
                return '#44140c';
            case '/score':
                return '#f5eed8';
            default:
                return 'white'; // กรณีเส้นทางอื่นๆ ที่ไม่ตรงกับข้างบน
        }
    };

    return (
        <div>
            {/* Top Navigation Bar */}
            <Box
                sx={{
                    typography: 'body1',
                    '& > :not(style) ~ :not(style)': {
                        ml: 2,
                    },
                }}
                onClick={(e) => e.preventDefault()}
            >
                <NavLink
                    to={'/'}
                    style={({ isActive }) => ({
                        fontWeight: isActive ? 'bold' : '',
                        textDecoration: isActive ? 'underline' : 'none',
                        color: isActive ? 'primary.main' : 'text.secondary',
                    })}
                >
                    Home
                </NavLink>
                <NavLink
                    to={'/score'}
                    style={({ isActive }) => ({
                        fontWeight: isActive ? 'bold' : '',
                        textDecoration: isActive ? 'underline' : 'none',
                        color: isActive ? 'primary.main' : 'text.secondary',
                    })}
                >
                    Score Board
                </NavLink>
            </Box>

            {/* Main Content Area */}
            <Container
                maxWidth="md"
                sx={{ marginTop: 4, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <Box
                    sx={{
                        width: '100%',
                        padding: 4,
                        borderRadius: 2,
                        boxShadow: 3,
                        backgroundColor: getBackgroundColor(), // ใช้ฟังก์ชันเพื่อกำหนดสีพื้นหลัง
                        textAlign: 'center',
                    }}
                >
                    <Routes>
                        <Route path="/" element={<StartPage />} />
                        <Route path="/game" element={<GamePage />} />
                        <Route path="/score" element={<ScorePage />} />
                    </Routes>
                </Box>
            </Container>
        </div>
    );
};

export default MainPage;