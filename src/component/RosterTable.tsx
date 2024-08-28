import React, { useEffect, useState } from "react";
import './RosterTable.css';
import { fetchRoster } from './fetchRoster';

interface Member {
    id: string;
    name?: string;
    mail?: string;
    safety?: string;
};

const RosterTable: React.FC = () => {
    const [members, setMembers] = useState<Member[]>([]);

    useEffect(() => {
        const getMembers = async () => {
            const fetchedMembers = await fetchRoster();
            setMembers(fetchedMembers);
        };
        getMembers();
    }, []);

    return (
        <table>
            <thead>
            <tr>
                <th className={"label"}>Name</th><th className={"label"}>Mail</th><th className={"label"}>Safety</th>
            </tr>
            </thead>
            <tbody>
            {members.map(member => (
                <tr key={member.id}>
                    <td>{member.name}</td>
                    <td>{member.mail}</td>
                    <td>{member.safety}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default RosterTable;
