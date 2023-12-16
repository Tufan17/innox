import { Container, Group, Input, Text, Title } from "@mantine/core";
import { senaryColor } from "../../../constants/color";
import { RiNotification2Line } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import { useState } from "react";
const HomeView = () => {
    const user = JSON.parse(window.localStorage.getItem("user")!);
    const [value, setValue] = useState("");
    return (
        <div
            style={{
                width: '100%',
                height: window.innerHeight - 110,
                padding: '15px',
            }}>
            <Group>
                <Container
                    style={{
                        paddingLeft: '0px',
                        marginLeft: '0px',
                    }}>
                    <Text >
                        Merhaba, {user?.nickname}
                    </Text>
                    <Title order={3} >
                        {user?.email}
                    </Title>
                </Container>
                <div style={{
                    borderRadius: '100%',
                    width: '50px',
                    height: '50px',
                    border: '2px solid ' + senaryColor,
                    padding: '10px',
                }}>
                    <RiNotification2Line
                        style={{
                            width: '100%',
                            height: '100%',
                            color: senaryColor,
                        }}
                    />
                </div>

            </Group>
            <Input
                placeholder="Clearable input"
                value={value}
                onChange={(event) => setValue(event.currentTarget.value)}
                rightSectionPointerEvents="all"
                mt="md"
                size="lg"
                radius="lg"
                rightSection={
                    <CiSearch/>
                }
            />

        </div>
    );
}

export default HomeView;