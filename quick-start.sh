#!/bin/bash

# Aurevion AI - Quick Start Script
# This script sets up and starts both frontend and backend

echo "🚀 Starting Aurevion AI Development Environment..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print section headers
print_header() {
    echo -e "${BLUE}=== $1 ===${NC}"
}

# Function to print success
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

# Function to print warning
print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

# Check prerequisites
print_header "Checking Prerequisites"

# Check Node.js
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    print_success "Node.js installed: $NODE_VERSION"
else
    print_warning "Node.js not found. Please install Node.js 16+ from https://nodejs.org"
    exit 1
fi

# Check npm
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    print_success "npm installed: $NPM_VERSION"
else
    print_warning "npm not found. Please install npm"
    exit 1
fi

# Check Python
if command -v python3 &> /dev/null; then
    PYTHON_VERSION=$(python3 --version)
    print_success "Python installed: $PYTHON_VERSION"
else
    print_warning "Python 3 not found. Please install Python 3.10+ from https://python.org"
    exit 1
fi

# Check Git
if command -v git &> /dev/null; then
    GIT_VERSION=$(git --version)
    print_success "Git installed"
else
    print_warning "Git not found. Please install Git"
    exit 1
fi

echo ""
print_header "Setting up Frontend"

# Install frontend dependencies
cd frontend
if [ ! -d "node_modules" ]; then
    echo "Installing npm packages..."
    npm install
    print_success "Frontend dependencies installed"
else
    print_success "Frontend dependencies already installed"
fi

print_success "Frontend setup complete"
cd ..

echo ""
print_header "Setting up Backend"

# Create virtual environment if it doesn't exist
if [ ! -d "backend/venv" ]; then
    echo "Creating Python virtual environment..."
    cd backend
    python3 -m venv venv
    print_success "Virtual environment created"
    cd ..
else
    print_success "Virtual environment already exists"
fi

# Activate virtual environment and install dependencies
cd backend
source venv/bin/activate 2>/dev/null || . venv/Scripts/activate 2>/dev/null

if [ ! -f ".env" ]; then
    echo "Creating .env file from .env.example..."
    cp .env.example .env
    print_success ".env file created"
else
    print_success ".env file exists"
fi

echo "Installing Python packages..."
pip install -r requirements.txt > /dev/null 2>&1
print_success "Backend dependencies installed"
cd ..

echo ""
echo ""
print_header "Ready to Start Development!"
echo ""
echo -e "${YELLOW}Start Frontend:${NC}"
echo "  cd frontend && npm run dev"
echo ""
echo -e "${YELLOW}Start Backend (in new terminal):${NC}"
echo "  cd backend"
echo "  source venv/bin/activate  # On Windows: venv\\Scripts\\activate"
echo "  python -m uvicorn app.main:app --reload"
echo ""
echo -e "${YELLOW}URLs:${NC}"
echo "  Frontend: http://localhost:5173"
echo "  Backend:  http://localhost:8000"
echo "  API Docs: http://localhost:8000/docs"
echo ""
echo -e "${GREEN}Happy Coding! 🎉${NC}"
