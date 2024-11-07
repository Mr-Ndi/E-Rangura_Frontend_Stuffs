// CategoriesSection.tsx
import React from 'react';
import './CategoriesSection.css';

const CategoriesSection: React.FC = () => {
    const categories = [
        { name: "Clothing", imageUrl: "path/to/clothing.jpg" },
        { name: "Accessories", imageUrl: "path/to/accessories.jpg" },
        // Add more categories as needed
    ];

    return (
        <div className="categories">
            <h2>Shop by Category</h2>
            <div className="category-list">
                {categories.map((category) => (
                    <div key={category.name} className="category-item">
                        <img src={category.imageUrl} alt={category.name} />
                        <h3>{category.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoriesSection;
