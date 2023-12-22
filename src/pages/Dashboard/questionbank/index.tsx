import { Button, Group, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import BackButton from "../../../components/Button/BackButton";
import { useState } from "react";
import { primaryColor, secondaryColor } from "../../../constants/color";

const QuestionBankView = () => {
    const [mauseOver, setMauseOver] = useState<boolean>(false);
    return (
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
    
    </>
      );
}
 
export default QuestionBankView;