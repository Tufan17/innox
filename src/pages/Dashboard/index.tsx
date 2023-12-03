import Header from "./common/header.tsx";

const Dashboard = () => {
    return ( 
        <div style={{
            backgroundColor: 'red',
            width:window.innerWidth,
            height:window.innerHeight
        }}>
            <Header/>
        </div>
     );
}
 
export default Dashboard;