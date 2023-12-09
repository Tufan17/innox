import { Container, Grid, Group, Text, Title } from "@mantine/core";
import { Avatar } from "antd";
import { quaternaryColor } from "../../constants/color";
import { Card } from "@mui/material";
import { FcAssistant, FcManager, FcPhoneAndroid, FcSettings } from "react-icons/fc";
const UsersView = () => {
        </> );
        padding: '10px',
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