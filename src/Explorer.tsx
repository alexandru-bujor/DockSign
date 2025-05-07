import React, { useState } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';
import { FiSearch, FiCheckCircle, FiXCircle, FiLoader } from 'react-icons/fi';
import './Explorer.css';

const Explorer = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<null | {
        creator1: string;
        creator2: string;
        contractType: string;
        isValid: boolean;
    }>(null);

    const handleSearch = async () => {
        if (!searchQuery.trim()) return;
        
        setIsLoading(true);
        setResult(null);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setResult({
            creator1: 'Andrei V.',
            creator2: 'Cosmin S.',
            contractType: 'Vanzare Cumparare',
            isValid: Math.random() > 0.5
        });
        
        setIsLoading(false);
    };

    return (
        <div className="explorer-container">
            <h1 className="explorer-title">Contract Verification Explorer</h1>
            <p className="explorer-subtitle">
                Verify and explore contract details by entering the contract address
            </p>

            <div className="search-box">
                <FiSearch className="search-icon" />
                <input
                    className="search-input"
                    type="text"
                    placeholder="Enter contract address (e.g. 0x...)"
                    value={searchQuery}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                    onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleSearch()}
                />
                <button 
                    className="search-button" 
                    onClick={handleSearch}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <FiLoader className="loading-spinner" />
                            Searching...
                        </>
                    ) : (
                        <>
                            <FiSearch />
                            Search
                        </>
                    )}
                </button>
            </div>

            {result && (
                <div className="result-card">
                    <div className="result-row">
                        <div className="result-label">First Creator</div>
                        <div className="result-value">{result.creator1}</div>
                    </div>
                    <div className="result-row">
                        <div className="result-label">Second Creator</div>
                        <div className="result-value">{result.creator2}</div>
                    </div>
                    <div className="result-row">
                        <div className="result-label">Contract Type</div>
                        <div className="result-value">{result.contractType}</div>
                    </div>
                    <div className="result-row">
                        <div className="result-label">Verification</div>
                        <div className={`result-value ${result.isValid ? 'valid' : 'invalid'}`}>
                            <span className={`valid-badge ${result.isValid ? 'valid' : 'invalid'}`}>
                                {result.isValid ? <FiCheckCircle /> : <FiXCircle />}
                                {result.isValid ? 'Valid Contract' : 'Invalid Contract'}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Explorer;