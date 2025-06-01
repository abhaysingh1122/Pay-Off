# 💸 PayOff

**PayOff** is an offline payment web app built with **React**, enabling peer-to-peer transactions via **Bluetooth** using the **Web Bluetooth API**. It allows users to scan nearby devices, establish connections, and send payment data — **completely offline**.

---

## 🔍 What is PayOff?

PayOff makes offline payments possible by leveraging Bluetooth connectivity between two browsers. It's ideal for areas with limited internet access or situations where offline transactions are more convenient.

**Key Capabilities:**
- 💰 Send/receive payments without the internet
- 📡 Scan and connect to nearby Bluetooth devices
- 🔐 Securely transmit payment data
- 🕶️ Dark mode support for a better visual experience
- 🧾 View payment history and connection status

---

## 🚀 Features

- 🔗 Offline P2P payments using Web Bluetooth
- 🌐 Modern UI with Tailwind CSS
- 📱 Mobile and desktop compatible
- 🌙 Dark mode (class-based)
- 🧭 Navigation with React Router
- 📊 Payment history tracking
- ✨ Smooth animations and gradients

---

## 📁 Folder Structure

## 📁 Folder Structure

/src
├── components # Reusable UI components (Header, Button, etc.)
├── pages # Main pages (Login, Home, Scan, PaymentHistory, etc.)
├── assets # Static files like icons or images
├── App.tsx # Main application layout
└── main.tsx # Entry point for React

/public
└── index.html # Root HTML file

tailwind.config.js # Tailwind CSS configuration
vite.config.ts # Vite build config

yaml
Copy
Edit

---

## 🧰 Tech Stack

- ⚛️ **React** with **TypeScript**
- 🌬️ **Tailwind CSS** for styling
- 🚀 **Vite** for fast builds
- 🌐 **Web Bluetooth API** for offline communication
- 🛣️ **React Router** for routing

---

## 🔧 Getting Started

### Prerequisites

- Node.js >= 16
- npm or yarn
- A browser that supports the Web Bluetooth API (Chrome recommended)

### Installation

```bash
git clone https://github.com/abhaysingh1122/Pay-Off.git
cd Pay-Off
npm install
npm run dev
```
🌍 Live Demo
Hosted on Netlify:
🔗 https://pay-off.netlify.app

🤝 Contributing
Contributions are welcome!

1. Fork the repo

2. Create a feature branch: git checkout -b feature/feature-name

3. Commit changes: git commit -m "Added new feature"

4. Push to branch: git push origin feature/feature-name

5. Open a pull request

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

