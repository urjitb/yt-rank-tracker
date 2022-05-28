import { Title, TextInput, MultiSelect, Button, Container, Popover, Text, Skeleton, Paper } from '@mantine/core';
import { useState, useEffect } from 'react';
import VideoRank from './VideoRank';
import { ClearAll, Refresh, AlertTriangle } from 'tabler-icons-react';

export default function Content(props) {

    const [url, setUrl] = useState("");
    const [data, setData] = useState([]);
    const [opened, setOpened] = useState(false);
    const [videoRanks, setVideoRanks] = useState([])
    const [loading, setLoading] = useState(false)
    const [popthis, setPopthis] = useState("");



    useEffect(() => {
        const ranklist = localStorage.getItem('ranklist');

        if (ranklist != null) {
            setVideoRanks(JSON.parse(ranklist))

        }
    }, []);

    useEffect(() => {
        if (videoRanks.length) {
            localStorage.setItem('ranklist', JSON.stringify(videoRanks))
        }
    }, [videoRanks]);

    function findRank() {

        const curVidId = url.split('=')[1]
        var obj = {};

        if (!videoRanks.some(e => curVidId === e.vidId) && url !== "" && typeof curVidId !== 'undefined') {

            setLoading(true)
            obj["vidId"] = curVidId;
            obj["keyword"] = data[0];

            console.log(JSON.stringify(obj))

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(obj)
            };
            fetch('http://localhost:3001', requestOptions)
                .then(response => response.json())
                .then(function (json) {
                    setLoading(false)
                    setVideoRanks(prevVideoRanks => ([...prevVideoRanks, json]))

                }).catch(()=>{
                    setLoading(false)
                    setPopthis("Wrong inputs supplied");
                    setOpened(!opened)
                })
        } else if (url === "") {
            setPopthis("Empty link or keyword");
            setOpened(!opened)
        }
         else if (videoRanks.some(e => curVidId === e.vidId)){
            setPopthis("This result already exists below.");
            setOpened(!opened)
         }
         else if(typeof curVidId === 'undefined'){
            setPopthis("Wrong link");
            setOpened(!opened)
         }
         else {
            setPopthis("Unknown error");
            setOpened(!opened)
        }

    }

    function bulkFindRank(){
        setPopthis("Unknown error");
        setOpened(!opened)
    }

    function clearAll() {
        setVideoRanks([])
        localStorage.removeItem('ranklist')
    }


    return (
        <Container size="md" px="xs">
            <div className="content">
                <div className='content--inputs'>

                    <Title order={1}>Whats the rank of </Title>
                    <TextInput placeholder='Enter youtube URL here'
                        size="lg" value={url} onChange={(event) => setUrl(event.currentTarget.value)} />
                </div>
                <div className='content--inputs'>
                    <Title order={1}>when searching </Title>
                    <MultiSelect
                        size="lg"

                        placeholder="Enter keywords here"
                        onChange={setData}
                        data={data}
                        creatable
                        searchable
                        getCreateLabel={(query) => `+ ${query}`}
                    />
                </div>
                <Popover className='popover' opened={opened}
                    onClose={() => setOpened(false)}
                    transition="slide-up"
                    target={
                        <Button style={{ width: 500 }} onClick={findRank} size="lg" variant="gradient" gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }}>Find Rank</Button>
                    }
                    
                    position="bottom"
                    withArrow
                >
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center' ,
                        gap: 5
                    }}>
                        <AlertTriangle size={22} color="red" />
                        <Text align="center" size="sm">{popthis}</Text>
                    </div>
                </Popover>
                <div className='content--inputs'>
                    <Button onClick={clearAll}
                        size="sm"
                        variant="gradient"
                        leftIcon={<ClearAll size={18} />}
                        gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }}>Clear All</Button>
                    <Button onClick={findRank}
                        size="sm"
                        variant="gradient"
                        leftIcon={<Refresh size={18} />}
                        gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }}>Refresh All</Button>
                </div>

            </div>
            {
                videoRanks.map((vid) => {
                    return (typeof vid.img != 'undefined') && <VideoRank img={vid.img} title={vid.title} keyword={vid.keyword} rank={vid.rank} key={vid.vidId} vidId={vid.vidId}></VideoRank>
                })
            }

            {loading && <Paper className="vrankloading" shadow="xs" p="md" withBorder>
                <Skeleton height={8} radius="xl" />
                <Skeleton height={8} mt={6} radius="xl" />
                <Skeleton height={8} mt={6} width="70%" radius="xl" />
            </Paper>}
        </Container>
    )
}