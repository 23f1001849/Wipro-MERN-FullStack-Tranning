import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import FilterControls from './components/FilterControls';
import NumberList from './components/NumberList';
import Logger from './components/Logger';
import HoistingDemo from './components/HoistingDemo';
import ConstructorDemo from './components/ConstructorDemo';
import './App.css';
const seedValues = [4, 7, 12, 15, 18, 21, 26, 30];
const mapToItems = (values) => values.map((value) => ({ value }));
const App = () => {
    const [items, setItems] = useState(() => mapToItems(seedValues));
    const handleShowAll = () => setItems(mapToItems(seedValues));
    const handleFilterEven = () => {
        setItems(mapToItems(seedValues.filter((value) => value % 2 === 0)));
    };
    const handleDoubleValues = () => {
        setItems(mapToItems(seedValues.map((value) => value * 2)));
    };
    return (_jsxs("main", { className: "app", children: [_jsxs("header", { className: "hero", children: [_jsx("h1", { children: "JSX & JavaScript Concepts Sprint" }), _jsx("p", { children: "Explore array methods, hoisting, and constructors through an interactive React experience." })] }), _jsx(FilterControls, { onShowAll: handleShowAll, onFilterEven: handleFilterEven, onDoubleValues: handleDoubleValues }), _jsxs("section", { className: "content", children: [_jsx(NumberList, { items: items }), _jsx(Logger, { items: items })] }), _jsxs("section", { className: "content", children: [_jsx(HoistingDemo, {}), _jsx(ConstructorDemo, { values: seedValues })] })] }));
};
export default App;
