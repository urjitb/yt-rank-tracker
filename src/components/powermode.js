import { Container, Text, Skeleton, Paper, Group, useMantineTheme } from '@mantine/core';
import { useState } from 'react';
import VideoRank from './VideoRank';

import { Dropzone, MIME_TYPES } from '@mantine/dropzone';

function getIconColor(status, theme) {
    return status.accepted
        ? theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]
        : status.rejected
            ? theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]
            : theme.colorScheme === 'dark'
                ? theme.colors.dark[0]
                : theme.colors.gray[7];
}


export const dropzoneChildren = (status, theme) => (
    <Group position="center" spacing="xl" style={{ minHeight: 220, pointerEvents: 'none' }}>

        <div>
            <Text size="xl" inline>
                Drag the CSV file here or click to select it
            </Text>
            <Text size="sm" color="dimmed" inline mt={7}>
                One per line with the format: https://www.youtube.com/watch?v=videoID,keyword
            </Text>
        </div>
    </Group>
);

export default function Powermode() {

    const [rankList, setRankList] = useState([])
    const [loaders, setLoaders] = useState([])
    const theme = useMantineTheme();


    const skelle = (<Paper className="vrankloading" shadow="xs" p="md" withBorder>
        <Skeleton height={8} radius="xl" />
        <Skeleton height={8} mt={6} radius="xl" />
        <Skeleton height={8} mt={6} width="70%" radius="xl" />
    </Paper>)

    async function fetchRank(curVid, curKeyword) {

        var vidEntry = {};

        setLoaders((prevSetLoaders) => ([...prevSetLoaders, skelle]))
        vidEntry["vidId"] = curVid.split('=')[1];
        vidEntry["keyword"] = curKeyword;

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(vidEntry)
        };
        const response = await fetch('http://localhost:3001', requestOptions)
        const rankResults = await response.json();
        return rankResults;
    }
    function processCsv(str, delimiter = ",") {

        const rows = str.split("\n");
        rows.map((row) => {
            fetchRank(row.split(',')[0], row.split(',')[1])
                .then(function (vid) {
                    console.log(vid)
                    setRankList((prevRankList) => ([...prevRankList, vid]))

                }).then(() => setLoaders([]))
        })

    }


    function handleChange(event) {
        // setFile(event.target.files[0])
        //handleSubmit()
    }

    function handleSubmit(droppedFile) {
        console.log("in handle submit")
        const reader = new FileReader();
        reader.onload = function (e) {
            const text = e.target.result;
            const data = processCsv(text);
        };

        processCsv(reader.readAsText(droppedFile));

    }

    return (
        <Container size="md" px="xs">
            <div>

                <form onSubmit={handleSubmit}>
                    <h1>Upload a CSV file with links and keywords</h1>
                    <Dropzone
                        onDrop={(files) => (handleSubmit(files[0]))}
                        onReject={(files) => console.log('rejected files', files)}
                        accept={MIME_TYPES.csv}
                    >
                        {(status) => dropzoneChildren(status, theme)}
                    </Dropzone>

                </form>
                {
                    rankList.map((vid) => {
                        return (typeof vid.img != 'undefined') && <VideoRank img={vid.img} title={vid.title} keyword={vid.keyword} rank={vid.rank} key={vid.vidId} vidId={vid.vidId}></VideoRank>
                    })
                }
                {loaders}
            </div>
        </Container>
    );
}
