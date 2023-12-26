import { Button, Center, Container, Divider, Grid, Group, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import BackButton from "../../../components/Button/BackButton";
import { useEffect, useState } from "react";
import { primaryColor, secondaryColor } from "../../../constants/color";
import questionBankController from "../../../../database/db/controller/questionBankController";
import Loader from "../../Loader";
import { FaEdit, FaRegQuestionCircle, FaTrash } from "react-icons/fa";
import { MdOutlineContentPaste } from "react-icons/md";

const QuestionBankView = () => {
  const [mauseOver, setMauseOver] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    questionBankController.index().then((res) => {
      setData(res);
    }
    );
  }, []);
  return data === null ?
    <Loader />
    : (
      <>
        <Group justify="space-between">
          <Title order={2}>Soru Bankası</Title>
          <Group>
            <Link to={'add'}>
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
        <Grid m={"md"}>
          {
            data.map((item: any) => {
              return (
                <Grid.Col span={3}>
                  <Container 
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "10px",
                      padding: "10px",
                      cursor: "pointer",
                      border: "1px solid #e0e0e0",
                    
                    }}
                  >
                    <Title order={3} mt={"md"} mb={"md"}>
                      {item.title}
                    </Title>
                    <Divider />
                    <Group grow m={"md"}>
                      <Link to={`${item.id}`}
                      >
                        <Center>
                          <FaEdit className="icon" />

                        </Center>
                      </Link>
                      <Link to={`show/${item.id}`}>
                        <Center>

                          <MdOutlineContentPaste className="icon" />

                        </Center>
                      </Link>
                        <Center>
                          {
                            item?.questions?<Group>
                          <Title className="icon" order={2} p={0} m={0}>
                            {item?.questions?.length}
                          </Title>
                          <FaRegQuestionCircle className="icon" />

                          </Group>:
                          <FaTrash className="icon" 
                            onClick={() => {
                              questionBankController.deleteQuestionBank(item.id).finally(() => {
                                setData(data.filter((res: any) => item.id !== res.id));
                              });
                            }}
                          
                          />
                          }

                        </Center>
                    </Group>
                  </Container>
                </Grid.Col>

              );
            })

          }
        </Grid>

      </>
    );
}

export default QuestionBankView;