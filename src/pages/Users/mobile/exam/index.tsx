import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import questionBankController from "../../../../../database/db/controller/questionBankController";
import questionsController from "../../../../../database/db/controller/questionsController";
import MobileBackButton from "../../../../components/Button/MobileBackButton";
import { Button, Center, Container, Flex,  Title } from "@mantine/core";
import Loader from "../../../Loader";
import { primaryColor, secondaryColor } from "../../../../constants/color";
import solvedTestController from "../../../../../database/db/controller/solvedTestController";
import { useSelector } from "react-redux";

const ExamMobileView = () => {
    const { id } = useParams<{ id: string }>();
    const user = useSelector((state: any) => state.user.value);
    const [questions, setQuestions] = useState<any>(null);
    const [count, setCount] = useState<number>(0);
    const [selected, setSelected] = useState<any| null>(null);
    const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H"];
    const [subject, setSubject] = useState("");
    const [correct, setCorrect] = useState(0);
    const [wrong, setWrong] = useState(0);
    const [empty, setEmpty] = useState(0);

    useEffect(() => {
        questionBankController.getById(id ?? "").then((res) => {
            setSubject(res?.subject);
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
    const save=async ()=>{
        
        await solvedTestController.create({
            sub_id:subject,
            qb_id:id,
            correct,
            wrong,
            empty,
            user_id:user?.id,
            size:questions.length,
        });
    
    
    };
    return questions ? (<Flex
        direction={"column"}
        mih={window.innerHeight}
        justify={"space-between"}
    >
       
        <Container
        style={{
            margin: "0px",
        }}
        >
        <Flex m={"sm"} direction={"row"}>
            <MobileBackButton />
            <Container
                style={{
                    marginRight: 0,
                    paddingRight: 0,
                }}>
                <Title>{(count + 1) + " | " + questions.length}</Title>
            </Container>

        </Flex>
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
                                paddingLeft: "15px",
                                paddingRight: "15px",
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
                                    mr={"10px"}
                                >
                                    {alphabet[index] + "- "}
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

        </Container>

        <Button
            m={"md"}
            size="md"
            disabled={selected === null}
            color={primaryColor}
            onClick={() => {
                if (count < questions.length - 1) {
                    setCount(count + 1);
                    setSelected(null);
                    if (selected === questions[count]?.answer) {
                        setCorrect(correct + 1);
                    } else if (selected === null) {
                        setEmpty(empty + 1);
                    } else {
                        setWrong(wrong + 1);
                    }
                } else {
                    if (selected === questions[count]?.answer) {
                        setCorrect(correct + 1);
                    } else if (selected === null) {
                        setEmpty(empty + 1);
                    } else {
                        setWrong(wrong + 1);
                    }
                    save().finally(()=>{

                     window.location.href = "/mobile/result/" + id;
                });
                }
            }}>{count+1===questions.length?"Kaydet":"Devam"}</Button>
    </Flex>) : <Loader />;
}

export default ExamMobileView;