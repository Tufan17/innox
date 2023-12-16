import { useParams } from "react-router-dom";
import contentsController from "../../../../database/db/controller/contentsController";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../../Loader";
import { Container, Divider, Group, Title } from "@mantine/core";
import BackButton from "../../../components/Button/BackButton";


const ShowContentView = () => {
    const { id } = useParams();
    const [content, setContent] = useState<any>(null);
    useEffect(() => {
        contentsController.getById(id ?? "").then((res) => {
            setContent(res);
        }).catch((err) => {
            toast.error(err.message);
        }
        );
    }, []);
    return content ? (<div
    style={{
        padding: "10px",
    }}
    >
        <Group justify="space-between">
            <Title order={2}>{content.index + ". " + content.title}</Title>
            <BackButton/>
        </Group>
        <Divider mt={5} />

    </div>) : (
        <Loader />
    );
}

export default ShowContentView;