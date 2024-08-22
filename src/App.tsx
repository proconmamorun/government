import GoogleMapComponent from './component/GoogleMapComponent';
import RosterTable from "./component/RosterTable";

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import AccountCircle from '@mui/icons-material/AccountCircle';

import React, {useEffect, useState} from "react";
import {db} from './firebaseConfig';
import {collection, getDocs, addDoc, deleteDoc, doc} from 'firebase/firestore';
import MapComponent from "./map";
import PositionDisplay from './component/PositionDisplay';

type Position = {
    id: string;
    latitude: number; //緯度
    longitude: number; //経度
    dangerlevel: number; //危険度
    dangerkinds: number; //危険の種類
};

interface Figure { //usestateのやつ
  latitude: number;
  longitude: number;
  dangerlevel: number;
  dangerkinds: number;
}

function MainApp() {
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
            latitude: figure.latitude, //緯度
            longitude: figure.longitude, //経度
            dangerlevel: figure.dangerlevel, //危険度
            dangerkinds: figure.dangerkinds, //危険の種類
          });
          fetchPositionsData();
          setFigure({
            latitude: 0,
            longitude: 0,
            dangerlevel: 0,
            dangerkinds: 0
          });

          alert("追加しました");
        }catch (error) {
            alert("失敗しました");
        };
      }
    };

    const handleDelete = async (id: string) => {
      if (window.confirm("削除してもよろしいですか？")) {
        try{
          await deleteDoc(doc(db, "positions", id));
          fetchPositionsData();
          alert("削除しました");
          }catch (error) {
            alert("失敗しました");
          }
        }
    };

    const DangerousAcquisition = () => {
      const [dangerLevels, setDangerLevels] = useState<number[]>([]);
    
      const fetchDangerLevels = async () => {
        try {
          const positionsCollection = collection(db, "positions");
          const positionsSnapshot = await getDocs(positionsCollection);
          const dangerLevelsList = positionsSnapshot.docs.map((doc) => {
            const data = doc.data() as Position;
            return data.dangerlevel;
          });
          setDangerLevels(dangerLevelsList);
        } catch (error) {
          console.error("危険度の取得に失敗しました", error);
        }
      };
    
      useEffect(() => {
        fetchDangerLevels();
      }, []);
    
      return (
        <div>
          <h2>危険度リスト</h2>
          <ul>
            {dangerLevels.map((level, index) => (
              <li key={index}>{level}</li>
            ))}
          </ul>
        </div>
      );
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: keyof Figure) => {
      setFigure({
        ...figure,
        [field]: event.target.valueAsNumber
      });
    };

    return (
        <div>
            <h2>位置</h2>
            <div>
              <label>
                緯度:{" "}
                <input
                  type = "number"
                  value = {figure.latitude} //緯度
                  onChange = {(event) => handleInputChange(event, 'latitude')} 
                />
              </label>
              <label>
                経度: {" "}
                <input
                  type = "number"
                  value = {figure.longitude} //経度
                  onChange = {(event) => handleInputChange(event, 'longitude')}
                />
              </label>
              <label>
                危険度: {" "}
                <input
                  type = "number"
                  value = {figure.dangerlevel} //危険度
                  onChange = {(event) => handleInputChange(event, 'dangerlevel')}
                />
              </label>
              <label>
                危険の種類: {" "}
                <input
                  type = "number"
                  value = {figure.dangerkinds} //危険の種類
                  onChange = {(event) => handleInputChange(event, 'dangerkinds')}
                />
              </label>
              <button onClick = {() => handleAdd()}>追加</button>
            </div>

            <table>
              <tbody>
                {positions.map((position) => (
                  <tr key = {position.id}>
                    <td>{position.latitude}</td> {/*緯度*/}
                    <td>{position.longitude}</td> {/*経度*/}
                    <td>{position.dangerlevel}</td> {/*危険度*/}
                    <td>{position.dangerkinds}</td> {/*危険の種類*/}
                    <td>
                      <button onClick = {() => handleDelete(position.id)}>削除</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <DangerousAcquisition />
            <h1>地図</h1>
            <div id="map1">
            <MapComponent
              positions={positions}
              googleMapsApiKey="AIzaSyCFMteif5MGQEUQpTXbPme69k8yBZjnr0A"
            />
            </div>
        </div>
    );
}


const ColorToggleButton1: React.FC<{ content: boolean, setContent: React.Dispatch<React.SetStateAction<boolean>> }> = ({ content, setContent }) => {
    const [alignment, setAlignment] = useState('map');

    const handleChange1 = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        setAlignment(newAlignment);
    };

    return (
        <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange1}
            aria-label="Platform"
        >
            <ToggleButton value="map"
                        onClick={() => setContent(true)}
            >地図</ToggleButton>
            <ToggleButton value="names"
                        onClick={() => setContent(false)}
            >名簿</ToggleButton>
        </ToggleButtonGroup>
    );
};

const InputWithIcon1: React.FC = () => {
    return (
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
            <FormControl variant="standard">
                <InputLabel htmlFor="input-with-icon-adornment">
                    人物を検索
                </InputLabel>
                <Input
                    id="input-with-icon-adornment"
                    startAdornment={
                        <InputAdornment position="start">
                            <AccountCircle />
                        </InputAdornment>
                    }
                />
            </FormControl>
        </Box>
    );
};


    const App1: React.FC = () => {
        const [content, setContent] = useState(true);

        return (
            <div>
                <h1>役場用動作UI</h1>
                <ColorToggleButton1 content={content} setContent={setContent} />
                {content ?
                    <div>
                        <div id="map1">
                        <GoogleMapComponent/>
                        </div>
                        <Button variant="outlined">町民位置情報</Button>
                        <Button variant="outlined">危険度マップ</Button>
                        <Button variant="outlined">救助隊位置情報</Button>
                        <MainApp />
                    </div>:
                    <div className={"list"}><
                        h1>表の例</h1>
                        <InputWithIcon1 />
                        <h3>並び替え</h3>
                        <Button variant="outlined">五十音順</Button>
                        <Button variant="outlined">年齢順</Button>
                        <RosterTable />
                    </div>
                }

            </div>
        );
    };

export default App1;