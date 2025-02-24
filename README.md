# 🚀 WhatsApp Web.js API - Dockerized

This is a **Node.js API** that wraps [`whatsapp-web.js`](https://github.com/pedroslopez/whatsapp-web.js) inside a **Docker container**.  
It provides **three endpoints** for authentication, generating QR codes, and sending messages.

Docker Url
---
You can pull image from docker hub

[`Docker Hub`](https://hub.docker.com/repository/docker/sariahouloubi/ez-api-whatsapp-web-js)


---

## **📌 Features**
- ✅ **Dockerized** - Run as a containerized service.
- ✅ **JWT Authentication** - Secure API with token-based authentication.
- ✅ **Multi-Client Support** - Handle multiple WhatsApp clients with optional `cid` parameter.
- ✅ **AWS S3 Storage** - Store WhatsApp session data remotely.

---

## **📌 API Endpoints**
### **1️⃣ Get Authorization Token**
🔹 **Endpoint:** `POST /get-token`  
🔹 **Request Body (JSON):**
```json
{
    "clientId": "{{clientId}}",
    "clientSecret": "{{clientSecret}}"
}
```
🔹 **Response:**
```json
{
    "token": "your_generated_jwt_token"
}
```

---

### **2️⃣ Get WhatsApp QR Code**
🔹 **Endpoint:** `GET /wp/qr?cid={optional}`  
- `cid` (optional) → Use this for multiple WhatsApp clients.
- Returns a **QR code** to scan with WhatsApp Web.

🔹 **Example Request:**
```sh
curl -X GET "http://localhost:5000/wp/qr?cid=client1"
```
🔹 **Response:**
```json
{
    "code": "base64_encoded_qr_code",
    "qrCode": "https://yourserver.com/qrcode.png"
}
```

---

### **3️⃣ Send WhatsApp Message**
🔹 **Endpoint:** `POST /wp/send?cid={optional}`  
🔹 **Request Body (JSON):**
```json
{
    "phone": "{{phoneNumber}}",
    "message": "Hi from postman"
}
```
🔹 **Response:**
```json
{
    "messageId": "sent_message_id"
}
```

---

## **📌 Environment Variables**
To run the app inside a **Docker container**, set the following environment variables:

| **Variable** | **Description** |
|-------------|----------------|
| `PORT=5000` | API Server Port |
| `JWT_AUTH_CLIENTS` | List of authorized clients for authentication |
| `WHATSAPP_CLIENT_STORE_AWS_S3_REGION` | AWS S3 region for session storage |
| `WHATSAPP_CLIENT_STORE_AWS_S3_BUCKET` | AWS S3 bucket name |
| `WHATSAPP_CLIENT_STORE_AWS_S3_KEY` | AWS S3 access key |
| `WHATSAPP_CLIENT_STORE_AWS_S3_SECRET_ACCESS_KEY` | AWS S3 secret access key |
| `WHATSAPP_CLIENT_STORE_AWS_S3_STORE_PATH` | Path in S3 bucket to store session files |

🔹 **Example `.env` file:**
```
PORT=5000
JWT_AUTH_CLIENTS=[{"clientId":"client_id1","clientSecret":"client_secret1","expiresIn":"1h"}]
WHATSAPP_CLIENT_STORE_AWS_S3_REGION=eu-west-1
WHATSAPP_CLIENT_STORE_AWS_S3_BUCKET=my-bucket
WHATSAPP_CLIENT_STORE_AWS_S3_KEY=my-key
WHATSAPP_CLIENT_STORE_AWS_S3_SECRET_ACCESS_KEY=my-secret
WHATSAPP_CLIENT_STORE_AWS_S3_STORE_PATH=/
```

---

## **📌 Running the App**
### **1️⃣ Build and Run with Docker**
```sh
docker build -t whatsapp-bot .
docker run -d --name whatsapp-bot -p 5000:5000 \
  -e PORT=5000 \
  -e JWT_AUTH_CLIENTS='[{"clientId":"client_id1","clientSecret":"client_secret1","expiresIn":"1h"}]' \
  -e WHATSAPP_CLIENT_STORE_AWS_S3_REGION=eu-west-1 \
  -e WHATSAPP_CLIENT_STORE_AWS_S3_BUCKET=my-bucket \
  -e WHATSAPP_CLIENT_STORE_AWS_S3_KEY=my-key \
  -e WHATSAPP_CLIENT_STORE_AWS_S3_SECRET_ACCESS_KEY=my-secret \
  -e WHATSAPP_CLIENT_STORE_AWS_S3_STORE_PATH=/ \
  whatsapp-bot
```

### **2️⃣ Running Locally (Without Docker)**
```sh
npm install
npm run build
npm start
```

### **3️⃣ Running with Docker Compose**
```sh
docker-compose up -d
```

---

## **📌 Notes**
- **First-time setup:** You must scan the QR code using WhatsApp Web.
- **Session Management:** Sessions are stored in **AWS S3** for persistence.
- **Multi-Client Mode:** Use the `cid` parameter to manage multiple WhatsApp numbers.

---

## **📌 Contributing**
1. Fork this repository.
2. Clone the repo:  
   ```sh
   git clone https://github.com/Saria-houloubi/ez-api-whatsapp-web-js.git
   ```
3. Install dependencies:  
   ```sh
   npm install
   ```
4. Start development server:  
   ```sh
   npm run watch
   ```
5. Submit a pull request! 🚀

---

## **📌 License**
This project is licensed under the **MIT License**.

---

✅ **Now your app is ready to go!** 🚀 Let me know if you need any improvements! 🔥
