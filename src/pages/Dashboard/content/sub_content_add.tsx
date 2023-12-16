import {  FileInput, Grid, TextInput } from "@mantine/core";
import { useState } from "react";
import { Bars } from "react-loader-spinner";
import { toast } from "react-toastify";
import { Button } from "../../../common/Button";
const SubContentAddView = () => {
    const [index, setIndex] = useState("");
    const [icon, setIcon] = useState<File | null>(null);
    const [name, setName] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [width, setWidth] = useState("");
    const [height, setHeight] = useState("");
    const [loading, setLoading] = useState(false);
    async function addContent() {
        if (index === "" || icon === null || name === "" || subtitle === "" || width === "" || height === "") {
            toast.error("Lütfen tüm alanları doldurunuz!");
            return;
        } else {
            setLoading(true);
            

        }

    }

    return (
        <Grid>
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
                <FileInput
                    label="İcon"
                    accept="image/*"
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
                      /> :"Kaydet"
                    }
                    </Button>
            </Grid.Col>
        </Grid>
    );
}
 
export default SubContentAddView;