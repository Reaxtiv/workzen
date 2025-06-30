import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';

export const useMetaMask = () => {
  const [account, setAccount] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);
  const [provider, setProvider] = useState(null);
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);

  // Check if MetaMask is installed
  useEffect(() => {
    const checkMetaMask = async () => {
      const detectedProvider = await detectEthereumProvider();
      if (detectedProvider) {
        setIsMetaMaskInstalled(true);
        setProvider(detectedProvider);
      } else {
        setIsMetaMaskInstalled(false);
      }
    };
    checkMetaMask();
  }, []);

  // Check if already connected
  useEffect(() => {
    const checkConnection = async () => {
      if (provider) {
        try {
          const accounts = await provider.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            setAccount(accounts[0]);
          }
        } catch (err) {
          console.error('Error checking connection:', err);
        }
      }
    };
    checkConnection();
  }, [provider]);

  // Listen for account changes
  useEffect(() => {
    if (provider) {
      const handleAccountsChanged = (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          setAccount(null);
        }
      };

      provider.on('accountsChanged', handleAccountsChanged);
      
      return () => {
        provider.removeListener('accountsChanged', handleAccountsChanged);
      };
    }
  }, [provider]);

  const connectWallet = useCallback(async () => {
    if (!isMetaMaskInstalled) {
      setError('MetaMask is not installed. Please install MetaMask to continue.');
      return null;
    }

    setIsConnecting(true);
    setError(null);

    try {
      const accounts = await provider.request({ 
        method: 'eth_requestAccounts' 
      });
      
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        return accounts[0];
      }
    } catch (err) {
      if (err.code === 4001) {
        setError('Please connect to MetaMask.');
      } else {
        setError('Error connecting to MetaMask: ' + err.message);
      }
      console.error('Error connecting to MetaMask:', err);
    } finally {
      setIsConnecting(false);
    }
    
    return null;
  }, [provider, isMetaMaskInstalled]);

  const disconnectWallet = useCallback(() => {
    setAccount(null);
  }, []);

  const signMessage = useCallback(async (message) => {
    if (!provider || !account) {
      throw new Error('Wallet not connected');
    }

    try {
      const ethersProvider = new ethers.BrowserProvider(provider);
      const signer = await ethersProvider.getSigner();
      const signature = await signer.signMessage(message);
      return signature;
    } catch (err) {
      console.error('Error signing message:', err);
      throw err;
    }
  }, [provider, account]);

  return {
    account,
    isConnecting,
    error,
    isMetaMaskInstalled,
    connectWallet,
    disconnectWallet,
    signMessage,
    isConnected: !!account
  };
};
