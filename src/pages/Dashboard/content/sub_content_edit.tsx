import { Divider, FileInput, Grid, Group, Select, Text, TextInput, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { Bars } from "react-loader-spinner";
import { toast } from "react-toastify";
import { Button } from "../../../common/Button";
import contentsController from "../../../../database/db/controller/contentsController";
import {  useParams } from "react-router-dom";
import Loader from "../../Loader";
import BackButton from "../../../components/Button/BackButton";
import { Card } from "@mui/material";
const SubContentEditView = () => {
    const [index, setIndex] = useState("");
    const [icon, setIcon] = useState<File | null>(null);
    const [iconUrl, setIconUrl] = useState<string>("");
    const [name, setName] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [width, setWidth] = useState(12);
    const [height, setHeight] = useState(4);
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState<any>(null);
    const [type, setType] = useState<"col" | "row">("col");
    const { id,sub_id } = useParams();
    const[subContent,setSubContent]=useState<any>(null);
    useEffect(() => {
        contentsController.getById(sub_id ?? "").then((res) => {
            setIndex(res.index);
            setIconUrl(res.icon);
            setName(res.title);
            setSubtitle(res.subtitle);
            setWidth(res.width);
            setHeight(res.height);
            setType(res.card_type);
            setSubContent(res);
        }).catch((err) => {
            toast.error(err.message);
        }
        );
        contentsController.getById(id ?? "").then((res) => {
            setContent(res);
        }).catch((err) => {
            toast.error(err.message);
        }
        );
    }, []);

    const editContent = async () => {
        setLoading(true);
        if (
            index === subContent.index &&
            icon === null &&
            name === subContent.title &&
            subtitle === subContent.subtitle &&
            width === subContent.width &&
            height === subContent.height&&
            type===subContent.card_type
        ) {
            toast.error("Hiçbir değişiklik yapmadınız");
            setLoading(false);
            return;
        } else {
            setLoading(true);
            const data:any = {};

            if (index !== subContent.index) {
                data.index = parseInt(index, 10);
            }

            if (icon !== null) {
                data.icon = icon;
            }

            if (name !== subContent.title) {
                data.title = name;
            }

            if (subtitle !== subContent.subtitle) {
                data.subtitle = subtitle;
            }

            if (width !== subContent.width) {
                data.width = width;
            }

            if (height !== subContent.height) {
                data.height = height;
            }
            if(type!==subContent.card_type){
                data.card_type=type;
            }

            contentsController
                .update(sub_id ?? "", data)
                .then((res) => {
                    if(res.success){
                        toast.success(res.success);
                    }else{
                        toast.error(res.error);
                    }
                })
                .catch((err) => {
                    toast.error(err.message);
                })
                .finally(() => {
                    setLoading(false);
                });
        }


    }



    return content ? (
        <div>
            <Group justify="space-between">
                <Group>
                    <Title order={2}>{content.index + ". " + content.title} - İçerik Düzenleme </Title>
                    {/* <Link to={`/dashboard/contents/edit/${content?.id}`}
                >
                    <FaEdit className="icon" />
                </Link> */}
                </Group>
                <Group>


                    <BackButton />
                </Group>

            </Group>
            <Divider mt={5} />
            <Grid mt={"xl"} grow> 
            <Grid.Col span={8}>
            <Grid >
                <Grid.Col span={6}>
                    <Select
                        label="Kart Tipi Seçiniz"
                        placeholder="Kart Tipi Seçiniz"
                        data={[{value:"col",label:'Dikey'},{value:"row",label: 'Yatay'}]}
                        value={type}
                        onChange={(event:string|null) => {
                            if(event){
                                setType(event!=="col"?"row":"col");
                                width!==12?setWidth(12):setWidth(4);
                                height!==12?setHeight(12):setHeight(4);
                            }
                        }}
                    />
                </Grid.Col>
                <Grid.Col span={6}>
                    <FileInput
                        label="İcon"
                        accept="image/*"
                        placeholder={iconUrl}
                        value={icon}
                        onChange={(e) => {
                            setIcon(e);
                        }}
                    />
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
                <Select
                        label="İkon Genişliği"
                        data={["2","4","6","8","12"]}
                        value={width.toString()}
                        disabled={type==="col"}
                        onChange={(event:string|null) => {
                            setWidth(parseInt(event!));
                        }}
                    />
                </Grid.Col>
                <Grid.Col span={6}>
                    <Select
                        label="İkon Yüksekliği"
                        data={["2","4","6","8","12"]}
                        disabled={type==="row"}
                        value={height.toString()}
                        onChange={(event:string|null) => {
                            setHeight(parseInt(event!));
                        }}
                    />
                </Grid.Col>
                <Grid.Col span={12} style={{ display: "flex", justifyContent: "center" }}>
                    <Button onClick={editContent}>
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
            
            </Grid.Col>
           <Grid.Col span={4}
            style={{
                borderLeft:"1px solid #e0e0e0",
            }}
           >
            {
                <Card style={{
                    padding:"10px",
                }}>
                    <Grid>
                        <Grid.Col span={type==="col"?12:width}>
                        <img
                            src={icon ? URL.createObjectURL(icon) : iconUrl}
                            alt="Seçilen İcon"
                            style={{ width: "100%", height:type=="col"?30*height:"100%" , objectFit: "cover"}}
                        />
                            </Grid.Col>
                            <Grid.Col span={type==="col"?12:12-width}>
                                <Title order={3}>{name}</Title>
                                <Text>{subtitle}</Text>
                            </Grid.Col>
                    </Grid>
                </Card>
            }
            </Grid.Col>
            </Grid>
        </div>
    ) : (
        <Loader />
    );
}
 
export default SubContentEditView;