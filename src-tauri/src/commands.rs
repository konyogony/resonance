use reqwest;
use std::io::Cursor;
use image::{GenericImageView, ImageReader, Rgba};

#[tauri::command]
pub async fn calculate_average_color(image_url: String) -> Result<(String, String), String> {
     let response = reqwest::get(&image_url)
        .await
        .map_err(|e| e.to_string())?;
    let bytes = response.bytes()
        .await
        .map_err(|e| e.to_string())?;
    
    let cursor = Cursor::new(bytes);
    
    let img = ImageReader::new(cursor)
        .with_guessed_format()
        .map_err(|e| e.to_string())?
        .decode()
        .map_err(|e| e.to_string())?;

    let (width, height) = img.dimensions();
    let mut total_r = 0u64;
    let mut total_g = 0u64;
    let mut total_b = 0u64;
    let pixel_count = (width * height) as u64;

    for pixel in img.pixels() {
        let Rgba([r, g, b, _]) = pixel.2;
        total_r += r as u64;
        total_g += g as u64;
        total_b += b as u64;
    }

    let avg_r = (total_r / pixel_count) as u8;
    let avg_g = (total_g / pixel_count) as u8;
    let avg_b = (total_b / pixel_count) as u8;

    let original_hex = format!("#{:02x}{:02x}{:02x}", avg_r, avg_g, avg_b);

    let darker_r = (avg_r as f64 * 0.8) as u8;
    let darker_g = (avg_g as f64 * 0.8) as u8;
    let darker_b = (avg_b as f64 * 0.8) as u8;
    let darker_hex = format!("#{:02x}{:02x}{:02x}", darker_r, darker_g, darker_b);

    Ok((original_hex, darker_hex))
}
