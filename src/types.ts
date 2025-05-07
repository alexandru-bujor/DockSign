export interface ContractVerificationResult {
    address: string;
    contractName: string;
    compilerVersion: string;
    sourceCode: string;
    abi: any[];
}