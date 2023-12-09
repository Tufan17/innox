import { Container, Grid, Group, Text, Title } from "@mantine/core";
import { Avatar } from "antd";
import { quaternaryColor } from "../../constants/color";
import { Card } from "@mui/material";
import { FcAssistant, FcManager, FcPhoneAndroid, FcSettings } from "react-icons/fc";
const UsersView = () => {
    const user = JSON.parse(window.localStorage.getItem("user")!);
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
            }}>
                Banner
            </Container>
            
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
                            Destek
                        </Text>
                    </Container>

                </Card>

                </Grid.Col>
            </Grid>
        </Group>
    </div>);
}

export default UsersView;