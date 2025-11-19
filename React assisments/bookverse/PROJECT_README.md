# 📚 BookVerse: Welcome Page and Featured Books Section

## Project Overview
BookVerse is a React-based application that displays a curated list of featured books. Users can view books in different layouts (Grid/List view) and search through the collection.

## User Story
**As a visitor,**  
I want to view a list of featured books on the home page,  
So that I can get an overview of popular books available.

## Features Implemented

### ✅ Acceptance Criteria
1. ✅ Initialized React app using create-react-app
2. ✅ Created `BookCard` functional component displaying:
   - Book title
   - Author
   - Price
3. ✅ Created `BookList` parent component that renders multiple `BookCard` components using props
4. ✅ Implemented state management to toggle between two view modes:
   - **Grid View**: Cards displayed in a responsive grid layout
   - **List View**: Cards displayed in a horizontal list layout
5. ✅ Implemented button click event handlers to switch layouts
6. ✅ Created controlled component with search input box that filters displayed books by:
   - Book title
   - Author name

## Technical Implementation

### React Concepts Demonstrated

#### 1. **JSX & Virtual DOM**
- Components are written using JSX syntax
- React efficiently updates the DOM through the Virtual DOM

#### 2. **Functional Components**
- `BookCard`: Displays individual book information
- `BookList`: Parent component managing the entire book display

#### 3. **Props**
- `BookCard` receives `book` object and `viewMode` as props
- Data flows from parent (`BookList`) to child (`BookCard`)

#### 4. **State Management (useState Hook)**
```javascript
const [viewMode, setViewMode] = useState('grid');
const [searchQuery, setSearchQuery] = useState('');
```

#### 5. **Event Handling**
- `handleViewModeChange`: Switches between grid and list views
- `handleSearchChange`: Updates search query on input change

#### 6. **Controlled Components**
- Search input is a controlled component
- Value is controlled by React state
- Changes are handled through `onChange` event

#### 7. **Array Methods & Filtering**
- Uses `filter()` and `includes()` for search functionality
- Uses `map()` to render multiple BookCard components

## Project Structure
```
bookverse/
├── public/
├── src/
│   ├── components/
│   │   ├── BookCard.js          # Child component for individual book
│   │   ├── BookCard.css         # Styles for BookCard
│   │   ├── BookList.js          # Parent component managing all books
│   │   └── BookList.css         # Styles for BookList
│   ├── App.js                   # Main App component
│   ├── App.css                  # Global styles
│   └── index.js                 # Entry point
└── package.json
```

## How to Run

### Installation
```bash
cd bookverse
npm install
```

### Start Development Server
```bash
npm start
```

The app will open at `http://localhost:3000`

## Usage

1. **View Books**: Browse through the featured books collection
2. **Toggle View Mode**: 
   - Click "Grid View" for card-style layout
   - Click "List View" for horizontal layout
3. **Search Books**: Type in the search box to filter books by title or author

## Sample Data
The application includes 8 featured books:
- The Great Gatsby
- To Kill a Mockingbird
- 1984
- Pride and Prejudice
- The Catcher in the Rye
- Harry Potter and the Sorcerer's Stone
- The Hobbit
- The Lord of the Rings

## Technical Focus Areas

### React Fundamentals
- ✅ React overview and setup
- ✅ JSX syntax
- ✅ Virtual DOM concept
- ✅ Component-based architecture

### Component Development
- ✅ Functional Components
- ✅ Props for data passing
- ✅ State management with hooks

### Interactivity
- ✅ Event Handling
- ✅ Controlled Components
- ✅ Dynamic rendering based on state

## Time Estimate
⏱️ **60 minutes** (Completed)

## Future Enhancements
- Add book details page
- Implement shopping cart functionality
- Add user reviews and ratings
- Connect to a real backend API
- Add authentication

## Technologies Used
- React 18
- JavaScript (ES6+)
- CSS3
- HTML5

---

**Day 1: React Basics & Component Fundamentals** ✅
