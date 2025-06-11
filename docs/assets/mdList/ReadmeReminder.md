# 📝 ReminderApp

A SwiftUI-based iOS app for managing reminders with offline storage via **Core Data** and seamless cross-device sync using **CloudKit**.

---

## 🚀 Features

- ✅ Add, edit, and delete reminders
- ⏰ Track due dates
- 📦 Local persistence with Core Data
- ☁️ iCloud sync with CloudKit
- 📱 Native SwiftUI interface

---

## 🛠 Tech Stack

- **Swift**
- **SwiftUI**
- **Core Data**
- **CloudKit**
- **MVVM Architecture**

---

## 📂 Project Structure

ReminderApp/ ├── Models/ # Core Data entities │ └── Reminder.swift ├── ViewModels/ # Business logic │ └── ReminderViewModel.swift ├── Views/ # UI Components │ ├── ReminderListView.swift │ ├── AddReminderView.swift │ └── ReminderRowView.swift ├── Persistence.swift # Core Data + CloudKit stack └── ReminderApp.swift # Entry point

---

## ✅ Requirements

- macOS with **Xcode 15+**
- iOS 16+ (target)
- iCloud account enabled on device/simulator
- Apple Developer Account (for iCloud deployment)

---

## 🧪 Setup Instructions

1. Clone the repo:

   ```bash
   git clone https://github.com/iambrianwalker/ReminderApp.git
   cd ReminderApp
2. Open the project in Xcode:

   open ReminderApp.xcodeproj

3. Configure signing:

  Select your Apple Team in Signing & Capabilities

  Ensure iCloud capability (with CloudKit) is enabled

🛎 iCloud Sync Notes
CloudKit syncs automatically for users logged into iCloud

Data is stored in the user’s private CloudKit database

Background sync and merge handled by NSPersistentCloudKitContainer

📌 TODO / Roadmap
 Add notification support for reminders

 Support recurring reminders

 iPad and macOS support (via SwiftUI multiplatform)

 Search and filter functionality

 🙋‍♂️ Author
Brian Walker
GitHub: @iambrianwalker

  

