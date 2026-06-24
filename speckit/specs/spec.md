# HeritageAI – Smart Heritage Guide

## Project Overview

HeritageAI is an AI-powered cultural tourism and heritage exploration platform designed to help tourists, students, researchers, and citizens discover historical monuments through interactive maps, AI-powered guidance, QR-based monument access, reviews, ratings, and personalized travel recommendations.

The platform aims to digitally preserve cultural heritage while providing a modern and engaging tourism experience.

---

# Problem Statement

Many tourists and citizens visit historical monuments without access to detailed information, guided experiences, multilingual support, or personalized recommendations.

Current challenges include:

- Lack of digital heritage information
- Language barriers for foreign tourists
- Limited availability of tour guides
- Poor monument discovery mechanisms
- No centralized heritage exploration platform
- Limited citizen engagement in heritage preservation

---

# Proposed Solution

Develop a full-stack web application that enables users to:

- Discover monuments
- Explore historical information
- Navigate using interactive maps
- Scan QR codes at heritage locations
- Interact with AI-powered heritage assistants
- Create personalized travel plans
- Leave reviews and ratings
- Save favorite monuments

Administrators can manage monuments, users, reviews, and analytics through a dedicated dashboard.

---

# Objectives

1. Promote cultural heritage awareness.
2. Improve tourism experiences.
3. Provide AI-powered monument education.
4. Enable location-based heritage discovery.
5. Support multilingual access.
6. Encourage heritage preservation through community engagement.

---

# Target Users

## Guest Users

Can:

- Browse monuments
- Search monuments
- View public information

## Registered Users

Can:

- Register
- Login
- Manage profile
- Save favorites
- Leave reviews
- Use AI assistant
- Use trip planner
- Earn badges

## Administrators

Can:

- Manage monuments
- Manage users
- Moderate reviews
- View analytics
- Generate QR codes

---

# Core Features

## Authentication Module

Features:

- User Registration
- Login
- Logout
- Forgot Password
- Reset Password

Registration Fields:

- Full Name
- Email
- Phone Number
- Country
- Preferred Language
- Password

Security:

- JWT Authentication
- Password Hashing (bcrypt)
- Protected Routes
- Role-Based Access Control

---

## Monument Module

Features:

- Browse Monuments
- Search Monuments
- Filter Monuments
- Favorite Monuments
- Monument Details

Monument Fields:

- Name
- Description
- History
- Architecture Style
- Construction Year
- City
- State
- Country
- Latitude
- Longitude
- Entry Fee
- Visiting Hours
- Images
- Audio Guide URL
- QR Code

---

## Monument Details Page

Displays:

- Monument Images
- Historical Information
- Timeline
- Architecture Details
- Reviews
- Ratings
- Related Monuments
- Interactive Map
- AI Assistant

---

## Interactive Maps

Technology:

- Leaflet
- OpenStreetMap

Features:

- Monument Markers
- User Location
- Nearby Attractions
- Route Navigation
- Distance Calculation

---

## QR Code System

Workflow:

Admin Creates Monument
→ QR Generated
→ Tourist Scans QR
→ Monument Page Opens

Features:

- Unique QR per Monument
- Download QR
- Dynamic Monument Access

---

## Reviews & Ratings

Features:

- Star Ratings
- User Reviews
- Photo Reviews

Admin Features:

- Review Moderation
- Spam Removal

---

## AI Heritage Assistant

Powered By:

- OpenAI API

Capabilities:

- Historical Q&A
- Architecture Explanation
- Event Explanation
- Monument Insights

Example Questions:

- Who built this monument?
- Why was it built?
- What is special about it?
- What happened here?

---

## AI Trip Planner

Inputs:

- Destination City
- Travel Days
- Interests

Outputs:

- Personalized Itinerary
- Recommended Monuments
- Route Suggestions

---

## Favorites Module

Features:

- Save Monuments
- Remove Favorites
- Favorites Dashboard

---

## Achievement System

Badges:

- First Visit
- Explorer
- Heritage Enthusiast
- Heritage Master
- Cultural Ambassador

---

# Admin Dashboard

Modules:

## User Management

- View Users
- Suspend Users
- Delete Users

## Monument Management

- Create Monument
- Update Monument
- Delete Monument

## Review Management

- Approve Reviews
- Delete Reviews

## Analytics

- Total Users
- Total Visits
- Total Reviews
- Most Popular Monument
- User Activity Trends

---

# Technology Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- React Router
- Axios
- Framer Motion
- React Icons

## Backend

- Node.js
- Express.js

## Database

- MongoDB Atlas
- Mongoose

## Authentication

- JWT
- bcrypt

## Maps

- Leaflet
- OpenStreetMap

## AI

- OpenAI API

## File Storage

- Cloudinary

## Deployment

- Vercel
- Render
- MongoDB Atlas

---

# Database Collections

## Users

- id
- name
- email
- phone
- password
- role
- country
- language

## Monuments

- id
- name
- description
- history
- latitude
- longitude
- images

## Reviews

- id
- userId
- monumentId
- rating
- comment

## Favorites

- id
- userId
- monumentId

## Visits

- id
- userId
- monumentId
- visitDate

## Badges

- id
- userId
- badgeName

---

# Non-Functional Requirements

- Mobile Responsive
- Fast Performance
- Secure Authentication
- Scalable Architecture
- Accessible UI
- Production Ready
- Error Handling
- API Validation
- Environment Variables
- Reusable Components

---

# Success Criteria

- Users can discover and learn about monuments.
- Admins can manage monument content.
- AI assistant provides useful heritage information.
- Interactive maps improve monument navigation.
- QR system enables seamless monument access.
- Platform supports real-world tourism and heritage education.
