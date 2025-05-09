# Document AI Frontend

A modern web application built with React and Firebase for document processing and analysis. This project provides a user-friendly interface for handling PDF and Excel documents with advanced features, powered by Google Document AI.

## 🚀 Features

- PDF document processing using Google Document AI
- Automatic extraction of text, tables, and form fields from PDFs
- Conversion of extracted data to structured Excel format
- Drag and drop file upload interface
- Real-time document analysis and processing
- Firebase integration for backend services
- Modern and responsive UI design

## 🛠️ Tech Stack

- **Frontend Framework:** React 18
- **Build Tool:** Vite
- **Backend Services:** Firebase
- **Document Processing:** Google Document AI
- **UI Components:** React Icons
- **File Handling:** React Dropzone
- **Routing:** React Router DOM
- **Notifications:** React Toastify

## 📦 Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd document-ai-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your Firebase and Google Document AI configuration:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## 🔄 Workflow

1. **PDF Upload**
   - Users can upload PDF documents through the drag-and-drop interface
   - Supported formats: PDF files containing text, tables, and form fields

2. **Document Processing**
   - PDFs are processed using Google Document AI
   - The system extracts:
     - Text content
     - Tables
     - Form fields
     - Key-value pairs
     - Structured data

3. **Data Transformation**
   - Extracted data is automatically structured
   - Information is organized into appropriate columns
   - Tables are preserved in their original format

4. **Excel Generation**
   - Processed data is converted to Excel format
   - Multiple sheets are created for different types of data
   - Formatted for easy reading and analysis

## 🚀 Development

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🏗️ Building for Production

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## 🧪 Linting

Run the linter to check for code quality issues:

```bash
npm run lint
```

## 📁 Project Structure

```
document-ai-frontend/
├── src/
│   ├── assets/        # Static assets
│   ├── components/    # React components
│   ├── App.jsx        # Main application component
│   └── firebase.js    # Firebase configuration
├── public/            # Public assets
└── vite.config.js     # Vite configuration
```

## 🔧 Configuration

The project uses Vite as the build tool. Configuration can be modified in `vite.config.js`.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Thanks to all contributors who have helped shape this project
- Special thanks to the open-source community for the amazing tools and libraries
