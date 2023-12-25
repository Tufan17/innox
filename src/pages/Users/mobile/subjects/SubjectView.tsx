import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import contentsController from "../../../../../database/db/controller/contentsController";
import { Avatar, Center, Container, Flex, Group, Image, Slider, Space, Text, Title } from "@mantine/core";
import MobileBackButton from "../../../../components/Button/MobileBackButton";
import Loader from "../../../Loader";
import subjectController from "../../../../../database/db/controller/subjectController";
import { primaryColor } from "../../../../constants/color";

const SubjectView = () => {
    const { id } = useParams<{ id: string }>();
    const [lesson, setLesson] = useState<any>(null);
    const [subjects, setSubjects] = useState<any[]>([]);
    useEffect(() => {
        subjectController.index(id ?? "").then((res) => {
            setSubjects(res);
            console.log(res);
        }
        );
        contentsController.getById(id ?? "").then((res) => {
            setLesson(res);
        }
        )
    }
        , [id]);
    return (lesson ? <div style={{
        padding: "20px",
        width: "100%",
        height: "100%",
    }}>
        <Group>
            <MobileBackButton />
            <Center 

            style={{

                maxWidth: "75%",
            }}>
                <Title order={3}>
                    {lesson.title}
                </Title>
            </Center>
        </Group>
        <Container
            mt={"sm"}
            style={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "20px",
            }}
        >
            <Image src={lesson.icon} alt={lesson.title} />
            <Title mt={"sm"}
                order={3}
            >
                {lesson.title}
            </Title>
            <Text>
                {lesson.subtitle}
            </Text>
        </Container>
        {
            subjects.length === 0 ? <Container>

                <Title mt={"xl"}
                    order={3}
                    style={{
                        textAlign: "center",
                        
                    }}
                >
                    Bu derse ait konu şuanda bağlanmamıştır.
                </Title>
            </Container> :
                subjects.map((subject, index) => (
                    <Link to={"/mobile/subject/detail/"+subject.id} key={index}
                    style={{
                        textDecoration:"none",
                        color:"inherit"
                    }}
                    >
                    <Container
                        mt={"sm"}
                        style={{
                            border: "1px solid #ccc",
                            borderRadius: "10px",
                            padding: "20px",
                        }}
                    >
                        <Flex direction={"row"}>

                            <Avatar src={subject.icon} alt={subject.title}
                                radius={"xs"}
                            />
                            <Center ml={"sm"}>
                                <Title
                                    order={4}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    {subject.title}
                                </Title>
                            </Center>

                        </Flex>
                        <Slider
                        
      showLabelOnHover={false}
                        mt={"md"} color={primaryColor}
                            size="xs" value={(0/subject?.tests?.length)*100} />
                    </Container>
                    
                    </Link>
                ))
        }
        <Space h={"10px"} />
    </div> : <Loader />);
}

export default SubjectView;