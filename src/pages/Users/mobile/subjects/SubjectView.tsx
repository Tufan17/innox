import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import contentsController from "../../../../../database/db/controller/contentsController";
import { Avatar, Center, Container, Flex, Group, Image, ScrollArea, Slider, Space, Text, Title } from "@mantine/core";
import MobileBackButton from "../../../../components/Button/MobileBackButton";
import Loader from "../../../Loader";
import subjectController from "../../../../../database/db/controller/subjectController";
import solvedTestController from "../../../../../database/db/controller/solvedTestController";
import { primaryColor } from "../../../../constants/color";
import { useSelector } from "react-redux";

const SubjectView = () => {
    const user=useSelector((state:any)=>state.user.value);
    const { id } = useParams<{ id: string }>();
    const [lesson, setLesson] = useState<any>(null);
    const [subjects, setSubjects] = useState<any[]>([]);
    const [solved, setSolved] = useState<any[]>([]);
    useEffect(() => {

        solvedTestController.getLessons(user.id).then((res: any) => {
            const qbIdMap = res.reduce((acc:any, item:any) => {
              const key = item.qb_id;
              if (!acc[key]) {
                acc[key] = [];
              }
              acc[key].push(item);
              return acc;
            }, {});
            const uniqueSolved = Object.values(qbIdMap).map((group:any) => group[0]);
            setSolved(uniqueSolved);
          });
          


        subjectController.index(id ?? "").then((res) => {
            setSubjects(res);
        }
        );
        contentsController.getById(id ?? "").then((res) => {
            setLesson(res);
        }
        )
    }
        , [id]);

        
        const match=(qbs:any[])=>{
            if(qbs){
                let count=0;
                qbs.forEach((qb)=>{
                    solved.forEach((s)=>{
                        if(qb===s.qb_id){
                            count++;
                        }
                    });
                });
                return count/qbs.length;
            }else return 0;
        };



    return (lesson ? <ScrollArea style={{
        padding: "20px",
        width: window.innerWidth,
        height: window.innerHeight,
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
                        className="slider"
                        showLabelOnHover={false}
                        mt={"md"} color={primaryColor}
                            size="xs" value={(match(subject?.questionbank))*100} />
                    </Container>
                    
                    </Link>
                ))
        }
        <Space h={"10px"} />
    </ScrollArea> : <Loader />);
}

export default SubjectView;