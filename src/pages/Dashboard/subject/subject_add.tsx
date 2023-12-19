import React, { useState, useRef, useMemo, useEffect } from 'react';
import JoditEditor from 'jodit-react';

import { Link, useParams } from 'react-router-dom';
import {  Center, Divider, Group, Space, Textarea, Title } from '@mantine/core';
import BackButton from '../../../components/Button/BackButton';
import contentsController from '../../../../database/db/controller/contentsController';
import Loader from '../../Loader';
import { Button } from '../../../common/Button';
import { Bars } from 'react-loader-spinner';
import subjectController from '../../../../database/db/controller/subjectController';
import { toast } from 'react-toastify';
interface SubjectAddViewProps {
  // Add any required props here
}
const SubjectAddView: React.FC<SubjectAddViewProps> = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const editor = useRef<any>(null);
  const [content, setContent] = useState<string>('');

  const config = useMemo(() => ({
    readonly: false,
    placeholder: 'içerik ekleyin...',
    image: {
        maxWidth: 350,
        insertImageWithLink: true,
    },
    video: {
        // Video gömme işlemi için kullanılacak iframe etiketi
        iframe: '<iframe width="560" height="315" src="https://www.youtube.com/embed/VIDEO_ID" frameborder="0" ></iframe>',
        
        // Diğer video ayarları...
      },
    
    
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

  }, [id]);

  const addContent=async()=>{
    setLoading(true);
        await subjectController.create({
            title:title,
            content:content,
            sub_id:id
        }).then((res)=>{
            if(res){
                if(res.success){
                    toast.success(res.success);
                }
                else{
                    toast.error(res.error);
                }
            }
            setTitle("");
            setContent("");
            setLoading(false);
        }).catch((err)=>{
            toast.error(err.message);
            setLoading(false);
        })
  }


  if (loading) {
    return <Loader />;
  }

  return (
    <div style={{ padding: '10px' }}>
      <Group justify="space-between">
        <Title order={2}>{data.title}</Title>
        <Group>
          <BackButton />
        </Group>
      </Group>
      <Divider mt="sm" mb="xl" />
       
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
      <Center>
      <Button onClick={addContent}>
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
    </div>
  );
};

export default SubjectAddView;
