# DevOps Pipeline: Frontend & Backend Deployment on AWS

## Overview

This project demonstrates a basic DevOps pipeline using **AWS EC2** and **RDS**. It consists of:

* A **frontend service** hosted on an EC2 instance.
* A **backend service** hosted on a separate EC2 instance.
* A **MySQL database** hosted on **Amazon RDS**, connected to the backend.
* The backend is consumed **only** by the frontend.

## 🧱 Architecture

```
User
 │
 ▼
Frontend (EC2) ────> Backend (EC2) ────> MySQL (RDS)
```

## Technologies Used

* **AWS EC2**
* **Amazon RDS** (MySQL database)
* **GitHub Actions**
* **NextJs & Django** 
* **Docker**

## DevOps Pipeline Steps

1. **Code Push**
2. **Build & Test**
3. **Deploy**:

   * SSH into EC2 instance(s).
   * Pull the latest code.
   * Install dependencies.
   * Restart the service.

## Security Best Practices

* Use **security groups** to control traffic:

  * Frontend EC2: Allow HTTP/HTTPS from the internet.
  * Backend EC2: Only allow access from the frontend EC2 IP.
  * RDS: Only allow access from backend EC2.
* Enable **SSH key authentication**.
* Store credentials using environment files.
