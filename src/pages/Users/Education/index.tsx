import { Center, Container, Flex, Text } from "@mantine/core";
import { FaBookBookmark } from "react-icons/fa6";
import { primaryColor, quinaryColor, secondaryColor } from "../../../constants/color";
import { FaUserAlt } from "react-icons/fa";
import { MdSettings } from "react-icons/md";
import { Link, Route, Routes, useParams } from "react-router-dom";
import HomeView from "./HomeView";
const EducationView = () => {
    const { id } = useParams<{ id: string }>();
    const nav_path="/app";
    const user=JSON.parse(window.localStorage.getItem("user")!);
    const path=window.location.pathname;
    return (
        <div style={{
            width: "100%",
            height: window.innerHeight,
        }}>
             <Routes>
             <Route
                    path="/profile"
                    element={<>2</>}
                />
                <Route
                    path="/settings"
                    element={<>3</>}
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
                    height: 110,
                    borderTopRightRadius: 30,
                    borderTopLeftRadius: 30,
                    boxShadow: "0px 0px 5px 0px " + quinaryColor,
                    paddingBottom: 10,
                }}
                justify="center"
                align="center"
                direction="row"
                wrap="wrap"
            >
                <Container>
                    <Link to={nav_path+"/home"} style={{
                        textDecoration:"none",
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
                    }}>
                    <Center>
                    <FaUserAlt size={25} color={path.includes("profile")?secondaryColor:quinaryColor} />
                    </Center>
                    <Text fw={700}
                        
                        style={{
                            textAlign: "center",
                            color: path.includes("profile")?primaryColor:quinaryColor,
                        }}
                    >
                        Eğitim
                    </Text>
                    </Link>
                </Container>
                <Container>
                <Link to={nav_path+"/settings"} style={{
                        textDecoration:"none",
                    }}>
                <Center>
                    <MdSettings size={25} color={path.includes("settings")?secondaryColor:quinaryColor} />
                    </Center>
                    <Text fw={700}
                        
                        style={{
                            textAlign: "center",
                            color: path.includes("settings")?primaryColor:quinaryColor,
                        }}
                    >
                        Eğitim
                    </Text>
                    </Link>
                </Container>
               
            </Flex>
        </div>

    );
}

export default EducationView;