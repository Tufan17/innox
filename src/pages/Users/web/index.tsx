import { Avatar, Center, Container, Flex, Grid, Group, Input, ScrollArea, Space, Text, Title } from "@mantine/core";
import { SvgIcon } from "../../../common/SvgIcon";
import AccountPopover from "../../Dashboard/common/account";
import "../../Dashboard/common/index.css";
import { primaryColor, secondaryColor, senaryColor } from "../../../constants/color";
import { useEffect, useState } from "react";
import contentsController from "../../../../database/db/controller/contentsController";
import Loader from "../../Loader";
import { MdChangeCircle } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import userController from "../../../../database/db/controller/userController";
import NotificationsPopover from "../../Dashboard/common/notification";
import { Stack } from "@mui/material";
import { RiNotification2Line } from "react-icons/ri";

const UserDashBoard = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const [education, setEducation] = useState<any>(null);
    const [value, setValue] = useState("");
    const [lessons, setLessons] = useState<any[]>([]);
    const [change, setChange] = useState<boolean>(false);
    const [homeData, setHomeData] = useState<any | null>(null);

    const getAllData = async () => {
        const contents = await contentsController.index("main");
        setHomeData(contents);
    };

    useEffect(() => {
        if (user.education === undefined) {
            getAllData();
        }
        contentsController.getById(user.education).then(async (res: any) => {
            setEducation(res);
            const data: any[] = await contentsController.subIndex(user.education);
            setLessons(data);
        }
        );
    }, []);
    return education === null ? (
        <Loader />
    ) : (
        <div
            style={{
                width: window.innerWidth,
                height: window.innerHeight,
                backgroundColor: "rgb(245 240 240)",
                margin: "0px",
                paddingTop: "100px",
                overflow: "hidden",
            }}
        >
            <Flex
                className="main"
                mih={100}
                align="center"
                direction="row"
                wrap="wrap"

            >
                <Group
                    justify="space-between"
                    style={{
                        width: "100%",
                    }}
                >
                    <Center ml={"sm"}>
                        <SvgIcon src="logo.svg" height="120px" width="120px" />
                    </Center>
                    <Group>

                    <div style={{
                        borderRadius: '100%',
                        width: '60px',
                        height: '60px',
                        border: '2px solid ' + senaryColor,
                        padding: '10px',
                        marginTop: '5p x',
                    }}>
                        <RiNotification2Line
                            style={{
                                width: '100%',
                                height: '100%',
                                color: senaryColor,
                            }}
                        />
                    </div>
                        <div
                            style={{
                                marginRight: "20px"
                            }}
                        >

                            <AccountPopover />
                        </div>
                    </Group>
                </Group>
            </Flex>

            <Container
                style={{
                    width: window.innerWidth,
                    height: "100%",
                    margin: "0px",
                    padding: "0px",
                }}
            >
                <Grid mt={"sm"}
                    style={{
                        width: window.innerWidth,
                        height: "100%",
                        margin: "0px",
                        padding: "10px",
                    }}
                    gutter={10}
                >
                    <Grid.Col span={4}>
                        <Container
                            style={{
                                WebkitBackdropFilter: "blur(6px)",
                                backdropFilter: "blur(60px)",
                                WebkitTransition: "height 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                                transition: "height 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                                width: "100%",
                                background: "rgba(255, 255, 255, 0.5)", // Adjust the alpha value as needed
                                borderRadius: "10px",
                                padding: "10px",
                            }}
                        >
                            <Container style={{
                                textAlign: "center",
                                margin: "10px",
                                borderRadius: "10px",
                                border: "1px solid #eaeaea",
                                padding: "10px",
                            }}>
                                <Center>
                                    <Avatar size={75} src={user.avatar} />
                                </Center>

                                <Title order={3} c={primaryColor}>{user.nickname}</Title>
                                <Title order={5}>{user.email}</Title>
                            </Container>
                            <Container style={{
                                textAlign: "center",
                                borderRadius: "10px",
                                padding: "10px",
                                margin: "10px",
                                border: "1px solid #eaeaea",
                            }}>
                                <Title order={5} c={secondaryColor} style={{
                                    textAlign: "left",
                                }}>Eğitiminiz</Title>
                                <Title order={3} c={primaryColor}>{education.title}</Title>
                                <Title order={5}>{education.subtitle}</Title>
                            </Container>
                            <Container style={{
                                textAlign: "center",
                                borderRadius: "10px",
                                padding: "10px",
                                margin: "10px",
                                border: "1px solid #eaeaea",
                            }}>
                                <Group
                                    onClick={() => {
                                        setChange(!change);
                                        getAllData();
                                    }}>
                                    <Container style={{
                                        paddingLeft: "0px",
                                        marginLeft: "0px",
                                    }}>
                                        <Text>Eğitimimi değiştirmek istiyorum</Text>
                                    </Container>
                                    <MdChangeCircle size={30} color={primaryColor} />
                                </Group>
                            </Container>

                        </Container>
                        <Space h={"lg"} />
                        <Container
                            style={{
                                WebkitBackdropFilter: "blur(6px)",
                                backdropFilter: "blur(60px)",
                                WebkitTransition: "height 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                                transition: "height 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                                width: "100%",
                                background: "rgba(255, 255, 255, 0.5)", // Adjust the alpha value as needed
                                borderRadius: "10px",
                                padding: "10px",
                            }}
                        >
                            <Container
                                style={{
                                    width: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}>
                                <Title order={3} >
                                    Ayarlar
                                </Title>
                            </Container>

                            <Container style={{
                                margin: 10,
                                border: "1px solid #ccc",
                                borderRadius: 10,
                            }}>
                                <Group
                                    m={"sm"}
                                >
                                    <Container
                                        style={{
                                            marginLeft: 0,
                                            paddingLeft: 0,
                                        }}
                                    >
                                        <Text size="20px">
                                            Gizlilik ve Güvenlik
                                        </Text>
                                    </Container>
                                    <IoIosArrowForward size={30} />
                                </Group>
                            </Container>
                            <Container style={{
                                margin: 10,
                                border: "1px solid #ccc",
                                borderRadius: 10,
                            }}>
                                <Group
                                    m={"sm"}
                                >
                                    <Container
                                        style={{
                                            marginLeft: 0,
                                            paddingLeft: 0,
                                        }}
                                    >
                                        <Text size="20px">
                                            Yardım ve Destek
                                        </Text>
                                    </Container>
                                    <IoIosArrowForward size={30} />
                                </Group>
                            </Container>
                            <Container style={{
                                margin: 10,
                                border: "1px solid #ccc",
                                borderRadius: 10,
                            }}>
                                <Group
                                    m={"sm"}
                                >
                                    <Container
                                        style={{
                                            marginLeft: 0,
                                            paddingLeft: 0,
                                        }}
                                    >
                                        <Text size="20px">
                                            Konu ve Soru Önerilerim
                                        </Text>
                                    </Container>
                                    <IoIosArrowForward size={30} />
                                </Group>
                            </Container>

                        </Container>


                    </Grid.Col>
                    <Grid.Col span={8}>
                        <ScrollArea
                            type="never"
                            style={{
                                width: '100%',
                                height: window.innerHeight - 135,
                                overflow: 'auto',
                            }}
                        >
                            <Container
                                style={{
                                    WebkitBackdropFilter: "blur(6px)",
                                    backdropFilter: "blur(60px)",
                                    WebkitTransition: "height 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                                    transition: "height 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                                    width: "100%",
                                    height: "100%",
                                    background: "rgba(255, 255, 255, 0.5)", // Adjust the alpha value as needed
                                    borderRadius: "10px",
                                    padding: "10px",
                                    overflow: "auto",
                                }}
                            >
                                {
                                    !change ? <>
                                        <Input
                                            placeholder="Ders Ara"
                                            value={value}
                                            onChange={(event) => setValue(event.currentTarget.value)}
                                            rightSectionPointerEvents="all"
                                            mt="md"
                                            size="lg"
                                            radius="lg"
                                            rightSection={
                                                <CiSearch />
                                            }
                                        />
                                        <Grid mt={"sm"}>

                                            {lessons.map((content, index) => (
                                                <Grid.Col span={4}>
                                                    <Link to={"subject/" + content.id} style={{
                                                        textDecoration: 'none',
                                                        color: 'black',

                                                    }} key={index}>
                                                        <Grid
                                                            key={index}
                                                            style={{
                                                                borderRadius: '15px',
                                                                backgroundColor: 'white',
                                                                border: '1px solid' + senaryColor,
                                                                padding: '20px',
                                                                margin: '10px',
                                                                maxHeight: '250px',
                                                                height: '250px',

                                                            }}>
                                                            <Grid.Col span={
                                                                12
                                                            }>
                                                                <img
                                                                    src={content.icon}
                                                                    style={{
                                                                        width: '100%',
                                                                        maxHeight: '100px',
                                                                        borderRadius: '15px',
                                                                    }}
                                                                />
                                                            </Grid.Col>
                                                            <Grid.Col span={
                                                                12
                                                            }>
                                                                <Title
                                                                    order={4}
                                                                >
                                                                    {content.title}
                                                                </Title>
                                                                <Text
                                                                >
                                                                    {content.subtitle}
                                                                </Text>

                                                            </Grid.Col>
                                                        </Grid>
                                                    </Link>
                                                </Grid.Col>
                                            ))}
                                        </Grid>
                                    </> : <Grid>
                                        {
                                            homeData?.map((content: any, index: number) => (
                                                <Grid.Col span={4}>
                                                    <Link to={"#"} style={{
                                                        textDecoration: 'none',
                                                        color: 'black',

                                                    }}
                                                        onClick={() => {
                                                            user.education = content.id;
                                                            window.localStorage.setItem("user", JSON.stringify(user));
                                                            userController.update(user.id, { education: content.id }).then(() => {
                                                                window.location.reload();
                                                            });
                                                        }}
                                                        key={index}>
                                                        <Grid
                                                            key={index}
                                                            style={{
                                                                borderRadius: '15px',
                                                                backgroundColor: 'white',
                                                                border: '1px solid' + senaryColor,
                                                                padding: '20px',
                                                                margin: '10px',
                                                                maxHeight: '200px',
                                                                height: '250px',

                                                            }}>
                                                            <Grid.Col span={
                                                                12
                                                            }>
                                                                <img
                                                                    src={content.icon}
                                                                    style={{
                                                                        width: '100%',
                                                                        maxHeight: '100px',
                                                                        borderRadius: '15px',
                                                                    }}
                                                                />
                                                            </Grid.Col>
                                                            <Grid.Col span={
                                                                12
                                                            }>
                                                                <Title
                                                                    order={4}

                                                                >
                                                                    {content.title}
                                                                </Title>
                                                                <Text
                                                                >
                                                                    {content.subtitle}
                                                                </Text>

                                                            </Grid.Col>
                                                        </Grid>
                                                    </Link>
                                                </Grid.Col>
                                            ))


                                        }
                                    </Grid>
                                }
                            </Container>
                        </ScrollArea>

                    </Grid.Col>

                </Grid>
            </Container>
        </div>
    );
}

export default UserDashBoard;