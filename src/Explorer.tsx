import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  font-family: 'Segoe UI', sans-serif;
`;

const SearchBox = styled.div`
  display: flex;
  gap: 12px;
    background: white;
  margin-bottom: 24px;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #e1e1e1;
  border-radius: 6px;
  font-size: 16px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  
  &:focus {
    outline: none;
    border-color: #4d90fe;
    box-shadow: 0 0 0 2px rgba(77, 144, 254, 0.2);
  }
`;

const SearchButton = styled.button`
  padding: 12px 24px;
  background: #4d90fe;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
  
  &:hover {
    background: #357ae8;
  }
`;

const ResultCard = styled.div`
  border: 1px solid #e1e1e1;
  border-radius: 8px;
  padding: 20px;
  margin-top: 16px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
`;

const ResultRow = styled.div`
    display: flex;
    margin-bottom: 12px;
    padding-bottom: 12px;
    border-bottom: 1px solid #f0f0f0;

    &:last-child {
        border-bottom: none;
        margin-bottom: 0;
    }
`;

const ResultLabel = styled.div`
    font-weight: 600;
    color: #666;
    min-width: 150px;
`;

const ResultValue = styled.div<{ valid?: boolean }>`
    flex: 1;
    color: ${props => props.valid ? '#4CAF50' : '#F44336'};
    font-weight: ${props => props.valid ? '600' : 'normal'};
`;

const ValidBadge = styled.span<{ valid: boolean }>`
    display: inline-block;
    padding: 4px 8px;
    border-radius: 4px;
    background: ${props => props.valid ? '#E8F5E9' : '#FFEBEE'};
    color: ${props => props.valid ? '#2E7D32' : '#C62828'};
    font-size: 14px;
    font-weight: 500;
`;

const Explorer = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [result, setResult] = useState<null | {
        creator1: string;
        creator2: string;
        contractType: string;
        isValid: boolean;
    }>(null);

    const handleSearch = () => {
        // Mock search results
        if (searchQuery.trim()) {
            setResult({
                creator1: 'Andrei V.',
                creator2: 'Cosmin S.',
                contractType: 'Vanzare Cumparare',
                isValid: Math.random() > 0.5 // Random valid/invalid for demo
            });
        }
    };

    return (
        <Container>
            <h1>Contract Verification Explorer</h1>

            <SearchBox>
                <SearchInput
                    type="text"
                    placeholder="Enter contract address (e.g. 0x...)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <SearchButton onClick={handleSearch}>
                    Search
                </SearchButton>
            </SearchBox>

            {result && (
                <ResultCard>
                    <ResultRow>
                        <ResultLabel>First Creator</ResultLabel>
                        <ResultValue>{result.creator1}</ResultValue>
                    </ResultRow>
                    <ResultRow>
                        <ResultLabel>Second Creator</ResultLabel>
                        <ResultValue>{result.creator2}</ResultValue>
                    </ResultRow>
                    <ResultRow>
                        <ResultLabel>Contract Type</ResultLabel>
                        <ResultValue>{result.contractType}</ResultValue>
                    </ResultRow>
                    <ResultRow>
                        <ResultLabel>Verification</ResultLabel>
                        <ResultValue valid={result.isValid}>
                            <ValidBadge valid={result.isValid}>
                                {result.isValid ? 'Valid' : 'Invalid'}
                            </ValidBadge>
                        </ResultValue>
                    </ResultRow>
                </ResultCard>
            )}
        </Container>
    );
};

export default Explorer;