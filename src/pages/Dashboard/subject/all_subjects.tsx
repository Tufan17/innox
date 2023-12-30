import { Avatar, Center, Container, Flex, Grid, Group, Image, Title } from "@mantine/core";
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

            : (<div
                style={{
                    margin: 0,
                    width: "100%",
                }}
            >
                <Title order={2}>Bütün Konular</Title>
                <Grid mt={"md"} style={{
                    width: "100%",
                }}>
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
                                        <Flex
                                            direction={"row"}
                                            style={{
                                                height: "100%",
                                                justifyContent: "space-between"
                                            }}
                                        >
                                            <Avatar size="md" src={subject.icon} radius="sm" mr={"sm"}/>
                                            <Container 
                                                style={{
                                                    height: "50px",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    marginLeft: "0px",

                                                }}
                                            >{subject.title}
                                         
                                            </Container>
                                            <Group mt={"sm"} grow>
                                            <Center>
                                            <Link to={`/dashboard/subjects/edit/${subject.id}`}>
                                                <FaEdit className="icon" />
                                            </Link>
                                            </Center>
                                            <Center>
                                            <Link to={`/dashboard/subjects/show/${subject.id}`}>
                                                <FaEye className="icon" />
                                            </Link>

                                            </Center>

                                            

                                        </Group>
                                        </Flex>
                                       
                                    </Container>
                                </Grid.Col>
                            );
                        }
                        )
                    }

                </Grid>
            </div>);
}

export default AllSubject;