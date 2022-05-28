import { Paper, Image, Badge, Divider } from '@mantine/core';



export default function VideoRank(props) {

    function paperClick(){
        console.log(props)
        window.location.href = "https://www.youtube.com/watch?v=" + props.vidId
    }
    
  return (
    <Paper onClick={paperClick} className="vrank" shadow="xs" p="md" withBorder>
        <Image
        width={120}
        height={80}
        radius="md"
        src={props.img}
      />
      <p>{props.title}</p>  
      <div>
          
      <Badge variant="gradient" gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }}>{props.keyword}</Badge>
      <Divider my="sm" />
        <Badge variant="gradient" gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }}>Rank {props.rank}</Badge>
      </div>
    </Paper>
  );
}