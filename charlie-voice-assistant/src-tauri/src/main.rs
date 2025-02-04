// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

#[macro_use]
extern crate lazy_static; // better switch to once_cell ?
use log::info;
use log::LevelFilter;
use pickledb::{PickleDb, PickleDbDumpPolicy, SerializationMethod};
use std::env;
use std::fs::File;
use std::sync::Mutex;
use tauri::Manager;
use tauri::SystemTrayEvent;
use tauri::{CustomMenuItem, SystemTray, SystemTrayMenu, SystemTrayMenuItem};
// expose the config
mod config;
use config::*;

// include tauri commands
mod tauri_commands;

// include assistant commands
mod assistant_commands;
use assistant_commands::AssistantCommand;

// include vosk
mod vosk;

// include events
mod events;

// include recorder
mod recorder;

// app dir
lazy_static! {
    static ref APP_CONFIG_DIR: Mutex<String> = Mutex::new(String::new());
}

// data dir
lazy_static! {
    static ref APP_LOG_DIR: Mutex<String> = Mutex::new(String::new());
}

// init PickleDb connection
lazy_static! {
    static ref DB: Mutex<PickleDb> = Mutex::new(
        PickleDb::load(
            format!("{}/{}", APP_CONFIG_DIR.lock().unwrap(), DB_FILE_NAME),
            PickleDbDumpPolicy::AutoDump,
            SerializationMethod::Json
        )
        .unwrap_or_else(|_x: _| {
            info!(
                "Creating new db file at {} ...",
                format!("{}/{}", APP_CONFIG_DIR.lock().unwrap(), DB_FILE_NAME)
            );
            PickleDb::new(
                format!("{}/{}", APP_CONFIG_DIR.lock().unwrap(), DB_FILE_NAME),
                PickleDbDumpPolicy::AutoDump,
                SerializationMethod::Json,
            )
        })
    );
}

// init commands
lazy_static! {
    static ref COMMANDS: Vec<AssistantCommand> = assistant_commands::parse_commands().unwrap();
}

fn main() {
    // Добавляем путь к папке libs в переменную окружения PATH
    if let Ok(current_dir) = env::current_dir() {
        let libs_path = current_dir.join("libs");

        if let Some(path) = env::var_os("PATH") {
            env::set_var(
                "PATH",
                format!("{};{}", libs_path.display(), path.to_string_lossy()),
            );
        } else {
            env::set_var("PATH", libs_path.display().to_string());
        }
    }

    File::create("output.txt").expect("Error creating file");

    // init vosk
    vosk::init_vosk();

    let quit = CustomMenuItem::new("quit".to_string(), "Закрыть");
    let hide = CustomMenuItem::new("hide".to_string(), "Скрыть");
    let tray_menu = SystemTrayMenu::new()
        .add_item(quit)
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(hide);
    let system_tray = SystemTray::new().with_menu(tray_menu);

    // run the app
    tauri::Builder::default()
        .setup(|app| {
            std::fs::create_dir_all(app.path_resolver().app_config_dir().unwrap())?;
            APP_CONFIG_DIR.lock().unwrap().push_str(
                app.path_resolver()
                    .app_config_dir()
                    .unwrap()
                    .to_str()
                    .unwrap(),
            );

            app.listen_global("tts_started", |event| {
                println!("TTS started: {:?}", event.payload());
            });

            std::fs::create_dir_all(app.path_resolver().app_log_dir().unwrap())?;
            APP_LOG_DIR
                .lock()
                .unwrap()
                .push_str(app.path_resolver().app_log_dir().unwrap().to_str().unwrap());

            // log to file
            let log_file_path =
                format!("{}/{}", APP_LOG_DIR.lock().unwrap(), config::LOG_FILE_NAME);
            println!(
                "!!!===============!!!\nLOGGING TO {}\n!!!===============!!!\n",
                &log_file_path
            );
            simple_logging::log_to_file(&log_file_path, LevelFilter::max())
                .expect("Failed to start logger ... is directory writable?");

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            // db commands
            tauri_commands::db_read,
            tauri_commands::db_write,
            // recorder commands
            tauri_commands::pv_get_audio_devices,
            tauri_commands::pv_get_audio_device_name,
            // listener commands
            tauri_commands::start_listening,
            tauri_commands::stop_listening,
            tauri_commands::is_listening,
            // sys commands
            tauri_commands::get_current_ram_usage,
            tauri_commands::get_peak_ram_usage,
            tauri_commands::get_cpu_temp,
            tauri_commands::get_cpu_usage,
            // sound commands
            tauri_commands::play_sound,
            // fs commands
            tauri_commands::show_in_folder,
            // etc commands
            tauri_commands::get_app_version,
            tauri_commands::get_author_name,
            tauri_commands::get_repository_link,
            tauri_commands::get_log_file_path,
            recorder::update_selected_microphone,
        ])
        .system_tray(system_tray)
        .on_system_tray_event(|app, event| match event {
            SystemTrayEvent::LeftClick {
                position: _,
                size: _,
                ..
            } => {
                let window = app.get_window("main").unwrap();
                window.show().unwrap();
                let _ = window.set_focus();
                let _ = window.unminimize();
                // println!("system tray received a left click");
            }
            SystemTrayEvent::RightClick {
                position: _,
                size: _,
                ..
            } => {
                // println!("system tray received a right click");
            }
            SystemTrayEvent::DoubleClick {
                position: _,
                size: _,
                ..
            } => {
                let window = app.get_window("main").unwrap();
                window.show().unwrap();
                let _ = window.set_focus();
                let _ = window.unminimize();
                // println!("system tray received a double click");
            }
            SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
                "quit" => {
                    std::process::exit(0);
                }
                "hide" => {
                    let window = app.get_window("main").unwrap();
                    window.hide().unwrap();
                }
                _ => {}
            },
            _ => {}
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
