# Demo Login Credentials

## 🔐 Admin Account (No Database Required!)

```
Email:    admin@demo.com
Password: Demo123!
Role:     admin
```

**Note:** This demo login works without any database connection! Just use these credentials on the login page and you'll be signed in immediately.

---

## 🎉 How It Works

The signin page now has built-in demo credentials that bypass the API and database entirely. When you use the demo credentials above, a mock user session is created locally, allowing you to explore the admin panel without any backend setup.

---

## 🚀 How to Create Real User (Optional)

### Option 1: Via API Endpoint (Recommended)

Once your MongoDB connection is working:

```bash
curl -X POST http://localhost:3001/api/seed-demo
```

### Option 2: Via NPM Script

```bash
npm run seed:demo
```

### Option 3: Direct MongoDB Access

If you have access to MongoDB Compass or mongo shell:

```javascript
db.users.insertOne({
  username: "Admin Demo",
  email: "admin@demo.com",
  password: "$2a$10$YourHashedPasswordHere", // Use bcrypt to hash "Demo123!"
  accessSection: "all",
  role: "admin",
  createdAt: new Date()
})
```

---

## ⚠️ MongoDB Connection Issue

Currently, the MongoDB connection is timing out. To fix this:

1. **Check MongoDB Atlas IP Whitelist**
   - Go to MongoDB Atlas Dashboard
   - Navigate to Network Access
   - Add your current IP address or allow access from anywhere (0.0.0.0/0)

2. **Verify Connection String**
   - Check `.env` file has correct `MONGO_URI`
   - Current: `mongodb+srv://flowen:Flowen%40123@flowentech.uf2ql.mongodb.net/flowentech?authSource=admin`

3. **Test Connection**
   ```bash
   # Test if MongoDB cluster is reachable
   ping flowentech.uf2ql.mongodb.net
   ```

4. **Check MongoDB Cluster Status**
   - Ensure the cluster is running on MongoDB Atlas
   - Verify the cluster hasn't been paused

---

## 📝 Additional Test Accounts

You can create more demo users by modifying `/src/app/api/seed-demo/route.ts` or using the registration endpoint at `/api/register`.

---

## 🔧 Troubleshooting

If you still can't connect:

1. Try using a VPN if your network blocks MongoDB Atlas
2. Check if your MongoDB cluster is in a suspended state
3. Verify the credentials in your connection string
4. Check MongoDB Atlas logs for connection attempts
