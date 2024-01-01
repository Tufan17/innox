import { useState, useRef, useMemo } from "react";
import { Button, Checkbox, Container, Group, Title } from "@mantine/core";
import BackButton from "../../../../components/Button/BackButton";
import JoditEditor from "jodit-react";
import { CiTrash } from "react-icons/ci";
import { useParams } from "react-router-dom";
import questionsController from "../../../../../database/db/controller/questionsController";
import { toast } from "react-toastify";
import { primaryColor, secondaryColor } from "../../../../constants/color";
const AddQuestionView = () => {
  const { id } = useParams<{ id: string }>();
  const editor = useRef<any>(null);
  const [content, setContent] = useState<string>("");
  const [options, setOptions] = useState<string[]>([""]);
  const [correctAnswer, setCorrectAnswer] = useState<number>(10);

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "İçerik ekleyin...",
      image: {
        maxWidth: 350,
        insertImageWithLink: true,
      },
      video: {
        iframe:
          '<iframe width="560" height="315" src="https://www.youtube.com/embed/VIDEO_ID" frameborder="0"></iframe>',
      },
    }),
    []
  );

  const save = () => {
    const data = {
      qb_id: id,
      content,
      options,
      correctAnswer,
    };
    if (content.length > 0 && options.length > 0 && correctAnswer !== 10) {
      questionsController.create(data);
      toast.success("Soru Kaydedildi.");
      setContent("");
      setOptions([""]);
      setCorrectAnswer(10);
    } else if (content.length === 0) {
      toast.error("Soru Başlığı Girin.");
    }
    else if (options.length === 0) {
      toast.error("Şık Ekleyin.");
    }
    else if (correctAnswer === 10) {
      toast.error("Doğru Şıkkı Seçin.");
    } else {
      toast.error("Soruyu Kaydedilemedi.");

    }
  };

  const addOption = () => {
    if (options.length < 6) {
      setOptions([...options, ""]);
    }
  };

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const toggleCorrectAnswer = (index: number) => {
    setCorrectAnswer((prevAnswer) =>
      prevAnswer === index ? -1 : index
    );
  };

  const deleteOption = (index: number) => {
    const updatedOptions = [...options];
    updatedOptions.splice(index, 1);
    setOptions(updatedOptions);
    setCorrectAnswer(10);
  };

  return (
    <>
      <Group justify="space-between">
        <Title order={2}>Soru Ekle</Title>
        <Group>
          <BackButton />
        </Group>
      </Group>
      <Container
        style={{
          margin: 0,
          width: "100%",
          maxWidth: "100%",
          paddingTop: "20px",
        }}
      >
        <JoditEditor
          ref={editor}
          value={content}
          config={config}
          onChange={(newContent) => {
            setContent(newContent);
            console.log(newContent);
          }}
        />
        {options.map((option, index) => (
          <div key={index}>
            <Group mt={"sm"}>
              <JoditEditor
                value={option}
                config={config}
                onChange={(newOptionContent) =>
                  handleOptionChange(index, newOptionContent)
                }
              />
              <Group>
                <Checkbox
                  checked={correctAnswer === index}
                  onChange={() => toggleCorrectAnswer(index)}
                  color="lime.4"
                  iconColor="dark.8"
                  size="md"
                  label="Doğru"
                />
                <Button bg={"red"} onClick={() => {
                  deleteOption(index);
                  toggleCorrectAnswer(10);
                }}>
                  <CiTrash />
                </Button>
              </Group>
            </Group>
          </div>
        ))}
        <Group mt={"md"} justify="center">
          <Button
            onClick={() => {
              save();
            }}
            bg={primaryColor}
          >
            Kaydet
          </Button>
          {options.length < 6 && (
            <Button
              bg={secondaryColor}
              onClick={addOption}>Şık Ekle</Button>
          )}
        </Group>
      </Container>
    </>
  );
};

export default AddQuestionView;
