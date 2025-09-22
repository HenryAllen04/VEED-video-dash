Hope you’re doing well!

We’re excited for you to tackle our technical challenge. This document is here to clarify expectations and help you focus your efforts within the time constraints. We’re not expecting perfection — just thoughtful prioritization, good judgment, and clean execution.



⏱️ Time Expectation

We recommend spending around 4 hours on this task. We know that’s not enough to polish every detail, What matters most is:

What you choose to prioritize
How you structure and write your code
The thought process behind your choices


Be sure to include any assumptions, trade-offs, or known gaps in your README. Also include API Docs.



📦 Challenge Overview

Your task is to build a Video Library Dashboard, a full-stack application where users can:

Browse a grid of video entries
Sort and filter the list
Create new video entries


You’ll use the provided videos.json file to seed your data.



🧰 Technologies We’d Like You to Use

TypeScript
React (frontend)
Node.js (backend)


Feel free to use supporting libraries (e.g., Tailwind, Prisma, Express, React Query, Zustand) as long as the project remains clean and understandable.



📌 Core Functional Requirements

Please aim to implement the following:

🔹 Video List Page

Grid layout of videos (responsive)
Display of title, created_at, and tags
Sort by created_at (newest/oldest)
Optional: Search (by title), filter by tags and date range
Optional: View video details (modal or separate page)


🔹 Video Creation Page

Input for title (required)
Input for tags (optional, 1+)
Auto-set created_at
Use default/placeholder values for:
thumbnail_url
duration
views


1. 📦 Code Structure & Modularity

We care about how you write code as much as what you write:

Logical project organization (clear folder structure, separation of frontend/backend)
Reusable, modular components - make sure it can scale well
Avoiding overly large files or deeply nested logic
Naming conventions that are consistent and intuitive


2. 🧠 Readability & Consistency

Your code should be easy to understand:

Well-named functions and variables
Consistent file naming patterns
Predictable formatting (linting, indentation)
Minimal duplication or "magic"


3. 🎨 Frontend Experience (UX/UI)

We’re not looking for stunning design — but we care about usability:

Clear layout (responsive on mobile & desktop)
Filters, search, and sort tools should be discoverable and intuitive
Clean error and loading states (skeletons, spinners, or fallback messages)
Ability to recover from errors or empty results



4. 🔄 Backend Design

Your backend should expose an API that supports:

Pagination, search, filtering, and sorting via query parameters
Clean error handling and validation
Ideally: some form of typing or schema validation (e.g., zod, Joi)
If using an ORM (e.g. Prisma), consider how you model the data and expose it


Bonus points:

Type safety between frontend and backend
Thoughtful query design (e.g., avoiding N+1s)


5. 🧪 Testing 

No need to test all of your code, a few examples are fine

It shows how you approach testing
Include frontend and backend
Unit or integration tests (Jest, React Testing Library, etc.)
Input validation tests or API tests are a nice touch.


6. ⚠️ Error Handling & Accessibility

Handle edge cases (invalid input, failed requests).
Provide useful UI feedback (error messages, retry options).
Ensure input fields have labels and are accessible.
Bonus if interactions work via keyboard too.


7. 📄 README & Documentation

Please include the following in your README.md:

✅ Tech Stack: What you used and why
🔧 Setup Instructions: Clear steps to run both frontend and backend
📘 Assumptions & Trade-offs: Anything intentionally left out or simplified
🚀 Future Improvements: What you’d do with more time (e.g. tests, performance, better error handling)


We won’t penalize you for leaving features out — but help us understand your thought process.

✅ Tips for Success

Prioritize clarity over completeness — better to ship clean, working features than partial, messy ones.
Don't over-engineer. Simple, functional code is better than complex abstractions.
Focus on user flow and feedback — small touches like loading states and error messages go a long way.
Use common sense. If something feels awkward in the UI, we’ll likely notice too.
Write for humans. Imagine another dev joining your team tomorrow — would they understand your code?
Document your trade-offs — help us understand your decision-making in your README or comments.


