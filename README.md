# 📌 Events API Documentation

## 📡 Events API Endpoints

**Base URL=** `/api/v3/app `
<details>
<summary>1️⃣ Get All Events (with or without query parameters)</summary>

- **Method:** GET  
- **Endpoint:** `/events`  
- **Description:** Fetch all events, supports optional query parameters for filtering and pagination.  
- **Query Parameters:**
  - `id` (optional) – eventId of an event to be fetched
  - `type` (optional) – e.g., `latest` or `popular`
  - `limit` (optional) – number of results per page
  - `page` (optional) – page number
    
💡 **Note:** There can be **3** types of request based on query parameters with this Endpoint (shown in the example below).

**Example Request:**
```http
GET /api/events?type=latest&limit=2&page=1
GET /api/events?id=:event.id
GET /api/events
```
**Example Response:**

For- GET `/api/events?type=latest&limit=2&page=1` . (let's say with query parameters `type=latest`, `limit=2` and `page=1`)

Return- Events which are on page 1 when events are sorted according to latest and with each page having only 2 evnets

```json
{
  "_id": "6510a4df9b1f8a001c45b901",
  "type": "event",
  "uid": 18,
  "name": "Tech Innovation Summit 2025",
  "tagline": "Shaping the Future with Innovation",
  "schedule": "2025-10-05T14:30:00Z",
  "description": "A global summit bringing together innovators, entrepreneurs, and researchers to discuss groundbreaking technologies and their applications.",
  "files": {
    "image": "uploads/events/tech-summit-banner.jpg"
  },
  "moderator": 25,
  "category": "Technology",
  "sub_category": "Artificial Intelligence",
  "rigor_rank": 4,
  "attendees": [12, 34, 56, 78, 90]
}
{
  "_id": "6510a4df9b1f8a001c45b9256",
  "type": "event",
  "uid": 27,
  "name": "Marathon for a Cause",
  "tagline": "Run for Health, Run for Hope",
  "schedule": "2025-10-20T05:30:00Z",
  "description": "A charity marathon aimed at raising awareness and funds for children's education and healthcare.",
  "files": {
    "image": "uploads/events/marathon2025.jpg"
  },
  "moderator": 35,
  "category": "Sports",
  "sub_category": "Charity Run",
  "rigor_rank": 4,
  "attendees": [150, 152, 153, 154, 155, 156, 157]
}
```

For- GET `/api/events?id=:event.id` . (let's say with query parameter `id` with value "6510a4df9b1f8a001c45b901")

Return- an event by its Unique ID
```json
{
  "_id": "6510a4df9b1f8a001c45b901",
  "type": "event",
  "uid": 18,
  "name": "Tech Innovation Summit 2025",
  "tagline": "Shaping the Future with Innovation",
  "schedule": "2025-10-05T14:30:00Z",
  "description": "A global summit bringing together innovators, entrepreneurs, and researchers to discuss groundbreaking technologies and their applications.",
  "files": {
    "image": "uploads/events/tech-summit-banner.jpg"
  },
  "moderator": 25,
  "category": "Technology",
  "sub_category": "Artificial Intelligence",
  "rigor_rank": 4,
  "attendees": [12, 34, 56, 78, 90]
}
```

For- GET `/api/events`

Return- All Events in the Database
```json
{
  "_id": "6510a4df9b1f8a001c45b901",
  "type": "event",
  "uid": 18,
  "name": "Tech Innovation Summit 2025",
  "tagline": "Shaping the Future with Innovation",
  "schedule": "2025-10-05T14:30:00Z",
  "description": "A global summit bringing together innovators, entrepreneurs, and researchers to discuss groundbreaking technologies and their applications.",
  "files": {
    "image": "uploads/events/tech-summit-banner.jpg"
  },
  "moderator": 25,
  "category": "Technology",
  "sub_category": "Artificial Intelligence",
  "rigor_rank": 4,
  "attendees": [12, 34, 56, 78, 90]
}
{
  "_id": "6510a4df9b1f8a001c45b9256",
  "type": "event",
  "uid": 27,
  "name": "Marathon for a Cause",
  "tagline": "Run for Health, Run for Hope",
  "schedule": "2025-10-20T05:30:00Z",
  "description": "A charity marathon aimed at raising awareness and funds for children's education and healthcare.",
  "files": {
    "image": "uploads/events/marathon2025.jpg"
  },
  "moderator": 35,
  "category": "Sports",
  "sub_category": "Charity Run",
  "rigor_rank": 4,
  "attendees": [150, 152, 153, 154, 155, 156, 157]
}
{
  "_id": "6510a4df9b1f8a001f6g901",
  "type": "event",
  "uid": 33,
  "name": "Hackathon 2025",
  "tagline": "Code. Create. Conquer.",
  "schedule": "2025-12-01T09:00:00Z",
  "description": "A 48-hour hackathon for developers, designers, and innovators to build real-world solutions with cutting-edge technology.",
  "files": {
    "image": "uploads/events/hackathon-2025.jpg"
  },
  "moderator": 40,
  "category": "Technology",
  "sub_category": "Software Development",
  "rigor_rank": 5,
  "attendees": [101, 102, 103, 104, 105, 106]
}
{
  "_id": "3450a4df9b1f8a001c45b901",
  "type": "event",
  "uid": 12,
  "name": "Art & Culture Fest",
  "tagline": "Celebrating Creativity and Heritage",
  "schedule": "2025-11-15T10:00:00Z",
  "description": "A vibrant festival with exhibitions, performances, and workshops showcasing art, music, and cultural traditions.",
  "files": {
    "image": "uploads/events/art-culture-fest.png"
  },
  "moderator": 19,
  "category": "Arts",
  "sub_category": "Cultural Festival",
  "rigor_rank": 2,
  "attendees": [77, 78, 80, 82]
}
```


</details> 

<details> 
<summary>2️⃣ Create Event</summary>
  
- **Method:** POST
- **Endpoint:** `/events`
- **Description:** Create a new event with fields from `req.body`.
- **Retrun:** ID of the event created

**Request Body (JSON):**

```json

{
  "name": "Startup Pitch Night",
  "tagline": "Where ideas meet investors",
  "schedule": "2025-09-30T18:00:00Z",
  "description": "An event where budding entrepreneurs showcase their startup ideas to potential investors and mentors.",
  "files": {
    "image": "uploads/events/pitch-night.jpg"
  },
  "moderator": 30,
  "category": "Business",
  "sub_category": "Entrepreneurship",
  "rigor_rank": 3
}
```
**Example Response:**

```json

{
  "_id": "8765a4df9b1f8a001c45b901"
}
```
</details>

<details> 
<summary>3️⃣ Update Event</summary>
  
- **Method:** PUT
- **Endpoint:** `/events/:id`
- **Description:** Update fields of an existing event by event ID.
- **Retrun:** ID of the event updated.

**Request Body (Partial Update Example):**

```json

{
  "title": "Updated Event Title",
  "date": "2025-10-05T12:00:00.000Z"
}
```
**Example Response:**

```json

{
  "_id": "8765a4df9b1f8a001c45b901"
}
```
</details> 

<details> 
<summary>4️⃣ Delete Event</summary>
  
- **Method:** DELETE
- **Endpoint:** `/events/:id`
- **Description:** Delete an event by its ID.

**Example Request:**

```http

DELETE /api/events/650a1b2c3d4e5f6a7b8c9d0f
```

**Example Response:**

```json

{
  "success": true,
  "message": "Event deleted successfully"
}
```
</details> 


# 📌 Nudge API Documentation

## 📡 Nudge API Endpoints

**Base URL=** `/api/v3/app `
<details>
<summary>1️⃣ Get All Nudge</summary>

- **Method:** GET  
- **Endpoint:** `/nudge`  
- **Description:** Fetch all nugdes.  

**Example Request:**
```http
GET /api/events
```
**Example Response:**
```json
{
  "id" : "650f3a4c9b1f8a001c45a812"
  "eventTag": "Tech Innovation Summit 2025",
  "uid": 18,
  "title": "Don’t Miss the Opening Keynote!",
  "image": "uploads/nudges/keynote-cover.jpg",
  "schedule": "2025-10-05T13:50:00Z",
  "description": "Reminder: The opening keynote session starts in 10 minutes. Be ready to join and secure your seat.",
  "files": {
    "image": "uploads/nudges/keynote-banner.png"
  },
  "createdBy": 25,
  "icon": "uploads/icons/bell.png",
  "invitation": "Join us for the exciting opening keynote!"
}

```


</details> 

<details> 
<summary>2️⃣ Create Nudge</summary>
  
- **Method:** POST
- **Endpoint:** `/nudge`
- **Description:** Create a new nudge with fields from `req.body`.

**Request Body (JSON):**

```json

{
  "eventTag": "Marathon for a Cause",
  "uid": 27,
  "title": "Warm-Up Session Starts Now",
  "image": "uploads/nudges/marathon-warmup.jpg",
  "schedule": "2025-10-20T05:00:00Z",
  "description": "The pre-run warm-up session has begun near the main gate. Join the fitness trainers to get ready for the run!",
  "files": {
    "image": "uploads/nudges/warmup-banner.png"
  },
  "createdBy": 35,
  "icon": "uploads/icons/running.png",
  "invitation": "Kick off the marathon with a fun warm-up!"
}
```
**Example Response:**

```json

{
  "id" : "650f3c6f9b1f8a001c45a834"
}
```
</details>

<details> 
<summary>3️⃣ Update Nudge</summary>
  
- **Method:** PUT
- **Endpoint:** `/nudge/:id`
- **Description:** Update fields of an existing nudge by nudge ID.

**Request Body (Partial Update Example):**

```json

{
  "title": "Updated Event Title",
  "schedule": "2025-10-20T05:00:00Z",
}
```
**Example Response:**

```json
{
  "eventTag": "Marathon for a Cause",
  "uid": 27,
  "title": "Updated Event Title",
  "image": "uploads/nudges/marathon-warmup.jpg",
  "schedule": "2025-10-20T05:00:00Z",
  "description": "The pre-run warm-up session has begun near the main gate. Join the fitness trainers to get ready for the run!",
  "files": {
    "image": "uploads/nudges/warmup-banner.png"
  },
  "createdBy": 35,
  "icon": "uploads/icons/running.png",
  "invitation": "Kick off the marathon with a fun warm-up!"
}
```
</details> 

<details> 
<summary>4️⃣ Delete Nudge</summary>
  
- **Method:** DELETE
- **Endpoint:** /nudge/:id
- **Description:** Delete a nudge by its ID.

**Example Request:**

```http

DELETE /api/events/650a1b2c3d4e5f6a7b8c9d0f
```

**Example Response:**

```json



{
  "success": true,
  "message": "Event deleted successfully"
}
```
</details> 

# 🔮 Future Improvements 

- [ ] We can store the images using `multer`.  
- [ ] Optimize image upload using cloud storage (e.g., AWS S3, Cloudinary).  
- [ ] Make sure the validation of the data sent by the user through `req.body` before working on it. 
- [ ] Conversion of the data fields to their correct format type from string like ids, dates, Array, integer, etc.  
- [ ] Add authentication & role-based access control (admin, user).  
- [ ] Implement search & filter for events (by date, location, category).    
- [ ] Improve error handling and validation.   
