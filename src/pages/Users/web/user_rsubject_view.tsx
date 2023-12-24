import { Avatar, Center, Container, Group, Image, Slider, Text, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import subjectController from "../../../../database/db/controller/subjectController";
import contentsController from "../../../../database/db/controller/contentsController";
import { primaryColor } from "../../../constants/color";
import BackButton from "../../../components/Button/BackButton";
import Loader from "../../Loader";

const UserSubjectView = () => {
    const { id } = useParams();
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
    return ( lesson ? <Container style={{
        padding: "20px",
        width: "100%",
        height: "100%",
    }}>
        <Group justify="space-between">
            <Center style={{

                maxWidth: "75%",
            }}>
                <Title>
                    {lesson.title}
                </Title>
            </Center>
            <BackButton />
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
                    <Link to={"/user_dashboard/subject/detail/"+subject.id} key={index}
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
                        <Group>

                            <Avatar src={subject.icon} alt={subject.title}
                                radius={"xs"}
                            />
                            <Center>
                                <Title
                                    order={3}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    {subject.title}
                                </Title>
                            </Center>

                        </Group>
                        <Slider
                        
      showLabelOnHover={false}
                        mt={"md"} color={primaryColor}
                            size="xs" value={(0/subject?.tests?.length)*100} />
                    </Container>
                    
                    </Link>
                ))
        }
    </Container> : <Loader />);
}
 
export default UserSubjectView;