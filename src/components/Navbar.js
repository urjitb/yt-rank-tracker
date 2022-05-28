import { Burger, Drawer, useMantineTheme, Switch, Text } from '@mantine/core';
import { useState } from 'react'
import { Bolt } from 'tabler-icons-react';

export default function Navbar(props) {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
    const title = opened ? 'Close navigation' : 'Open navigation';
    const [checked, setChecked] = useState(false);

    function test() {
        console.log("test")
    }
    return (
        <>
            <div className="nav">
                <span>Rank Tracker</span>
                <div style={{display: 'flex', gap: "5px"}}> 
                    <Switch
                        size="lg"
                        radius="sm"

                        onClick={props.power}
                        checked={checked}
                        onChange={(event) => setChecked(event.currentTarget.checked)} /><Text size={28}>PWR</Text> <Bolt size={28}/>
                </div>
                <Burger
                    opened={opened}
                    onClick={() => setOpened((o) => !o)}
                    title={title}
                    size="lg"
                    color="white"
                />
            </div>
            <Drawer
                position="top"
                overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
                overlayOpacity={0.55}
                overlayBlur={3}
                opened={opened}
                onClose={() => setOpened(false)}
            >
                {/* Drawer content */}
            </Drawer>
        </>
    )
}