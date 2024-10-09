import { useState } from 'react';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { products } from '../store/products.js'

export const Search=({})=>{
        const [query, setQuery] = useState('');
        const [filteredSuggestions, setFilteredSuggestions] = useState([]);
        const product =useRecoilValueLoadable(products)
        
        if(product.state === 'hasValue'){
            const suggestions = product.contents.data.map(item => {return item.name})

        const handleChange = (e) => {
            const value = e.target.value;
            setQuery(value);
    
            if (value.length > 0) {
                const filtered = suggestions.filter((suggestion) =>
                    suggestion.toLowerCase().startsWith(value.toLowerCase())
                );
                setFilteredSuggestions(filtered);
            } else {
                setFilteredSuggestions([]);
            }
        };
    
        return (
            <div className="relative w-full">
                <input
                    type="text"
                    value={query}
                    onChange={handleChange}
                    className="rounded-xl border-none focus:outline-none focus:ring-0 focus:border-transparent bg-transparent w-full"
                    placeholder="Search products..."
                />
                {filteredSuggestions.length > 0 && (
                    <div className="absolute text-backgrounds p-1 border-2 border-primary/50 mt-1 w-4/5 bg-text  rounded-xl shadow-md">
                        {filteredSuggestions.map((suggestion, index) => (
                            <div
                                key={index}
                                className="py-2 px-4 cursor-pointer border-b hover:bg-text/40 hover:rounded-xl hover:text-primary"
                                onClick={() => setQuery(suggestion)}
                            >
                                {suggestion}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }
    };
