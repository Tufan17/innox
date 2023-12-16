import { FileInput, Grid, Group, TextInput, Title, Divider } from "@mantine/core";
import { Button } from "../../../common/Button";
import { useEffect, useState } from "react";
import contentsController from "../../../../database/db/controller/contentsController";
import { toast } from 'react-toastify';
import { Bars } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar } from "antd";
import BackButton from "../../../components/Button/BackButton";
import Loader from "../../Loader";

const EditContentView = () => {
    const [index, setIndex] = useState("");
    const [icon, setIcon] = useState<File | null>(null);
    const [name, setName] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [width, setWidth] = useState("");
    const [height, setHeight] = useState("");
    const [loading, setLoading] = useState(false);
    const [iconUrl, setIconUrl] = useState<string | null>(null); // [1
    const { id } = useParams<{ id: string }>();
    const [content, setContent] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        contentsController.getById(id ?? "").then((res) => {
            setContent(res);
            setIndex(res.index);
            setName(res.title);
            setSubtitle(res.subtitle);
            setWidth(res.width);
            setHeight(res.height);
            setIconUrl(res.icon);
        }).catch((err) => {
            toast.error(err.message);
        }
        );
    }
        , []);


    async function editContent() {
        if (
            index === content.index &&
            icon === null &&
            name === content.title &&
            subtitle === content.subtitle &&
            width === content.width &&
            height === content.height
        ) {
            toast.error("Hiçbir değişiklik yapmadınız");
            navigate(-1);
            return;
        } else {
            setLoading(true);
            const data:any = {};

            if (index !== content.index) {
                data.index = parseInt(index, 10);
            }

            if (icon !== null) {
                data.icon = icon;
            }

            if (name !== content.title) {
                data.title = name;
            }

            if (subtitle !== content.subtitle) {
                data.subtitle = subtitle;
            }

            if (width !== content.width) {
                data.width = parseInt(width, 10);
            }

            if (height !== content.height) {
                data.height = parseInt(height, 10);
            }

            contentsController
                .update(id ?? "", data)
                .then((res) => {
                    if(res.success){
                        toast.success(res.success);
                    }else{
                        toast.error(res.error);
                    }
                    navigate(-1);
                })
                .catch((err) => {
                    toast.error(err.message);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }

    return content ? (<div>
         <Group justify="space-between">
            <Title  order={2}>{content.index + ". " + content.title}</Title>
            <BackButton/>
        </Group>
        <Divider mt={5} />
        <Grid mt={"xl"}>
            
            <Grid.Col span={6}>
                <TextInput
                    label="Sıra"
                    placeholder="index"
                    value={index}
                    onChange={(event) => {
                        setIndex(event.currentTarget.value);
                    }}
                />
            </Grid.Col>
            <Grid.Col span={6}>
                <Group>
                    <FileInput
                        style={{ width: "80%" }}
                        label="İcon"
                        accept="image/*"
                        placeholder="Select file"
                        value={icon}
                        onChange={(e) => {
                            setIcon(e);
                        }}
                    />
                    <Avatar src={iconUrl} size={50} />

                </Group>
            </Grid.Col>
            <Grid.Col span={6}>
                <TextInput
                    label="Başlık"
                    placeholder="Name"
                    value={name}
                    onChange={(event) => {
                        setName(event.currentTarget.value);
                    }}
                />
            </Grid.Col>
            <Grid.Col span={6}>
                <TextInput
                    label="Alt Başlık"
                    placeholder="Subtitle"
                    value={subtitle}
                    onChange={(event) => {
                        setSubtitle(event.currentTarget.value);
                    }}
                />
            </Grid.Col>
            <Grid.Col span={6}>
                <TextInput
                    label="Genişlik"
                    placeholder="2,4,6,12"
                    value={width}
                    onChange={(event) => {
                        setWidth(event.currentTarget.value);
                    }}
                />
            </Grid.Col>
            <Grid.Col span={6}>
                <TextInput
                    label="Yükseklik"
                    placeholder="2,4,5,12"
                    value={height}
                    onChange={(event) => {
                        setHeight(event.currentTarget.value);
                    }}
                />
            </Grid.Col>
            <Grid.Col span={12} style={{ display: "flex", justifyContent: "center" }}>
                <Button onClick={editContent}

                >

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
            </Grid.Col>
        </Grid>
    </div>
       
    ): (
        <Loader />
    );;
}

export default EditContentView;