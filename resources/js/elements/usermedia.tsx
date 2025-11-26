export async function getUserMedia(constraints: MediaStreamConstraints): Promise<MediaStream> {
    try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        return stream;
    } catch (error) {
        console.error("Error accessing user media:", error);
        throw error;
    }
}