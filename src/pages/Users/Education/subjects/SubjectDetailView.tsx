import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import subjectController from "../../../../../database/db/controller/subjectController";
import MobileBackButton from "../../../../components/Button/MobileBackButton";
import { Center, Container, Grid, Group, Text, Title } from "@mantine/core";
import Loader from "../../../Loader";

const SubjectDetailView = () => {
    const { id } = useParams();
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
        <div dangerouslySetInnerHTML={{ __html: subject.content }} />
        <Grid p={"md"} gutter="lg">
            {
                subject?.tests&&
                subject?.tests?.map((index: number) => {
                    return <Grid.Col
                        span={6}

                    >
                        <Container style={{
                            border: "1px solid #ccc",
                            borderRadius: "10px",
                            padding: "10px",
                        }}  >
                            <Text fw={"bold"}>
                                {index + 1}. {"Test"}
                            </Text>
                        </Container>

                    </Grid.Col>
                }
                )
            }
        </Grid>
    </div> : <Loader />);
}

export default SubjectDetailView;