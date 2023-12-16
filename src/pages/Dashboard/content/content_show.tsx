import { Link, useParams } from "react-router-dom";
import contentsController from "../../../../database/db/controller/contentsController";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../../Loader";
import { Button, Container, Divider, Group, Title } from "@mantine/core";
import BackButton from "../../../components/Button/BackButton";
import { FaEdit } from "react-icons/fa";
import { primaryColor, secondaryColor } from "../../../constants/color";

const ShowContentView = () => {
    const { id } = useParams();
    const [content, setContent] = useState<any>(null);
    const [mauseOver, setMauseOver] = useState<boolean>(false);

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
            <Group>
            <Title order={2}>{content.index + ". " + content.title}</Title>
                <Link to={`/dashboard/contents/edit/${content?.id}`}
                >
                    <FaEdit className="icon" />
                </Link>
            </Group>
            <Group>
           
           <Link to={"add"}>
           <Button
                        bg={mauseOver ? secondaryColor : primaryColor}
                        onMouseOver={() => {
                            setMauseOver(true);
                        }}
                        onMouseOut={() => {
                            setMauseOver(false);
                        }}


                    >

                        Ekle
                    </Button>
           </Link>
            <BackButton />
            </Group>

        </Group>
        <Divider mt={5} />

    </div>) : (
        <Loader />
    );
}

export default ShowContentView;