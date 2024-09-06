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
import home3 from '../assets/home3.png';
import score from '../assets/score.png';
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
            <Container>
            <Box
                sx={{
                    //border: '1px solid gray', // Add border here
                    borderRadius: '8px', // Optional: rounding corners
                    padding: '8px', // Optional: spacing inside the border
                    display: 'flex', // To align items horizontally
                    justifyContent: 'center', // Centering the items
                    background: location.pathname === '/game' ? '#44140c' : '#573f20',
                    
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
                    <Box
                                component="img"
                                src={home3}
                                alt="home2"
                                sx={{
                                    width: '45px',
                                    height: '45px',
                                    marginRight: '25px',
                                    '&:hover': {
                                        backgroundColor: 'rgb(255, 213, 79)', // Change background color on hover
                                        transform: 'scale(1.25)', // Slightly scale up on hover
                                        borderRadius: '8px', // Apply border radius to the hover effect
                                        transition: 'all 0.3s ease', // Smooth transition for hover
                                    },
                                }}
                            />
                    
                </NavLink>
                <NavLink
                    to={'/score'}
                    style={({ isActive }) => ({
                        fontWeight: isActive ? 'bold' : '',
                        textDecoration: isActive ? 'underline' : 'none',
                        color: isActive ? 'primary.main' : 'text.secondary',
                    })}
                >
                    <Box
                                component="img"
                                src={score}
                                alt="score"
                                sx={{
                                    width: '50px',
                                    height: '50px',
                                    marginRight: '16px',
                                    '&:hover': {
                                        backgroundColor: 'rgb(255, 213, 79)', // Change background color on hover
                                        transform: 'scale(1.05)', // Slightly scale up on hover
                                        borderRadius: '8px', // Apply border radius to the hover effect
                                        transition: 'all 0.3s ease', // Smooth transition for hover
                                    },
                                }}
                            />
                </NavLink>
            </Box>
            </Container>
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
