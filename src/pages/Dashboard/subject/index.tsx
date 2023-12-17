import React, { useState, useRef, useMemo, useEffect } from 'react';
import JoditEditor from 'jodit-react';

import { Link, useParams } from 'react-router-dom';
import { Button, Container, Divider, Flex, Group, Space, Textarea, Title } from '@mantine/core';
import BackButton from '../../../components/Button/BackButton';
import contentsController from '../../../../database/db/controller/contentsController';
import Loader from '../../Loader';
import { primaryColor, secondaryColor } from '../../../constants/color';
import { IoChevronBack } from "react-icons/io5";
interface SubjectDetailProps {
  // Add any required props here
}
const SubjectDetail: React.FC<SubjectDetailProps> = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [mauseOver, setMauseOver] = useState<boolean>(false);
  const editor = useRef<any>(null);
  const [content, setContent] = useState<string>('');

  const config = useMemo(() => ({
    readonly: false,
    placeholder: 'içerik ekleyin...',
  }), []);
  const [title, setTitle] = useState<string>('');


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await contentsController.getById(id ?? '');
        setData(res);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      // Cleanup code (if needed)
    };
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div style={{ padding: '10px' }}>
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
      <Flex>
        <Container
          style={{
            padding: '0px',
            width: '100%',
            margin: '5px',
          }}
        >
        <Textarea
            placeholder="Başlık Ekleyin..."
            onChange={(e) => setTitle(e.currentTarget.value)}
            value={title}
            
          />   
          <Space h="xl" />
        <JoditEditor
            
            ref={editor}
            value={content}
            config={config}
            onChange={(newContent) => {
              setContent(newContent);
            }}
          />
        </Container>
        <div
          style={{
            width: '400px',
            height: '500px',
            borderRadius: '10px',
            border: '1px solid #000',
            padding: '10px',
          }}
        >
          <Flex>
            <div
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '100%',
                border: '1px solid #000',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                paddingRight: '3px',
                
              }}
            >
              <IoChevronBack size={20}/>
            </div>
            <Container style={{
                margin: '0px',
                padding: '0px',
                width: '100%',
                height: '30px',
                border: '1px dashed #000',
                borderRadius: '7px',

              }}>
                 <div 
                  style={{
                    width: '100%',
                    height: '30px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '10px',
                    fontWeight: 'bold',
                  }}
                 >
                  {"Başlık Gelecek"}
                 </div>
              </Container>

          </Flex>
          <Space h="sm" />
          <div style={{
                margin: '0px',
                padding: '0px',
                width: '100%',
                minHeight: '430px',
                border: '1px dashed #000',
                borderRadius: '7px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',

               
              }}>{<div>İçerik Gelecek</div>}</div>

        </div>
      </Flex>
    </div>
  );
};

export default SubjectDetail;
