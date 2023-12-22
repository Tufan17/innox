import { Avatar, Center, Container, Grid, Group, Image, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import subjectController from "../../../../database/db/controller/subjectController";
import Loader from "../../Loader";
import { FaEdit, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";



const AllSubject = () => {
    const [subjects, setSubjects] = useState<any>(null);
    const getData = async () => {
        const res = await subjectController.getAll();
        setSubjects(res);
    }
    useEffect(() => {
        getData();
    }, []);
    return subjects === null ?
        <Loader />
        : subjects.length === 0 ?
            <Container mt={"200px"}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center"

                }}
            >
                <Image src="/assets/logo_IX.png" alt="InnoX" style={{
                    width: "200px"
                }} />
                <h3>Henüz hiç konu eklenmemiş.</h3>
            </Container>

            : (<Container
                style={{
                    margin: 0,
                    width: "100%",
                }}
            >
                <Title order={2}>Bütün Konular</Title>
                <Grid mt={"md"}>
                    {
                        subjects.map((subject: any) => {
                            return (
                                <Grid.Col span={4} key={subject.id}>
                                    <Container 
                                        style={{
                                            maxHeight: "200px",
                                            borderRadius: "10px",
                                            border: "1px solid #ccc",
                                            padding: "10px",

                                        }}
                                        >
                                        <Group>
                                            <Avatar size="md" src={subject.icon} radius="sm" />
                                            <Title order={3}>{subject.title}</Title>
                                        </Group>
                                        <Group mt={"sm"} grow>
                                            <Center>
                                            <Link to={`#`}>
                                                <FaEdit className="icon" />
                                            </Link>
                                            </Center>
                                            <Center>
                                            <Link to={`#`}>
                                                <FaEye className="icon" />
                                            </Link>

                                            </Center>

                                            

                                        </Group>
                                    </Container>
                                </Grid.Col>
                            );
                        }
                        )
                    }

                </Grid>
            </Container>);
}

export default AllSubject;