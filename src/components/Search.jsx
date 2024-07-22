import { useState } from 'react';

export const Search=({ suggestions })=>{
        const [query, setQuery] = useState('');
        const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    
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
                    <div className="absolute top-full mt-1 w-full bg-backgrounds max-w-fit rounded-xl shadow-md">
                        {filteredSuggestions.map((suggestion, index) => (
                            <div
                                key={index}
                                className="py-2 px-4 cursor-pointer hover:bg-backgrounds/30 hover:text-primary"
                                onClick={() => setQuery(suggestion)}
                            >
                                {suggestion}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };
