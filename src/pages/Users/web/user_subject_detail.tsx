import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import subjectController from "../../../../database/db/controller/subjectController";
import { Center, Container, Grid, Group, Text, Title } from "@mantine/core";
import { primaryColor, secondaryColor } from "../../../constants/color";
import Loader from "../../Loader";
import BackButton from "../../../components/Button/BackButton";

const UserSubjectDetailView = () => {
    const { id } = useParams();
    const [type, setType] = useState<"subject" | "test" | "lesson">("subject");
    const [subject, setSubject] = useState<any>(null);
    useEffect(() => {
        subjectController.getById(id ?? "").then((res) => {
            setSubject(res);
        });

    }
        , [id]);
    return (subject ? <Container style={{
        padding: "20px",
        width: "100%",
        height: "100%",
    }}>
        <Group justify="space-between">
            <Center style={{

                maxWidth: "75%",
            }}>
                <Title>
                    {subject.title}
                </Title>
            </Center>
            <BackButton />
        </Group>
        <Group grow mt={"md"}>
            <Center>
                <Text fw="bold" color={
                    type === "subject" ? secondaryColor : "#ccc"

                }
                    onClick={() => {
                        setType("subject");
                    }
                    }
                >
                    Konu Anlatım
                </Text>
            </Center>
            <Center>
                <Text fw="bold"
                    color={
                        type === "lesson" ? secondaryColor : "#ccc"
                    }
                    onClick={() => {
                        setType("lesson");
                    }

                    }
                >
                    Testler
                </Text>
            </Center>

        </Group>
        {
            type === "subject" ?
                <div dangerouslySetInnerHTML={{ __html: subject.content }} /> :
                <Grid p={"md"} gutter="lg">
                    {
                        subject?.questionbank ?
                        subject?.questionbank?.map((test:string,index: number) => {
                            return <Grid.Col

                            >
                                <Link to={`/user_dashboard/exam/${test}`}
                                style={{
                                    textDecoration:"none",
                                    color:primaryColor
                                }}
                                >
                                <Container style={{
                                    border: "1px solid #ccc",
                                    borderRadius: "10px",
                                    padding: "10px",
                                }}  >
                                    <Group>
                                        <Container
                                            style={{
                                                marginLeft: 0,
                                                paddingLeft: 0,

                                            }}>
                                            <Text fw={"bold"}>
                                                {index+1}. {"Test"}
                                            </Text>
                                        </Container>
                                        <IoIosArrowForward size={30} />
                                    </Group>

                                </Container></Link>

                            </Grid.Col>
                        }
                        ):<Center
                        
                        style={{
                            height: "500px",
                        width: "100%",

                        }}>

                        <Text>
                            Bu Konuda Henüz Test Bulunmamaktadır.
                        </Text>
                        </Center>
                    }
                </Grid>
        }
    </Container> : <Loader />);
}

export default UserSubjectDetailView;