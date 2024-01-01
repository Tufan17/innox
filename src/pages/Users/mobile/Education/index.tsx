import { Center, Container, Flex, Text } from "@mantine/core";
import { FaBookBookmark } from "react-icons/fa6";
import { primaryColor, quinaryColor, secondaryColor } from "../../../../constants/color";
import { FaUserAlt } from "react-icons/fa";
import { MdSettings } from "react-icons/md";
import { Link, Route, Routes } from "react-router-dom";
import HomeView from "./HomeView";
import { useState } from "react";
import ProfileView from "../Profile";
import SettingsView from "../settings";
const EducationView = () => {
    const nav_path="/app";
    const [path, setPath] = useState(window.location.pathname);
    return (
        <div style={{
            width: window.innerWidth,
            height: window.innerHeight,
            overflow: "hidden",
            position: "fixed",
            
        }}>
             <Routes>
             <Route
                    path="/profile"
                    element={<ProfileView/>}
                />
                <Route
                    path="/settings"
                    element={<SettingsView/>}
                />
              <Route
                path="/home"
                element={<HomeView/>}
              />
               
               
        </Routes> 

            <Flex
                style={{
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 90,
                    borderTopRightRadius: 30,
                    borderTopLeftRadius: 30,
                    boxShadow: "0px 0px 5px 0px " + quinaryColor,
                    paddingBottom: 10,
                    backgroundColor: "white",
                }}
                justify="center"
                align="center"
                direction="row"
                wrap="wrap"
            >
                <Container>
                    <Link to={nav_path+"/home"} style={{
                        textDecoration:"none",
                    }}
                    onClick={()=>
                    {
                        setPath(nav_path+"/home");
                
                    }}>
                    <Center>
                    <FaBookBookmark size={25} color={path.includes("home")?secondaryColor:quinaryColor} />
                    </Center>
                    <Text fw={700}
                        
                        style={{
                            textAlign: "center",
                            color: path.includes("home")?primaryColor:quinaryColor,
                        }}
                    >
                        Eğitim
                    </Text>
                    </Link>

                </Container>
                <Container>
                <Link to={nav_path+"/profile"} style={{
                        textDecoration:"none",
                    }}
                    onClick={()=>{
                        setPath(nav_path+"/profile");
                    }
                    }
                    >
                    <Center>
                    <FaUserAlt size={25} color={path.includes("profile")?secondaryColor:quinaryColor} />
                    </Center>
                    <Text fw={700}
                        
                        style={{
                            textAlign: "center",
                            color: path.includes("profile")?primaryColor:quinaryColor,
                        }}
                    >
                        Profil
                    </Text>
                    </Link>
                </Container>
                <Container>
                <Link to={nav_path+"/settings"} style={{
                        textDecoration:"none",
                    }}
                    onClick={()=>{
                        setPath(nav_path+"/settings");
                    }
                    }>
                <Center>
                    <MdSettings size={25} color={path.includes("settings")?secondaryColor:quinaryColor} />
                    </Center>
                    <Text fw={700}
                        
                        style={{
                            textAlign: "center",
                            color: path.includes("settings")?primaryColor:quinaryColor,
                        }}
                    >
                        Ayarlar
                    </Text>
                    </Link>
                </Container>
               
            </Flex>
        </div>

    );
}

export default EducationView;