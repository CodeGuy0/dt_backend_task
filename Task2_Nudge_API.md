Task 2 – Nudge API Documentation

This document explains the Nudge feature APIs for the assignment.

In this task, I am only designing and documenting APIs.

The idea of a Nudge is taken from the given wireframe.
A nudge is like a small reminder or promotional card that appears in the app to tell users about:

-> upcoming events

-> articles

-> important updates

-> invitations

It basically “nudges” the user to take action.

1. What is a Nudge?

A Nudge is a small box/card that contains:

-> title

-> image

-> schedule date and time

-> short description

-> one-line invitation

Example:
“Hackathon happening tomorrow. Swipe to check details.”

Nudges help in:

-> promoting events

-> promoting articles

-> grabbing user attention

-> reminding users of timings


2. Nudge Object Data Model : 

A Nudge will be stored in the database in the following format:

{
  type: "nudge",
  target_type: "event | article",
  target_id: Number,
  title: String,
  image: File,
  scheduled_date: Number,
  start_time: String,
  end_time: String,
  description: String,
  invitation_line: String,
  icon: File,
  created_at: Number,
  updated_at: Number
}


3. Description of Each Field : 

| Field           | Description                                 |
| --------------- | ------------------------------------------- |
| type            | Always set as “nudge”                       |
| target_type     | Whether nudge is for an article or event    |
| target_id       | ID of event/article connected to nudge      |
| title           | Heading shown on nudge                      |
| image           | Image file uploaded                         |
| scheduled_date  | Date when nudge should be shown (timestamp) |
| start_time      | Start time of showing nudge                 |
| end_time        | End time of showing nudge                   |
| description     | Detailed text message of nudge              |
| invitation_line | One catchy sentence inviting user           |
| icon            | Small icon image to display                 |
| created_at      | When nudge was created                      |
| updated_at      | When nudge was last updated                 |


4. Nudge API Endpoints : 

4.1 Create Nudge : 

Method: POST
/api/v3/app/nudges

Request Type: form-data because files are uploaded.

Fields to send in form-data:

target_type

target_id

title

description

scheduled_date

start_time

end_time

invitation_line

image (file upload)

icon (file upload)

Response will be 201 created 

It sends output in postman like : 

{
  "message": "Nudge created successfully",
  "id": "<nudge_id>"
}



4.2 Get Nudge by ID : 

Method: GET

/api/v3/app/nudges/details?id=<nudge_id>

output in postman : 

{
  "type": "nudge",
  "target_type": "event",
  "title": "React Workshop",
  "description": "Beginner friendly workshop",
  ...
}


4.3 Get All Nudges (List API) : 

Method: GET 

/api/v3/app/nudges?limit=10&page=1


4.4 Update Nudge : 

Method: PUT

/api/v3/app/nudges/:id

What can be updated:

-> title

-> timings

-> description

-> invitation line

-> image

-> icon


4.5 Delete Nudge : 

Method: DELETE 

/api/v3/app/nudges/:id

output in postman: 

{
  "message": "Nudge deleted successfully"
}





