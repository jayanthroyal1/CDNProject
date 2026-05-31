Admin Upload
      │
      ▼

Multer
      │
      ▼

Local Storage
      │
      ▼

Mongo Metadata
      │
      ▼

Public APIs

Future
Local Storage
      │
      ▼

AWS S3
      │
      ▼

CloudFront

packages 
npm install multer mime-types csc-parser xlsx sharp pdf-parser


uploads/images
        ↓
s3://portfolio/images

uploads/pdfs
        ↓
s3://portfolio/pdfs


-----------------------Architecture----------------------
Upload File
     │
     ▼

Mongo Metadata

     │

┌────┼───────┬─────────┐
│    │       │         │

PDF Image Video Report

│    │       │         │

Metadata Extraction

│    │       │         │

Mongo Metadata Storage

     │

Chart API

     │

Frontend Renderer
