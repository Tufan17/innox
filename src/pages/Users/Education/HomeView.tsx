const HomeView = () => {
    const user=JSON.parse(window.localStorage.getItem("user")!);
    
    return ( 
           <>
            {user?.nickname}
            </>
     );
}
 
export default HomeView;