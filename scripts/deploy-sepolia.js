// deploy-sepolia.js - Script para desplegar ProductivityReports en Sepolia (ethers v6)
const { ethers, run } = require("hardhat");

async function main() {
  console.log("🚀 Desplegando ProductivityReports en Sepolia...");
  
  // Debug: Verificar variables de entorno
  console.log("🔍 Verificando configuración...");
  console.log("PRIVATE_KEY definida:", !!process.env.PRIVATE_KEY);
  console.log("SEPOLIA_RPC_URL:", process.env.SEPOLIA_RPC_URL);
  
  // Obtener información de la red
  const network = await ethers.provider.getNetwork();
  console.log(`📡 Red: ${network.name} (Chain ID: ${network.chainId})`);
  
  // Obtener el deployer
  const signers = await ethers.getSigners();
  console.log(`🔍 Número de signers disponibles: ${signers.length}`);
  
  if (signers.length === 0) {
    console.error("❌ No hay signers disponibles. Verifica tu PRIVATE_KEY en .env.local");
    process.exit(1);
  }
  
  const [deployer] = signers;
  const deployerAddress = await deployer.getAddress();
  console.log(`👤 Deployer: ${deployerAddress}`);
  
  // Verificar balance
  const balance = await ethers.provider.getBalance(deployerAddress);
  console.log(`💰 Balance: ${ethers.formatEther(balance)} ETH`);
  
  if (balance < ethers.parseEther("0.01")) {
    console.error("❌ Balance insuficiente. Necesitas al menos 0.01 ETH en Sepolia");
    console.log("🔗 Obtén ETH de prueba en: https://sepoliafaucet.com/");
    process.exit(1);
  }
  
  try {
    // Desplegar el contrato
    console.log("📜 Desplegando contrato...");
    const ProductivityReports = await ethers.getContractFactory("ProductivityReports");
    
    const contract = await ProductivityReports.deploy();
    
    console.log("⏳ Esperando confirmación...");
    await contract.waitForDeployment();
    const contractAddress = await contract.getAddress();
    
    console.log("✅ Contrato desplegado exitosamente!");
    console.log(`📍 Dirección del contrato: ${contractAddress}`);
    
    const deploymentTx = contract.deploymentTransaction();
    console.log(`🧾 Hash de transacción: ${deploymentTx.hash}`);
    console.log(`🔍 Ver en Etherscan: https://sepolia.etherscan.io/address/${contractAddress}`);
    
    // Esperar algunas confirmaciones antes de verificar
    console.log("⏳ Esperando confirmaciones adicionales...");
    await deploymentTx.wait(3);
    
    // Intentar verificar el contrato
    console.log("🔍 Verificando contrato en Etherscan...");
    try {
      await run("verify:verify", {
        address: contractAddress,
        constructorArguments: [],
      });
      console.log("✅ Contrato verificado en Etherscan");
    } catch (error) {
      console.log("⚠️  Error verificando contrato:", error.message);
      console.log("💡 Puedes verificar manualmente en Etherscan más tarde");
    }
    
    // Guardar información del despliegue
    const deploymentInfo = {
      network: "sepolia",
      chainId: network.chainId.toString(),
      contractAddress: contractAddress,
      deployerAddress: deployerAddress,
      transactionHash: deploymentTx.hash,
      blockNumber: deploymentTx.blockNumber,
      gasUsed: deploymentTx.gasLimit?.toString() || "N/A",
      timestamp: new Date().toISOString(),
      etherscanUrl: `https://sepolia.etherscan.io/address/${contractAddress}`
    };
    
    console.log("\n📋 INFORMACIÓN DE DESPLIEGUE:");
    console.log(JSON.stringify(deploymentInfo, null, 2));
    
    console.log("\n🔧 SIGUIENTE PASO:");
    console.log(`Actualiza tu .env.local con:`);
    console.log(`NEXT_PUBLIC_CONTRACT_ADDRESS=${contractAddress}`);
    console.log(`NEXT_PUBLIC_CONTRACT_DEPLOYED_BLOCK=${deploymentTx.blockNumber || 'N/A'}`);
    
    return deploymentInfo;
    
  } catch (error) {
    console.error("❌ Error desplegando contrato:", error);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
