import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import EXIF from 'exif-js';

interface PhotoLocationData {
    latitude: number | null;
    longitude: number | null;
}

const SharePhoto: React.FC = () => {
    const [image, setImage] = useState<File | null>(null);
    const [photoLocationData, setPhotoLocationData] = useState<PhotoLocationData>({ latitude: null, longitude: null });
    const [dangerLevel, setDangerLevel] = useState<number>(0);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onload = function (e) {
            const img = new Image();
            img.src = e.target?.result as string;
            img.onload = () => {
                EXIF.getData(img, function () {
                    const lat = EXIF.getTag(img, 'GPSLatitude');
                    const lng = EXIF.getTag(img, 'GPSLongitude');
                if (lat && lng) {
                    const latitude = convertDMSToDD(lat); //緯度を10進数に変換
                    const longitude = convertDMSToDD(lng); //経度を10進数に変換
                    setPhotoLocationData({ latitude, longitude });
                }else {
                    alert('位置情報が見つかりませんでした');
                }
            });
        };
        };
        reader.readAsDataURL(file);
    }
};

const convertDMSToDD = (dms: number[]): number => {
    const degrees = dms[0];
    const minutes = dms[1];
    const seconds = dms[2];
    const dd = degrees + minutes / 60 + seconds / 3600;
    return dd;
};

const handleSubmit = async () => {
    if (image && photoLocationData.latitude && photoLocationData.longitude) {
        try {
            const imageUrl = URL.createObjectURL(image);
            await addDoc(collection(db, 'dangerPhoto'), {
                imageUrl,
                latitude: photoLocationData.latitude,
                longitude: photoLocationData.longitude,
                dangerLevel,
            });
            alert('データが保存されました');
        } catch (error) {
            console.error('Error saving document: ', error)
        }
     }else {
        alert('画像または位置情報が不足しています');
    }
};

return (
    <div>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <div>
            <label>
                危険度
                <input
                    type="number"
                    value={dangerLevel}
                    onChange={(e) => setDangerLevel(parseInt(e.target.value))}
                    min="0"
                    max="10"
                />
            </label>
        </div>
        <button onClick={handleSubmit}>設定</button>
        {photoLocationData.latitude && photoLocationData.longitude && (
            <p>
            Latitude: {photoLocationData.latitude}, Longitude: {photoLocationData.longitude}
            </p>
        )}
    </div>
);
};
export default SharePhoto;


