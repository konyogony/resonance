use image::ImageReader;
use reqwest;
use std::io::Cursor;
#[tauri::command]
pub async fn calculate_average_color(image_url: String) -> Result<(String, String), String> {
    let response = reqwest::get(&image_url).await.map_err(|e| e.to_string())?;
    let bytes = response.bytes().await.map_err(|e| e.to_string())?;

    let cursor = Cursor::new(bytes);

    let img = ImageReader::new(cursor)
        .with_guessed_format()
        .map_err(|e| e.to_string())?
        .decode()
        .map_err(|e| e.to_string())?;

    // Get raw pixels for faster access
    let pixels = img.to_rgba8();
    let raw_pixels = pixels.as_raw();

    // Process chunks of 4 bytes (RGBA) at once
    let (total_r, total_g, total_b) =
        raw_pixels
            .chunks_exact(4)
            .fold((0u64, 0u64, 0u64), |(r, g, b), pixel| {
                (
                    r + pixel[0] as u64,
                    g + pixel[1] as u64,
                    b + pixel[2] as u64,
                )
            });

    let pixel_count = (img.width() * img.height()) as u64;

    let avg_r = (total_r / pixel_count) as u8;
    let avg_g = (total_g / pixel_count) as u8;
    let avg_b = (total_b / pixel_count) as u8;

    // Make colors brighter by increasing saturation and value
    let brighter_r = ((avg_r as f64 * 1.2).min(255.0)) as u8;
    let brighter_g = ((avg_g as f64 * 1.2).min(255.0)) as u8;
    let brighter_b = ((avg_b as f64 * 1.2).min(255.0)) as u8;
    let original_hex = format!("#{:02x}{:02x}{:02x}", brighter_r, brighter_g, brighter_b);

    // Calculate second color (slightly less bright)
    let second_r = ((avg_r as f64 * 1.1).min(255.0)) as u8;
    let second_g = ((avg_g as f64 * 1.1).min(255.0)) as u8;
    let second_b = ((avg_b as f64 * 1.1).min(255.0)) as u8;
    let second_hex = format!("#{:02x}{:02x}{:02x}", second_r, second_g, second_b);

    Ok((original_hex, second_hex))
}
