import { Center, Container, Group, TextInput, Title } from "@mantine/core";
import BackButton from "../../../components/Button/BackButton";
import { useState } from "react";
import { Button } from "../../../common/Button";
import { Bars } from "react-loader-spinner";
import { toast } from "react-toastify";
import questionBankController from "../../../../database/db/controller/questionBankController";
const QuestionBankAddView = () => {
    const [title, setName] = useState("");
    const [loading,setLoading]=useState(false);
    const addContent=()=>{
    setLoading(true);
    questionBankController.create({
        title
    }).then((res:any)=>{
        setLoading(false);
        if(res?.error){
            toast.error(res.error);

        }
        if(res?.success){
            toast.success(res.success);
            setName("");
        }
        setLoading(false);
    })
    
    
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
                      /> :"Kaydet"
                    }
                    </Button>
                            </Center>
        </Container>
     );
}
 
export default QuestionBankAddView;