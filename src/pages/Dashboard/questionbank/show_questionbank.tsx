import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import questionBankController from "../../../../database/db/controller/questionBankController";
import { Button, Center, Container, Grid, Group, Title } from "@mantine/core";
import BackButton from "../../../components/Button/BackButton";
import Loader from "../../Loader";
import { primaryColor, secondaryColor } from "../../../constants/color";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

const ShowQuestionBankView = () => {
    const { id } = useParams<{ id: string }>();
    const [questionBank, setQuestionBank] = useState<any>(null);
    const [questions, setQuestions] = useState<any>(null);
    const [mauseOver, setMauseOver] = useState<boolean>(false);

    useEffect(() => {
        questionBankController.getById(id ?? "").then((res) => {
            setQuestionBank(res);
            if(res?.questions){
                questionBankController.getQuestions(res.questions ?? [""]).then((res) => {
                    setQuestions(res);
                });
            }else{
                setQuestions([]);
            
            }
        }
        );
    }, []);

    const deleteQuestion = async (qID: string) => {
        const res = await questionBankController.remove(id??"",qID);
        if (res) {
            setQuestions(questions.filter((question: any) => question.id !== qID));
        }
    }

    return questions ? (<>
        <Group justify="space-between">
            <Title order={2}>{questionBank.title}</Title>
            <Group>
                <Link to={`/dashboard/questionbank/question/add/${id}`}>
                    <Button
                        bg={mauseOver ? secondaryColor : primaryColor}
                        onMouseOver={() => setMauseOver(true)}
                        onMouseOut={() => setMauseOver(false)}
                    >
                        Ekle
                    </Button>
                </Link>
                <BackButton />
            </Group>
        </Group>
        {questions.length == 0 ? <Center
            style={{
                height: "500px",

            }}
        >
            Soru Bankasında Soru Bulunmamaktadır.
        </Center> : <Grid mt={"md"}>
            {
                questions.map((question: any) => (
                    <Grid.Col>
                       <Group 
                        p={"sm"}
                       style={{
                        border: "1px solid #ccc",
                        borderRadius: "20px",

                       }}>
                       <Container 
                        style={{
                            marginLeft: "0px",
                            
                            paddingLeft: "10px",
                            
                        }}
                       key={question.id}>
                            <div
                                dangerouslySetInnerHTML={{ __html: question.content }}
                            />
                        </Container>
                        <FaEye
                        size={"23px"}
                        color={primaryColor}
                        />
                        <FaEdit 
                        size={"23px"}
                        color={secondaryColor}
                        />
                        <FaTrash
                            onClick={() => deleteQuestion(question.id)}
                            style={{
                                cursor: "pointer",
                                color: "red",
                                fontSize: "20px",
                            }}
                        />
                       </Group>
                    </Grid.Col>
                ))

            }
        </Grid>}
    </>) : <Loader />;
}

export default ShowQuestionBankView;