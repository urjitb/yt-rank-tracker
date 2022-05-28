import { Burger, Drawer, useMantineTheme } from '@mantine/core';
import { useState } from 'react'

export default function Navbar() {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
    const title = opened ? 'Close navigation' : 'Open navigation';

    return (
        <>
            <div className="nav">
                <span>Rank Tracker</span>
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