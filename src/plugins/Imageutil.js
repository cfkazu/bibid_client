import imageCompression from "browser-image-compression";

export default {
    // アップロードされた画像ファイルを取得
    async getCompressImageFileAsync(file) {
        const options = {
            maxSizeMB: 0.4, // 最大ファイルサイズ
            fileType: "image/jpeg", // ファイルタイプ
        };
        try {
            // 圧縮画像の生成
            return await imageCompression(file, options);
        } catch (error) {
            console.error("getCompressImageFileAsync is error", error);
            throw error;
        }
    },
    // プレビュー表示用のdataurlを取得
    async getDataUrlFromFile(file) {
        try {
            return await imageCompression.getDataUrlFromFile(file);
        } catch (error) {
            console.error("getDataUrlFromFile is error", error);
            throw error;
        }
    }
};