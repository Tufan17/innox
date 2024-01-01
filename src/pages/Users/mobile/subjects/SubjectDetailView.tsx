import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import subjectController from "../../../../../database/db/controller/subjectController";
import MobileBackButton from "../../../../components/Button/MobileBackButton";
import { Center, Container, Grid, Group, ScrollArea, Text, Title } from "@mantine/core";
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
    return (subject ? <ScrollArea style={{
        padding: "20px",
        width: window.innerWidth,
        height: window.innerHeight,
    }}>
        <Group>
            <MobileBackButton />
            <Center style={{

                maxWidth: "75%",
            }}>
                <Title order={3}>
                    {subject.title}
                </Title>
            </Center>
        </Group>
        <Group grow mt={"md"}
        >
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
                <Grid p={"md"} gutter="lg"
               
                >
                    {
                        subject?.questionbank?.length>0 ?
                        subject?.questionbank?.map((value:any,index: number) => {
                            return <Grid.Col

                            >
                               <Link to={`/mobile/exam/${value}`}
                                style={{
                                    textDecoration:"none",
                                    color:"inherit"
                                
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

                                </Container>

                                </Link>
                            </Grid.Col>
                        }
                        ):<Center 
                        style={{
                            width:"100%",
                            marginTop:"200px"
                        
                        }}
                        >
                            <Text>Henüz test eklenmemiş.</Text>
                        </Center>
                    }
                </Grid>
        }
    </ScrollArea> : <Loader />);
}

export default SubjectDetailView;