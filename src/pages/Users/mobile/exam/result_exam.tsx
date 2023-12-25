import { Center, Flex, Image, Space, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import { Button } from "../../../../common/Button";


const ResultExamView = () => {
    // const { id } = useParams<{ id: string }>();

    return ( <Flex
        direction={"column"}
        mih={window.innerHeight}
        justify={"space-between"}
    
    >
        <Title style={{
            textAlign:"center",
            margin:"20px",
            fontWeight:"500"
        }}>
            Sonuç Sayfası
        </Title>
        <Space h={10} />,

        <Image
            src={"/img/result.png"}
            alt={"innoX"}
            
        />
        <Center m="xl" style={{
            textAlign:"center",
            fontWeight:"500"
        
        }}>
            Test sonucunuz kaydedildi. Kısa süre içerisinde sonuçlarınız size mail olarak yada bildirim olarak gönderilecektir.
        </Center>
        <Space h={10} />,

        <Link to="/app/home"
            style={{
                display:"flex",
             
                justifyContent:"center",
                alignItems:"center",
                width:"100%",
                height:"100%",
                fontStyle:"none",
                textDecoration:"none"
            
            }}
        >
            <Button 
            onClick={() => {
                

            }
            }
            children={"Anasayfaya Dön"}

            />

        </Link>
        <Space h={10} />,
    </Flex> );
}
 
export default ResultExamView;