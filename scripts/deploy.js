// scripts/deploy.js
const { ethers } = require("hardhat");

async function main() {
  console.log("🚀 Deploying ProductivityReports contract...");

  // Obtener la cuenta del deployer
  const [deployer] = await ethers.getSigners();
  console.log("📝 Deploying with account:", deployer.address);

  // Obtener balance
  const balance = await deployer.getBalance();
  console.log("💰 Account balance:", ethers.utils.formatEther(balance), "ETH");

  // Compilar y deployar el contrato
  const ProductivityReports = await ethers.getContractFactory("ProductivityReports");
  const contract = await ProductivityReports.deploy();

  await contract.deployed();

  console.log("✅ ProductivityReports deployed to:", contract.address);
  console.log("🏢 Company address (owner):", deployer.address);

  // Guardar la dirección del contrato en un archivo .env.local
  const fs = require('fs');
  const envContent = `NEXT_PUBLIC_CONTRACT_ADDRESS=${contract.address}\nNEXT_PUBLIC_COMPANY_ADDRESS=${deployer.address}\n`;
  
  try {
    fs.writeFileSync('.env.local', envContent);
    console.log("📁 Contract address saved to .env.local");
  } catch (error) {
    console.log("⚠️  Could not save to .env.local:", error.message);
    console.log("📋 Please manually add this to your .env.local file:");
    console.log(envContent);
  }

  // Verificar deployment
  console.log("\n🔍 Verifying deployment...");
  const companyAddress = await contract.company();
  console.log("✅ Company address in contract:", companyAddress);
  
  // Test básico
  console.log("\n🧪 Running basic test...");
  try {
    const reportCount = await contract.getEmployeeReportCount(deployer.address);
    console.log("✅ Contract is working! Report count:", reportCount.toString());
  } catch (error) {
    console.log("❌ Error testing contract:", error.message);
  }

  console.log("\n🎉 Deployment completed successfully!");
  console.log("🔗 You can now use this contract address in your frontend");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
