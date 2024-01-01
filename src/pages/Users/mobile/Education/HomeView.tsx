import { Container, Grid, Group, Input, ScrollArea, Text, Title } from "@mantine/core";
import { senaryColor } from "../../../../constants/color";
import { RiNotification2Line } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import { useEffect, useState } from "react";
import contentsController from "../../../../../database/db/controller/contentsController";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const HomeView = () => {
    const user = useSelector((state:any) => state.user.value);
    const [value, setValue] = useState("");
    const [contents, setContents] = useState<any[]>([]);
    const getAllData = async () => {
        try {
            const data: any[] = await contentsController.subIndex(user.education);
            setContents(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }

       
    };
    useEffect(() => {
        getAllData();
    }, []);
    return (
        <div
            style={{
                width: '100%',
                height: window.innerHeight - 90,
                padding: '15px',
                overflow: "hidden",
    
            }}>
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    padding: '15px',
                    height: '140px',
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
            </div>
            <ScrollArea
                style={{
                    width: '100%',
                    position: 'fixed',
                    top: 140,
                    left: 0,
                    right: 0,
                    bottom: 85,
                    
                }}

            >
                {contents.map((content, index) => (
                            <Link to={"/mobile/subject/"+content.id} style={{
                                textDecoration: 'none',
                                color: 'black',
                            
                            }} key={index}>
                            <Grid
                        key={index}
                        style={{
                            borderRadius: '15px',
                            backgroundColor: 'white',
                            border: '1px solid'+senaryColor,
                            padding: '20px',
                            margin: '10px',
                        }}>
                        <Grid.Col span={
                            content.card_type === "col" ? 12 : content.width
                        }>
                            <img
                                src={content.icon}
                                style={{
                                    width: '100%',
                                    borderRadius: '15px',
                                }}
                            />
                        </Grid.Col>
                        <Grid.Col span={
                            content.card_type === "col" ? 12 : 12-content.width
                        }>
                            <Title
                                order={3}
                            >
                                {content.title}
                            </Title>
                            <Text>
                                {content.subtitle}
                            </Text>
                        </Grid.Col>
                    </Grid>
                    </Link>
                ))}
            </ScrollArea>
        </div>
    );
}

export default HomeView;