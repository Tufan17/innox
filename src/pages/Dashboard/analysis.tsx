import { Container, Title } from "@mantine/core";
import Grid from '@mui/material/Unstable_Grid2';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { LineChart } from '@mui/x-charts/LineChart';
import Stack from '@mui/material/Stack';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useEffect, useState } from "react";
import { PieChart } from '@mui/x-charts/PieChart';
import dashboardController from "../../../database/db/controller/dashboardController.ts";
import { toast } from "react-toastify";
const chartsParams = {
    margin: { bottom: 20, left: 25, right: 5 },
    height: 300,
};
const AnalysisView = () => {
    const [animatedData, setAnimatedData] = useState({
        users: 0,
        contents: 0,
        subjects: 0,
        questions: 0,
    });
    const [data, setData] = useState<any>(null);
    const [color] = useState('#4e79a7');
    useEffect(() => {
        dashboardController.index().then((res) => {
            setData(res);
        }).catch((err) => {
            toast.error(err.message);
        }
        );
    }, []);
    useEffect(() => {
        if (data) {
            const animationDuration = 1000;
            const animationInterval = 10;
            const newData = {
                users: data.users || 0,
                contents: data.contents || 0,
                subjects: data.subjects || 0,
                questions: data.questions || 0,
            };

            const incrementAmount = {
                users: newData.users / (animationDuration / animationInterval),
                contents: newData.contents / (animationDuration / animationInterval),
            };

            const animationTimer = setInterval(() => {
                setAnimatedData((prevData) => ({
                    users: Math.min(prevData.users + incrementAmount.users, newData.users),
                    contents: Math.min(prevData.contents + incrementAmount.contents, newData.contents),
                    subjects: Math.min(prevData.subjects + incrementAmount.contents, newData.subjects),
                    questions: Math.min(prevData.questions + incrementAmount.contents, newData.questions),
                }));
            }, animationInterval);

            return () => clearInterval(animationTimer);
        }
    }, [data]);

    return (
        <div>
            <Title order={3} >
                Merhaba, Hoş Geldiniz 👋
            </Title>
            <Grid container spacing={3} style={{
                width: "100%",
                padding: "5px",
            }}>
                <Grid xs={12} sm={6} md={3}>
                    <Card
                        component={Stack}
                        spacing={3}
                        direction="row"
                        sx={{
                            px: 3,
                            py: 5,
                            borderRadius: 2,
                        }}
                    >
                        {<Box sx={{ width: 64, height: 64 }}>{<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}</Box>}

                        <Stack spacing={0.5}>
                            <Typography variant="h4">{animatedData.contents.toFixed(0)}</Typography>

                            <Typography variant="subtitle2" sx={{ color: 'success' }}>
                                {"İçerik Sayısı"}
                            </Typography>
                        </Stack>
                    </Card>

                </Grid><Grid xs={12} sm={6} md={3}>
                    <Card
                        component={Stack}
                        spacing={3}
                        direction="row"
                        sx={{
                            px: 3,
                            py: 5,
                            borderRadius: 2,
                        }}
                    >
                        {<Box sx={{ width: 64, height: 64 }}>{<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}</Box>}

                        <Stack spacing={0.5}>
                            <Typography variant="h4">{animatedData.users.toFixed(0)}</Typography>

                            <Typography variant="subtitle2" sx={{ color: 'success' }}>
                                {"Kullanıcı Sayısı"}
                            </Typography>
                        </Stack>
                    </Card>

                </Grid><Grid xs={12} sm={6} md={3}>
                    <Card
                        component={Stack}
                        spacing={3}
                        direction="row"
                        sx={{
                            px: 3,
                            py: 5,
                            borderRadius: 2,
                        }}
                    >
                        {<Box sx={{ width: 64, height: 64 }}>{<img alt="icon" src="/assets/icons/glass/6920933.png" style={{maxWidth:"100%"}} />}</Box>}

                        <Stack spacing={0.5}>
                            <Typography variant="h4">{animatedData.subjects.toFixed(0)}</Typography>

                            <Typography variant="subtitle2" sx={{ color: 'success' }}>
                                {"Konu Sayısı"}
                            </Typography>
                        </Stack>
                    </Card>

                </Grid><Grid xs={12} sm={6} md={3}>
                    <Card
                        component={Stack}
                        spacing={3}
                        direction="row"
                        sx={{
                            px: 3,
                            py: 5,
                            borderRadius: 2,
                        }}
                    >
                        {<Box sx={{ width: 64, height: 64 }}>{<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}</Box>}

                        <Stack spacing={0.5}>
                            <Typography variant="h4">{animatedData.questions.toFixed(0)}</Typography>

                            <Typography variant="subtitle2" sx={{ color: 'success' }}>
                                {"Soru Sayısı"}
                            </Typography>
                        </Stack>
                    </Card>

                </Grid>
                <Grid xs={12} sm={6} md={8}>
                    <Card >
                        <Stack direction="column" spacing={2} alignItems="center" sx={{ width: '100%' }}>
                            <LineChart
                                {...chartsParams}
                                series={[
                                    {
                                        data: [15, 23, 18, 19, 13, 5, 5, 6, 7, 9, 35, 4, 6],
                                        label: 'Example',
                                        color,
                                        showMark: false,
                                    },

                                    {
                                        curve: "linear",
                                        showMark: false,
                                        label: 'Example',
                                        data: [0, 5, 2, 6, 3, 9.3, 15, 23, 18, 19, 13, 25, 30]
                                    },
                                    {
                                        curve: "linear",
                                        showMark: false,
                                        label: 'Example', data: [6, 3, 7, 9.5, 4, 2, 2, 3, 4, 5, 11, 16, 30]
                                    },
                                ]}
                            />
                            <ToggleButtonGroup
                                // orientation="vertical"
                                value={color}
                                exclusive
                            >

                            </ToggleButtonGroup>
                        </Stack>
                    </Card>

                </Grid>  <Grid xs={12} sm={6} md={4}>
                    <Card>
                        <Container>

                            <PieChart
                                series={[
                                    {
                                        data: [
                                            { id: 0, value: 10, label: "elma" },
                                            { id: 1, value: 15, label: "elma" },
                                            { id: 2, value: 15, label: "elma" },
                                            { id: 3, value: 15, label: "elma" },
                                            { id: 4, value: 20, label: "elma" },
                                        ],
                                    },
                                ]}
                                width={300}
                                height={300}


                            />
                        </Container>
                    </Card>

                </Grid>

            </Grid>


        </div>
    );
}

export default AnalysisView;