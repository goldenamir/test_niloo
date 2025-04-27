// Check if Web3 is available
if (typeof window.ethereum === 'undefined') {
    console.log('MetaMask is not installed!');
} else {
    console.log('MetaMask is installed!');
}

// Initialize Web3
let web3;
let accounts = [];

// Function to connect wallet
async function connectWallet() {
    try {
        // Request account access
        accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        // Initialize Web3
        web3 = new Web3(window.ethereum);
        
        // Update UI
        updateWalletUI(accounts[0]);
        
        // Listen for account changes
        window.ethereum.on('accountsChanged', handleAccountsChanged);
        
        // Listen for chain changes
        window.ethereum.on('chainChanged', handleChainChanged);
        
    } catch (error) {
        console.error('Error connecting wallet:', error);
    }
}

// Function to handle account changes
function handleAccountsChanged(newAccounts) {
    if (newAccounts.length === 0) {
        // User disconnected wallet
        disconnectWallet();
    } else {
        // Account changed
        updateWalletUI(newAccounts[0]);
    }
}

// Function to handle chain changes
function handleChainChanged(chainId) {
    // Reload the page when network changes
    window.location.reload();
}

// Function to update UI with wallet info
function updateWalletUI(address) {
    const connectBtn = document.getElementById('connectWallet');
    const walletInfo = document.getElementById('walletInfo');
    const walletAddress = document.querySelector('.wallet-address');
    
    // Hide connect button, show wallet info
    connectBtn.style.display = 'none';
    walletInfo.style.display = 'flex';
    
    // Format and display address
    const formattedAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;
    walletAddress.textContent = formattedAddress;
}

// Function to disconnect wallet
function disconnectWallet() {
    const connectBtn = document.getElementById('connectWallet');
    const walletInfo = document.getElementById('walletInfo');
    
    // Show connect button, hide wallet info
    connectBtn.style.display = 'flex';
    walletInfo.style.display = 'none';
    
    // Reset accounts
    accounts = [];
}

// Add event listeners
document.addEventListener('DOMContentLoaded', () => {
    const connectBtn = document.getElementById('connectWallet');
    const disconnectBtn = document.getElementById('disconnectWallet');
    
    if (connectBtn) {
        connectBtn.addEventListener('click', connectWallet);
    }
    
    if (disconnectBtn) {
        disconnectBtn.addEventListener('click', disconnectWallet);
    }
    
    // Check if already connected
    if (window.ethereum && window.ethereum.selectedAddress) {
        updateWalletUI(window.ethereum.selectedAddress);
    }
}); 