import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Divider, Grid, GridCol, Group, Title } from '@mantine/core';
import BackButton from '../../../components/Button/BackButton';
import contentsController from '../../../../database/db/controller/contentsController';
import Loader from '../../Loader';
import { primaryColor, secondaryColor } from '../../../constants/color';
import subjectController from '../../../../database/db/controller/subjectController';
import { FaEdit } from 'react-icons/fa';
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
    const res = await subjectController.index(id??"");
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
    subjects?<div style={{ padding: '10px' }}>
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
        {subjects.map((item) => (
          <Grid.Col span={5}>
            <div style={{
              height: "400px",
              width: "100%",
              padding: "10px",
              boxShadow: "whitesmoke",
            }}>
              <Group justify="space-between">
              <Title order={3}>{item.title}</Title>
              <Link to={`#`}>
                                                                                     <FaEdit className="icon" />
                                        </Link>
                </Group>
              <div dangerouslySetInnerHTML={{ __html: item.content }}></div>
              
            </div>
          </Grid.Col>
        ))}

      </Grid>
       
       
      
    </div>:<Loader/>
  );
};

export default SubjectDetail;
