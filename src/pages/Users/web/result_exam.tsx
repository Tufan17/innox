import { Center, Flex, Grid, Image, Space, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import { Button } from "../../../common/Button";

const ResultExamWebView = () => {
    return (<Flex
        direction={"column"}
        mih={window.innerHeight}
        justify="center"
      align="center"

    >

        <Grid>
            <Grid.Col span={6}>
                <Image
                    src={"/img/result.png"}
                    alt={"innoX"}

                />

            </Grid.Col>
            <Grid.Col span={6}>
                <Title style={{
                    textAlign: "center",
                    margin: "20px",
                    fontWeight: "500"
                }}>
                    Sonuç Sayfası
                </Title>
                <Space h={10} />
                <Center m="xl" style={{
                    textAlign: "center",
                    fontWeight: "500"

                }}>
                    Test sonucunuz kaydedildi. Kısa süre içerisinde sonuçlarınız size mail olarak yada bildirim olarak gönderilecektir.
                </Center>
                <Link to="/user_dashboard"
                    style={{
                        display: "flex",

                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        height: "100%",
                        fontStyle: "none",
                        textDecoration: "none"

                    }}
                >
                    <Button
                        onClick={() => {


                        }
                        }
                        children={"Anasayfaya Dön"}

                    />

                </Link>
            </Grid.Col>
        </Grid>


    </Flex>);
}

export default ResultExamWebView;