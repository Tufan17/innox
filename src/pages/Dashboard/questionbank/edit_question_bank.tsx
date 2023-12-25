import { useEffect, useState } from "react";
import questionBankController from "../../../../database/db/controller/questionBankController";
import { toast } from "react-toastify";
import { Center, Container, Group, Select, TextInput, Title } from "@mantine/core";
import BackButton from "../../../components/Button/BackButton";
import { Button } from "../../../common/Button";
import { Bars } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import subjectController from "../../../../database/db/controller/subjectController";
import { arrayUnion } from "firebase/firestore";

const EditQuestionBank = () => {
    const [title, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const { id } = useParams<{ id: string }>();
    const [data, setData] = useState<any>(null);
    const [subjects, setSubjects] = useState<any>(null);
    const [subject, setSubject] = useState<any>(null);
    useEffect(() => {
        subjectController.getAll().then((res) => {
            let subjects: any = [];
            res.forEach((element: any) => {
               subjects.push({
                    value: element.id,
                    label: element.title,
                });
            });
            setSubjects(subjects);
        });

        questionBankController.getById(id ?? "").then((res) => {
            setName(res.title);
            setSubject(res?.subject);
            setData(res);
        })
    }, []);

    const addContent = () => {
        setLoading(true);
        if (subject !== data?.subject||title !== data?.title) {
          try{
            const val={
                subject:subject,
                title:title
            };
            questionBankController.update(id ?? "", val).finally(() => {
                setLoading(false);
            });
            subjectController.update(subject, {questionbank: arrayUnion(id)}).finally(() => {
                setLoading(false);
            });
            toast.success("Soru Bankası Güncellendi.");
          }catch(e){
            setLoading(false);
            toast.error("Soru Bankası Güncellenemedi.");
          }
        }


    }

    return (
        <Container>
            <Group justify="space-between">
                <Title>Soru Bankası Ekle</Title>
                <BackButton />
            </Group>
            <TextInput
                mt={"xl"}
                label="Başlık"
                placeholder="Soru Bankası Başlığı"
                value={title}
                onChange={(event) => {
                    setName(event.currentTarget.value);
                }}
            />
            <Select
                mt={"md"}
                label="Konular"
                placeholder="Bir Tane Konu Seçiniz"
                data={subjects}
                value={subject}
                onChange={(event) => {
                    setSubject(event);
                }}
                searchable
                nothingFoundMessage="Bağlanacak Konu Yok..."
            />

            <Center mt={"md"}>
                <Button

                    onClick={addContent}>
                    {
                        loading ? <Bars
                            height="20"
                            width="80"
                            color="white"
                            ariaLabel="bars-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                        /> : "Kaydet"
                    }
                </Button>
            </Center>
        </Container>
    );
}

export default EditQuestionBank;