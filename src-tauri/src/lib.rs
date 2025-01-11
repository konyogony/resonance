use commands::calculate_average_color;
use tauri::Manager;

#[macro_use]
pub mod commands;


#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let mut builder = tauri::Builder::default();
    #[cfg(desktop)]
    {
        builder = builder.plugin(tauri_plugin_single_instance::init(|app, _argv, _cwd| {
            // Handle the second instance with better error handling
            if let Some(window) = app.get_webview_window("main") {
                if let Err(e) = window.set_focus() {
                    eprintln!("Failed to set focus: {}", e);
                }
                // Optionally handle argv/cwd here if needed
            }
        }));
    }
    
    builder
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![calculate_average_color])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
