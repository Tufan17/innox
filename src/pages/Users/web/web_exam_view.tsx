import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import questionBankController from "../../../../database/db/controller/questionBankController";
import questionsController from "../../../../database/db/controller/questionsController";
import { Button, Center, Container, Flex, Grid, Title } from "@mantine/core";
import { primaryColor, secondaryColor } from "../../../constants/color";
import Loader from "../../Loader";

const WebExamView = () => {
    const { id } = useParams<{ id: string }>();

    const [questions, setQuestions] = useState<any>(null);
    const [count, setCount] = useState<number>(0);
    const [selected, setSelected] = useState<any| null>(null);
    const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H"];
    useEffect(() => {
        questionBankController.getById(id ?? "").then((res) => {
            console.log(res);
            if (res?.questions) {
                questionsController.getQuestions(res.questions ?? [""]).then((res) => {
                    setQuestions(res);
                });
            } else {
                setQuestions([]);
            }
        }
        );
    }, []);
    return questions ? (<Flex
        direction={"column"}
        mih={window.innerHeight}
    >
        <Flex m={"sm"} direction={"row"}>
            
            <Container
                style={{
                    marginRight: 0,
                    paddingRight: 0,
                }}>
                <Title>{(count + 1) + " | " + questions.length}</Title>
            </Container>

        </Flex>
       <Grid>
        <Grid.Col
            span={6}
        >
        <Container
            style={{
                border: "1px solid #ccc",
                paddingLeft: "15px",
                paddingRight: "15px",
                margin: "10px",
                borderRadius: "10px",
                backgroundColor: `${primaryColor}20`
            }}
            dangerouslySetInnerHTML={
                { __html: questions[count]?.content }

            }></Container>
        
        </Grid.Col>
        <Grid.Col
            span={6}
            >
        <Flex
            direction={"column"}
        >

            <div>
                {questions[count]?.options?.map((option: any, index: number) => {
                    return (
                        <Flex
                            key={index}
                            direction={"row"}
                            style={{
                                border: selected == index ? "2px solid " + secondaryColor : "1px solid #ccc",
                                paddingLeft: "5px",
                                paddingRight: "5px",
                                margin: "10px",
                                backgroundColor: selected === index ? `${secondaryColor}20` : "white",

                                borderRadius: "10px",
                            }}
                            onClick={() => {
                                setSelected(index);
                            }}
                        >
                            <Center>
                                <Title order={2} ml={"5px"}
                                    fw={300}
                                    mr={"5px"}
                                >
                                    {alphabet[index] + "-"}
                                </Title>
                            </Center>

                            <div
                                style={{
                                    fontWeight: 200,
                                }}
                                dangerouslySetInnerHTML={
                                    { __html: option }
                                    

                                }
                            />

                        </Flex>
                    );
                })

                }
            </div>

        </Flex>
       </Grid.Col>
         </Grid>
        <Flex

        style={{
            position: "fixed",
            bottom: 0,
            width: "100%",
            backgroundColor: "white",
            zIndex: 999,
        
        }}
              mih={50}
              gap="sm"
              justify="flex-end"
              align="center"
              direction="row"
              wrap="wrap"
        >

        <Button
            size="md"
            color={"red"}
            onClick={() => {
              window.location.href = "/user_dashboard";
            }}>Kapat</Button>
        <Button
            m={"md"}
            size="md"
            disabled={selected === null}
            color={primaryColor}
            onClick={() => {
                if (count < questions.length - 1) {
                    setCount(count + 1);
                    setSelected(null);
                } else {

                    window.location.href = "/user_dashboard/result/" + id;
                }
            }}>{count + 1===questions.length?"Kaydet":"Devam"}</Button>
        </Flex>
        
    </Flex>) : <Loader />;
}
 
export default WebExamView;