import React, { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import Map from '../component/Map';
import './MainApp.css';

type Position = {
    id: string;
    latitude: number;
    longitude: number;
    dangerlevel: number;
    dangerkinds: number;
};

interface Figure {
    latitude: number;
    longitude: number;
    dangerlevel: number;
    dangerkinds: number;
}

const MainApp: React.FC = () => {
    const [positions, setPositions] = useState<Position[]>([]);
    const [figure, setFigure] = useState<Figure>({
        latitude: 0,
        longitude: 0,
        dangerlevel: 0,
        dangerkinds: 0
    });

    const fetchPositionsData = async () => {
        const positionsCollection = collection(db, "positions");
        const positionsSnapshot = await getDocs(positionsCollection);
        const positionsList = positionsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as Position[];
        setPositions(positionsList);
    };

    useEffect(() => {
        fetchPositionsData();
    }, []);

    const handleAdd = async () => {
        if (window.confirm("追加してもよろしいですか？")) {
            try {
                await addDoc(collection(db, "positions"), {
                    latitude: figure.latitude,
                    longitude: figure.longitude,
                    dangerlevel: figure.dangerlevel,
                    dangerkinds: figure.dangerkinds,
                });
                fetchPositionsData();
                setFigure({
                    latitude: 0,
                    longitude: 0,
                    dangerlevel: 0,
                    dangerkinds: 0
                });

                alert("追加しました");
            } catch (error) {
                alert("失敗しました");
            }
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("削除してもよろしいですか？")) {
            try {
                await deleteDoc(doc(db, "positions", id));
                fetchPositionsData();
                alert("削除しました");
            } catch (error) {
                alert("失敗しました");
            }
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: keyof Figure) => {
        setFigure({
            ...figure,
            [field]: event.target.valueAsNumber
        });
    };

    return (
        <Map
            figure={figure}
            handleInputChange={handleInputChange}
            handleAdd={handleAdd}
            handleDelete={handleDelete}
            positions={positions}
         />
    );
};

export default MainApp;
