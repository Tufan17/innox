import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Avatar, Button, Center, Container, Divider, Flex, Grid, Group, Title } from '@mantine/core';
import BackButton from '../../../components/Button/BackButton';
import contentsController from '../../../../database/db/controller/contentsController';
import Loader from '../../Loader';
import { primaryColor, secondaryColor } from '../../../constants/color';
import subjectController from '../../../../database/db/controller/subjectController';
import { FaEdit, FaEye } from 'react-icons/fa';
import "../index.css";
interface SubjectDetailProps {
  // Add any required props here
}
const SubjectDetail: React.FC<SubjectDetailProps> = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [mauseOver, setMauseOver] = useState<boolean>(false);
  const [subjects, setSubjects] = useState<any[]>([]);

  const getData = async () => {
    const res = await subjectController.index(id ?? "");
    setSubjects(res);
  }



  useEffect(() => {
    getData();
    const fetchData = async () => {
      try {
        const res = await contentsController.getById(id ?? '');
        setData(res);
      } finally {
        setLoading(false);
      }
    };

    fetchData();


  }, [id]);

  if (loading) {
    return <Loader />;
  }

  return (
    subjects ? <div style={{ padding: '10px' }}>
      <Group justify="space-between">
        <Title order={2}>{data.title}</Title>
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
      <Divider mt="sm" mb="xl" />
      <Grid>
        {  subjects.map((subject: any) => {
                            return (
                                <Grid.Col span={4} key={subject.id}>
                                    <Container 
                                        style={{
                                            maxHeight: "200px",
                                            borderRadius: "10px",
                                            border: "1px solid #ccc",
                                            padding: "10px",

                                        }}
                                        >
                                        <Flex
                                            direction={"row"}
                                            style={{
                                                height: "100%",
                                                justifyContent: "space-between"
                                            }}
                                        >
                                            <Avatar size="md" src={subject.icon} radius="sm" mr={"sm"}/>
                                            <Container 
                                                style={{
                                                    height: "50px",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    marginLeft: "0px",

                                                }}
                                            >{subject.title}
                                         
                                            </Container>
                                            <Group mt={"sm"} grow>
                                            <Center>
                                            <Link to={`/dashboard/contents/show/${subject.id}`}>
                                                <FaEdit className="icon" />
                                            </Link>
                                            </Center>
                                            <Center>
                                            <Link to={`#`}>
                                                <FaEye className="icon" />
                                            </Link>

                                            </Center>

                                            

                                        </Group>
                                        </Flex>
                                       
                                    </Container>
                                </Grid.Col>
                            );
                        }
                        )}

      </Grid>



    </div> : <Loader />
  );
};

export default SubjectDetail;
