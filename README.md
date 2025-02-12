# Portfolio & Project Management Dashboard

This is a **personal portfolio and project management system** built with **Next.js, TypeScript, and Tailwind CSS**. It includes a **public-facing portfolio website** and a **dashboard** for managing projects.

## 🚀 Features

### 🌍 Public Website (Portfolio)
- **Hero Section:** Introduction with profile info.
- **Skills Section:** Showcases expertise using React icons.
- **Featured Projects Section:** Highlights top projects.
- **Projects Page:** Displays a list of all projects.
- **Project Details Page:** Shows individual project details.
- **Resume Download Button:** Allows users to download the resume.

### 📊 Admin Dashboard
- **Project Management:** CRUD operations (Create, Read, Update, Delete).
- **Dashboard Navigation:** Manage projects through an intuitive UI.
- **Project Upload:** Add project images, descriptions, and links.

## 🛠️ Tech Stack

- **Frontend:** Next.js 14, React, TypeScript, Tailwind CSS, ShadCN UI
- **Backend:** Next.js API Routes, MongoDB, Mongoose
- **State Management:** React Hooks, useState, useEffect
- **Authentication:** NextAuth.js (if implemented)
- **Deployment:** Vercel (Frontend), MongoDB Atlas (Database)

## 📂 Folder Structure

```
/src
  ├── app
  │   ├── (public)
  │   │   ├── page.tsx (Home Page)
  │   │   ├── projects
  │   │   │   ├── page.tsx (Projects List)
  │   │   │   ├── [id].tsx (Project Details)
  │   ├── (dashboard)
  │   │   ├── projects
  │   │   │   ├── page.tsx (Admin Project List)
  │   │   │   ├── new.tsx (Create New Project)
  │   │   │   ├── [id].tsx (Edit Project)
  ├── components
  │   ├── Banner.tsx (Hero Section)
  │   ├── Skills.tsx (Skills Section)
  │   ├── FeaturedProjects.tsx (Home Featured Section)
  ├── config
  │   ├── configuration.ts (MongoDB Connection)
  ├── lib
  │   ├── dbConnect.ts (Database Connection)
  ├── models
  │   ├── Project.ts (Mongoose Model)
  ├── pages
  │   ├── api
  │   │   ├── projects.ts (Project API)
```

## 🏗️ Installation & Setup

1. **Clone the Repository**
   ```sh
   git clone https://github.com/shahadathhs/sajib.portfolio
   cd sajib.portfolio
   ```

2. **Install Dependencies**
   ```sh
   npm install
   ```

3. **Set Up Environment Variables**
   Create a `.env` file and add:

   ```sh
   MONGO_URI=your_mongodb_connection_string
   ```

4. **Run the Development Server**
   ```sh
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the project.


## Live Link: https://sajib-dev.vercel.app
## Github Link: https://github.com/shahadathhs/sajib.portfolio

## Demo Video: 