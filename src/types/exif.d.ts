declare module 'exif-js' {
    interface EXIFStatic {
        getData(img: any, callback: () => void): void;
        getTag(img: any, tag:string): any;
    }

    const EXIF: EXIFStatic;
    export default EXIF;
}