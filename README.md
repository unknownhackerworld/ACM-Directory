# 🚀 ACM Member Directory

Welcome to the **ACM Member Directory** — a beautifully responsive, interactive, and searchable web application built using **React.js** and **Tailwind CSS**. It enables easy browsing, filtering, and viewing of member profiles with real-time search capabilities and smooth UI animations.

---

**🔗 Site is live at:** [https://acm.maattraan.xyz](https://acm.maattraan.xyz)

## 🌟 Features

### ✅ Fully Responsive Design

* Works seamlessly on **mobile**, **tablet**, and **desktop** devices.
* On mobile, filters become a **hamburger menu** with overlay, ensuring clean usability.

### 🔍 Intelligent Search Bar

* Live search suggestions appear as you type.
* Search by **name**, **role**, or **skills**.
* Click on suggestions to jump directly to a member’s profile page.

### 🎛️ Powerful Filters

* **Role Filter**:

  * Filter by predefined roles like: `Chair`, `Vice Chair`, `Secretary`, and `Member`.
* **Domain Filter**:

  * Toggle-based filter for areas like: `Web Development`, `AI/ML`, `Cybersecurity`, `App Development`, `IoT`.
* **Skills Filter**:

  * Multi-skill selection for fine-grained filtering (`React`, `Python`, `Node.js`, etc.).
* Filters are displayed as **removable tags** above the results for better clarity.

### 📦 Clean Member Cards

Each card displays:

* 👤 Name
* 📧 Email
* 🛠️ Skills
* 🎖️ Role
  Cards are clickable and redirect to the detailed member page.

### 📱 Mobile UX Features

* A floating **FAB (Filter Toggle)** shows up on mobile screens to open/close the filter drawer.
* The filter pane transitions in smoothly with an overlay background for focus.

### 📄 Pagination Support

* Supports large member datasets.
* Includes smart pagination with:

  * First few and last few pages
  * Ellipsis (`...`) for skipped ranges
  * Navigation arrows to go forward/back
* Automatically adjusts based on filters applied.

### 🌒 Dark Mode Ready

* Clean, modern **dark theme** is applied by default.
* Easily toggle with Tailwind’s dark class support.

---

## 🧠 Tech Stack

* **Frontend**: React.js
* **Styling**: Tailwind CSS
* **Icons**: React Icons
* **Routing**: React Router
* **State Management**: React Hooks (`useState`, `useMemo`, `useEffect`)
* **Data Source**: Static `members.json` file

---

## 🛠️ How to Run Locally

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/acm-member-directory.git
cd acm-member-directory
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

Open your browser and visit: `http://localhost:5173/`

---

## ✍️ Data Format (members.json)

Your `members.json` should follow this structure:

```
{
  "id": 1,
  "name": "Jane Doe",
  "email": "jane.doe@example.com",
  "role": "Secretary",
  "domain": "AI/ML",
  "skills": ["Python", "TensorFlow", "Machine Learning"]
}
```

---

## 🧩 Planned Improvements

* 🔐 Admin panel for managing members (CRUD)
* ☁️ Cloud database integration (Firebase/Supabase)
* 📊 Charts to visualize domain and skill distribution
* 📥 CSV/JSON export of member data

---

## 💙 Credits

> Built with 💙 by **Maattraan**
> For the **ACM Student Chapter Selection, 2025**

---
