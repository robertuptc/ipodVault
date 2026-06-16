# iPod Vault

A full-stack inventory management app for tracking a personal iPod collection — built independently as a hands-on project to keep software engineering skills sharp.

## What It Does

iPod Vault helps manage the full lifecycle of a personal iPod collection:

- Track iPods currently in stock
- Log how much was invested in each unit (purchase price, parts, repairs)
- Record refurbishment status and condition notes
- Track resale prices and sold units
- Get a clear picture of profit/loss across the collection

## Why I Built It

I collect, refurbish, and resell vintage iPods as a hobby. Spreadsheets weren't cutting it — I wanted a real app that could give me a clean dashboard of what I have, what I've spent, and what I've made. So I built one.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Python, Django, Django REST Framework |
| Frontend | React, JavaScript |
| Database | SQLite (local) |
| Styling | CSS |

## Project Status

MVP complete and functional locally. Core inventory tracking features are working. Active development ongoing.

## Getting Started

### Prerequisites

- Python 3.10+
- Node.js 18+
- pip

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/robertuptc/ipodVault.git
   cd ipodVault
   ```

2. Set up the backend
   ```bash
   cd backend
   pip install -r requirements.txt
   cp .env.example .env
   # Edit .env with your local settings
   python manage.py migrate
   python manage.py runserver
   ```

3. Set up the frontend
   ```bash
   cd frontend
   npm install
   npm start
   ```

4. Open your browser at `http://localhost:3000`

## Features Roadmap

- [ ] Authentication / login
- [ ] Image upload per unit
- [ ] Dashboard with profit/loss summary
- [ ] Export to CSV
- [ ] Deploy to web

## Author

Robert Puentes Garces — [LinkedIn](https://linkedin.com/in/robert-puentes-garces-811077226) · [puentesstoveservices.com](https://www.puentesstoveservices.com)
