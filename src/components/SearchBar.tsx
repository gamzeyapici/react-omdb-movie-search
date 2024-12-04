import React, { useState } from 'react';

interface SearchBarProps {
    onSearch: (searchTerm: string, year: string, type: string) => void;
    defaultSearchTerm?: string;
    defaultYear?: string;
    defaultType?: string;
}

const contentTypes = [
    { value: 'movie', label: '🎬 Movie' },
    { value: 'series', label: '📺 TV Series' },
    { value: 'episode', label: '🎯 TV Episode' }
];

const SearchBar = ({ 
    onSearch, 
    defaultSearchTerm = "", 
    defaultYear = "", 
    defaultType = "movie" 
}: SearchBarProps) => {
    const [searchTerm, setSearchTerm] = useState(defaultSearchTerm);
    const [year, setYear] = useState(defaultYear);
    const [type, setType] = useState(defaultType);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(searchTerm, year, type);
    };

    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newType = e.target.value;
        setType(newType);
        if (searchTerm.trim()) {
            onSearch(searchTerm, year, newType);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="search-form mb-4">
            <div className="row g-3">
                <div className="col-md-6">
                    <label htmlFor="searchInput" className="form-label">What are you looking for?</label>
                    <input
                        id="searchInput"
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Movie, series or episode name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="col-md-2">
                    <label htmlFor="yearInput" className="form-label">Year</label>
                    <input
                        id="yearInput"
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="e.g. 2023"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        maxLength={4}
                    />
                </div>
                <div className="col-md-2">
                    <label htmlFor="typeSelect" className="form-label">Content Type</label>
                    <select
                        id="typeSelect"
                        className="form-select form-select-lg"
                        value={type}
                        onChange={handleTypeChange}
                    >
                        {contentTypes.map(({ value, label }) => (
                            <option key={value} value={value}>{label}</option>
                        ))}
                    </select>
                </div>
                <div className="col-md-2 d-flex align-items-end">
                    <button type="submit" className="btn btn-primary btn-lg w-100">
                        <i className="bi bi-search me-2"></i>
                        Search
                    </button>
                </div>
            </div>
            {type && (
                <div className="mt-2 text-muted">
                    <small>
                        {`Currently searching for ${
                            contentTypes.find(t => t.value === type)?.label.toLowerCase()
                        } only.`}
                    </small>
                </div>
            )}
        </form>
    );
};

export default SearchBar;
