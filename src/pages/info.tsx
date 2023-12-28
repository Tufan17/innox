import { Center, Container, Flex, Image, Space, Text } from "@mantine/core";
import "./../index.css";

const InfoView = () => {
    return (<Container>

        <Center mt="md" style={{
            marginLeft: 0,
            marginRight: 0,
        }}>
            <Image src={"IX.png"} height={100} style={{
                borderRadius: 10,
                boxShadow: "0px 0px 5px 0px #ccc",
                transform: "rotate(-10deg)",
            }} />

        </Center>
        <Center>
            <Flex
                direction="column"
                justify="center"
                align="center"
                style={{
                    marginTop: 10,
                    marginBottom: 10,
                }}
            >
                <h1 style={{
                    textAlign: "center",
                    lineHeight: 1,
                }}>
                    <span style={{ color: "#18216d" }}>I</span>
                    <span style={{ color: "rgb(254 118 37)" }}>nno</span>X<span style={{
                        fontSize: '1.5rem',
                    }}> <br />Dijital Eğitim Platformu</span></h1>
                <Container style={{
                    marginLeft: 0,
                    marginRight: 0,
                }}>
                    <Text style={{
                        fontSize: '1.5rem',
                        fontWeight: 500,
                        textAlign: "center",
                    }}>
                        Sadece İki Adım Kaldı!
                    </Text>
                    <p style={{
                        textAlign: "center",
                        fontSize: '0.85rem',
                    }}>Ekranın altındaki paylaşım simgesine dokunun, açılan menüyü 'Ana ekrana ekle'yi görene kadar aşağı kaydırın ve ekle'ye basın.</p>
                    <p style={{
                        textAlign: "center",
                        color: "grey",
                        fontSize: '0.85rem',

                    }} >
                        “InnoX" uygulaması yalnızca en son iOS sürümü ile çalışan iPhone 7 ve daha yeni modellerde Safari ile uyumludur.
                    </p>
                </Container>
                <Container>
                    <Text style={{
                        fontSize: '1.5rem',
                        textAlign: "center",
                    }}><span>{"Aşağıdaki "}</span>
                        <span >
                            <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="0.5" width="30" height="30" rx="8" fill="#F2F2F2"></rect>
                                <path d="M18.5855 11.4102H20.5C21.6046 11.4102 22.5 12.3056 22.5 13.4102V22.4102C22.5 23.5147 21.6046 24.4102 20.5 24.4102H10.5C9.39543 24.4102 8.5 23.5147 8.5 22.4102V13.4102C8.5 12.3056 9.39543 11.4102 10.5 11.4102H12.2303" stroke="#0381FE" stroke-linecap="round">
                                </path><path d="M12.6768 8.41341L15.2507 5.83944C15.3886 5.70161 15.612 5.70161 15.7499 5.83944L18.3238 8.41341M15.5003 16.8251V5.58984" stroke="#0381FE" stroke-linecap="round">
                                </path></svg>
                        </span>
                        <span>{" butona dokunun"} </span>

                        <span>{'ve "Ana ekrana ekle"yin. '}</span>
                    </Text>
                </Container>
                <Space h="xl" />
                <div style={{
              boxShadow: "0px 0px 10px 0px #0000000f",
              animation: "bounce 3s infinite",
              display: "inline-block", 

            }}>
                    <svg
                        width="18"
                        height="20"
                        viewBox="0 0 18 27"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="arrow-down" 
                    >
                        <path
                            d="M17 17.9999L9.70709 25.2928C9.31657 25.6833 8.6834 25.6833 8.29288 25.2928L0.999972 17.9999M8.99997 0.999999L8.99997 26"
                            stroke="black"
                            stroke-width="2"
                            stroke-linecap="round"
                        />
                    </svg>
                </div>
            </Flex>
        </Center>
    </Container>);
}

export default InfoView;