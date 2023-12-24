import { useEffect, useState } from "react";
import Loader from "../../../Loader";
import { AppShell, Button, Center, Container, Group, Modal, Text, Title } from "@mantine/core";
import { Avatar } from "antd";
import { primaryColor, secondaryColor } from "../../../../constants/color";
import contentsController from "../../../../../database/db/controller/contentsController";
import { MdChangeCircle } from "react-icons/md";
import { useDisclosure } from "@mantine/hooks";
import { Link } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { signout } from "../../../../../database/service/auth_service";
const ProfileView = () => {

  const [opened, { open, close }] = useDisclosure(false);
  const [logout, setLogout] = useDisclosure(false);
    const [user, setUser] = useState<any>(null);
    const [education, setEducation] = useState<any>(null);

    useEffect(() => {
        const localUser:any = localStorage.getItem('user');
        setUser(JSON.parse(localUser));
        contentsController.getById(JSON.parse(localUser).education).then((res:any)=>{
            setEducation(res);
        });        
    });

    return education==null?
    (<Loader/>)
    :( <AppShell
        header={{ height: 80 }}>
         <AppShell.Header style={{
            borderBottom: "none",
        
         }}>
            
        <Group p={"sm"}>
        <Center style={{width:"100%"}}><Title order={2}>Profil</Title></Center>
        </Group>
      </AppShell.Header>
      <AppShell.Main>
      <Modal opened={opened} onClose={close} withCloseButton={false} centered>
         <Title order={5} c={primaryColor} mt={"md"} style={{
            textAlign: "center",
         }}>Eğitimi değiştirmek istiyor musun?</Title>
            <Group m={"md"} style={{
                justifyContent: "center",
            
            }} 
            
            >
                <Link to={"/dashboard"}>
                <Button onClick={()=>{
                close();
            }} color={primaryColor}>Evet</Button>
                </Link>

            <Button onClick={close} color={secondaryColor}>Hayır</Button>
            </Group>
      </Modal>

      <Modal opened={logout} onClose={setLogout.close} withCloseButton={false} centered>
         <Title order={5} c={primaryColor} mt={"md"} style={{
            textAlign: "center",
         }}>Çıkış yapmak istiyor musun? 
         </Title>
            <Group m={"md"} style={{
                justifyContent: "center",
            
            }} 
            
            >
                <Link to={"/login"}>
                <Button onClick={()=>{
                    signout();
                close();
            }} color={primaryColor}>Evet</Button>
                </Link>

            <Button onClick={close} color={secondaryColor}>Hayır</Button>
            </Group>
      </Modal>

        
            <Container style={{
            textAlign: "center",
            margin: "10px",
            borderRadius: "10px",
            border: "1px solid #eaeaea",
            padding: "10px",
        }}>
            <Avatar size={75} src={user.avatar} />

         <Title order={3} c={primaryColor}>{user.nickname}</Title>
            <Title order={5}>{user.email}</Title>
        </Container>
        <Container style={{
            textAlign: "center",
            borderRadius: "10px",
            padding: "10px",
            margin: "10px",
            border: "1px solid #eaeaea",
        }}>
            <Title order={5} c={secondaryColor} style={{
                textAlign: "left",
            }}>Eğitiminiz</Title>
            <Title order={3} c={primaryColor}>{education.title}</Title>
            <Title order={5}>{education.subtitle}</Title>
        </Container>
        <Container style={{
            textAlign: "center",
            borderRadius: "10px",
            padding: "10px",
            margin: "10px",
            border: "1px solid #eaeaea",
        }}>
           <Group onClick={open}>
            <Container style={{
                paddingLeft: "0px",
                marginLeft: "0px",
            }}>
            <Text>Eğitimimi değiştirmek istiyorum</Text>
            </Container>
            <MdChangeCircle size={30} color={primaryColor}/>
           </Group>
        </Container>
        <Container style={{
            textAlign: "center",
            borderRadius: "10px",
            padding: "10px",
            margin: "10px",
            border: "1px solid #eaeaea",
        }}>
           <Group onClick={setLogout.open}>
            <Container style={{
                paddingLeft: "0px",
                marginLeft: "0px",
            }}>
            <Text>Çıkış Yap</Text>
            </Container>
            <IoIosLogOut  size={30} color={primaryColor}/>
           </Group>
        </Container>
      </AppShell.Main>
    
    </AppShell> 
    );
}
 
export default ProfileView;