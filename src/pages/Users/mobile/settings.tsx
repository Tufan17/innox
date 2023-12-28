import { Container, Flex, Group, Text, Title } from "@mantine/core";
import { quinaryColor } from "../../../constants/color";
import { IoIosArrowForward } from "react-icons/io";
const SettingsView = () => {
    return (<>
        <div
            style={{
                width: "100%",
                height: "100%",
                overflow: "hidden",
            }}
        >
           
            <Container 
            style={{
                width: "100%",
                margin: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflowY: "hidden",
            }}>
            <Title order={2} >
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
                        Bildirimler
                    </Text>
                </Container>
                    <IoIosArrowForward size={30}/>
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
                        Gizlilik ve Güvenlik
                    </Text>
                </Container>
                    <IoIosArrowForward size={30}/>
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
                    <IoIosArrowForward size={30}/>
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
                    <IoIosArrowForward size={30}/>
            </Group>
            </Container>
            
        </div>
        <Flex

            style={{
                position: "fixed",
                bottom: 120,
                left: 0,
                right: 0,
            }}
            mih={50}
            gap="md"
            justify="center"
            align="center"
            direction="row"
            wrap="wrap"
        >
            <Text
                color={quinaryColor}
            >
                version 1.0.0
            </Text>
        </Flex>
    </>);
}

export default SettingsView;