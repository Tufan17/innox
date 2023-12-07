import {  Container, Title } from "@mantine/core";
import Grid from '@mui/material/Unstable_Grid2';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { LineChart } from '@mui/x-charts/LineChart';
import Stack from '@mui/material/Stack';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useState } from "react";
import { PieChart } from '@mui/x-charts/PieChart';

const chartsParams = {
    margin: { bottom: 20, left: 25, right: 5 },
    height: 300,
};
const AnalysisView = () => {
    const [color] = useState('#4e79a7');



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
                            <Typography variant="h4">{(714000)}</Typography>

                            <Typography variant="subtitle2" sx={{ color: 'success' }}>
                                {"Weekly Sales"}
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
                            <Typography variant="h4">{(714000)}</Typography>

                            <Typography variant="subtitle2" sx={{ color: 'success' }}>
                                {"Weekly Sales"}
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
                        {<Box sx={{ width: 64, height: 64 }}>{<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}</Box>}

                        <Stack spacing={0.5}>
                            <Typography variant="h4">{(714000)}</Typography>

                            <Typography variant="subtitle2" sx={{ color: 'success' }}>
                                {"Weekly Sales"}
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
                            <Typography variant="h4">{(714000)}</Typography>

                            <Typography variant="subtitle2" sx={{ color: 'success' }}>
                                {"Weekly Sales"}
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
                                            { id: 0, value: 10,label:"elma" },
                                            { id: 1, value: 15, label:"elma"},
                                            { id: 2, value: 15, label:"elma"},
                                            { id: 3, value: 15, label:"elma"},
                                            { id: 4, value: 20, label:"elma"},
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