import { Container, Grid, Group, Text, Title } from "@mantine/core";
import { Avatar } from "antd";
import { quaternaryColor } from "../../constants/color";
import { Card } from "@mui/material";
import { FcAssistant, FcManager, FcPhoneAndroid, FcSettings } from "react-icons/fc";
import { useEffect, useState } from "react";
import Loader from "../Loader";
import bannerController from "../../../database/db/controller/bannerController";
import contentsController from "../../../database/db/controller/contentsController";
const UsersView = () => {
    const user = JSON.parse(window.localStorage.getItem("user")!);
    const [homeData, setHomeData] = useState<{ banner: any, contents: ContentType[] } | null>(null);

    const getAllData = async () => {
        const banner = await bannerController.index();
        const contents = await contentsController.index();
        const data = {
            banner: banner[0],
            contents: contents,
        };
        setHomeData(data);
    };


    useEffect(() => {
        getAllData();

    }, []);


    if (!homeData) {
        return (<Loader />);
    }

    return (<div style={{
        padding: '10px',
    }}>

        <Group>
            <Avatar size={64} src={user.avatar} />
            <Container
                style={{
                    marginLeft: '0px',
                    padding: '0px',
                }}
            >
                <Title order={3} >
                    Merhaba, Hoş Geldiniz 👋
                </Title>
                <Text size="20px">
                    {user?.nickname}
                </Text>
            </Container>
            <Container style={{
                width: '100%',
                height: window.innerWidth / 2,
                backgroundColor: quaternaryColor,
                borderRadius: '10px',
                backgroundImage: `url(${homeData.banner.url})`,
                backgroundSize: 'cover',
                boxShadow: '1px 1px 10px 1px whitesmoke',
            }}>
            </Container>

            <Grid gutter="sm" style={{
                width: '100%',
            }} >
                {
                    homeData?.contents.map((content: any) => {
                        return (
                            <Grid.Col span={content.width}> <Card
                                style={{
                                    backgroundColor: quaternaryColor,
                                    height: window.innerWidth * content.height/12,
                                    boxShadow: 'none',
                                }}>
                                <Container style={{
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',

                                }}>
                                    <FcSettings size={35} />
                                    <Text fw={700}>
                                        {content.title}
                                    </Text>
                                </Container>

                            </Card>

                            </Grid.Col>
                        );
                    })
                }


            </Grid>


            <Grid gutter="sm" style={{
                width: '100%',
                height: window.innerWidth / 2,
            }} >
                <Grid.Col span={3}> <Card
                    style={{
                        backgroundColor: quaternaryColor,
                        height: window.innerWidth / 4,
                        boxShadow: 'none',
                    }}>
                    <Container style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',

                    }}>
                        <FcSettings size={35} />
                        <Text fw={700}>
                            Ayarlar
                        </Text>
                    </Container>

                </Card>

                </Grid.Col>
                <Grid.Col span={3}> <Card
                    style={{
                        backgroundColor: quaternaryColor,
                        height: window.innerWidth / 4,
                        boxShadow: 'none',
                    }}>
                    <Container style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',

                    }}>
                        <FcPhoneAndroid size={35} />
                        <Text fw={700}>
                            İletişim
                        </Text>
                    </Container>

                </Card>

                </Grid.Col>
                <Grid.Col span={3}> <Card
                    style={{
                        backgroundColor: quaternaryColor,
                        height: window.innerWidth / 4,
                        boxShadow: 'none',
                    }}>
                    <Container style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',

                    }}>
                        <FcAssistant size={35} />
                        <Text fw={700}>
                            Destek
                        </Text>
                    </Container>

                </Card>

                </Grid.Col>
                <Grid.Col span={3}> <Card
                    style={{
                        backgroundColor: quaternaryColor,
                        height: window.innerWidth / 4,
                        boxShadow: 'none',
                    }}>
                    <Container style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',

                    }}>
                        <FcManager size={35} />
                        <Text fw={700}>
                            Profil
                        </Text>
                    </Container>

                </Card>

                </Grid.Col>
            </Grid>
        </Group>
    </div>);
}

export default UsersView;