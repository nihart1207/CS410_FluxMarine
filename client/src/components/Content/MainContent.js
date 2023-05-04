import { Routes, Route } from 'react-router-dom';
import DashboardPage from '../../Pages/DashboardPage';


const MainContent = () => {
return (
<div>
    <Routes>
        <Route exact path="/" component={DashboardPage} />
    </Routes>
</div>
);
};

export default MainContent;