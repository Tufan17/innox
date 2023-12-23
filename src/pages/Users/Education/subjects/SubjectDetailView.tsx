import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import subjectController from "../../../../../database/db/controller/subjectController";
import MobileBackButton from "../../../../components/Button/MobileBackButton";
import { Center, Container, Grid, Group, Text, Title } from "@mantine/core";
import Loader from "../../../Loader";
import { secondaryColor } from "../../../../constants/color";
import { IoIosArrowForward } from "react-icons/io";

const SubjectDetailView = () => {
    const { id } = useParams();
    const [type, setType] = useState<"subject" | "test" | "lesson">("subject");
    const [subject, setSubject] = useState<any>(null);
    useEffect(() => {
        subjectController.getById(id ?? "").then((res) => {
            setSubject(res);
        });

    }
        , [id]);
    return (subject ? <div style={{
        padding: "20px",
        width: "100%",
        height: "100%",
    }}>
        <Group>
            <MobileBackButton />
            <Center style={{

                maxWidth: "75%",
            }}>
                <Title>
                    {subject.title}
                </Title>
            </Center>
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
                        subject?.tests &&
                        subject?.tests?.map((index: number) => {
                            return <Grid.Col

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
                                                {index}. {"Test"}
                                            </Text>
                                        </Container>
                                        <IoIosArrowForward size={30} />
                                    </Group>

                                </Container>

                            </Grid.Col>
                        }
                        )
                    }
                </Grid>
        }
    </div> : <Loader />);
}

export default SubjectDetailView;