# Real-Time Chat/Image Generation


## Description
Built a responsive real-time Chat and Image Generation web application that supports natural language queries and on-demand AI image generation. Designed and implemented JWT-secured REST APIs for text and image responses, with secure media uploads via ImageKit. Developed a scalable Express.js backend with MongoDB for user authentication, session management, and message persistence. Enhanced frontend usability by implementing formatted response rendering using Prism.js for improved readability and user experience.


##  Key Features

  **`User Authentication`**
  - Secure user signup and login using **email-based authentication**
  - JWT-based authorization for protected routes
  - Encrypted password storage using bcrypt

  **`Text-Based Chat System`**
  - Users can ask questions by selecting the **Text** checkbox
  - Natural language queries are processed through secure APIs
  - Real-time response handling with formatted output rendering

  **`AI Image Generation`**
  - Users can generate images by selecting the **Image** checkbox
  - Accepts custom text prompts for on-demand image creation
  - Secure image handling and storage via **ImageKit**

  **`Secure API Architecture`**
  - JWT-secured REST APIs for both text and image generation
  - Role-based route protection using middleware

  **`Enhanced User Experience`**
  - Responsive UI across devices
  - Syntax-highlighted responses using **Prism.js**
  - Clear user flow with checkbox-based mode selection
---

##  Technologies Used

- **Frontend:** React.js, Tailwind CSS, Prism.js  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **APIs & Services:** OpenAI API (Text & Image Generation), ImageKit (Secure Media Storage)  
- **Authentication & Security:** JWT (JSON Web Tokens)  



##  Setup & Installation

###  Clone Repository

```Bash
git clone https://github.com/abhiyadav05/My-GPT.git`
```
1. Frontend Dependencies

``` Bash
cd frontend
npm install
npm run dev
```

2. Backend Dependencies

```Bash
cd backend
npm install
npm run start
```

### Environment Variables in Backend
---

| Key        | Value                           |
|------------|---------------------------------|
| PORT       | 3000                            |
| MONGODB_URL | your mongodb url               |
| JWT_KEY| give your jwt secret                |
| OPENAI_API_KEY       | Give your openai api key|
| IMAGE_KIT_URL | give image kit url |
| IMAGE_KIT_PUBLIC_KEY| give your image kit public key|
| IMAGE_KIT_PRIVATE_KEY| give your image kit private key|









##  Authentication Flow

| Step | Description |
|----:|-------------|
| 1 | User registers or logs in from frontend |
| 2 | Credentials are sent to backend API |
| 3 | Password is hashed using bcrypt |
| 4 | JWT token is generated |
| 5 | Token is sent to frontend |
| 6 | Token stored securely in cookies |
| 7 | Protected routes verified using JWT middleware |



##  API Endpoints

| Method | Endpoint | Description | Access |
|------:|----------|-------------|--------|
| POST | `/api/user/register` | Register new user|
| POST | `/api/user/login` | Login |
| GET | `/api/user/data` |get user data|
| GET | `/api/user/published-images` |get published image|
| POST | `/api/message/text` | This is for text|
| POST | `/api/message/image` | This is for image |
| GET | `/api/chat/create` | This is for create new chat|
| GET | `/api/chat/get` | This is get chat |
| POST | `/api/chat/delete` | This is for delete chat |




##  Deployment

### Frontend
 **Vercel Platform**


### Backend
 **Vercel Platform**

---

##  Author

| Detail | Info |
|------|------|
| Name | **Abhishek Yadav** |
| Degree | B.Tech CSE (AI) |
| Institute | IET Lucknow |
| Role | Full Stack Developer |
| Competitive Programming | CodeChef `3-Star Coder`, Codeforces `Pupil` |
| LinkedIn | https://www.linkedin.com/in/abhishek-yadav-637136257/ |

