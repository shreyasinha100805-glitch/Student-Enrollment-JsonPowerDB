# 🎓 Student Enrollment Form — JsonPowerDB

![JsonPowerDB](https://img.shields.io/badge/Database-JsonPowerDB-blue)
![HTML](https://img.shields.io/badge/Frontend-HTML%2FJS%2FBootstrap-orange)
![Status](https://img.shields.io/badge/Status-Active-brightgreen)

---

## 📌 Title of the Project

**Student Enrollment Form using JsonPowerDB (JPDB)**

---

## 📖 Description

A web-based **Student Enrollment Form** built with **HTML, Bootstrap, jQuery**, and **JsonPowerDB** as the backend database.

The form allows users to:
- **Save** new student records
- **Search** existing students by Roll No
- **Update** student information
- **Reset** the form

All data is stored in the `STUDENT-TABLE` relation inside the `SCHOOL-DB` database on JsonPowerDB.

### Input Fields:
| Field | Type | Key |
|---|---|---|
| Roll No | Text | 🔑 Primary Key |
| Full Name | Text | |
| Class | Text | |
| Birth Date | Date | |
| Address | Textarea | |
| Enrollment Date | Date | |

---

## ⚡ Benefits of using JsonPowerDB

- **High Performance** — Proprietary algorithm makes CRUD operations multiple times faster than traditional DBMS
- **Serverless** — No backend server needed; UI developers can build full dynamic apps directly
- **Schema-free** — No need to define table structure; just send JSON data
- **REST API Based** — Simple HTTP requests for all operations (PUT, GET, UPDATE, DELETE)
- **Built-in Caching** — Embedded caching for lightning-fast read performance
- **Multi-mode DB** — Supports Document DB, Key-Value DB, and Relational DB in one
- **Low Development Cost** — Reduces development time drastically
- **Real-time Data** — Suitable for real-time web applications
- **Secure** — Token-based authentication for all API calls

---

## 🚀 Release History

| Version | Date | Description |
|---|---|---|
| v1.0 | June 2026 | Initial release — Save and Search functionality |
| v1.1 | June 2026 | Added Update functionality with rec_no tracking |
| v1.2 | June 2026 | Fixed double-stringify bug; data now saves in correct columns |

---

## 📋 Table of Contents

- [Title](#-title-of-the-project)
- [Description](#-description)
- [Benefits of JsonPowerDB](#-benefits-of-using-jsonpowerdb)
- [Release History](#-release-history)
- [Scope of Functionalities](#-scope-of-functionalities)
- [Examples of Use](#-examples-of-use)
- [Project Status](#-project-status)
- [Sources](#-sources)

---

## 🔧 Scope of Functionalities

- ✅ Add new student enrollment records
- ✅ Search student by Roll No (primary key)
- ✅ Update existing student details
- ✅ Form validation (all fields required)
- ✅ User-friendly alerts and success/error messages
- ✅ Responsive UI using Bootstrap 3
- ⬜ Delete student record (future scope)
- ⬜ List all students (future scope)

---

## 💡 Examples of Use

### Save a Student
1. Fill all fields (Roll No, Full Name, Class, Birth Date, Address, Enrollment Date)
2. Click **Save** → record is stored in JPDB

### Search a Student
1. Enter Roll No (e.g. `S101`)
2. Click **Search** → all fields auto-fill with stored data

### Update a Student
1. Search the student first
2. Edit any field
3. Click **Update** → record is updated in JPDB

---

## 🛠️ Technologies Used

- **Frontend:** HTML5, CSS3, Bootstrap 3.4, jQuery 3.7
- **Database:** JsonPowerDB (JPDB) by Login2Explore
- **API:** REST API (`http://api.login2explore.com:5577`)
- **IDE:** NetBeans

---

## 📂 Project Structure

```
StudentEnrollment1/
│
└── Site Root/
    └── index.html       ← Main form with all logic
└── README.md            ← This file
```

---

## 🟢 Project Status

**Active** — Core CRUD operations working. Future enhancements planned (delete, list all students).

---

## 📚 Sources

- [JsonPowerDB Documentation](http://login2explore.com/jpdb/docs.html)
- [Bootstrap 3 Docs](https://getbootstrap.com/docs/3.4/)
- [jQuery Docs](https://api.jquery.com/)
- [GitHub Markdown Guide](https://guides.github.com/features/mastering-markdown/)

---

## 👤 Author

> Made with ❤️ using JsonPowerDB
