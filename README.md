# Frontend

- Next.js 16
- React 19
- Tailwind CSS 4
- Lucide React Icons

## Backend

- Next.js API Routes
- Prisma ORM
- REST API

## Database

- MySQL
- Prisma Client

## DevOps

- GitHub
- GitHub Actions
- Vercel

---

# 🏗️ Project Architecture

```
Client (React UI)
        │
        ▼
Next.js Pages
        │
        ▼
API Routes
        │
        ▼
Prisma ORM
        │
        ▼
MySQL Database
```


# 🗄 Database Schema

```prisma
model Notice {
  id          Int      @id @default(autoincrement())
  title       String
  body        String
  category    Category
  priority    Priority
  publishDate DateTime
  image       String?
  createdAt   DateTime @default(now())
}
```

---

# 📡 REST API

## Get All Notices

```
GET /api/notices
```

Response

```json
{
  "success": true,
  "count": 12,
  "data": []
}
```

---

## Get Notice

```
GET /api/notices/:id
```

---

## Create Notice

```
POST /api/notices
```

Body

```json
{
  "title": "Hackathon",
  "body": "Registrations Open",
  "category": "Event",
  "priority": "Urgent",
  "publishDate": "2026-07-08"
}
```

---

## Update Notice

```
PUT /api/notices/:id
```

---

## Delete Notice

```
DELETE /api/notices/:id
```

---

# 👥 Role Based Access

## 👨‍💼 Admin

- View Notices
- Create Notice
- Edit Notice
- Delete Notice
- Search Notices
- Filter Notices

---

## 🎓 Student

- View Notices
- Search Notices
- Read Only Access

Students cannot

- Create
- Edit
- Delete

---

# 🎨 UI Features

- Modern Dashboard Layout
- Responsive Design
- Professional Notice Cards
- Search Bar
- Filter Panel
- Empty State
- Loading Skeleton
- Error State
- Gradient Background
- Mobile Navigation
- Role Toggle
- Admin / Student Mode

---

# 📱 Responsive Design

Supports

- Desktop
- Laptop
- Tablet
- Mobile

Built using Tailwind CSS responsive utilities.

---

# ⚙ Installation

Clone repository

```bash
git clone git@github.com:Nithish0011/reno-notice-board.git
```

Move inside project

```bash
cd reno-notice-board
```

Install dependencies

```bash
npm install
```

Generate Prisma Client

```bash
npx prisma generate
```

Run database migration

```bash
npx prisma migrate dev
```

Start development server

```bash
npm run dev
```

Application runs on

```
http://localhost:3000
```

---

# 🔐 Environment Variables

Create

```
---

# 🚀 Deployment

The application is deployed using

- Vercel
- GitHub Actions

Deployment Flow

```
Developer

↓

Git Push

↓

GitHub Repository

↓

GitHub Actions

↓

Build & Validation

↓

Vercel Deployment

↓

Production Website
```

---

# 🔄 Continuous Integration

GitHub Actions automatically

- Install dependencies
- Generate Prisma Client
- Run ESLint
- Build Next.js Application

Workflow

```
.github/workflows/ci.yml
```

---

# 🧪 Validation

The application validates

- Empty Title
- Empty Description
- Invalid Category
- Invalid Priority
- Invalid Publish Date

Both client-side and server-side validation are implemented.

---

# 📈 Current Features

- CRUD Operations
- Prisma ORM
- MySQL Integration
- Search
- Filters
- Responsive UI
- Loading Skeleton
- Empty State
- Error Handling
- Role Based Interface
- REST APIs
- GitHub Actions
- Vercel Deployment

---

# 🚧 Planned Enhancements

- Notice Details Page
- PDF Attachment Upload
- Rich Text Editor
- Toast Notifications
- Custom Delete Modal
- Dashboard Analytics
- Latest Notices Widget
- Upcoming Events Widget
- Image Upload
- Pagination
- Dark Mode
- Email Notifications

---

# 📚 Learning Outcomes

This project demonstrates practical experience with

- Full Stack Development
- REST API Design
- Database Modeling
- Prisma ORM
- Next.js
- React
- Tailwind CSS
- Responsive Design
- Role Based UI
- CRUD Operations
- GitHub Actions
- CI/CD
- Vercel Deployment
- Professional Project Structure

---

# 👨‍💻 Author

**Nithish Baswa**

Software Engineer | Full Stack Developer | AWS Certified

- GitHub: https://github.com/Nithish0011
- Email: nithishbaswa1@gmail.com

---

# 📄 License

This project is licensed under the MIT License.

---

## ⭐ Support

If you found this project helpful, consider giving it a ⭐ on GitHub. It helps others discover the project and supports future improvements.