# JKL Healthcare Services

## Overview
JKL Healthcare Services is a comprehensive healthcare management system designed to streamline the interaction between patients and caregivers. The system provides dedicated dashboards for both patients and caregivers, enabling efficient management of appointments, profiles, and care services.

## 🚀 Features

### Patient Dashboard
- **Profile Management**
  - View and edit personal information
  - Update contact details and medical records
  - Manage communication preferences

- **Caregiver Assignment**
  - Browse available caregivers
  - View caregiver profiles and specializations
  - Request caregiver assignments
  - Manage current caregiver relationships

- **Appointment Management**
  - Schedule new appointments
  - View upcoming and past appointments
  - Cancel or reschedule existing appointments
  - Receive appointment reminders

### Caregiver Dashboard
- **Patient Management**
  - View assigned patients list
  - Access patient medical histories
  - Update patient care notes
  - Track patient progress

- **Schedule Management**
  - View daily/weekly/monthly schedules
  - Manage appointment bookings
  - Handle schedule conflicts
  - Set availability preferences

- **Appointment Handling**
  - Create new appointments
  - Update appointment details
  - Add appointment notes
  - Send appointment confirmations

## 🛠 Technology Stack

### Frontend
- React.js (v18.x)
- TypeScript
- Tailwind CSS
- React Router DOM
- Axios for API integration

### Backend
- ASP.NET Core 8.0
- Entity Framework Core
- SQL Server
- JWT Authentication
- AutoMapper

### Development Tools
- Visual Studio Code
- Visual Studio 2022
- Git & GitHub
- Docker
- Swagger/OpenAPI

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- .NET 8.0 SDK
- SQL Server
- Docker (optional, for containerization)
- Git

### Installation

#### Frontend Setup
```bash
# Clone the repository
git clone https://github.com/YourUsername/JKLHealthcare.git

# Navigate to frontend directory
cd jkl-healthcare

# Install dependencies
npm install

# Start development server
npm start
```

#### Backend Setup
```bash
# Navigate to backend directory
cd JKLHealthcare.API

# Restore packages
dotnet restore

# Update database
dotnet ef database update

# Run the API
dotnet run
```

### Environment Configuration

#### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5119/api
REACT_APP_ENV=development
```

#### Backend (appsettings.json)
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost,1433;Database=JKLHealthcareDb;User Id=sa;Password=YourPassword;TrustServerCertificate=True"
  },
  "JwtSettings": {
    "SecretKey": "your-secret-key-here",
    "Issuer": "JKLHealthcare",
    "Audience": "JKLHealthcareApi",
    "DurationInMinutes": 60
  }
}
```

## 📡 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/Auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "Password123!",
  "role": "Patient",
  "name": "John Doe"
}
```

#### Login
```http
POST /api/Auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "Password123!"
}
```

### Patient Endpoints

#### Get Patient Profile
```http
GET /api/Patient/{id}
Authorization: Bearer {token}
```

#### Update Patient Profile
```http
PUT /api/Patient/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "John Doe",
  "address": "123 Main St",
  "phoneNumber": "1234567890",
  "medicalRecords": "No known allergies"
}
```

### Appointment Endpoints

#### Create Appointment
```http
POST /api/Appointment
Authorization: Bearer {token}
Content-Type: application/json

{
  "patientId": "guid",
  "caregiverId": "guid",
  "appointmentTime": "2024-12-01T10:00:00",
  "notes": "Regular checkup"
}
```

#### Get Appointments
```http
GET /api/Appointment
Authorization: Bearer {token}
```
## 🚀 Deployment

### Docker Deployment

```dockerfile
# Backend Dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["JKLHealthcare.API/JKLHealthcare.API.csproj", "JKLHealthcare.API/"]
RUN dotnet restore "JKLHealthcare.API/JKLHealthcare.API.csproj"
COPY . .
WORKDIR "/src/JKLHealthcare.API"
RUN dotnet build "JKLHealthcare.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "JKLHealthcare.API.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "JKLHealthcare.API.dll"]
```

### Docker Compose Setup
```yaml
version: '3.8'
services:
  api:
    build:
      context: .
      dockerfile: JKLHealthcare.API/Dockerfile
    ports:
      - "5000:80"
    depends_on:
      - db
    environment:
      - ConnectionStrings__DefaultConnection=Server=db;Database=JKLHealthcareDb;User=sa;Password=YourStrong!Passw0rd;TrustServerCertificate=True

  db:
    image: mcr.microsoft.com/mssql/server:2022-latest
    environment:
      - ACCEPT_EULA=Y
      - SA_PASSWORD=YourStrong!Passw0rd
    ports:
      - "1433:1433"
```

## 🔒 Security Considerations

### Authentication & Authorization
- JWT-based authentication
- Role-based access control (RBAC)
- Password hashing using BCrypt
- Token expiration and refresh mechanisms

### Data Protection
- HTTPS enforcement
- SQL injection prevention
- XSS protection
- CORS policy implementation
- Input validation and sanitization

### API Security
- Rate limiting
- Request validation
- Secure headers implementation
- Audit logging

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. Push to the branch
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request

### Coding Standards
- Follow C# coding conventions
- Use meaningful variable and function names
- Write unit tests for new features
- Document your code using XML comments
- Follow React best practices and hooks guidelines

## 📈 Future Roadmap

### Phase 1 (Q1 2024)
- [ ] Advanced appointment scheduling system
- [ ] Real-time notifications
- [ ] Enhanced patient medical records

### Phase 2 (Q2 2024)
- [ ] Mobile application development
- [ ] Integration with medical devices
- [ ] Telemedicine features

### Phase 3 (Q3 2024)
- [ ] AI-powered health recommendations
- [ ] Advanced analytics dashboard
- [ ] Patient feedback system


## 🙏 Acknowledgments
- [ASP.NET Core Documentation](https://docs.microsoft.com/en-us/aspnet/core)
- [React Documentation](https://reactjs.org/)
- [Entity Framework Core](https://docs.microsoft.com/en-us/ef/core)
- [Microsoft SQL Server](https://www.microsoft.com/en-us/sql-server)


