import React from "react";

export const getIpCommand = async (): Promise<React.ReactNode> => {
    try {
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();
        return (
            <div className="flex flex-col gap-1 text-zinc-300 font-mono">
                <div>1: lo: [LOOPBACK,UP,LOWER_UP] mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000</div>
                <div className="ml-4">link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00</div>
                <div className="ml-4">inet 127.0.0.1/8 scope host lo</div>
                <br />
                <div>2: eth0: [BROADCAST,MULTICAST,UP,LOWER_UP] mtu 1500 qdisc pfifo_fast state UP group default qlen 1000</div>
                <div className="ml-4">link/ether 02:42:ac:11:00:02 brd ff:ff:ff:ff:ff:ff</div>
                <div className="ml-4">inet <span className="text-emerald-400">{data.ip}</span>/24 brd 192.168.1.255 scope global eth0</div>
                <div className="ml-4 text-zinc-500"># Location: {data.city}, {data.region}, {data.country_name}</div>
                <div className="ml-4 text-zinc-500"># ISP: {data.org}</div>
            </div>
        );
    } catch (e) {
        return <div className="text-red-400">Failed to lookup IP address.</div>;
    }
};