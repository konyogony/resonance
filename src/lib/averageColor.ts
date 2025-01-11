export const averageColor = async (imageUrl: string): Promise<{ original: string; darker: string }> => {
    // Create a canvas and load the image
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Create a promise to handle image loading
    const imageLoadPromise = new Promise((resolve, reject) => {
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = imageUrl;
    });

    // Wait for image to load
    await imageLoadPromise;

    // Set canvas size to image size
    canvas.width = img.width;
    canvas.height = img.height;

    // Draw image on canvas
    ctx!.drawImage(img, 0, 0);

    // Get image data
    const imgData = ctx!.getImageData(0, 0, canvas.width, canvas.height);
    let r = 0,
        g = 0,
        b = 0;
    const pixelCount = imgData.data.length / 4;

    // Calculate sum of all colors
    for (let i = 0; i < imgData.data.length; i += 4) {
        r += imgData.data[i];
        g += imgData.data[i + 1];
        b += imgData.data[i + 2];
    }

    // Calculate average
    r = Math.floor(r / pixelCount);
    g = Math.floor(g / pixelCount);
    b = Math.floor(b / pixelCount);

    // Create original hex
    const originalHex = '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('');

    // Create darker version
    const darkerR = Math.floor(r * 0.8);
    const darkerG = Math.floor(g * 0.8);
    const darkerB = Math.floor(b * 0.8);
    const darkerHex = '#' + [darkerR, darkerG, darkerB].map((x) => x.toString(16).padStart(2, '0')).join('');

    return { original: originalHex, darker: darkerHex };
};
